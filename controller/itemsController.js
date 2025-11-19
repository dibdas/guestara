const Items = require("../models/Item");
const SubCategories = require("../models/SubCategory")
const Categories = require("../models/Category")
const mongoose = require("mongoose"); 
const Fuse = require("fuse.js");
const createItem=async(req,res)=>{
    try{
        const{name,image,description,taxApplicability,tax,baseAmount,discount,categoryId,subCategoryId} = req.body;
        if(!name || !baseAmount){
            return res.status(400).json({error:' Name and base amount is required '});
        }
        if(!categoryId && !subCategoryId){
            return res.status(400).json({error: 'either categoryId or subCategoryId is required '});
        }
        if(categoryId){
            const category = Categories.findById(categoryId)
            if(!category){
                return res.status(400).json({error:"category not found"})
            }
        }
        if(subCategoryId){
            const subCategory = SubCategories.findById(subCategoryId);
            if(!subCategory){
                return res.status(400).json({error: 'sub category not found '})
            }
        }
        const discountAmount = discount || 0 ;
        const totalAmount = baseAmount - discountAmount;
         const item= new Items({
            name,
            image: image|| '',
            description: description || '',
            tax : taxApplicability? (tax || 0) : null,
            taxApplicability: taxApplicability || false,
            baseAmount,
            discount: discountAmount,
            totalAmount,
            categoryId: categoryId || null,
            subCategoryId: subCategoryId || null,
            createdAt: new Date().toISOString()
         })
         const saveItem = await item.save()
         res.status(201).json({message:' Item is created ',saveItem});
    }
    catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

const allItems= async (req,res)=>{
    try{
        const allItems = await Items.find().populate('categoryId').populate('subCategoryId');
        res.json({data: allItems})
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

const itemById =async(req,res)=>{
    try{
        const {identifier} = req.params;
        const item = Items.find(i=>i.id===identifier || i.name.Lowercase()=== identifier.toLowerCase());
        if(!item){
            return res.status(400).json({error: 'Item not found'});
        }
        res.json({data: item});
    }
    catch(error){
        res.status(500).json({error: error. message})
    }
}

const itemByName = async (req, res) => {
  try {
    console.log("Inside itemByName");
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({ error: "Item name is required" });
    }

    const items = await Items.find({
      name
    }).lean();

    res.status(200).json({ data: items });
  } catch (error) {
    console.error("Error in itemByName:", error);
    res.status(500).json({ error: error.message });
  }
};
// const searchByName = async(req,res)=>{
//     try{
//         const{name} = req.params;
//         console.log(name);
      
//     if (!name) {
//       return res.status(400).json({ error: "Name parameter is required" });
//     }
//     const items = await Items.find({
//       name: { $regex: new RegExp(name, "i") },
//     }).lean();

//     if (!items.length) {
//       return res.status(404).json({ error: "No items found with that name" });
//     }
//         res.json({data:items, count: items.length})
//     }
//     catch(error){
//         res.status(500).json({error: error.message})
//     }
// }

const searchByName = async (req, res) => {
  try {
    const { name} = req.params;
    console.log("Searching item:", name);

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Name parameter is required" });
    }
    
        const regex = new RegExp(name, "i"); 
 const items = await Items.find({
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
      ],
    }).lean();
    const itemsNames= items.map(item=>item.name)
    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No items found with that name" });
    }


    return res.status(200).json({
      success: true,
      count: items.length,
      data: itemsNames,
    });
  } catch (error) {
    console.error("Error searching items:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const editItem = async(req,res)=>{
    try{
        const{id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid item ID' });
    }
        
        
        const existingItem= await Items.findById(id);
    
        if(!existingItem){
            return res.status(400).json({error:' Item not found'});
        }
        
        const updates = req.body
    
        const baseAmount =
      updates.baseAmount !== undefined
        ? updates.baseAmount
        : existingItem.baseAmount;

    const discount =
      updates.discount !== undefined
        ? updates.discount
        : existingItem.discount;
  
        const totalAmount = baseAmount - discount;
       
        
       
        const updatedItems = await Items.findByIdAndUpdate(
            id,
            {
            ...updates,
            totalAmount,
             baseAmount,
        discount,
            updatedAt: new Date().toISOString()
            },{new: true}
        );
        res.json({message:'Item updated successfully', data: updatedItems});
    }
    catch(error){
        res.status(500).json({ error: error.message})
    }
}
const getItemsByCategoryId= async(req,res)=>{
    try{
        const{categoryId:identifier} = req.params;
        console.log(identifier)

            const query = mongoose.Types.ObjectId.isValid(identifier)
              ? { categoryId: identifier }
              : { name: { $regex: new RegExp(`^${identifier}$`, "i") } };
        
        const items = await Items.findOne(query).lean();
         
        if(!identifier){
            return res.status(400).json({error: 'item not found ' });    
        }
        res.json({ data: items});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}
const getItemsBySubCategoryId = async(req,res)=>{
    try{
        const{subcategoryId:identifier} = req.params;
        console.log(identifier)
         let subCategoryId;

         
         if (mongoose.Types.ObjectId.isValid(identifier)) {
            subCategoryId = identifier;
        }
        else{
            const subCategory= await SubCategories.findOne({
                name: { $regex: new RegExp(`^${identifier}$`, "i") } 
            }).lean();

        if(!subCategory){
             return res.status(404).json({ error: "SubCategory not found" });
        }
        subCategoryId = subCategory._id
    }
      const items = await Items.find({ subCategoryId }).lean();

         
        if(!identifier){
            return res.status(400).json({error: 'item not found ' });    
        }
        res.json({ data: items});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}


module.exports={ createItem,editItem,allItems,searchByName,itemById,itemByName,getItemsByCategoryId, getItemsBySubCategoryId }



