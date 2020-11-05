import React, {useState, useEffect} from 'react';
import {Button, Row, Table, Input, Modal, Form, Radio, Col} from 'antd';
import apis from '../../apis/index'

const { Search } = Input;

const UserGender = {
  0: "Male",
  1: "Female",
  2: "Other",
};

const UserList = () => {
  const [data, setData] = useState([])
  const [selectedUser, setSelectedUser] = useState();
  const [visible, setVisible] = useState(false);
  const [isAddUser, setIsAddUser] = useState(false)
  const [form] = Form.useForm();
  useEffect(() => {
    getUserList()
  }, [])

  useEffect(() => {
    form.resetFields()
  }, [selectedUser])
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Full name',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender) => (
        <span>
          {UserGender[gender]}
        </span>
      )
    },
    {
      title: "Action",
      key: "id",
      dataIndex: "id",
      render: (id) => {
        return (
          <>
            <Button onClick={() => confirm(id)}>Delete</Button>
            <Button type="primary" onClick={() => updateUser(id)}>
              Edit
            </Button>
          </>
        );
      }
    }
  ];

  const getUserList = () => {
    apis.get('/users').then(res => {
      setData(res.data.map((x, key) => {
        return {
          ...x,
          stt: key + 1,
          key,
        }
      }))
    })
  }

  const renderProfile = () => {
      return (
        <>
          <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            initialValues={
              !isAddUser && {
                username: selectedUser?.username,
                fullname: selectedUser?.fullname,
                email: selectedUser?.email,
                age: selectedUser?.age?.toString(),
                gender: selectedUser?.gender
              }
            }
          >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="username" />
          </Form.Item>
            {isAddUser && (
              <>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject('The two passwords that you entered do not match!');
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </>
            )
            }
          <Form.Item
            label="Fullname"
            name="fullname"
            rules={[{ message: "Please input your fullname!" }]}
          >
            <Input placeholder="fullname" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { message: "Please input your email!" },
              {
                pattern: /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm,
                message: "Email không hợp lệ",
              },
            ]}

          >
            <Input placeholder="email" />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[
              { message: "Please input your age!" }
            ]}
          >
            <Input placeholder="age" />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
          >
            <Radio.Group>
              <Radio value={0}>Male</Radio>
              <Radio value={1}>Female</Radio>
            </Radio.Group>
          </Form.Item>
          </Form>
        </>
      )
  }

  const confirm = (id) => {
    Modal.confirm({
      title: "Confirm",
      content: "Do you want to delete this user?",
      okText: "OK",
      cancelText: "cancel",
      onCancel() {},
      onOk() {
        apis.delete(`/users/${id}`).then(() => getUserList())
      },
    });
  }

  const updateUser = (id) => {
    apis.get(`/users/${id}`).then((res) => {
      setSelectedUser(res.data)
    })
    setVisible(true)
  }

  const onCreate = (values) => {
    values.age = Number(values.age)
    if (isAddUser) {
      delete values.confirm

      apis.post(`auth/register`, values).then(() => {
        getUserList()
        setVisible(false)
        setIsAddUser(false)
      })
    } else {
      apis.put(`users/${selectedUser?.id}`, values).then(() => {
        getUserList()
        setVisible(false)
      })
    }
  }

  const onSearch = value => {
    apis.get('/users', {
      params: {
        username: value
      }
    }).then(res => {
      setData(res.data.map((x, key) => {
        return {
          ...x,
          stt: key + 1,
        }
      }))
    })
  };

  return (
    <div>
      <Row>
        <Col span={4}>
          <Search placeholder="input username" onSearch={onSearch} enterButton />
        </Col>
        <div style={{ alignItems: 'flex-end'}}>
          <Button onClick={() => {
            setIsAddUser(true);
            setVisible(true);
            setSelectedUser(null)
          }}>
            Add User
          </Button>
        </div>
      </Row>
      <br />
      <Table columns={columns} dataSource={data} />
      <Modal
        visible={visible}
        title={isAddUser ? 'Create new user' : 'Update user'}
        okText="Create"
        cancelText="Cancel"
        forceRender
        onCancel={() => {
          setVisible(false)
          setIsAddUser(false)
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        {renderProfile()}
      </Modal>
    </div>
  )
}

export default UserList;
