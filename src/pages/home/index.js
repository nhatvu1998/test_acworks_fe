import React, { useState, useEffect } from "react";
import { Row, Table, DatePicker } from "antd";
import moment from "moment";
import apis from "../../apis/index";

const Home = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(
    moment(new Date()).startOf("month").format()
  );
  const [endDate, setEndDate] = useState(
    moment(new Date()).endOf("month").format()
  );
  useEffect(() => {
    apis
      .get("/userCriteria", {
        params: {
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
        },
      })
      .then((res) => {
        setData(
          res.data.map((x, key) => {
            return {
              ...x,
              stt: key + 1,
              key,
            };
          })
        );
      });
  }, [startDate, endDate]);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Full name",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Point",
      dataIndex: "totalPoint",
      key: "totalPoint",
      sorter: (a, b) => a.totalPoint - b.totalPoint,
      render: (totalPoint) => {
        return (
          (totalPoint > 0) ? (
            <span style={{ color: '#3f8600' }}>{totalPoint}</span>
          ) : (
            <span style={{ color: '#cf1322' }}>{totalPoint}</span>
          )
        )
      }
    },
  ];

  const onDateChange = (date) => {
    setStartDate(moment(date).startOf("month").format());
    setEndDate(moment(date).endOf("month").format());
  };
  return (
    <div>
      <Row>
        <DatePicker
          onChange={onDateChange}
          picker="month"
          defaultValue={moment(new Date())}
        />
      </Row>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Home;
