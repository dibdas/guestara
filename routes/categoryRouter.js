const router = require("express").Router();
const {
  createCategory,
  getCategories,
  updateCategory,
  getCategoryById,
} = require("../controller/categoryController");

router.get('/all',getCategories);
router.post('/create',createCategory);
router.get('/:identifier',getCategoryById);
router.put('/:id',updateCategory);
module.exports= router