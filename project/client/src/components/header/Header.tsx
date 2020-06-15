import React, { useState, useEffect } from 'react';
import styles from './header-component.module.css';
import { NavLink } from 'react-router-dom';
import { Product } from '../../types/types';

const Header = ({
  requestGetRecipes,
  withSearch,
  isAuth,
  productSearch,
  setProductSearch,
  setProducts,
  requestFilterProducts,
  products,
}: {
  requestGetRecipes: (ingredients?: Array<string>) => void;
  requestFilterProducts: () => void;
  setProductSearch: (product: string) => void;
  setProducts: (products: Array<Product>) => void;
  withSearch?: boolean;
  isAuth: boolean;
  productSearch: string;
  products: any;
}) => {
  useEffect(() => {
    requestFilterProducts();
  }, [productSearch]);
  const [searchArray, setSearchArray] = useState(['']);

  const onSearchSubmit = (e: any) => {
    requestGetRecipes(searchArray.slice(1));
  };
  const selectProduct = (name: string) => {
    if(!searchArray.includes(name)) {
      setSearchArray([...searchArray, name]);
    }
    setProductSearch('');
  };
  const removeProduct = (product: string) => {
    const products = searchArray.filter((e: string) => e != product);

    setSearchArray(products);
  };
  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.headerHomeButton}>
        <h1 style={{ marginLeft: '30px', marginRight: '30px' }}>Generator przepisów</h1>
      </NavLink>
      <div style={{ flexDirection: 'row', display: 'inlineBlock' }}>
        {products.map((product: any) => (
          <span
            onClick={() => {
              selectProduct(product.name);
            }}>
            {product.name + ' '}
          </span>
        ))}
      </div>
      <div className="search-form">
        {withSearch && (
          <>
            {searchArray.length > 0 &&
              searchArray.map((product: string) => {
                return product ? (
                  <span className={styles.product}>
                    {product}
                    <span
                      style={{ color: 'red' }}
                      onClick={() => {
                        removeProduct(product);
                      }}>
                      X
                    </span>
                  </span>
                ) : (
                  <></>
                );
              })}

            <input
              className={styles.searchInput}
              type="text"
              placeholder="Wyszukaj po produktach.."
              value={productSearch}
              onChange={(event) => setProductSearch(event.target.value)}
            />
            <button className={styles.searchButton} onClick={onSearchSubmit}>
              Search
            </button>
          </>
        )}

        {isAuth ? (
          <>
            {withSearch ? (
              <NavLink className={styles.headerButton} style={{ marginLeft: '30px' }} to="/profile">
                Profile
              </NavLink>
            ) : (
              <NavLink className={styles.headerButton} style={{ marginLeft: '30px' }} to="/">
                Recipes
              </NavLink>
            )}

            <NavLink
              className={styles.headerButton}
              onClick={() => {
                localStorage.removeItem('accessToken');
              }}
              style={{ marginLeft: '30px', marginRight: '30px' }}
              to="/">
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className={styles.headerButton} style={{ marginLeft: '30px' }} to="/login">
              Login
            </NavLink>
            <NavLink className={styles.headerButton} style={{ marginLeft: '30px', marginRight: '30px' }} to="/register">
              Register
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
