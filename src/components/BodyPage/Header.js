import React from 'react'
import '../BodyPage/Header.scss';
import { Divider } from 'antd';

const Header = props => {
    return (
        <>
            <div className="container segment" align="center">
                <h1>{props.title}</h1>
                <Divider className="hr-header" orientation="left"></Divider>
            </div>            
        </>
    )
}

export default Header
