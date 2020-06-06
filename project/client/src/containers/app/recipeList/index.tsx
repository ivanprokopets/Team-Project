import React, { FC, useState } from 'react';
import { Recipe } from '../../../types/types';
import { required } from '../../../utils/validation';
import { Redirect } from 'react-router-dom';

interface PropsType {
  recipes: Array<Recipe>;
  togglePublic: (isPublic: string) => void;
  requestGetRecipes: () => void;
  isAuth: boolean;
  userId: string;
  requestUpdateRecipe: (recipe: Recipe) => void;
}

const RecipeList: FC<PropsType> = ({
  recipes,
  togglePublic,
  requestGetRecipes,
  isAuth,
  userId,
  requestUpdateRecipe,
}) => {
  const [isRedirect, toggleRedirect] = useState(false);
  const [recipeId, setRecipeId] = useState('');
  const checkUserId = (likers: Array<string>) => {
    return likers.find((e) => e === userId);
  };
  const likeRecipe = (recipe: any) => {
    const likers = recipe.likers;
    likers.push(userId);

    requestUpdateRecipe({
      id: recipe._id,
      ...recipe,
      likers,
    });
    requestGetRecipes();
  };
  const dislikeRecipe = (recipe: any) => {
    const likers = recipe.likers.filter((e: string) => e != userId);
    requestUpdateRecipe({
      id: recipe._id,
      ...recipe,
      likers,
    });
    requestGetRecipes();
  };
  const onRecipe = (id: string) => {
    setRecipeId(id);
    toggleRedirect(true);
  };
  const elementRecipe = recipes.map((recipe: any) => {
    return (
      <div style={{ margin: '30px' }}>
        <div onClick={() => onRecipe(recipe._id)}>
          <div>
            <b>name:</b> {recipe.name}
          </div>
          <img
            src={require('../../../images/food_default.png')}
            style={{ width: 200, height: 200 }}
          />
          <div>
            <b>ingredients:</b>{' '}
            {recipe.ingredients.map((ingredient: any) => (
              <span>{ingredient}, </span>
            ))}
          </div>
        </div>

        {recipe.isPublic && (
          <>
            <b>likes</b>:{recipe.likers.length}
            {isAuth &&
              (checkUserId(recipe.likers) ? (
                <button onClick={() => dislikeRecipe(recipe)}>dislike</button>
              ) : (
                <button onClick={() => likeRecipe(recipe)}>like</button>
              ))}
          </>
        )}
      </div>
    );
  });
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
  if (isRedirect) {
    return <Redirect to={`/recipe/${recipeId}`} />;
  }
  return (
    <>
      {isAuth && (
        <div>
          <button onClick={onAll}>all</button>
          <button onClick={onPublic}>public</button>
          <button onClick={onPrivate}>private</button>
        </div>
      )}

      <div>{elementRecipe}</div>
    </>
  );
};

export default RecipeList;
