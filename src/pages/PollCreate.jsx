import React, { useEffect, useState } from 'react';
import { 
  Typography, 
  Spin, 
  Space, 
  Select, 
  Button, 
  DatePicker, 
  Form, 
  Input 
} from 'antd';
import UserService from '../API/UserService';

const { Title } = Typography;
const { TextArea } = Input;

const PollCreate = () => {
  const [isPollLoading, setIsPollLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  
  useEffect(() => {
    getUsers();
  }, []);

  function handleChange(value) {
    if (value.length >= 3) {
      setSelectedUsers(value);
    }
    console.log(selectedUsers)
  }

  async function getUsers() {
    setIsPollLoading(true);
    const response = await UserService.getUsers();
    const responseUsers = 
      response.respondents.map((item) => ({
        value: item.userId,
        label: item.secondName + ' ' + item.firstName,
      }));
    setUsers(responseUsers);
    
    const responseSelectedUsers = response.respondents.map((item) => item.userId);
    //console.log(responseSelectedUsers)
    setSelectedUsers(responseSelectedUsers);
    setIsPollLoading(false);
  }

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      {isPollLoading ? (
        <Space className="data-loader">
          <Spin size="large" />
        </Space>
      ) : (
        <>
          <Title level={2} className="page-header">
            Создать опрос
          </Title>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Название опроса"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Поле обязательно для заполнения',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item 
              label="Описание"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Поле обязательно для заполнения',
                },
              ]}>
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item 
              label="Deadline"
              name="deadline"
              rules={[
                {
                  required: true,
                  message: 'Поле обязательно для заполнения',
                },
              ]}>
              <DatePicker />
            </Form.Item>

            <Form.Item 
              label="Респонденты">
            </Form.Item>
            <Select
                mode="multiple"
                size="large"
                options={users}
                value={selectedUsers}
                onChange={handleChange}
                className="user-picker"
              />

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Создать
              </Button>
            </Form.Item>
          </Form>
          
        </>
      )}
    </div>
  );
};

export { PollCreate };
