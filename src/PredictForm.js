import React, { useState } from 'react';
import { Form, Input, Button, Result, Select } from 'antd';
import axios from 'axios';

const PredictForm = () => {
  const [result, setResult] = useState(null);

  const onFinish = async (values) => {
    try {

      const formattedValues = {
        "region-code": values['region-code'],
        "uf-code": values['uf-code'],
        "county-code": values['county-code'],
        "meso-region-code": values['meso-region-code'],
        "micro-region-code": values['micro-region-code'],
        "district-code": values['district-code'],
        "dependency-type": (values['dependency-type']),
        "location-type": (values['location-type']),
        "differentiated-location-type": (values['diff-location-type']),
        "education-department-link": (values['education-department-link']),
        "public-security-link": (values['public-security-link']),
        "health-department-link": (values['health-department-link']),
        "other-department-link": (values['other-department-link'])
      };

      const response = await axios.post('http://localhost:8080/school-census/api/predict', formattedValues);
      const predictionResult = response.data.prediction;
      let resultMessage = '';

      switch (predictionResult) {
        case 1:
          resultMessage = 'Em atividade';
          break;
        case 2:
          resultMessage = 'Paralisada';
          break;
        case 3:
          resultMessage = 'Extinta (ano do censo)';
          break;
        case 4:
          resultMessage = 'Extinta (anos anteriores)';
          break;
        default:
          resultMessage = 'Resultado desconhecido';
      }

      setResult(resultMessage);
    } catch (error) {
      console.error('Erro:', error);
      setResult(`Erro ao prever. Por favor, tente novamente. Detalhes: ${error.message}`);
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
            style={{ marginRight: '12px' }} 

          >
            <Select placeholder="Selecione o Código da Região">
              <Select.Option value={1}>Norte</Select.Option>
              <Select.Option value={2}>Nordeste</Select.Option>
              <Select.Option value={3}>Sudeste</Select.Option>
              <Select.Option value={4}>Sul</Select.Option>
              <Select.Option value={5}>Centro-Oeste</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Código da UF"
            name="uf-code"
            rules={[{ required: true, message: 'Por favor, insira o código da UF!' }]}
            style={{ marginRight: '12px' }} 


          >
            <Select placeholder="Selecione o Código da UF">
              <Select.Option value={11}>Rondônia</Select.Option>
              <Select.Option value={12}>Acre</Select.Option>
              <Select.Option value={13}>Amazonas</Select.Option>
              <Select.Option value={14}>Roraima</Select.Option>
              <Select.Option value={15}>Pará</Select.Option>
              <Select.Option value={16}>Amapá</Select.Option>
              <Select.Option value={17}>Tocantins</Select.Option>
              <Select.Option value={21}>Maranhão</Select.Option>
              <Select.Option value={22}>Piauí</Select.Option>
              <Select.Option value={23}>Ceará</Select.Option>
              <Select.Option value={24}>Rio Grande do Norte</Select.Option>
              <Select.Option value={25}>Paraíba</Select.Option>
              <Select.Option value={26}>Pernambuco</Select.Option>
              <Select.Option value={27}>Alagoas</Select.Option>
              <Select.Option value={28}>Sergipe</Select.Option>
              <Select.Option value={29}>Bahia</Select.Option>
              <Select.Option value={31}>Minas Gerais</Select.Option>
              <Select.Option value={32}>Espírito Santo</Select.Option>
              <Select.Option value={33}>Rio de Janeiro</Select.Option>
              <Select.Option value={35}>São Paulo</Select.Option>
              <Select.Option value={41}>Paraná</Select.Option>
              <Select.Option value={42}>Santa Catarina</Select.Option>
              <Select.Option value={43}>Rio Grande do Sul</Select.Option>
              <Select.Option value={51}>Mato Grosso</Select.Option>
              <Select.Option value={52}>Goiás</Select.Option>
              <Select.Option value={53}>Distrito Federal</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Código do Município"
            name="county-code"
            rules={[{ required: true, message: 'Por favor, insira o código do município!' }]}
            style={{ marginRight: '12px' }} 


          >
            <Input placeholder="Código do Município" />
          </Form.Item>
          <Form.Item
            label="Código da Meso Região"
            name="meso-region-code"
            rules={[{ required: true, message: 'Por favor, insira o código da mesorregião!' }]}
            style={{ marginRight: '12px' }} 


          >
            <Input placeholder="Código da Meso Região" />
          </Form.Item>
          <Form.Item
            label="Código da Microrregião"
            name="micro-region-code"
            rules={[{ required: true, message: 'Por favor, insira o código da microrregião!' }]}
            style={{ marginRight: '12px' }} 


          >
            <Input placeholder="Código da Microrregião" />
          </Form.Item>
          <Form.Item
            label="Código do Distrito"
            name="district-code"
            rules={[{ required: true, message: 'Por favor, insira o código do distrito!' }]}
            style={{ marginRight: '12px' }} 


          >
            <Input placeholder="Código do Distrito" />
          </Form.Item>
       
          <Form.Item
            label="Tipo de Dependência"
            name="dependency-type"
            rules={[{ required: true, message: 'Por favor, selecione o tipo de dependência!' }]}
            style={{ marginRight: '12px' }} 

          >
            <Select placeholder="Selecione">
              <Select.Option value={0}>Federal</Select.Option>
              <Select.Option value={1}>Municipal</Select.Option>
              <Select.Option value={2}>Estadual</Select.Option>
              <Select.Option value={3}>Privada</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Tipo de Localização"
            name="location-type"
            rules={[{ required: true, message: 'Por favor, selecione o tipo de localização!' }]}
            style={{ marginRight: '12px' }} 

          >
            <Select placeholder="Selecione">
              <Select.Option value={0}>Urbana</Select.Option>
              <Select.Option value={1}>Rural</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Localização Diferenciada"
            name="diff-location-type"
            rules={[{ required: true, message: 'Por favor, selecione a localização diferenciada!' }]}
            style={{ marginRight: '12px' }} 

          >
            <Select placeholder="Selecione">
              <Select.Option value="0">Não diferenciada</Select.Option>
              <Select.Option value="1">Área de assentamento</Select.Option>
              <Select.Option value="2">Terra indígena</Select.Option>
              <Select.Option value="3">Comunidade remanescente de quilombos</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Vínculo Secr. de Educação"
            name="education-department-link"
            rules={[{ required: true, message: 'Por favor, selecione o vínculo com a Secretaria de Educação!' }]}
            style={{ marginRight: '12px' }} 

          >
            <Select placeholder="Selecione">
              <Select.Option value={0}>Sim</Select.Option>
              <Select.Option value={1}>Não</Select.Option>
              <Select.Option value={2}>Não aplicável</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Vínculo Seg Pública"
            name="public-security-link"
            rules={[{ required: true, message: 'Por favor, selecione o vínculo com a Segurança Pública!' }]}
            style={{ marginRight: '12px' }} 

          >
            <Select placeholder="Selecione">
              <Select.Option value={0}>Sim</Select.Option>
              <Select.Option value={1}>Não</Select.Option>
              <Select.Option value={2}>Não aplicável</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Vínculo Secr. de Saúde"
            name="health-department-link"
            rules={[{ required: true, message: 'Por favor, selecione o vínculo com a Secretaria de Saúde!' }]}
            style={{ marginRight: '12px' }} 

          >
            <Select placeholder="Selecione">
              <Select.Option value={0}>Sim</Select.Option>
              <Select.Option value={1}>Não</Select.Option>
              <Select.Option value={2}>Não aplicável</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Vínculo com Outro Órgão"
            name="other-department-link"
            rules={[{ required: true, message: 'Por favor, selecione o vínculo com outro órgão!' }]}
            style={{ marginRight: '12px' }} 

          >
            <Select placeholder="Selecione">
              <Select.Option value={0}>Sim</Select.Option>
              <Select.Option value={1}>Não</Select.Option>
              <Select.Option value={2}>Não aplicável</Select.Option>
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