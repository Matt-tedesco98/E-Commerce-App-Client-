const db = require('../db/index');

// Map DB row -> public shape for your API/React
function toPublic(row) {
    if (!row) return null;
    return {
        id: row.id,
        username: row.username,
        email: row.email,
        avatar: row.avatar,
        provider: row.provider,
        providerId: row.provider_id,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

async function findById(id) {
    const {rows} = await db.query(
        `SELECT id,
                email,
                username,
                password_hash,
                provider,
                provider_id,
                avatar,
                created_at,
                updated_at
         FROM users
         WHERE id = $1`,
        [id]
    );
    return rows[0] || null;
}

async function findByEmail(email) {
    const {rows} = await db.query(
        `SELECT id,
                email,
                username,
                password_hash,
                provider,
                provider_id,
                avatar,
                created_at,
                updated_at
         FROM users
         WHERE email = $1`,
        [email]
    );
    return rows[0] || null;
}

async function findByUsername(username) {
    const {rows} = await db.query(
        `SELECT id,
                email,
                username,
                password_hash,
                provider,
                provider_id,
                avatar,
                created_at,
                updated_at
         FROM users
         WHERE username = $1`,
        [username]
    );
    return rows[0] || null;
}

async function findByProvider(provider, providerId) {
    const {rows} = await db.query(
        `SELECT id,
                email,
                username,
                password_hash,
                provider,
                provider_id,
                avatar,
                created_at,
                updated_at
         FROM users
         WHERE provider = $1
           AND provider_id = $2`,
        [provider, providerId]
    );
    return rows[0] || null;
}

// Create a local (username/password) user.
// Pass in a **hashed** password (bcrypt). Keep hashing out of the model layer.
async function createLocal({username, email = null, passwordHash}) {
    const {rows} = await db.query(
        `INSERT INTO users (username, email, password_hash, provider)
         VALUES ($1, $2, $3, 'local')
         RETURNING id, email, username, password_hash, provider, provider_id, avatar, created_at, updated_at`,
        [username, email, passwordHash]
    );
    return rows[0];
}

// Update profile fields (no password). Fields are optional; only non-null values overwrite.
async function updateProfile(id, {username = null, email = null, avatar = null}) {
    const {rows} = await db.query(
        `UPDATE users
         SET username   = COALESCE($2, username),
             email      = COALESCE($3, email),
             avatar     = COALESCE($4, avatar),
             updated_at = NOW()
         WHERE id = $1
         RETURNING id, email, username, password_hash, provider, provider_id, avatar, created_at, updated_at`,
        [id, username, email, avatar]
    );
    return rows[0] || null;
}

// Set/replace password hash (for local accounts)
async function setPasswordHash(id, passwordHash) {
    const {rows} = await db.query(
        `UPDATE users
         SET password_hash = $2,
             updated_at    = NOW()
         WHERE id = $1
         RETURNING id, email, username, password_hash, provider, provider_id, avatar, created_at, updated_at`,
        [id, passwordHash]
    );
    return rows[0] || null;
}

// Create or update an OAuth user record.
// If exists (by provider+provider_id), update basic profile; otherwise insert.
async function upsertOAuth({provider, providerId, username, email = null, avatar = null}) {
    const existing = await findByProvider(provider, providerId);
    if (existing) {
        const {rows} = await db.query(
            `UPDATE users
             SET username   = COALESCE($3, username),
                 email      = COALESCE($4, email),
                 avatar     = COALESCE($5, avatar),
                 updated_at = NOW()
             WHERE id = $1
             RETURNING id, email, username, password_hash, provider, provider_id, avatar, created_at, updated_at`,
            [existing.id, provider, username, email, avatar]
        );
        return rows[0];
    }

    const {rows} = await db.query(
        `INSERT INTO users (provider, provider_id, username, email, avatar)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, email, username, password_hash, provider, provider_id, avatar, created_at, updated_at`,
        [provider, providerId, username, email, avatar]
    );
    return rows[0];
}

// For controllers/passport: always emit the public shape
async function getPublicById(id) {
    const row = await findById(id);
    return toPublic(row);
}

module.exports = {
    // raw finders (return full row incl password_hash so auth layer can verify):
    findById,
    findByEmail,
    findByUsername,
    findByProvider,
    // mutations:
    createLocal,
    updateProfile,
    setPasswordHash,
    upsertOAuth,
    // public view:
    getPublicById,
    toPublic,
};
