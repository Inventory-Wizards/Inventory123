const express = require("express");
const router = express.Router();
const { Item } = require("../models");
const items = require("../seedData")



// GET /items
router.get("/", async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.send(items);
  } catch (error) {
    next(error);
  }
});

// GET /item by it's id
router.get("/:id", async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      res.send(item)
    } else {
      res.status(404).send({error: "Not Found"})
    }

  } catch (error) {
    res.sendStatus(500)
    next(error);
  }
});


// CREATE / items
router.post('/', (req, res) => {
  let items = []
  const { name, price, description, category, image } = req.body;
  if (!name || !description || !price || !category || !image) {
      return res.status(400).send('All fields are required');
  }
  const newItem = {name, price, description, category, image  };
  items.push(newItem);
  res.status(201).send(newItem);
});

// DELETE / item by id
router.delete("/:id", async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      await item.destroy();
      res.status(204).send()
    } else {
      res.status(404).send({error: "Not Found"})
    }

  } catch (error) {
    res.sendStatus(500)
    next(error);
  }
});



// router.post('/', async (req, res) => {
//   try {
//     const item = await Item.create(req.body)
//     res.status(201).send(item)
//   } catch (err) {
//     res.sendStatus(500)
//     console.error(err)
//   }
// })

module.exports = router;
