const express = require("express");
const router = express.Router();
const { Item } = require("../models");

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
    if (!item) return res.sendStatus(404)
    res.send(item);
  } catch (error) {
    res.sendStatus(500)
    next(error);
  }
});

// CREATE / items
router.post('/', async (req, res) => {
  try {
    const item = await Item.create(req.body)
    res.status(201).send(item)
  } catch (err) {
    res.sendStatus(500)
    console.error(err)
  }
})

module.exports = router;
