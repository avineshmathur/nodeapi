const { getMaxListeners } = require('../models/models.js');
const login = require('../models/models.js');
const invoke= require('../../../../hlf/fabric-samples/fabcar/javascript/invoke.js');
const fetch = require('../../../../hlf/fabric-samples/fabcar/javascript/query.js');
//const fetch = require('../../../../fabric-samples/fabcar/javascript/query.js');

const { query } = require('express');
    exports.create=(req,res)=>{
        console.log(req.body.email,"===========")
        if(!req.body.username){
            return res.status(400).send({
                message:"name not found"
            });
        }
        const loginDetails= new login({
         password:req.body.password, 
         username:req.body.username, 
         phoneno:req.body.phoneno,
         email:req.body.email
    });
    console.log(loginDetails,"=========")
    loginDetails
        .save()
        .then(data=>{
        console.log(data,"data")
        res.send({message:"Detils entered successfully",data});

    })
    .catch(err=>{
     res.status(500).send({
          message:err.message
        });
   });
};


exports.find=(req,res) => {
    login
    .find()
    .then(data=>{
      console.log(data,"data")
    res.send({message:"singleData",data});
    })
    .catch(err=>{
        res.status(500).send({
          message:err.message
        });
    });
};

exports.findOne = (req, res) => {
  login
    .findById(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Record not found with" + req.params.id,
        });
      }
      res.send(result);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "record not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving Rexord with id " + req.params.id,
      });
    });
};

exports.update=(req,res)=>{
  if(!req.body.email){
    return res.status(400).send({
      message:"email not found"
    });
  }
    login.findByIdAndUpdate(req.params.id,{email:req.body.email},{new:true})
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Record not found with" + req.params.id,
        });
      }
      res.send(result);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "record not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving Rexord with id " + req.params.id,
      });
    });
};

exports.insertion=(req,res)=>{
  console.log(req.body.email,"===========")
  if(!req.body.carnumber){
      return res.status(400).send({
          message:"name not found"
      });
  }
  let functionname = 'createCar'; 
  invoke.main(functionname,req.body.carnumber,req.body.make,req.body.model,req.body.owner,req.body.color,res);
};
  
exports.fetching=(req,res) => {
  
  let functionname = 'queryAllCars';
  fetch.main(functionname,res);

};
