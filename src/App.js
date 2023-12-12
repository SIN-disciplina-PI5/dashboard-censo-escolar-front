import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import PredictForm from './PredictForm';
import Dashboard from './Dashboard';

const { Sider, Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={200} theme="dark">
          <Menu mode="vertical" defaultSelectedKeys={['1']} theme="dark">
            <Menu.Item key="1">
              <Link to="/">
                <span role="img" aria-label="dashboard">
                  📊 Dashboard
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
            <Link to="/form">
                <span role="img" aria-label="form">
                  📝 Formulário
                </span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          <Content>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/form" element={<PredictForm />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
