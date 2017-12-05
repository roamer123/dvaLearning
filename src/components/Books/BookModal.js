import React, {
  Component
} from 'react';
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
} from 'antd';
import moment from 'moment';

const FormItem = Form.Item;

class BookEditModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.preventDefault();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const {
      onOk
    } = this.props;

    const {
      idLoanBook,
      idBookLog,
      barcode,
      status,
    } = this.props.record;

    this.props.form.validateFields((err, values) => {
      values.idLoanBook = idLoanBook;
      values.idBookLog = idBookLog;
      values.barcode = barcode;
      values.status = values.status ? values.status : '空闲';

      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const {
      children
    } = this.props;
    const {
      getFieldDecorator
    } = this.props.form;
    const {
      name,
      author,
      publish,
      type,
      classType,
      location,
      owner,
      barcode,
      abstracts,
      price,
      borrower,
      planReturnDate,
      status,
    } = this.props.record;

    const editType = ['空闲', '借用'].indexOf(status) != -1 ? 'edit' : 'add';
    const isDisable = editType == 'edit' ? true : false;
    const changeStatus = status == '空闲' ? '借用' : '空闲';
    const dateFormat = 'YYYY-MM-DD';
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title={editType + " Book"}
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="书名"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name,
                })(<Input  disabled={isDisable}/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="作者"
            >
              {
                getFieldDecorator('author', {
                  initialValue: author,
                })(<Input disabled={isDisable} />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="出版社"
            >
              {
                getFieldDecorator('publish', {
                  initialValue: publish,
                })(<Input disabled={isDisable} />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="类别"
            >
              {
                getFieldDecorator('type', {
                  rules: [
              { required: true, message: '请输入类别，!' },
            ],
                  initialValue: type,
                })(<Select  disabled={isDisable} style={{ width: 120 }}>
      <Select.Option value="paper">实物书</Select.Option>
      <Select.Option value="elec">电子书</Select.Option>
    </Select>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="分类"
            >
              {
                getFieldDecorator('classType', {
                  rules: [
              { required: true, message: '请输入分类，!' },
            ],
                  initialValue: classType,
                })(<Select   disabled={isDisable} style={{ width: 120 }}>
      <Select.Option value="code">编程</Select.Option>
      <Select.Option value="db">数据库</Select.Option>
      <Select.Option value="art">文学</Select.Option>
      <Select.Option value="think">思维</Select.Option>
      <Select.Option value="project">项目管理</Select.Option>
    </Select>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="书架位置"
            >
              {
                getFieldDecorator('location', {
                  initialValue: location,
                })(<Input disabled={isDisable}/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="所有者"
            >
              {
                getFieldDecorator('owner', {
                  initialValue: owner,
                })(<Input disabled={isDisable}/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="摘要"
            >
              {
                getFieldDecorator('abstracts', {
                  initialValue: abstracts,
                })(<Input disabled={isDisable}/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="价格"
            >
              {
                getFieldDecorator('price', {
                  initialValue: price,
                })(<Input type="number" disabled={isDisable}/>)
              }
            </FormItem>
            { status == '空闲' &&
            <FormItem
              {...formItemLayout}
              label="借阅者"
            >
              {
                getFieldDecorator('borrower', {
                  rules: [
              { required: true, message: '请填写借阅人信息!' },
            ],
                  initialValue: borrower,
                })(<Input />)
              }
            </FormItem>}
            { status == '空闲' &&
            <FormItem
              {...formItemLayout}
              label="预计归还时间"
            >
              {
                getFieldDecorator('planReturnDate', {
                  rules: [
              { required: true, message: '请输入日期!' },
            ],
                  initialValue: planReturnDate,
})(<Input placeholder="时间格式为YYYY-MM-DD"/>)
              }
            </FormItem>}
             { status == '空闲'&&
            <FormItem
              {...formItemLayout}
              label="状态"
            >
              {
                getFieldDecorator('status', {
                  initialValue: changeStatus,
                })(<Input disabled={isDisable}/>)
              }
            </FormItem>}
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(BookEditModal);