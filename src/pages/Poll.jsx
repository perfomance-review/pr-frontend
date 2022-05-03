import React from 'react';
import { useParams } from 'react-router-dom'
import { Typography } from 'antd';
const { Title } = Typography;

const Poll = () => {
    return(
        <div>
            <Title level={2}>Poll {useParams().id}</Title>
        </div>
    )
}

export {Poll}