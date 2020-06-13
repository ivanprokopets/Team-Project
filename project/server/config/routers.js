const product = require('../app/controllers/product');
const recipe = require('../app/controllers/recipe');
const auth = require('../app/controllers/auth');
const user = require('../app/controllers/user');
const middleware = require('../app/middleware/auth');

module.exports = (app) => {
  //product
  app.get('/product', product.getAll);
  app.get('/product/:id', product.getProduct);
  app.post('/product', product.create);
  app.put('/product/:id', product.update);
  app.delete('/product/:id', product.remove);
  app.get('/productsearch', product.filter);

  //recipe
  app.get('/recipe', recipe.getAll);
  app.post('/recipe/filter', recipe.filterRecipes);
  app.get('/recipe/:id', recipe.getRecipe);
  app.post('/recipe',middleware, recipe.create);
  app.put('/recipe/:id', middleware, recipe.update);
  app.delete('/recipe/:id', middleware, recipe.remove);

  //user
  app.get('/user/:id', middleware, user.getUser);
  app.get('/user', middleware, user.getAll);
  app.delete('/user/:id', middleware, user.remove);

  //auth
  app.post('/signin', auth.signIn);
  app.post('/refresh-tokens', auth.refreshTokens);
  app.post('/register', auth.register);
};
