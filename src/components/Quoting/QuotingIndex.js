import React from 'react'
import BodyPage from '../BodyPage/BodyPageIndex';
import Header from '../BodyPage/Header'
import Amortization from './Amortization';

const Quoting = () => {
    return (
        <div>
            <Header title={"AMORTIZATION SCHEDULE CALCULATOR"}/>
            <BodyPage title={"INPUT THE CORRECT DATA"} component={<Amortization />}/>
        </div>
    )
}

export default Quoting
