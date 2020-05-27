import React, {FC, useState } from 'react';
import styles from './login.module.css';

interface PropsType{
  requestSignIn:(email:string,password:string)=>void;
}
const Login: FC<PropsType> = ({requestSignIn}) => {

  const logIn = () => {
    console.log(email);
    console.log(password);
    requestSignIn(email,password)
  }
  const [email,setEmail]=useState('testRecipe');
  const [password,setPassword]=useState('123123');
  return(
    <div className={styles.mainContainer}>
      <div  className="search-form">
        <input className="login" type="text" value={email} onChange={(event)=>setEmail(event.target.value)}/>
        <input className="password" type="text"  value={password} onChange={(event)=>setPassword(event.target.value)}/>  
      </div>
      <button className="loginButton" onClick={logIn}>
            Log in
        </button>
    </div>
  );
}

export default Login;
