const asyncHandler = require("express-async-handler");
const knex = require("knex");
const config = require("../knexfile");
const database = knex(config);

function sendErrorResponse(res, message, status = 500) {
  console.error(message);
  return res.status(status).json({
    success: false,
    data: message,
  });
}

function checkMissingFields(req, res, requiredFields) {
  const missingFields = requiredFields.filter(
    (field) => !req.body[field] || req.body[field] === ""
  );

  if (missingFields.length > 0) {
    return sendErrorResponse(
      res,
      `Missing required fields: ${missingFields.join(", ")}`,
      400
    );
  }
  return false;
}

const getItems = asyncHandler(async (req, res) => {
  try {
    const products = await database.select("*").from("products");

    if (products.length === 0) {
      return res.json({
        success: true,
        data: "No products found",
      });
    }

    return res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    return sendErrorResponse(res, "Internal Server Error");
  }
});

const getItemsById = asyncHandler(async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await database
      .select("*")
      .from("products")
      .where({ id: itemId })
      .first();

    if (!item) {
      return res.json({
        success: true,
        data: "Item not found",
      });
    }

    return res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    return sendErrorResponse(res, "Internal Server Error");
  }
});

const createItem = asyncHandler(async (req, res) => {
  try {
    if (typeof req.body !== "object" || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        data: "Request body is empty or not an object",
      });
    }

    const requiredFields = ["price", "name", "description"];
    const missingFieldsError = checkMissingFields(req, res, requiredFields);

    if (missingFieldsError) {
      return missingFieldsError;
    }

    const { price, name, description } = req.body;
    const newItem = await database("products").insert({
      price,
      name,
      description,
    });

    if (newItem) {
      return res.json({
        success: true,
        data: "Item created successfully",
      });
    }

    return sendErrorResponse(res, "Failed to create item");
  } catch (error) {
    return sendErrorResponse(res, "Internal Server Error");
  }
});

const updateItem = asyncHandler(async (req, res) => {
  try {
    if (typeof req.body !== "object" || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        data: "Request body is empty or not an object",
      });
    }

    const requiredFields = ["id", "price", "name", "description"];
    const missingFieldsError = checkMissingFields(req, res, requiredFields);

    if (missingFieldsError) {
      return missingFieldsError;
    }

    const { id, price, name, description } = req.body;
    const updatedItem = await database("products").where({ id }).update({
      price,
      name,
      description,
    });

    if (updatedItem) {
      return res.json({
        success: true,
        data: "Item updated successfully",
      });
    }

    return sendErrorResponse(res, "Failed to update item");
  } catch (error) {
    return sendErrorResponse(res, "Internal Server Error");
  }
});

const deleteItem = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        data: "Invalid product ID",
      });
    }

    const deletedItem = await database("products").where({ id: id }).del();

    if (deletedItem) {
      return res.json({
        success: true,
        data: "Item deleted successfully",
      });
    }

    return res.json({
      success: false,
      data: "Item not found or failed to delete",
    });
  } catch (error) {
    return sendErrorResponse(res, "Internal Server Error");
  }
});

module.exports = {
  getItems,
  getItemsById,
  createItem,
  updateItem,
  deleteItem,
};
