const router = require('express').Router();
const itemRouter = require('./itemRouter');
const categoryRouter = require("./categoryRouter");
const subCategoryRouter = require('./subCategoryRouter');
router.use('/categories',categoryRouter);
router.use('/items',itemRouter);
router.use('/subcategories',subCategoryRouter);


module.exports=router;
