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
import PollService from '../API/PollService';
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';
import { openNotification } from '../API/Notification';

const { Title } = Typography;
const { TextArea } = Input;

const PollCreate = () => {
  const [isPollLoading, setIsPollLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  useEffect(() => {
    getStartInf();
  }, []);

  function getStartInf(){
    setIsPollLoading(true);
    Promise.all([getUsers(), getQuestions()])
    .finally(() => {
      setIsPollLoading(false);
    });
  }

  async function getQuestions() {
    const response = await UserService.getQuestions();
    const responseQuestions = 
      response.questions.map((item) => ({
        value: item.questionId,
        label: item.textCompetence != undefined ? item.textQuestion + ' (' + item.textCompetence + ')' : item.textQuestion,
      }));
    setQuestions(responseQuestions);
    
    const responseSelectedQuestions = response.questions.map((item) => item.questionId);
    setSelectedQuestions(responseSelectedQuestions);
  }

  async function getUsers() {
    const response = await UserService.getUsers();
    const responseUsers = 
      response.respondents.map((item) => ({
        value: item.userId,
        label: item.secondName + ' ' + item.firstName,
      }));
    setUsers(responseUsers);
    
    const responseSelectedUsers = response.respondents.map((item) => item.userId);
    setSelectedUsers(responseSelectedUsers);
  }

  async function onFinish(values) {
    setIsPollLoading(true);
    if(values.respondentIds.length < 3){
      openNotification('Минимальное количество респондентов 3');
      setIsPollLoading(false);
      return;
    }
    if(values.deadline <= new Date()){
      openNotification('Deadline не может быть раньше завтра');
      setIsPollLoading(false);
      return;
    }
    if(values.questionIds.length > 10){
      openNotification('Количество вопросов не может превышать 10');
      setIsPollLoading(false);
      return;
    }
    values.deadline = values.deadline._d.toJSON().split("T")[0];
    
    try {
      const response = await PollService.createPoll(values);
    } catch (e) {
      setIsPollLoading(false);
      return;
    }
    openNotification('Опрос успешно создан');
    setIsPollLoading(false);
  }

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
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Название опроса"
              name="name"
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
              label="Deadline (не раньше завтра)"
              name="deadline"
              rules={[
                {
                  required: true,
                  message: 'Поле обязательно для заполнения',
                },
              ]}>
              <DatePicker locale={locale} />
            </Form.Item>

            <Form.Item 
              label="Респонденты (не менее 3-х)"
              name="respondentIds"
              rules={[
                {
                  required: true,
                  message: 'Поле обязательно для заполнения',
                },
              ]}
              initialValue={selectedUsers}>
              <Select
                mode="multiple"
                size="large"
                options={users}
                className="user-picker"
              />
            </Form.Item>

            <Form.Item 
              label="Вопросы (не более 10-ти)"
              name="questionIds"
              rules={[
                {
                  required: true,
                  message: 'Поле обязательно для заполнения',
                },
              ]}
              initialValue={selectedQuestions}>
              <Select
                mode="multiple"
                size="large"
                options={questions}
                className="user-picker"
              />
            </Form.Item>
            
            <Form.Item>
              <Button 
                type="primary"
                shape="round"
                size="large"
                className="create-button"
                htmlType="submit">
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
