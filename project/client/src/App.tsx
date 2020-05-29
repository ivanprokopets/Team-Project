import React from 'react';
import './App.css';
import RecipeListContainer from './containers/app/recipeList/RecipeListContainer';
import { Provider } from 'react-redux';
import store from './store';
import LoginContainer from './containers/auth/login/LoginContainer';
import { Switch, Route, Redirect } from 'react-router-dom';
import RegisterContainer from './containers/auth/register/RegisterContainer';
import ProfileContainer from './containers/app/profile/ProfileContainer';
import AddRecipeContainer from './components/addRecipe/AddRecipeContainer';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Switch>
          <Route path="/" exact component={RecipeListContainer} />
          <Route path="/login" exact component={LoginContainer} />
          <Route path="/register" exact component={RegisterContainer} />
          <Route path="/profile" exact component={ProfileContainer} />
          <Route path="/addRecipe" exact component={AddRecipeContainer} />
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
