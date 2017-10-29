import React from 'react';
import logo from './images/logo.png';
import styles from './main.scss';

export const Main = () => (
  <div className={styles.container}>
    <h1>SSR React App</h1>
    <img src={logo} />
  </div>
);

export default Main;
