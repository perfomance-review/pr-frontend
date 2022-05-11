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
        title: 'Poll0', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' 
    },
    {
        id: 1,
        deadline: '03.05.2022', 
        quantity: 7,
        title: 'Poll1', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' 
    },
    {
        id: 2,
        deadline: '03.05.2022', 
        quantity: 6,
        title: 'Poll2', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' 
    },
    {
        id: 3,
        deadline: '03.05.2022', 
        quantity: 5,
        title: 'Poll3', 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' 
    }
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