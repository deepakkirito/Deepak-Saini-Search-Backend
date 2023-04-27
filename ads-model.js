const { Schema, default: mongoose } = require('mongoose');
// const mongoose = require('mongoose');
// const Schema = require('mongoose').Schema;

const adsSchema = new Schema({
    _id:Number,
    companyId:Number,
    primaryText:String,
    headline:String,
    description:String,
    CTA:String,
    imageUrl:String
})

module.exports = mongoose.model('ads', adsSchema);