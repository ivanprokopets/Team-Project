import React from 'react';
import './App.css';
import RecipeListContainer from './containers/app/recipeList/RecipeListContainer';
import { Provider} from "react-redux";
import store from './store';
import LoginContainer from './containers/app/login/LoginContainer';
import {Switch, Route} from 'react-router-dom';
import RegisterContainer from './containers/app/register/RegisterContainer';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
  
    <Switch>
          <Route path="/" exact component={LoginContainer}/>
          <Route path="/login" exact component={LoginContainer}/>
          <Route path="/register" exact component={RegisterContainer}/>
          <Route path="/recipe" exact component={RecipeListContainer}/>
        </Switch>
   
    </div>
    </Provider>
  );
}


export default App;