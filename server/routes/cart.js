const router = require('express').Router();

router.post('/', (req, res) => {
    const {productId, quantity = 1} = req.body || {};
    if(!productId) return res.status(400).json({error: "Product ID is required"});
    res.status(201).json({ok: true, item: {productId, quantity}});
});

module.exports = router;
