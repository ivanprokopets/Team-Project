import React, { FC } from 'react';
import { Recipe } from '../../../types/types';

interface PropsType {
  recipes: Array<Recipe>;
  togglePublic: (isPublic: string) => void;
  requestGetRecipes: () => void;
}

const RecipeList: FC<PropsType> = ({ recipes, togglePublic, requestGetRecipes }) => {
  const elementRecipe = recipes.map((recipe: Recipe) => (
    <div style={{ margin: '30px' }}>
      <div>
        <b>name:</b> {recipe.name}
      </div>
      <div>
        <b>ingredients:</b>{' '}
        {recipe.ingredients.map((ingredient) => (
          <span>{ingredient}, </span>
        ))}
      </div>
      <div>
        <b>description: </b> {recipe.description}
      </div>
      {recipe.isPublic && (
        <div>
          <b>public</b>
        </div>
      )}
    </div>
  ));
  const onPublic = () => {
    togglePublic('yes');
    requestGetRecipes();
  };
  const onPrivate = () => {
    togglePublic('no');
    requestGetRecipes();
  };
  const onAll = () => {
    togglePublic('none');
    requestGetRecipes();
  };
  return (
    <>
      <button onClick={onAll}>all</button>
      <button onClick={onPublic}>public</button>
      <button onClick={onPrivate}>private</button>
      <div>{elementRecipe}</div>
    </>
  );
};

export default RecipeList;
