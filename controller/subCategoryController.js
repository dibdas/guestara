const SubCategories = require("../models/SubCategory");
const Categories = require("../models/Category");
const mongoose = require("mongoose"); 
const SubCategory = require("../models/SubCategory");
const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);
const getSubCategories = async(req,res)=>{
    try{
          const subCategories = await SubCategories.find();
        
        res.json({data: subCategories})
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

const createSubCategory = async(req,res)=>{
    try{
         const { name, image, description, taxApplicability, tax, categoryId } = req.body;
         if(!name || !categoryId){
            return res.status(400).json({error: 'name and categoryId is required' });
         }
         const category = Categories.findById(categoryId);
         if(!category){
            return res.status(400).json({error:'category not found'})
         }
         const newSubCategory=new SubCategories({
            id:generateId(),
            name,
            image:image||'',
            description: description || '',
            categoryId,
            taxApplicability: taxApplicability !== undefined ? taxApplicability : category.taxApplicability,
            tax: tax!== undefined ? tax : category.tax,
            createAt: new Date().toISOString()
         })
         const savedSubCategory = await newSubCategory.save();
         res.status(201).json({message: ' sub category create successfully', data: savedSubCategory});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

const getSubCategoryByID = async(req,res)=>{
    try{
        const{categoryId:identifier} = req.params;
        

            const query = mongoose.Types.ObjectId.isValid(identifier)
              ? { categoryId: identifier }
              : { name: { $regex: new RegExp(`^${identifier}$`, "i") } };
        
        const subCategory = await SubCategories.findOne(query).populate('categoryId').lean();
         const { categoryId: category, ...subcategoryData } = subCategory;
        if(!subCategory){
            return res.status(400).json({error: 'sub category not found ' });    
        }
        res.json({ subCategory: subcategoryData,category: category|| null });
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

const editSubCategory= async(req,res)=>{
    try{
        const{id} = req.params;

        const updates = req.body;
           const updatedSubCategory = await SubCategory.findByIdAndUpdate(
              id,
              { 
                ...updates,
                updatedAt: new Date().toISOString() 
              },
              { new: true } // Return the updated document
            );

            if (!updatedSubCategory) {
      return res.status(404).json({ error: 'SubCategory not found' });
    }
       res.json({
      message: 'Sub Category updated successfully',
      updatedSubCategory
    });
    }catch(error){
        res.status(500).json({error: error.message})
    }
}
module.exports = {getSubCategories,getSubCategoryByID,editSubCategory,createSubCategory}