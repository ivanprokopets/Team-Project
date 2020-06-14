import React, { FC, useState } from 'react';
import { Recipe } from '../../../types/types';
import { required } from '../../../utils/validation';
import { Redirect } from 'react-router-dom';
import s from './recipeList.module.css';

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
      <div className={s.recipeCardWrapper}>
        <div className={s.recipeCard} onClick={() => onRecipe(recipe._id)}>
          <img
            src={require('../../../images/food_default.png')}
            style={{ width: 250, height: 250 }}
          />
          <div className={s.recipeDetails}>
            <div className={s.recipeName}>
              {recipe.name}
            </div>
            <div>
              <b>Ingredienty:</b>{' '}
              {recipe.ingredients.map((ingredient: any) => (
                <span>{ingredient}, </span>
              ))}
            </div>
            <div>
              <b>Sposób przygotowania:</b>
              {recipe.description}
            </div>
            <div>
              <b>Czas przygotowania:</b>
              {recipe.timeForPreparing}
            </div>
          </div>
        </div>

        {recipe.isPublic && (
          <>
            <b>Likes</b>:{recipe.likers.length}
            {isAuth &&
              (checkUserId(recipe.likers) ? (
                <button className={s.publicityDislike} onClick={() => dislikeRecipe(recipe)}>Dislike</button>
              ) : (
                <button className={s.publicityLike} onClick={() => likeRecipe(recipe)}>Like</button>
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
        <div className={s.statusText}>
          Status:
          <button className={s.publicity} onClick={onAll}>Wszystkie</button>
          <button className={s.publicity} onClick={onPublic}>Publiczne</button>
          <button className={s.publicity} onClick={onPrivate}>Prywatne</button>
        </div>
      )}
      <div>{elementRecipe}</div>
    </>
  );
};

export default RecipeList;
