import React from 'react';
import {
  connect
} from 'dva';
import styles from './IndexPage.css';
import MainLayout from '../components/MainLayout/MainLayout.js';

function IndexPage({
  location
}) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to library!</h1>
        <div className={styles.welcome}>
        </div>
      </div>
    </MainLayout>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);