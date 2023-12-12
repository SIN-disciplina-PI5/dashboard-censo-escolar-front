import React, { useState } from 'react';
import { Layout, Row, Col, Card, Table, Input, Form, Button, Upload, message } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const { Content } = Layout;

const Dashboard = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [fileList, setFileList] = useState([]);

  const onFinish = (values) => {
    const filtered = csvData.filter(item =>
      item.noEntidade.toLowerCase().includes(values.regionSearch.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/school-census/api/csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data && response.data.length > 0) {
        setCsvData(response.data);
        setFilteredData(response.data);
        setFileList([file]);
        message.success('File uploaded successfully');
      } else {
        message.warning('Uploaded file is empty or not in the expected format.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      message.error('Error uploading file. Please try again.');
    }
  
    return false;
  };

  const columns = Object.keys(csvData[0] || {}).map((key) => ({ title: key, dataIndex: key, key }));

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>
        <h1>Dashboard</h1>
        <Upload
          beforeUpload={handleUpload}
          fileList={fileList}
          showUploadList={false}
        >
          <Button style={{ marginBottom: '30px'}}>
             Upload CSV
          </Button>
        </Upload>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Region Code">{/* Seus dados aqui */}</Card>
          </Col>
          <Col span={8}>
            <Card title="UF Code">{/* Seus dados aqui */}</Card>
          </Col>
          <Col span={8}>
            <Card title="County Code">{/* Seus dados aqui */}</Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={12}>
            <Card title="Filtered Data">
              <Form onFinish={onFinish} layout="inline">
                <Form.Item name="regionSearch">
                  <Input placeholder="Search by Region" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Search
                  </Button>
                </Form.Item>
              </Form>
              <Table dataSource={filteredData} columns={columns} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Region Distribution">
              <BarChart width={400} height={300} data={csvData}>
                <XAxis dataKey="noEntidade" />
                <YAxis />
                <Tooltip />
                <Legend />
                {columns.map((column, index) => (
                  <Bar key={index} dataKey={column.dataIndex} fill="#8884d8" />
                ))}
              </BarChart>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Dashboard;