const router = require('express').Router();


const PRODUCTS = [
  {
    id: 1,
    name: "Hockey Stick",
    description: "Lightweight composite stick for fast shots.",
    imageUrl: "https://media.purehockey.com/q_auto,f_auto,fl_lossy/ui/Content/Category_Pages/hyp2vol2.jpg"
  },
  {
    id: 2,
    name: "Skates",
    description: "Comfort fit with precision edges.",
    imageUrl: "https://picsum.photos/seed/skates/600/400"
  },
  {
    id: 3,
    name: "Helmet",
    description: "Pro-level protection with excellent airflow.",
    imageUrl: "../favicon.ico"
  }
];

router.get('/', (req, res) => res.json(PRODUCTS));

module.exports = router;
