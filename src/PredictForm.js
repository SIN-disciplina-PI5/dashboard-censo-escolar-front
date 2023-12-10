import React, { useState } from 'react';
import { Form, Input, Button, Result } from 'antd';
import axios from 'axios';

const PredictForm = () => {
  const [result, setResult] = useState(null);

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/predict', values);
      setResult(response.data.prediction);
    } catch (error) {
      console.error('Error:', error);
      setResult('Error predicting. Please try again.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>Machine Learning Predictor</h1>

      {result !== null ? (
        <Result
          status="success"
          title="Prediction Result"
          subTitle={`Prediction: ${result}`}
        />
      ) : (
        <Form
          name="predictForm"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Region Code"
            name="region-code"
            rules={[{ required: true, message: 'Please input the region code!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="UF Code"
            name="uf-code"
            rules={[{ required: true, message: 'Please input the UF code!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="County Code"
            name="county-code"
            rules={[{ required: true, message: 'Please input the county code!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Meso Region Code"
            name="meso-region-code"
            rules={[{ required: true, message: 'Please input the meso region code!' }]}
          >
            <Input />
          </Form.Item>

          {/* Adicione campos semelhantes para outros parâmetros conforme necessário */}
          
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Predict
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default PredictForm;
