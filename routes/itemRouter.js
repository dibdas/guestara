const router = require("express").Router();
const {createItem,editItem,allItems,itemById,itemByName,searchByName,getItemsByCategoryId, getItemsBySubCategoryId}= require('../controller/itemsController')
router.get('/all', allItems);
router.post('/create', createItem);
router.get('/:identifier', itemById);
router.get('/items/:name', itemByName);
router.get('/search/:name', searchByName);
router.get('/categories/:categoryId/items', getItemsByCategoryId);
router.get('/subcategories/:subcategoryId/items', getItemsBySubCategoryId );
router.put('/:id',editItem);


module.exports= router
