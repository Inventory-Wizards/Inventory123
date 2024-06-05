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
// POST /api/items
router.post("/", async (req, res, next) => {
	try {
		const item = await Item.create(req.body);
		res.status(201).send(item); // 201 Created
	} catch (error) {
		next(error);
	}
});

//Patch items
router.patch("/:id", async (req, res, next) => {
  try{
    let item = await Item.findByPk(req.params.id);
    if (item){
      item = await item.update(req.body);
      res.send({ item, message: "Item has been updated successfully" });
    } else{
      res.status(404).send({ error: "not found"})
    }
    } catch (error){
      next(error)
    }
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



module.exports = router;
