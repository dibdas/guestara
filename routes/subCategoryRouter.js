const router = require("express").Router();
const {
  getSubCategories,
  getSubCategoriesByCategoriesID,
  editSubCategory,
  createSubCategory,
  getSubCategoryByIdOrName
} = require("../controller/subCategoryController");
router.get("/all", getSubCategories);
router.get("/:identifier", getSubCategoryByIdOrName);
router.post("/create", createSubCategory);
router.get("/:categoryId/subcategories",getSubCategoriesByCategoriesID);
router.put("/:id",editSubCategory);
module.exports = router