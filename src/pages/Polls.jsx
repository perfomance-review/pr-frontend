import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Card, Typography } from 'antd';
import {
    FieldTimeOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';
const { Meta } = Card;
const { Title } = Typography;
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


const Polls = () => {
    return(
        <div>
            <Title level={2} className="page-header">Доступные опросы</Title>
            <div className="polls-wrapper">
                {polls.map((poll,index) =>
                    <Link to={poll.id.toString()} key={poll.id}>
                        <Card
                            hoverable
                            className="poll-card"
                            title={poll.title}
                        >
                            <Meta description={poll.description} ></Meta>
                            <div className="poll-card-details">
                                <div>
                                    <QuestionCircleOutlined className="poll-card-detail-icon" />
                                    {poll.quantity}
                                </div>
                                <div>
                                    <FieldTimeOutlined className="poll-card-detail-icon" />
                                    {poll.deadline}
                                </div>
                            </div>
                        </Card>
                    </Link>
                )}
            </div>
        </div>
    )
}

export {Polls}