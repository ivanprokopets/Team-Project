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
    setSearchArray([...searchArray, name]);
    console.log(products);
    const productsFilter = products.filter((e: any) => e.name != name);
    console.log(productsFilter);
    setProducts(productsFilter);
    setProductSearch('');
  };
  const removeProduct = (product: string) => {
    const products = searchArray.filter((e: string) => e != product);

    setSearchArray(products);
  };
  return (
    <header className={styles.header}>
      <h1 style={{ marginLeft: '30px', marginRight: '30px' }}>Generator for pidarow</h1>
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
              value={productSearch}
              onChange={(event) => setProductSearch(event.target.value)}
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
              to="/">
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
