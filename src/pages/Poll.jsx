import React from 'react';
import { useParams } from 'react-router-dom'
import { Typography } from 'antd';
import 'antd/dist/antd.css';
import { Select, Button } from 'antd';


const { Title } = Typography;
const { Option } = Select;

const children = [<Option key="1">Иванов Иван Иванович</Option>,
<Option key="2">Петров Петр Петрович</Option>,
<Option key="3">Николаев Николай Николаевич</Option>,
<Option key="4">Александров Александр Александрович</Option>,
<Option key="5">Васечкин Василий Васильевич</Option>,
<Option key="6">Жуков Анатолий Анатольевич</Option>,
<Option key="7">Собакевич Антон Антонович</Option>,];

function handleChange(value) {
  console.log(`Selected: ${value}`);
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
                placeholder="ВЫберите коллег"
                defaultValue={[<Option key="1">Иванов Иван Иванович</Option>]}
                onChange={handleChange}
                style={{ width: '100%' }}
            >
                {children}
            </Select>

            <Button type="primary" shape="round" size='large' className='start-button'>
                Начать
            </Button>
        </div>
    )
}

export {Poll}