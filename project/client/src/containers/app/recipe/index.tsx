import React, { FC } from 'react';
import { Recipe } from '../../../types/types';
import { required } from '../../../utils/validation';
import s from './Recipe.module.css';
import { NavLink } from 'react-router-dom';

interface PropsType {
  recipes: Array<Recipe>;
  togglePublic: (isPublic: string) => void;
  requestGetRecipes: () => void;
  isAuth: boolean;
  userId: string;
  recipe: Recipe;
  requestGetRecipe: (recipeId: string) => void;
  requestUpdateRecipe: (recipe: Recipe) => void;
}

const RecipeList: FC<PropsType> = ({
  recipes,
  recipe,
  togglePublic,
  requestGetRecipes,
  requestGetRecipe,
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
    requestGetRecipe(recipe._id);
  };
  const dislikeRecipe = (recipe: any) => {
    const likers = recipe.likers.filter((e: string) => e != userId);
    requestUpdateRecipe({
      id: recipe._id,
      ...recipe,
      likers,
    });
    requestGetRecipe(recipe._id);
  };

  return (
    <div className={s.recipeOneCard} style={{ margin: '30px' }}>
      <img src={require('../../../images/food_default.png')} style={{ width: 400, height: 400 }} />
      <div className={s.recipeDescriptions}>
        <div className={s.recipeName}>
          {recipe.name}
        </div>
        <div>
          <b>Ingredienty:</b>{' '}
          {recipe.ingredients.map((ingredient) => (
            <span>{ingredient}, </span>
          ))}
        </div>
        <div>
          <b>Czas Przygotowania: </b>{recipe.timeForPreparing}
        </div>
        <div>
          <b>Przepis: </b>{recipe.description}
        </div>
        {recipe.isPublic && (
          <>
            <b>Polubienia</b>:{recipe.likers.length}
            {isAuth &&
              (checkUserId(recipe.likers) ? (
                <button onClick={() => dislikeRecipe(recipe)}>dislike</button>
              ) : (
                <button onClick={() => likeRecipe(recipe)}>like</button>
              ))}
          </>
        )}
        <div>
          <NavLink className={s.backToListButton} to="/">
            <button className={s.buttonRegister}>
              Wróć do listy przepisów
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default RecipeList;
