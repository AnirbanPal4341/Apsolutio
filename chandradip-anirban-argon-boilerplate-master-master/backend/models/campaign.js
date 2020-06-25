const mongoose = require('mongoose');

const campaignSchema = mongoose.Schema({
  cname: { type: String, required: true },
  cdescription: { type: String, required: true },
  ctgender: { type: String, required: true },
  ctlocation: { type: String, required: true },
  ctagegroup: { type: String, required: true },
  ctfav: { type: String, required: true },
  ctcustier: { type: String, required: true },
  ctincomegroup: { type: String, required: true },
  cexpdate: { type: String, required: true },
  coupon: { type: String, required: true },
  cstatus: { type: String, required: true },
  bicon: { type: String, required: true },
  editable: [{type: String}],
  uniquecoupon:[
    {
      code:{type:String},
      phone:{type:String}
    }
  ]
});


module.exports = mongoose.model('campaign', campaignSchema);



//"cname" : "Test Campaign", "cdescription" : "null", "ctgender" : "Male & Female", "ctlocation" : "Test Location..", "ctagegroup" : "16-25,26-35", "ctfav" : "true", "ctcustier" : "Bronze", "ctincomegroup" : "10 to 15", "cexpdate" : "2020-04-29", "coupon" : "No", "cstatus" : "In progress", "bicon" : "http://localhost:3000/CampBannerIcon/test-campaign.png"