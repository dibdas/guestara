const mongoose = require('mongoose');
const Category = require('./Category');
const subCategorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        default: ''
    },
    description:{
        type: String,
        default: ''
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Category,
        required: true
    },
    taxApplicability: {
        type: Boolean,
        default: false
    },
    tax:{
        type: Number,
        default: null
    }
},
    {
        timestamps: true
})
module.exports = mongoose.model('SubCategory', subCategorySchema);
