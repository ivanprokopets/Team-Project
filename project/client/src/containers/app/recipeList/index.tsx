import React, { FC } from 'react';
import { Recipe } from '../../../types/types';

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
  const elementRecipe = recipes.map((recipe: Recipe) => {
    return (
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
        {recipe.isPublic &&
          (checkUserId(recipe.likers) ? (
            <>
              <button onClick={() => dislikeRecipe(recipe)}>dislike</button>
              <b>likes</b>:{recipe.likers.length}
            </>
          ) : (
            <>
              <button onClick={() => likeRecipe(recipe)}>like</button>
              <b>likes</b>:{recipe.likers.length}
            </>
          ))}
        <div></div>
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
