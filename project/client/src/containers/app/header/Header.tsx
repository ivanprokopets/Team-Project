import React from 'react';
import styles from './header-component.module.css';

const Header = () => {

  const getSearch = (e: any) => {
    e.preventDefault();
    // setQuery(search)
    // setSearch('');
  }

  return(
    <header className={styles.header}>
      <h1 className="styles.title">Generator receptur</h1>
      <form onSubmit={getSearch}
        className="search-form">
        <input className="search-bar" type="text"/>
        <button className="search-button" type="submit">
            Search
        </button>
      </form>
    </header>
  );
}

export default Header;
