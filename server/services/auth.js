exports.upsertFromGoogle = async (user) => {
    const email = user.email?.[0]?.value ?? null;
    const avatar = user.photos?.[0]?.value ?? null;
    return {id: user.id, username: user.displayName || "Google User", email, avatar};

};

exports.upsertFromFacebook = async (user) => {
    const email = user.email?.value ?? null;
    const avatar = user.photos?.[0]?.value ?? null;
    return {id: user.id, username: user.username || "Facebook User", email, avatar};
}
