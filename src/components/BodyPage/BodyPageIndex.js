import React from 'react'
import { Divider, Col } from 'antd';
import './BodyPageStyle.scss'

const BodyPage = (props) => {
    return (
        <div className="segment mt-2">
            <Col><h1>{props.title}</h1></Col>
            <Divider style={{ margin: 0, padding: 0 }} orientation="left"></Divider>
            {props.component}
        </div>
    )
}

export default BodyPage
