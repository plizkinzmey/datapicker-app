import { Form, Button } from 'antd';
import CustomDatePicker from './components/CustomDatePicker';
import './App.css';

function App() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Полученные значения:', values);
  };

  return (
    <div className="app">
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Выберите дату"
          name="date"
          rules={[{ required: true, message: 'Пожалуйста, выберите дату' }]}
        >
          <CustomDatePicker />
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
