const mongoose = require('mongoose');

const Recipe = mongoose.model('Recipe');

const _ = require('underscore');

const getAll = (req, res) => {
  Recipe.find()
    .exec()
    .then((recipes) => {
      if (req.query.isPublic === 'yes') {
        if (req.query.ingredients) {
          const filteredRecipes = recipes.filter(
            (recipe) =>
              _.intersection(recipe.ingredients, req.query.ingredients).length ===
                req.query.ingredients.length && recipe.isPublic === true,
          );
          res.json(filteredRecipes);
        } else {
          const filteredRecipes = recipes.filter((recipe) => recipe.isPublic === true);
          res.json(filteredRecipes);
        }
      } else if (req.query.isPublic === 'no') {
        if (req.query.ingredients) {
          const filteredRecipes = recipes.filter(
            (recipe) =>
              _.intersection(recipe.ingredients, req.query.ingredients).length ===
                req.query.ingredients.length &&
              recipe.isPublic === false &&
              recipe.creatorId === req.query.userId,
          );
          res.json(filteredRecipes);
        } else {
          const filteredRecipes = recipes.filter(
            (recipe) => recipe.isPublic === false && recipe.creatorId === req.query.userId,
          );
          res.json(filteredRecipes);
        }
      } else if (req.query.userId) {
        if (req.query.ingredients) {
          const filteredRecipes = recipes.filter(
            (recipe) =>
              _.intersection(recipe.ingredients, req.query.ingredients).length ===
                req.query.ingredients.length &&
              (recipe.isPublic === true ||
                (recipe.isPublic === false && recipe.creatorId === req.query.userId)),
          );
          res.json(filteredRecipes);
        } else {
          const filteredRecipes = recipes.filter(
            (recipe) =>
              recipe.isPublic === true ||
              (recipe.isPublic === false && recipe.creatorId === req.query.userId),
          );
          res.json(filteredRecipes);
        }
      } else {
        if (req.query.ingredients) {
          const filteredRecipes = recipes.filter(
            (recipe) =>
              _.intersection(recipe.ingredients, req.query.ingredients).length ===
                req.query.ingredients.length && recipe.isPublic === true,
          );
          res.json(filteredRecipes);
        } else {
          const filteredRecipes = recipes.filter((recipe) => recipe.isPublic === true);
          res.json(filteredRecipes);
        }
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With, Accept',
  );
};

const getRecipe = (req, res) => {
  Recipe.findOne({ _id: req.params.id })
    .exec()
    .then((recipe) => {
      res.json(recipe);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With, Accept',
  );
};

const filterRecipes = (req, res) => {
  Recipe.find()
    .exec()
    .then((recipes) => {
      const filteredRecipes = recipes.filter(
        (recipe) =>
          _.intersection(recipe.ingredients, req.body.ingredients).length ===
            req.body.ingredients.length &&
          (recipe.isPublic === true ||
            (recipe.isPublic === false && recipe.creatorId === req.body.userId)),
      );
      res.json(filteredRecipes);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With, Accept',
  );
};
const create = (req, res) => {
  Recipe.create(req.body)
    .then((createdRecipe) => {
      res.json(createdRecipe);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With, Accept',
  );
};

const update = (req, res) => {
  Recipe.findOneAndUpdate({ _id: req.params.id }, req.body)
    .exec()
    .then((recipe) => {
      res.json(recipe);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With, Accept',
  );
};

const remove = (req, res) => {
  Recipe.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With, Accept',
  );
};

module.exports = {
  getAll,
  getRecipe,
  filterRecipes,
  create,
  update,
  remove,
};
