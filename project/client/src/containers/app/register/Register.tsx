import React, {FC, useState } from 'react';
import styles from './register.module.css';

interface PropsType{
  requestRegister:(name:string,email:string,password:string)=>void;
}
const Register: FC<PropsType> = ({requestRegister}) => {

  const register = () => {
    requestRegister(name,email,password)
  }
  const [name,setName]=useState('test');
  const [email,setEmail]=useState('testRecipe');
  const [password,setPassword]=useState('123123');
  return(
    <div className={styles.mainContainer}>
      <div className="search-form">
      <input className="name" type="text" value={name} onChange={(event)=>setName(event.target.value)}/>
        <input className="email" type="text" value={email} onChange={(event)=>setEmail(event.target.value)}/>
        <input className="password" type="text"  value={password} onChange={(event)=>setPassword(event.target.value)}/>  
      </div>
      <button className="loginButton" onClick={register}>
            Register
        </button>
    </div>
  );
}

export default Register;
