const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  try {
    const tagParams = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tagParams);
  } catch (err) {
    res.status(500).json(err);
  }
});

  router.get('/:id', async(req, res) => {
    try {
      const tagParams = await Tag.findByPk(req.params.id, {
        include: [{ model: Product }]
      });
  
      if (!tagParams) {
        res.status(404).json({ message: 'No tag found with this id!' });
        return;
      }
  
      res.status(200).json(tagParams);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((product) => {
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', async (req, res) => {
  try {
    const tagParams = await Tag.update(
      req.body,
      { where: { id: req.params.id } }
    );

    if (!tagParams) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(`Tag ${req.params.id} has been updated`);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
