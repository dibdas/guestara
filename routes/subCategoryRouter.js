const router = require("express").Router();
const {
  getSubCategories,
  getSubCategoryByID,
  editSubCategory,
  createSubCategory,
} = require("../controller/subCategoryController");
router.get("/all", getSubCategories);
router.post("/create", createSubCategory);
router.get("/:categoryId/subCategories", getSubCategoryByID);
router.put("/:id",editSubCategory);
module.exports = router