import React from 'react';
import { useParams } from 'react-router-dom'
import { Typography } from 'antd';
import 'antd/dist/antd.css';
import { Select, Button } from 'antd';


const { Title } = Typography;
const { Option } = Select;

const users = [
    {id: 0, name: "Иванов Иван Иванович"},
    {id: 1, name: "Петров Петр Петрович"},
    {id: 2, name: "Николаев Николай Николаевич"},
    {id: 3, name: "Александров Александр Александрович"},
    {id: 4, name: "Васечкин Василий Васильевич"},
    {id: 5, name: "Жуков Анатолий Анатольевич"},
    {id: 6, name: "Собакевич Антон Антонович"}
];

let selectedUsers = []

function defineSelectedUsers(users){
    selectedUsers = []
    for (let user of users) {
        selectedUsers.push(user.id);
    }
    console.log(selectedUsers)
}
defineSelectedUsers(users)

function redefineSelectedUsers(list){
    selectedUsers = []
    for (let user of list) {
        selectedUsers.push(Number(user));
    }
    console.log(selectedUsers)
}

function handleChange(value) {
    redefineSelectedUsers(value)
}

const Poll = () => {
    const poll = 
        {
            id: useParams().id,
            deadline: '03.05.2022', 
            quantity: 8,
            title: 'Poll' + useParams().id, 
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' 
        }
    return(
        <div>
            <Title level={2} className="page-header">Опрос "{poll.title}"</Title>
            <p className='poll-description'><b>Подробности:</b> {poll.description}</p>
            <p className='poll-description'><b>Срок выполнения:</b> {poll.deadline}</p>
            <p className='poll-description'><b>Количество вопросов:</b> {poll.quantity}</p>
            <p className='poll-description'><b>Оцениваемые коллеги</b></p>
            <Select
                mode="multiple"
                size='large'
                placeholder="Выберите коллег"
                defaultValue={users.map((user,index) =>
                    <Option key={user.id}>{user.name}</Option>
                )}
                onChange={handleChange}
                className="user-picker"
            >
                {users.map((user,index) =>
                    <Option key={user.id}>{user.name}</Option>
                )}
            </Select>

            <Button type="primary" shape="round" size='large' className='start-button'>
                Начать
            </Button>
        </div>
    )
}

export {Poll}