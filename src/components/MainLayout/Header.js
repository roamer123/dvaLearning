import React from 'react';
import {
	Menu,
	Icon
} from 'antd';
import {
	Link
} from 'dva/router';

function Header({
	location
}) {
	return (
		<Menu 
			selectedKeys={[location.pathname]}
			mode="horizontal"
			theme="dark"
		>
			<Menu.Item key="/">
	        	<Link to="/"><Icon type="home" />Home</Link>
	        </Menu.Item>
	        <Menu.Item key="/books">
	         	<Link to="/books"><Icon type="book" />books</Link>
	        </Menu.Item>
      	</Menu>
	);
}

export default Header;