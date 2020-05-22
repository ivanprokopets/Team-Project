import React from 'react';
import './App.css';
import RecipeListContainer from './containers/app/recipeList/RecipeListContainer';
import { Provider} from "react-redux";
import store from './store';
import HeaderContainer from "./containers/app/header/HeaderContainer";

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <HeaderContainer />
      <RecipeListContainer />
    </div>
     </Provider>
  );
}


export default App;