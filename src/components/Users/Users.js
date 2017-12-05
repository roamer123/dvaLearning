import React from 'react';
import {
  connect
} from 'dva';
import {
  Table,
  Pagination,
  Popconfirm,
  Button
} from 'antd';
import styles from './Users.css';
import {
  PAGE_SIZE
} from '../../constants';
import {
  routerRedux
} from 'dva/router';
import UserModal from './UserModal';

function Users({
  dispatch,
  list: dataSource,
  total,
  page: current
}) {
  function createHandle(values) {
    dispatch({
      type: 'users/create',
      payload: values,
    });
  }

  function deleteHandler(id) {
    dispatch({
      type: 'users/remove',
      payload: id,
    });
  }

  function pageChangeHandle(page) {
    dispatch(routerRedux.push({
      pathname: '/users',
      query: {
        page
      }
    }));
  }

  function eidtHandle(id, values) {
    dispatch({
      type: 'users/patch',
      payload: {
        id,
        values
      },
    });
  }

  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => <a href="">{text}</a>,
  }, {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  }, {
    title: 'Website',
    dataIndex: 'website',
    key: 'website',
  }, {
    title: 'Operation',
    key: 'operation',
    render: (text, record) => (
      <span className={styles.operation}>
          <UserModal record={record} onOk={eidtHandle.bind(null, record.id)}>
<a>Edit</a>
          </UserModal>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">Delete</a>
          </Popconfirm>
        </span>
    ),
  }, ];

  return (
    <div className={styles.normal}>
      <div>
       <div className={styles.create}>
          <UserModal record={{}} onOk={createHandle}>
            <Button type="primary">Create User</Button>
          </UserModal>
       </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandle}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const {
    list,
    total,
    page
  } = state.users;
  return {
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Users);