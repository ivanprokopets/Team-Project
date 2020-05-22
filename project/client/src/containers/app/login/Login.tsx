import React from 'react';
import styles from './login.module.css';

const Login = () => {

  const logIn = (e: any) => {
    e.preventDefault();
    // setQuery(search)
    // setSearch('');
  }

  return(
    <div className={styles.mainContainer}>
      <form onSubmit={logIn} className="search-form">
        <input className="login" type="text"/>
        <input className="password" type="text"/>
        <button className="loginButton" type="submit">
            Log in
        </button>
      </form>
    </div>
  );
}

export default Login;
