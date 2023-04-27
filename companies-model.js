const { Schema, default: mongoose } = require('mongoose');

const companiesSchema = new Schema({
    _id:Number,
    companyName:String,
    companyUrl:String
})

module.exports = mongoose.model('comapnies', companiesSchema);