const express = require("express");
const router = express.Router();

const {
  getItems,
  getItemsById,
  createItem,
  updateItem,
  deleteItem,
} = require("../controller/productcontroller");

router.get("/items", getItems);

router.get("/items/:id", getItemsById);

router.post("/items", createItem);

router.post("/items/:id", updateItem);

router.delete("/items/:id", deleteItem);

module.exports = router;
