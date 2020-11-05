import React, {useState, useEffect} from 'react';
import {Button, Row, Table, Input, Modal, Form, Radio, Col, Tag} from 'antd';
import apis from '../../apis/index'
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";
import {PointType} from "../detail";
const { Search } = Input;

const CriteriaList = () => {
  const [data, setData] = useState([])
  const [selectedCriteria, setSelectedCriteria] = useState();
  const [visible, setVisible] = useState(false);
  const [isAddCriteria, setIsAddCriteria] = useState(false)
  const [form] = Form.useForm();
  useEffect(() => {
    getCriteriaList()
  }, [])

  useEffect(() => {
    form.resetFields()
  }, [selectedCriteria, isAddCriteria])

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Point',
      dataIndex: 'point',
      key: 'point',
      render: (point, row) => (
        <div>
          {
            (row.type === PointType.Plus) ? (
              <span style={{ color: '#3f8600' }}><ArrowUpOutlined />{point}</span>
            ) : (
              <span style={{ color: '#cf1322' }}><ArrowDownOutlined />{point}</span>
            )
          }
        </div>
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
            <Button type="primary" onClick={() => updateCriteria(id)}>
              Edit
            </Button>
          </>
        );
      }
    }
  ];

  const getCriteriaList = () => {
    apis.get('/criterias').then(res => {
      setData(res?.data?.map((x, key) => {
        return {
          ...x,
          stt: key + 1,
          key,
        }
      }))
    })
  }

  const renderCriteria = () => {
    console.log(selectedCriteria)
    return (
      <>
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: isAddCriteria, message: "Please input criteria name!" }]}
          >
            <Input placeholder="name" defaultValue={selectedCriteria?.name}/>
          </Form.Item>
          <Form.Item
            label="Point"
            name="point"
            rules={[{ required: isAddCriteria, message: "Please input point!" }]}
          >
            <Input placeholder="point" defaultValue={selectedCriteria?.point} />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: isAddCriteria, message: "Please choose point type!" }]}
          >
            <Radio.Group defaultValue={selectedCriteria?.type}>
              <Radio value={0}>
                <Tag color="error"> Minus</Tag>
              </Radio>
              <Radio value={1}>
                <Tag color="success"> Plus</Tag>
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </>
    )
  }

  const confirm = (id) => {
    Modal.confirm({
      title: "Confirm",
      content: "Do you want to delete this criteria?",
      okText: "OK",
      cancelText: "cancel",
      onCancel() {},
      onOk() {
        apis.delete(`/criterias/${id}`).then(() => getCriteriaList())
      },
    });
  }

  const updateCriteria = (id) => {
    apis.get(`/criterias/${id}`).then((res) => {
      setSelectedCriteria(res.data)
    })
    setVisible(true)
  }

  const onCreate = (values) => {
    values.point = Number(values.point)
    if (isAddCriteria) {

      apis.post(`criterias`, values).then(() => {
        getCriteriaList()
        setVisible(false)
        setIsAddCriteria(false)
      })
    } else {
      apis.put(`criterias/${selectedCriteria?.id}`, values).then(() => {
        getCriteriaList()
        setVisible(false)
      })
    }
  }

  const onSearch = value => {
    apis.get('/criterias', {
      params: {
        name: value
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
          <Search placeholder="input criteria name" onSearch={onSearch} enterButton />
        </Col>
        <div style={{ alignItems: 'flex-end'}}>
          <Button onClick={() => {
            setIsAddCriteria(true);
            setVisible(true);
          }}>
            Add Criteria
          </Button>
        </div>
      </Row>
      <br />
      <Table columns={columns} dataSource={data} />
      <Modal
        visible={visible}
        title={isAddCriteria ? 'Create new criteria' : 'Update criteria'}
        okText="Create"
        cancelText="Cancel"
        onCancel={() => {
          setVisible(false)
          setIsAddCriteria(false)
          setSelectedCriteria(null)
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
        {renderCriteria()}
      </Modal>
    </div>
  )
}

export default CriteriaList;
