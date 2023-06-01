import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  allCategories,
  createCategory,
  deleteCategory,
  findOneCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

//create category
router.post("/create-category", requireSignIn, isAdmin, createCategory);

//update category
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategory);

//getALl category
router.get("/all-category", allCategories);

//single category
router.get("/get-category/:slug", findOneCategory);

//delete category
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategory);

export default router;
