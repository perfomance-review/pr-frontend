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

const polls = [
    {
        id: 0,
        deadline: '03.05.2022', 
        quantity: 8,
        title: 'Оценка достижений', 
        description: 'Оцениваются персональные достижения коллег, согласно ранее установленным KPI.' 
    },
    {
        id: 1,
        deadline: '04.05.2022', 
        quantity: 7,
        title: 'Итоги спринта', 
        description: 'Плановая оценка работы Agile-команды по итогам завершенного спринта.' 
    },
    {
        id: 2,
        deadline: '06.05.2022', 
        quantity: 5,
        title: 'Персональный запрос мнения', 
        description: 'У вас запрошено персональное мнение по «микроклимату» в команде.' 
    },
    {
        id: 3,
        deadline: '08.05.2022', 
        quantity: 3,
        title: 'По результатам испытательного срока', 
        description: 'У вас запрошено мнение о результатах прохождения кандидатами испытательного срока.' 
    },
    {
        id: 4,
        deadline: '05.05.2022', 
        quantity: 6,
        title: 'Квартальная оценка', 
        description: 'Performance review по итогам квартала.' 
    },
    {
        id: 5,
        deadline: '07.05.2022', 
        quantity: 4,
        title: 'Оценка вовлеченности', 
        description: 'Оценка состояния вовлеченности по отделу.' 
    },
]

const Poll = () => {
    const poll = 
        {
            id: useParams().id,
            deadline: polls[useParams().id].deadline, 
            quantity: polls[useParams().id].quantity, 
            title: polls[useParams().id].title, 
            description: polls[useParams().id].description 
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