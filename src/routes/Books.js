import React from 'react';
import {
	connect
} from 'dva';
import styles from './Books.css';
import BookComponent from '../components/Books/Books';
import MainLayout from '../components/MainLayout/MainLayout';

function Books() {
	return (
		<MainLayout location={location}>
       <div className={styles.normal}>
           <BookComponent />
        </div>
    </MainLayout>
	);
}

export default connect()(Books);