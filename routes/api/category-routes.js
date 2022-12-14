const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryParams = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryParams);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryParams = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!categoryParams) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryParams);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryParams = await Category.create(req.body);
    res.status(200).json(categoryParams);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryParams = await Category.update(
      req.body,
      { where: { id: req.params.id } }
    );

    if (!categoryParams) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(`Category ${req.params.id} has been updated`);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryParams = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryParams) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(`Category ${req.params.id} has been deleted`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;