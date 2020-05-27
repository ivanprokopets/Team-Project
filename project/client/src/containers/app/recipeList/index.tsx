import React, { FC } from 'react';
import { Recipe } from '../../../types/types';

interface PropsType {
  recipes: Array<Recipe>;
}

const RecipeList: FC<PropsType> = ({ recipes }) => {
  const elementRecipe = recipes.map((recipe: Recipe) => 
  <div style={{'margin': '30px'}}>
    <div><b>name:</b> {recipe.name}</div>
    <div><b>ingredients:</b> {recipe.ingredients.map(ingredient=> <span>{ingredient}, </span>)}</div>
    <div><b>description: </b> {recipe.description}</div>
  </div>
 );
  return (
    <>
      <div>{elementRecipe}</div>
    </>
  );
};

export default RecipeList;
