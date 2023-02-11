const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated products
  try {
    const categoryData = await Category.findAll({
      include: [
        { model: Product },
      ],
    });

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});
// find one category by its `id` value
// be sure to include its associated Products

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      { model: Product },
    ],
  })
  .then((category) => res.json(category))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post('/', (req, res) => {
  Category.create(req.body)
  .then((tag) => res.status(200).json(tag))
  .catch((err) => res.status(404).json(err));
});

// update a category by its `id` value

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((Category) => res.status(200).json(Category))
  .catch((Category) => res.status(404).json(Category));
});


  // delete a category by its `id` value

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((category) => {
    console.log(category);
    res.json(category);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

module.exports = router;
