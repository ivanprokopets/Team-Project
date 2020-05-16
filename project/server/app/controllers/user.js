const mongoose = require('mongoose');

 const User = mongoose.model('User');

 const getAll=(req,res)=>{
    User.find()
    .exec()
    .then(users=> {res.json(users)})
    .catch(err=> {
        res.status(500).json(err);
    });
 }

 const getUser=(req,res)=> {
    User.findOne({_id:req.params.id})
    .exec()
    .then(user=> {res.json(user)})
    .catch(err=> {
        res.status(500).json(err);
    });
 }

 const update=(req,res)=>{
    User.findOneAndUpdate({_id:req.params.id}, req.body)
    .exec()
    .then(user=> {
        res.json(user)
    })
    .catch(err=> {
        res.status(500).json(err);
    });
 }

 const remove=(req,res)=>{
    User.deleteOne({_id:req.params.id})
    .then(()=> {
        res.json({success:true})
    })
    .catch(err=> {
        res.status(500).json(err);
    });
 }

 module.exports={
     getAll,
     update,
     remove,
     getUser
 }