import React, { useState } from 'react';
import { Layout, Row, Col, Card, Table, Input, Form, Button, Upload, message } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import {
  regionCodes,
  ufCodes,
  dependencyCodes,
  locationCodes,
  specialLocationCodes,
  situationCodes,
  educationSecretariatCodes,
  publicSecurityCodes,
  healthSecretariatCodes,
  otherPublicOrganizationCodes
} from './mapeamentos';
import './dashboard.css';

const { Content } = Layout;

const mapCodeToValue = (value) => {
  return value !== undefined ? value : 'N/A';
};

const CodeValue = (code, mapping) => {
  return mapping[code] || 'N/A';
}

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

  const columns = Object.keys(csvData[0] || {}).map((key) => {
    let title = key;
    let dataIndex = key;

    if (key === 'coRegiao') {
      title = 'Região';
      dataIndex = 'coRegiao';
    } else if (key === 'coUf') {
      title = 'UF';
      dataIndex = 'coUf';
    } else if (key === 'tpDependencia') {
      title = 'Dependência Administrativa';
      dataIndex = 'tpDependencia';
    } else if (key === 'tpLocalizacao') {
      title = 'Localização';
      dataIndex = 'tpLocalizacao';
    } else if (key === 'tpLocalizacaoDiferenciada') {
      title = 'Localização Diferenciada';
      dataIndex = 'tpLocalizacaoDiferenciada';
    } else if (key === 'tpSituacaoFuncionamento') {
      title = 'Situação Funcionamento';
      dataIndex = 'tpSituacaoFuncionamento';
    } else if (key === 'inVinculoSecretariaEducacao') {
      title = 'Vinculo Secretaria Educação';
      dataIndex = 'inVinculoSecretariaEducacao';
    } else if (key === 'inVinculoSegurancaPublica') {
      title = 'Vinculo Segurança Pública';
      dataIndex = 'inVinculoSegurancaPublica';
    } else if (key === 'inVinculoSecretariaSaude') {
      title = 'Vinculo Secretaria Saúde';
      dataIndex = 'inVinculoSecretariaSaude';
    } else if (key === 'inVinculoOutroOrgao') {
      title = 'Vinculo Outro Orgão';
      dataIndex = 'inVinculoOutroOrgao';
    }

    return { title, dataIndex, key };
  });

  return (
    <Layout style={{ height: '100%' }}>
      <Content style={{ margin: '20px' }}>
        <h1>Dashboard Censo Escolar</h1>
        <Upload
          beforeUpload={handleUpload}
          fileList={fileList}
          showUploadList={false}
        >
          <Button className="upload-button" style={{ marginBottom: '30px', fontWeight:'bold'}}>
             Upload CSV
          </Button>
        </Upload>

        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={12}>
            <Card title="Distribuição de Escolas por Localização" style={{ width: '100%' }}>
              <BarChart width={400} height={300} data={filteredData}>
                <XAxis dataKey="noEntidade" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tpLocalizacao" fill="#800080" name="Escolas Urbanas" stackId="location" />
                <Bar dataKey="tpLocalizacaoDiferenciada" fill="#00BFFF" name="Escolas Rurais" stackId="location" />
              </BarChart>
            </Card>
          </Col>

          <Col span={12}>
            <Card title="Distribuição de Escolas por Dependência Administrativa" style={{ width: '100%' }}>
              <BarChart width={400} height={300} data={filteredData}>
                <XAxis dataKey="noEntidade" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tpDependencia" fill="#FFD700" name="Escolas Federais" stackId="dependency" />
                <Bar dataKey="tpDependencia" fill="#32CD32" name="Escolas Estaduais" stackId="dependency" />
                <Bar dataKey="tpDependencia" fill="#FF6347" name="Escolas Municipais" stackId="dependency" />
                <Bar dataKey="tpDependencia" fill="#8A2BE2" name="Escolas Privadas" stackId="dependency" />
              </BarChart>
            </Card>
          </Col>
        </Row>
        

        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={50}>
            <Card title="Data" style={{width: '100%'}}>
              <Table dataSource={filteredData} columns={columns}  style={{width: '100%'}}/>
            </Card>
          </Col>

        </Row>

        <br />
        <br />

        <Row gutter={16} style={{ }}>
          <Col span={1.5}>
            <Card title="ID">
              {filteredData.map((item, index) => (
                <p key={index}>{mapCodeToValue(item.id)}</p>
              ))}
            </Card>
          </Col>
          <Col span={5}>
            <Card title="Instituição">
              {filteredData.map((item, index) => (
                <p key={index}>{mapCodeToValue(item.noEntidade)}</p>
              ))}
            </Card>
          </Col>
          <Col span={2}>
            <Card title="Região">
              {filteredData.map((item, index) => (
                <p key={index}>{CodeValue(item.coRegiao, regionCodes)}</p>
              ))}
            </Card>
          </Col>
          <Col span={2}>
            <Card title="Estado">
              {filteredData.map((item, index) => (
                <p key={index}>{CodeValue(item.coUf, ufCodes)}</p>
              ))}
            </Card>
          </Col>

          <Col span={4}>
            <Card title="Dependência Administrativa">
              {filteredData.map((item, index) => (
                <p key={index}>{CodeValue(item.tpDependencia, dependencyCodes)}</p>
              ))}
            </Card>
          </Col>

          <Col span={4}>
            <Card title="Localização">
              {filteredData.map((item, index) => (
                <p key={index}>{CodeValue(item.tpLocalizacao, locationCodes)}</p>
              ))}
            </Card>
          </Col>

          <Col span={5}>
            <Card title="Localização diferenciada da escola">
              {filteredData.map((item, index) => (
                <p key={index}>{CodeValue(item.tpLocalizacaoDiferenciada, specialLocationCodes)}</p>
              ))}
            </Card>
          </Col>
        </Row>

<br />

      <Row gutter={16} style={{  }}>
      <Col span={3}>
            <Card title="Código Município">
              {filteredData.map((item, index) => (
                <p key={index}>{mapCodeToValue(item.coMunicipio)}</p>
              ))}
            </Card>
          </Col>
          <Col span={4}>
            <Card title="Código Mesorregião">
              {filteredData.map((item, index) => (
                <p key={index}>{mapCodeToValue(item.coMesorregiao)}</p>
              ))}
            </Card>
          </Col>
          <Col span={4}>
            <Card title="Código Microrregião">
              {filteredData.map((item, index) => (
                <p key={index}>{mapCodeToValue(item.coMicrorregiao)}</p>
              ))}
            </Card>
          </Col>
          <Col span={3}>
            <Card title="Código Distrito">
              {filteredData.map((item, index) => (
                <p key={index}>{mapCodeToValue(item.coDistrito)}</p>
              ))}
            </Card>
          </Col>
          <Col span={3}>
            <Card title="Código Instituição">
              {filteredData.map((item, index) => (
                <p key={index}>{mapCodeToValue(item.coEntidade)}</p>
              ))}
            </Card>
          </Col>

          <Col span={4}>
            <Card title="Situação de funcionamento">
              {filteredData.map((item, index) => (
                <p key={index}>{CodeValue(item.tpSituacaoFuncionamento, situationCodes)}</p>
              ))}
            </Card>
          </Col>
  
        </Row>

        <br />

        <Row gutter={16} style={{  }}>
          <Col span={5}>
            <Card title="Vínculo Secretaria Educação">
              {filteredData.map((item, index) => (
                <p key={index}>{CodeValue(item.inVinculoSecretariaEducacao, educationSecretariatCodes)}</p>
              ))}
            </Card>
          </Col>
          <Col span={4}>
            <Card title="Vínculo Segurança Pública">
              {filteredData.map((item, index) => (
                <p key={index}>{CodeValue(item.inVinculoSegurancaPublica, publicSecurityCodes)}</p>
              ))}
            </Card>
          </Col>
          <Col span={4}>
            <Card title="Vínculo Secretaria Saúde">
              {filteredData.map((item, index) => (
                <p key={index}>{CodeValue(item.inVinculoSecretariaSaude, healthSecretariatCodes)}</p>
              ))}
            </Card>
          </Col>
          <Col span={4}>
            <Card title="Vínculo Outros Orgãos">
              {filteredData.map((item, index) => (
                <p key={index}>{CodeValue(item.inVinculoOutroOrgao, otherPublicOrganizationCodes)}</p>
              ))}
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Dashboard;