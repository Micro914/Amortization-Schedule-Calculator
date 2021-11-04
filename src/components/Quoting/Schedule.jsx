import React from 'react'
import { Table } from 'antd';
import { 
    addMonth, 
    getYear, 
    interestMonthly, 
    newPrincipal 
} from "../../logic/QuotingLogic"

const Schedule = ({ inputs, result }) => {
    let totalPayments = (loanTerm, paymentMethod) =>  {
        let years= loanTerm
        let term = paymentMethod
        return years * term 
    }

    const newBalance = (loanAmount, nf) => {
        let userAmount =  Number(loanAmount).toFixed(2);
        return "$"+nf.format(userAmount);
    }

    const columns = [
        {
            title: 'Payment No.',
            key: 'paymentNumber',
            dataIndex: 'paymentNumber',
            responsive: ['md'],
        },
        {
            title: 'Balance',
            dataIndex: 'capital',
            key: 'capital',
        },
        {
            title: 'Principal',
            dataIndex: 'capitalPayment',
            key: 'capitalPayment',
            responsive: ['md'],
        },
        {
            title: 'P. Int',
            key: 'interest',
            dataIndex: 'interest',
            responsive: ['md'],
        },
        {
            title: 'Payment',
            key: 'nextPayment',
            dataIndex: 'nextPayment',
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            responsive: ['md'],
            //   render: text => <a>{text}</a>,
        },
        {
            title: 'Date',
            key: 'date',
            dataIndex: 'date',
            responsive: ['sm'],
        },
    ];

    const data = [];
    let nf = new Intl.NumberFormat('en-US');
    let balance=Number(inputs.loanAmount)
    let date = inputs.date
    let years = inputs.loanTerm
    let terms = Number(inputs.paymentMethod)
    let period = 12/terms
    let monthlyRate=inputs.interestRate/100.00/terms;
    let monthlyPayment = result.monthlyPayment
    let interest = 0
    let monthlyPrincipal= 0
    for (let i = 0; i < totalPayments(years, terms); i++) {
        interest=balance*monthlyRate
        monthlyPrincipal=monthlyPayment-interest
        data.push({
            key: i,
            year: getYear(i, terms),
            capital: newBalance(balance, nf),
            capitalPayment: newPrincipal(monthlyRate, balance, monthlyPayment, nf),
            interest: interestMonthly(monthlyRate, balance, nf),
            nextPayment: "$"+nf.format(monthlyPayment.toFixed(2)),
            paymentNumber: i + 1,
            date: addMonth(date, i, period)
            
        });
        balance= balance-monthlyPrincipal
    }
    return (
        <>
            <Table pagination={false} columns={columns} dataSource={data} size="small" bordered={true}  />
        </>
    )
}

export default Schedule
