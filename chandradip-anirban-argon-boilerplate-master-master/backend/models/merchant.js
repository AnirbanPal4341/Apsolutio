const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const merchantSchema = mongoose.Schema({
  UserType: String,
  MerchantName:  String ,
  BranchName: String ,
  Location:  String ,
  CurrentStatus:  String ,
  PdfLinks : Array

});



module.exports = mongoose.model('Merchant',merchantSchema, 'merchantPanel');
