const mongoose = require('mongoose');
const Category = require('./Category');
const Subcategory = require('./SubCategory');
const itemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    image:{
        type: String,
        default: true
    },
    description:{
        type: String,
        default: ''
    },
    taxApplicabilty:{
        type: Boolean,
        default: false
    },
    tax:{
        type: Number,
        default: ''
    },
    baseAmount: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        required: true
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'SubCategory',
        default: null
    },
},{
    timestamps: true
});

itemSchema.pre('save',((next)=>{
    this.totalAmount= this.baseAmount - this.discount;
    next()
}));

module.exports = mongoose.model('Item',itemSchema)