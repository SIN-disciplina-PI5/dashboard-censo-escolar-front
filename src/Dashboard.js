import React, { useState } from 'react';
import { Layout, Row, Col, Card, Table, Input, Form, Button } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const { Content } = Layout;

const dataMock = [
  // Adicione mais dados conforme necessário
  { name: 'Region 1', value: 50 },
  { name: 'Region 2', value: 30 },
  { name: 'Region 3', value: 80 },
];

const Dashboard = () => {
  const [filteredData, setFilteredData] = useState(dataMock);

  const columns = [
    { title: 'Region Code', dataIndex: 'regionCode', key: 'regionCode' },
    { title: 'UF Code', dataIndex: 'ufCode', key: 'ufCode' },
    { title: 'County Code', dataIndex: 'countyCode', key: 'countyCode' },
    // Adicione mais colunas conforme necessário
  ];

  const onFinish = (values) => {
    // Simular filtragem de dados com base nos valores do formulário
    const filtered = dataMock.filter(item =>
      item.name.toLowerCase().includes(values.regionSearch.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>
        <h1>Dashboard</h1>
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
              <BarChart width={400} height={300} data={dataMock}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Dashboard;
