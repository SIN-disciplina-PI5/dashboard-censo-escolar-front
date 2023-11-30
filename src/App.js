import logo from './logo.svg';
import './App.css';
import { Table } from 'antd';

function App() {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const style = { 
    display: 'flex', 
    justifyContent: 'center', 
    padding: '100 200px' 
  };

  return (
    <div className="App" style={style}>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default App;
