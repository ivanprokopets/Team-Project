const product = require('../app/controllers/product');
const recipe = require('../app/controllers/recipe');
const auth = require('../app/controllers/auth');
const user = require('../app/controllers/user');
const middleware = require('../app/middleware/auth');

module.exports = app => {
  //product
  app.get('/product',middleware, product.getAll);
  app.get('/product/:id', middleware, product.getProduct);
  app.post('/product', middleware, product.create);
  app.put('/product/:id', middleware, product.update);
  app.delete('/product/:id', middleware, product.remove);
 
  //recipe
  app.get('/recipe', recipe.getAll);
  app.post('/recipe/filter', recipe.filterRecipes);
  app.get('/recipe/:id', middleware, recipe.getRecipe);
  app.post('/recipe', recipe.create);
  app.put('/recipe/:id', middleware, recipe.update);
  app.delete('/recipe/:id', recipe.remove);

  //user
  app.get('/user/:id', middleware, user.getUser);
  app.get('/user', middleware, user.getAll);
  app.delete('/user/:id', middleware, user.remove);

  //auth
  app.post('/signin', auth.signIn);
  app.post('/refresh-tokens', auth.refreshTokens);
  app.post('/register', auth.register);
};