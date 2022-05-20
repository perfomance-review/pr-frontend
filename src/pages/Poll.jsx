import React from 'react';
import { useParams } from 'react-router-dom'
import { Typography } from 'antd';
import 'antd/dist/antd.css';
import { Select, Button } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const users = [
    {id: 0, name: "Аксёнов Илларион Эдуардович"},
    {id: 1, name: "Блинов Давид Антонович"},
    {id: 2, name: "Гаврилова Жанна Николаевна"},
    {id: 3, name: "Фокина Ивона Игоревна"},
    {id: 4, name: "Воронцова Патрисия Гавриловна"},
    {id: 6, name: "Одинцов Матвей Павлович"},
    {id: 5, name: "Жуков Анатолий Анатольевич"}
];

let selectedUsers = []

function defineSelectedUsers(users){
    selectedUsers = []
    for (let user of users) {
        selectedUsers.push(user.id);
    }
}
defineSelectedUsers(users)

function redefineSelectedUsers(list){
    selectedUsers = []
    for (let user of list) {
        selectedUsers.push(Number(user));
    }
}

function handleChange(value) {
    redefineSelectedUsers(value)
}

const polls = [
    {
        "pollId":"ec5a122e-b741-415d-96c0-698119582a2c",
        "title":"poll #2",
        "deadline":"2022-05-28",
        "questionsCount":6,
        "respondentsCount":5,
        "status":"OPEN"
    },{"pollId":"a985119f-8866-4904-bc06-29ff5a7a4c4a","title":"poll #3","deadline":"2022-05-29","questionsCount":5,"respondentsCount":5,"status":"OPEN"},{"pollId":"44e5b51e-33c4-45c3-9740-02beb76cdac3","title":"poll #1","deadline":"2022-05-26","questionsCount":5,"respondentsCount":5,"status":"OPEN"}]

const Poll = () => {
    const poll = 
        {
            id: useParams().id,
            deadline: polls[1].deadline, 
            quantity: polls[1].questionsCount, 
            title: polls[1].title, 
            description: polls[1].description 
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