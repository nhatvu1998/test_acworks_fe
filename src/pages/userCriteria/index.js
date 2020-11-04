import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  DatePicker,
  Row,
  Table,
  Input,
  Modal,
  Form,
  Radio,
  Select,
  Card,
  notification,
} from "antd";
import apis from "../../apis/index";
import moment from "moment";
const { Option } = Select;

const UserCriteria = () => {
  const [userList, setUserList] = useState([]);
  const [criteriaList, setCriteriaList] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    apis.get(`users`).then((res) => {
      setUserList(res.data);
    });
  }, []);

  useEffect(() => {
    apis.get(`criterias`).then((res) => {
      setCriteriaList(res.data);
    });
  }, []);

  const renderUserList = () => {
    if (userList) {
      return userList.map((x) => {
        return <Option value={x.id}>{x.username}</Option>;
      });
    }
  };

  const renderCriteriaList = () => {
    if (criteriaList) {
      return criteriaList.map((x) => {
        return <Option value={x.id}>{x.name}</Option>;
      });
    }
  };

  const onFinish = (values) => {
    const { userId, criteriaIds, date } = values;
    const params = {
      userId,
      criteriaIds,
      date: new Date(moment(date).valueOf()).toISOString(),
    };
    console.log(params);
    apis
      .post(`userCriteria`, values)
      .then((res) => {
        if (res?.status === 201) {
          notification["success"]({
            message: "Create user criteria successfully",
            duration: 1,
          });
        } else {
          notification["error"]({
            message: "Create user criteria fail",
            duration: 1,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        notification["error"]({
          message: err.message,
          duration: 1,
        });
      });
  };

  return (
    <div>
      <Row justify="center">
        <Col span={8}>
          <Card>
            <Form
              form={form}
              layout="vertical"
              name="form_in_modal"
              onFinish={onFinish}
              initialValues={{ date: moment(new Date()) }}
            >
              <Form.Item
                label="User"
                name="userId"
                rules={[
                  { required: true, message: "Please input criteria name!" },
                ]}
              >
                <Select placeholder="Select a user">{renderUserList()}</Select>
              </Form.Item>
              <Form.Item
                label="Criterias"
                name="criteriaIds"
                rules={[{ required: true, message: "Please input criterias!" }]}
              >
                <Select mode="multiple" placeholder="Please select">
                  {renderCriteriaList()}
                </Select>
              </Form.Item>

              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please input date!" }]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserCriteria;
