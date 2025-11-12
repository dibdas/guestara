const Categories = require("../models/Category");
const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);
const mongoose = require("mongoose"); 
const createCategory= async(req,res)=>{
    try{
         const { name, image, description, taxApplicability, tax, taxType } = req.body;
         if(!name){
            return res.status(400).json({error: 'name is required'});
         }
          const newCategory = new Categories({
            id: generateId(),
            name,
            image:image||'',
            description: description || '',
            taxApplicability: taxApplicability || false,
            tax: taxApplicability ? (tax || 0 ) :null,
            taxType: taxApplicability ? taxApplicability : null,
            createdAt: new Date().toISOString()
          })
          const savedcategory = await newCategory.save();
          res.status(201).json({message:" category created successfully",data: savedcategory});
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

const getCategories = async(req,res)=>{
    try{
        res.json({data:Categories})
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

const getCategoryById=async(req,res)=>{
    try{
        const {identifier} = req.params;
        console.log(identifier);

    const query = mongoose.Types.ObjectId.isValid(identifier)
      ? { _id: identifier }
      : { name: { $regex: new RegExp(`^${identifier}$`, "i") } };

    const category = await Categories.findOne(query);
        if(!category){
            return res.status(400).json({error:'category not found'});
        }
        res.json({data: category})
    }catch(error){
        res.status(500).json({error: error.message})
    }
    
}
// const updateCategory= async(req,res)=>{
//     try{
//         const{id} = req.params;
//         const categoryIndex = Categories.findIndex(c=>c.id===id);
//         if(categoryIndex == -1){
//             return res.status(400).json({error:' category not found'})
//         }
//         const updates = req.body;
//         const updatedCategory = Categories[categoryIndex] ={
//             ...Categories[categoryIndex],
//             ...updates,
//             id,
//             updatedAt: newDate().toISOString()
//         }
//         res.json({message: 'category updated successfull',updatedCategory })
//     }catch(error){
//         res.status(500).json({error: error.message})
//     }
// }

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and update category in MongoDB
    const updates = req.body;

    const updatedCategory = await Categories.findByIdAndUpdate(
      id,
      { 
        ...updates,
        updatedAt: new Date().toISOString() 
      },
      { new: true } // Return the updated document
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({
      message: 'Category updated successfully',
      updatedCategory
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports={createCategory,getCategories,updateCategory,getCategoryById}