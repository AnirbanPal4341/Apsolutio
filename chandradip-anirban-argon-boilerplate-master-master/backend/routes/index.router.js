const express = require('express');
const router = express.Router();
const jwtVerify = require('../config/jwtHelper');
const passport = require('passport');
const mongoose = require('mongoose');
const Merchant = require('../models/merchant');


const ctrlUser = require('../controllers/user.controller');

router.post('/register', ctrlUser.register);

router.post('/login', ctrlUser.authenticate);

router.post('/forgot', ctrlUser.forgot);

router.get('/reset/:token', ctrlUser.reset);
router.post('/reset/:token', ctrlUser.resetPassword);

// router.get('/auth/google', passport.authenticate('google', {
//   scope: ['profile']
// }), (req, res)=> {
//   res.status(200).json({status: true});
// });

// router.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
//   res.send('You have reached the callback url');
// });

router.get('/user-profile', jwtVerify.verifyJwtToken, ctrlUser.userProfile);

// router.get('/forgot', function(req, res) {
//     res.redirect('/reset');
//   });





router.get('/Merchant', function(req,res){
  console.log('get req');
  Merchant.find({})
  .exec(function(err,Merchant){
    if (err){
      console.log('Error');
    }else{
      res.json(Merchant);
    }
  });
});

router.get('/Merchant/:id', function(req,res){
  console.log('get req');
  Merchant.findById(req.params.id)
  .exec(function(err,Merchant){
    if (err){
      console.log('Error');
    }else{
      res.json(Merchant);
    }
  });
});

router.post('/Merchant', function(req,res){
  console.log('post ulala');
  var newMerchant = new Merchant();
  newMerchant.UserType = req.body.UserType;
  newMerchant.MerchantName = req.body.MerchantName;
  newMerchant.BranchName = req.body.BranchName;
  newMerchant.Location = req.body.Location;
  newMerchant.CurrentStatus = req.body.CurrentStatus;
  newMerchant.save(function(err , insertedMerchant){
    if(err){
      console.log('Error saving merchant');
    }else{
      res.json(insertedMerchant);
    }
  });
});


router.put('/Merchant/:id', function( req , res ){
  console.log('Update a video');
  Merchant.findByIdAndUpdate(req.params.id,{
    $set : {UserType: req.body.UserType , MerchantName: req.body.MerchantName , BranchName: req.body.BranchName , Location: req.body.Location , CurrentStatus: req.body.CurrentStatus}
  },
  {
    new: true
  },
  function(err , updatedMerchant){
    if(err){
      res.send("Error updating Merchant");
    }else{
      res.json(updatedMerchant);
    }
  }
  );
});


router.delete('/Merchant/:id', function(req,res){
  console.log('Deleting a merchant');
  Merchant.findByIdAndRemove(req.params.id , function(err , deletedMerchant){
    if(err){
      res.send("Error deleting Merchant")
    }else{
      res.json(deletedMerchant);
    }
  });

});



router.put('/status/:id', function(req,res,next){
  console.log('updating');
  Merchant.findByIdAndUpdate(req.params.id,
    {$set:{CurrentStatus:req.body.CurrentStatus}},{new:true},
    function(err,statusupdated){
      if(err)
      {
        res.send('Error updating status');
      }
      else
      {
        console.log("req.body = " + JSON.stringify(req.body));
        console.log("req.body.CurrentStatus = " + req.body.CurrentStatus);
        res.send(statusupdated);
      }
    });
});





module.exports = router;
