import React, { useState } from 'react';
import { Form, Input, Button, Result, Select } from 'antd';
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
      <h1 style={{ textAlign: 'center' }}>Preditor de Machine Learning</h1>

      {result !== null ? (
        <Result
          status="success"
          title="Resultado da Previsão"
          subTitle={`Previsão: ${result}`}
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
            label="Código da Região"
            name="region-code"
            rules={[{ required: true, message: 'Por favor, insira o código da região!' }]}
          >
            <Input placeholder="Código da Região" />
          </Form.Item>

          <Form.Item
            label="Código da UF"
            name="uf-code"
            rules={[{ required: true, message: 'Por favor, insira o código da UF!' }]}
          >
            <Input placeholder="Código da UF" />
          </Form.Item>

          <Form.Item
            label="Código do Município"
            name="county-code"
            rules={[{ required: true, message: 'Por favor, insira o código do município!' }]}
          >
            <Input placeholder="Código do Município" />
          </Form.Item>

          <Form.Item
            label="Código da Meso Região"
            name="meso-region-code"
            rules={[{ required: true, message: 'Por favor, insira o código da mesorregião!' }]}
          >
            <Input placeholder="Código da Meso Região" />
          </Form.Item>

          <Form.Item
            label="Código da Microrregião"
            name="micro-region-code"
            rules={[{ required: true, message: 'Por favor, insira o código da microrregião!' }]}
          >
            <Input placeholder="Código da Microrregião" />
          </Form.Item>

          <Form.Item
            label="Código do Distrito"
            name="district-code"
            rules={[{ required: true, message: 'Por favor, insira o código do distrito!' }]}
          >
            <Input placeholder="Código do Distrito" />
          </Form.Item>

          <Form.Item
            label="Código da Escola"
            name="entity-code"
            rules={[{ required: true, message: 'Por favor, insira o código da escola!' }]}
          >
            <Input placeholder="Código da Escola" />
          </Form.Item>

          <Form.Item
            label="Tipo de Dependência"
            name="dependency-type"
            rules={[{ required: true, message: 'Por favor, selecione o tipo de dependência!' }]}
          >
            <Select placeholder="Selecione">
              <Select.Option value="federal">Federal</Select.Option>
              <Select.Option value="municipal">Municipal</Select.Option>
              <Select.Option value="state">Estadual</Select.Option>
              <Select.Option value="private">Privada</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Tipo de Localização"
            name="location-type"
            rules={[{ required: true, message: 'Por favor, selecione o tipo de localização!' }]}
          >
            <Select placeholder="Selecione">
              <Select.Option value="urban">Urbana</Select.Option>
              <Select.Option value="rural">Rural</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Localização Diferenciada"
            name="diff-location-type"
            rules={[{ required: true, message: 'Por favor, selecione a localização diferenciada!' }]}
          >
            <Select placeholder="Selecione">
              <Select.Option value="0">Não diferenciada</Select.Option>
              <Select.Option value="1">Área de assentamento</Select.Option>
              <Select.Option value="2">Terra indígena</Select.Option>
              <Select.Option value="3">Comunidade remanescente de quilombos</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Vínculo com a Secretaria de Educação"
            name="education-department-link"
            rules={[{ required: true, message: 'Por favor, selecione o vínculo com a Secretaria de Educação!' }]}
          >
            <Select placeholder="Selecione">
              <Select.Option value="yes">Sim</Select.Option>
              <Select.Option value="no">Não</Select.Option>
              <Select.Option value="na">Não aplicável</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Vínculo com a Segurança Pública"
            name="public-security-link"
            rules={[{ required: true, message: 'Por favor, selecione o vínculo com a Segurança Pública!' }]}
          >
            <Select placeholder="Selecione">
              <Select.Option value="yes">Sim</Select.Option>
              <Select.Option value="no">Não</Select.Option>
              <Select.Option value="na">Não aplicável</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Vínculo com a Secretaria de Saúde"
            name="health-department-link"
            rules={[{ required: true, message: 'Por favor, selecione o vínculo com a Secretaria de Saúde!' }]}
          >
            <Select placeholder="Selecione">
              <Select.Option value="yes">Sim</Select.Option>
              <Select.Option value="no">Não</Select.Option>
              <Select.Option value="na">Não aplicável</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Vínculo com Outro Órgão"
            name="other-department-link"
            rules={[{ required: true, message: 'Por favor, selecione o vínculo com outro órgão!' }]}
          >
            <Select placeholder="Selecione">
              <Select.Option value="yes">Sim</Select.Option>
              <Select.Option value="no">Não</Select.Option>
              <Select.Option value="na">Não aplicável</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Prever
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default PredictForm;
