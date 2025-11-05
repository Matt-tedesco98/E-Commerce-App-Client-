const db = require('./index');

(async () => {
  try {
    await db.query(`
      INSERT INTO users (password, email, firstname, lastname, created, modified)
      VALUES ('test123', 'test@example.com', 'Test', 'User', NOW(), NOW())
    `);
    console.log('Seeded user!');
  } catch (err) {
    console.error('Seeding failed:', err);
  }
})();
