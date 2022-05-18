import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Card, Typography } from 'antd';
import {
    FieldTimeOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';
import PostService from '../API/PostService';
const { Meta } = Card;
const { Title } = Typography;

const Polls = () => {
    const [polls, setPolls] = useState([]) 

    useEffect(() => {
        getPolls()
    }, [])

    async function getPolls(){
        const response = await PostService.getUserPolls()
        setPolls(response)
    }
    
    return(
        <div>
            <Title level={2} className="page-header">Доступные опросы</Title>
            <div className="polls-wrapper">
                {polls.map((poll,index) =>
                    <Link to={index.toString()} key={index}>
                        <Card
                            hoverable
                            className="poll-card"
                            title={poll.title}
                        >
                            <Meta description={poll.respondentsCount} ></Meta>
                            <div className="poll-card-details">
                                <div>
                                    <QuestionCircleOutlined className="poll-card-detail-icon" />
                                    {poll.questionsCount}
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