import React, { FC } from 'react';
import { Recipe } from '../../../types/types';
import { required } from '../../../utils/validation';

interface PropsType {
  recipes: Array<Recipe>;
  togglePublic: (isPublic: string) => void;
  requestGetRecipes: () => void;
  isAuth: boolean;
  userId: string;
  recipe: Recipe;
  requestUpdateRecipe: (recipe: Recipe) => void;
}

const RecipeList: FC<PropsType> = ({
  recipes,
  recipe,
  togglePublic,
  requestGetRecipes,
  isAuth,
  userId,
  requestUpdateRecipe,
}) => {
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

  return (
    <div style={{ margin: '30px' }}>
      <div>
        <b>name:</b> {recipe.name}
      </div>
      <img src={require('../../../images/food_default.png')} style={{ width: 200, height: 200 }} />
      <div>
        <b>ingredients:</b>{' '}
        {recipe.ingredients.map((ingredient) => (
          <span>{ingredient}, </span>
        ))}
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
};

export default RecipeList;
