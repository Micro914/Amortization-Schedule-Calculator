import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import {
    PercentageOutlined,
} from '@ant-design/icons';
import { calculateResults } from "../../logic/QuotingLogic"
// import { PDFViewer } from '@react-pdf/renderer'
// import MyDocument from '../../components/PDFReact/PDFReact';
import { onlyNumbers,onlyNumbers2Digits } from '../../logic/Regex';
import "./AmortizationStyle.scss"
import moment from 'moment';
import Schedule from './Schedule';
import Swal from 'sweetalert2'


const Amortization = () => {
    const [form] = Form.useForm();
    const layout = "horizontal"
    const { Option } = Select;
    const dateFormat = 'MM/DD/YYYY';

    let [dataArray, setDataArray] = useState({
        date: "",
        loanAmount: "",
        paymentMethod: "",
        loanTerm: "",
        interestRate: "",
    });

    let [results, setResults] = useState({
        monthlyPayment: '',
        totalPayment: '',
        totalInterest: '',
        isResult: false,
    });

    let [hideLoan, setHideLoan] = useState(false)
    let [hideInterest, setHideInterest] = useState(false)

    // const Toogle = () => {
    //     setHide(!hide)
    // }
    const onFinish = (values) => {
        if (dataArray.loanAmount.match(onlyNumbers()) && dataArray.interestRate.match(onlyNumbers2Digits())) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Data send correctly',
            })
            let result = calculateResults(dataArray)
            setResults(result)
            setHideLoan(hideLoan=false)
            setHideInterest(hideInterest=false)
            console.log(dataArray, "Se transfirieron datos")
            
        }
        else {
            if (!dataArray.loanAmount.match(onlyNumbers())) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Input only positive numeric values bigger than 0',
                })
                setHideLoan(hideLoan=true)
            }
            else if (!dataArray.interestRate.match(onlyNumbers())||dataArray.interestRate>99){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Input only positive numeric values bigger than 0',
                })
                setHideInterest(hideInterest=true)
            }

        }
    };
    const handleInputChange = (event, name) => {
            setDataArray(() => ({
                ...dataArray = { // object that we want to update
                    ...dataArray, // keep all other key-value pairs
                    [name]: event.target.value  // update the value of specific key
                }
            }))
            setResults(results=false)
            return;
    }
    const handleSelectChange = (event, name) => {
        if (name==='date') {
            setDataArray(() => ({
                ...dataArray = {
                    ...dataArray,
                    [name]: moment(event).format('YYYY-MM-DD')
                }
            }))
            setResults(results=false)
        }
        else{
            setDataArray(() => ({
                ...dataArray = {
                    ...dataArray,
                    [name]: event
                }
            }))
            setResults(results=false)
        }
        console.log(dataArray)
        // console.log(dataArray.date, moment(dataArray.date).format('DD/MM/YYYY') )
        return;
    }

    const onFinishFailed = (errorInfo) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: "Can not send empty values",
        })
        setHideInterest(hideInterest=false)
    };

    /* eslint-disable no-template-curly-in-string */

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid e-mail!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
    return (
        <>
            <Form
                layout={layout}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                validateMessages={validateMessages}
                style={{ marginTop: '12px' }}
                wrapperCol={{
                    span: 8,
                }}
                labelCol={{
                    span: 8,
                }}
            >
                <Form.Item name={['table', 'date']} label="Date" rules={[{ required: true }]}>
                    <DatePicker onSelect={(event, name) => handleSelectChange(event, name = 'date')} placeholder="MM-DD-YYYY" style={{ width: '100%' }} format={dateFormat} />
                </Form.Item>
                <Form.Item name={['table', 'loanAmount']} label="Mortgage amount:" rules={[{ required: true }]}>
                    <Input maxLength={9} onChange={(event, name) => handleInputChange(event, name = 'loanAmount')} placeholder="Escriba el monto total" />
                </Form.Item>
                {hideLoan?<span className="no-valid"></span>:""}
                <Form.Item name={['table', 'paymentMethod']} label="Frequency :" rules={[{ required: true }]}>
                    <Select onSelect={(event, name) => handleSelectChange(event, name = "paymentMethod")} placeholder="Select the frequency payment">
                        <Option value="12">Monthly</Option>
                        <Option value="4">Quarterly</Option>
                        <Option value="2">Biannual</Option>
                        <Option value="1">Yearly</Option>
                    </Select>
                </Form.Item>
                <Form.Item name={['table', 'loanTerm']} label="Mortgage term in years" rules={[{ required: true }]}>
                    <Select onSelect={(event, name) => handleSelectChange(event, name = 'loanTerm')} placeholder="Select a year">
                        <Option value="1">1 Year</Option>
                        <Option value="2">2 Years</Option>
                        <Option value="3">3 Years</Option>
                        <Option value="4">4 Years</Option>
                        <Option value="5">5 Years</Option>
                    </Select>
                </Form.Item>
                <Form.Item name={['table', 'interestRate']} label="Interest rate per year" rules={[{ required: true }]}>
                    <Input maxLength={2} suffix={<PercentageOutlined />} onChange={(event, name) => handleInputChange(event, name = 'interestRate')} placeholder="Write the Interest rate per year" />
                </Form.Item>
                {(hideInterest)||dataArray.interestRate>99?<span className="no-valid"></span>:""}
                <Form.Item>
                    <Button type="primary" htmlType="submit">Calculate</Button>
                </Form.Item>
            </Form>
            {/* <PDFDownloadLink document={<MyDocument table={number} />} fileName="somename.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <Button type="primary" htmlType="submit">Previsualizar Tabla</Button>)}
            </PDFDownloadLink> */}

            {
                results.isResult ? (
                    <Schedule inputs={dataArray} result={results}/>
                ) : (
                    <span>{""}</span>
                )
            }


            {/* {hide ? <Button type="primary" onClick={Toogle} >Esconder Tabla</Button> : <Button type="primary" onClick={Toogle} >Previsualizar Tabla</Button>}

            {(hide) ? <PDFViewer style={{ width: '100%', height: '600px' }}>
                <MyDocument table={dataArray} />
            </PDFViewer> : ""} */}

        </>
    )
}

export default Amortization
