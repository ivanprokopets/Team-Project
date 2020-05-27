import React,{useState} from 'react';
import styles from './header-component.module.css';

const Header = ({requestFilterRecipe}:{requestFilterRecipe:(ingredients:Array<string>)=>void}) => {
  const [searchText,setSearchText]=useState('');

  const onSearchSubmit = (e: any) => {
    requestFilterRecipe(searchText.split(','));
  }
 
  return(
    <header className={styles.header}>
      <h1 className="styles.title">Generator receptur</h1>
      <div className="search-form">
        <input className="login" type="text" value={searchText} onChange={(event)=>setSearchText(event.target.value)}/>
      </div>
      <button className="search-button" onClick={onSearchSubmit}>
      Search
        </button>
  
    </header>
  );
}

export default Header;
