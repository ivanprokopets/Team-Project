const mongoose = require('mongoose');

const Product = mongoose.model('Product');

const getAll = (req, res) => {
  Product.find()
    .exec()
    .then(products => {
      res.json(products);
    })
    .catch(err => {
      res.status(500).json(err);
    });
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
};

const getProduct=(req,res)=> {
  Product.findOne({_id:req.params.id})
  .exec()
  .then(product=> {res.json(product)})
  .catch(err=> {
      res.status(500).json(err);
  });
  res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
}

const create = (req, res) => {
  Product.create(req.body)
    .then(createdProduct => {
      res.json(createdProduct);
    })
    .catch(err => {
      res.status(500).json(err);
    });
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
};

const update = (req, res) => {
  Product.findOneAndUpdate({ _id: req.params.id }, req.body)
    .exec()
    .then(product => {
      res.json(product);
    })
    .catch(err => {
      res.status(500).json(err);
    });
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
};

const remove = (req, res) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => {
      res.status(500).json(err);
    });
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
};

module.exports = {
  getAll,
  getProduct,
  create,
  update,
  remove,
};
