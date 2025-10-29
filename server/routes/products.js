const router = require('express').Router();


const PRODUCTS = [
    {
        id: 1,
        name: "Hockey Stick",
        description: "Lightweight composite stick for fast shots.",
        imageUrl: "https://picsum.photos/seed/stick/600/400",
        price: 19.99,
    },
    {
        id: 2,
        name: "Skates",
        description: "Comfort fit with precision edges.",
        imageUrl: "https://picsum.photos/seed/skates/600/400",
        price: 29.99,
    },
    {
        id: 3,
        name: "Helmet",
        description: "Pro-level protection with excellent airflow.",
        imageUrl: "https://picsum.photos/seed/helmet/600/400",
        price: 99.99,
    }
];

router.get('/', (req, res) => res.json(PRODUCTS));

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const item = PRODUCTS.find(p => p.id === id);
    if(!item) return res.status(404).json({error: "Product not found"});
    res.json(item)
});

module.exports = router;
