const mongoose = require('mongoose');

 const User = mongoose.model('User');

 const getAll=(req,res)=>{
    User.find()
    .exec()
    .then(users=> {res.json(users)})
    .catch(err=> {
        res.status(500).json(err);
    });
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
 }

 const getUser=(req,res)=> {
    User.findOne({_id:req.params.id})
    .exec()
    .then(user=> {res.json(user)})
    .catch(err=> {
        res.status(500).json(err);
    });
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
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
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
 }

 const remove=(req,res)=>{
    User.deleteOne({_id:req.params.id})
    .then(()=> {
        res.json({success:true})
    })
    .catch(err=> {
        res.status(500).json(err);
    });
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
 }

 module.exports={
     getAll,
     update,
     remove,
     getUser
 }