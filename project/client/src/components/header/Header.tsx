import React, { useState } from 'react';
import styles from './header-component.module.css';
import { NavLink } from 'react-router-dom';

const Header = ({
  requestFilterRecipe,
  withSearch,
  isAuth,
}: {
  requestFilterRecipe: (ingredients: Array<string>) => void;
  withSearch?: boolean;
  isAuth: boolean;
}) => {
  const [searchText, setSearchText] = useState('');

  const onSearchSubmit = (e: any) => {
    requestFilterRecipe(searchText.split(','));
  };

  return (
    <header className={styles.header}>
      <h1 style={{ marginLeft: '30px', marginRight: '30px' }}>Generator receptur</h1>
      <div className="search-form">
        {withSearch && (
          <>
            <input
              className="login"
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
            <button className="search-button" onClick={onSearchSubmit}>
              Search
            </button>
          </>
        )}

        {isAuth ? (
          <>
            {withSearch ? (
              <NavLink style={{ marginLeft: '30px' }} to="/profile">
                profile
              </NavLink>
            ) : (
              <NavLink style={{ marginLeft: '30px' }} to="/">
                recipes
              </NavLink>
            )}

            <NavLink
              onClick={() => {
                localStorage.removeItem('accessToken');
              }}
              style={{ marginLeft: '30px', marginRight: '30px' }}
              to="/login">
              logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink style={{ marginLeft: '30px' }} to="/login">
              login
            </NavLink>
            <NavLink style={{ marginLeft: '30px', marginRight: '30px' }} to="/register">
              register
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
