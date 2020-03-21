import React from 'react';
import './App.css';
import RecipeListContainer from './containers/app/recipeList/RecipeListContainer';
import { Provider} from "react-redux";
import store from './store';
function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <RecipeListContainer />
    </div>
     </Provider>
  );
}


export default App;