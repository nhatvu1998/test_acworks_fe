import React, {useState, useEffect} from 'react';
import { Row, Table, Tag, Space, DatePicker } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import moment from 'moment';
import apis from '../../apis/index'

export const PointType = {
    Minus: 0,
    Plus: 1,
};
const Detail = () => {
    const [data, setData] = useState([])
    const [startDate, setStartDate] = useState(moment(new Date()).startOf('month').format());
    const [endDate, setEndDate] = useState(moment(new Date()).endOf('month').format());
    
    console.log(data)
    useEffect(() => {
        console.log(startDate)
        console.log(endDate)
        apis.get('/userCriteria/detail', {
            params: {
                startDate: new Date(startDate).toISOString(),
                endDate : new Date(endDate).toISOString(),
            }
        }).then(res => {
            setData(res.data[0]?.userCriterias.map((x, key) => {
                return {
                    ...x,
                    stt: key + 1,
                }
            }))
        })
    }, [startDate, endDate])

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Criteria Name',
            dataIndex: 'criterias',
            key: 'criterias',
            render: (criterias) => (
                <div>
                    <span>{criterias.name}</span>
                </div>
            ),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => new Date(a.date) - new Date(b.date),
            render: (text) => (
                <div>
                    <span>{moment(text).format("HH:mm DD/MM/YYYY")}</span>
                </div>
            ),
        },
        {
            title: 'Point',
            dataIndex: 'criterias',
            key: 'criterias',
            render: (criterias) => (
                <div>
                    {
                        (criterias.type === PointType.Plus) ? (
                            <span style={{ color: '#3f8600' }}><ArrowUpOutlined /> {criterias.point}</span>
                        ) : (
                            <span style={{ color: '#cf1322' }}><ArrowDownOutlined /> {criterias.point}</span>
                        )
                    }
                </div>
            ),
        }
    ];

    const onDateChange = (date) => {
        setStartDate(moment(date).startOf('month').format())
        setEndDate(moment(date).endOf('month').format())
    }
    return (
        <div>
            <Row>
                <DatePicker onChange={onDateChange} picker="month" defaultValue={moment(new Date())} />
            </Row>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default Detail;
