import { DatePicker, Row, Col, TimePicker, Flex, Select, Button, Card, Form, Input, Space, message} from "antd";
import { useState } from "react";

function BookTable () {
  
  const [selectValue, setSelectValue] = useState();
  const [datePickerValue, setDatePickerValue] = useState('');
  const [timePickerValue, setTimePickerValue] = useState('');
  const [reservationList, setReservationList] = useState([]);
  const [isBooked, setIsBooked] = useState(false);

  const handleChange = value => {
    setSelectValue(value);
  };

  const submitReservationList = (e) => {
    e.preventDefault();
    const newReservationList = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      table: selectValue,
      date: datePickerValue,
      time: timePickerValue
    };
    setReservationList(prevList => [...prevList, newReservationList]);
    setIsBooked(true);
  };

  const confirmReservationList = (e) => {
    e.preventDefault();
    message.success('Reservation Completed !');
    setTimeout(() => {
      setIsBooked(false)
    }, 2000);
    setIsBooked(false);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{ width: 70 }}
        defaultValue={'90'}
        options={[
          { label: '+90', value: '90' },
          { label: '+87', value: '87' },
        ]}
      />
    </Form.Item>
  );

  return (
    <>
      {!isBooked && (
        <Flex style={{justifySelf:'center', alignSelf:'center'}}>
          <Card style={{width:'100%', marginTop:'3rem'}}>
            <Row>
              <Col span={12} offset={6} style={{textAlign:'center', marginTop:'2rem'}}>
                <h1 style={{marginBottom:'1rem', marginTop:'0px'}}>Book Table</h1>
                <Select
                  defaultValue='people'
                  style={{width:'100%', marginBottom:'1rem'}}
                  onChange={handleChange}
                  options={[
                    { value: 'people', label:'people', disabled: true},
                    { value: '1', label: '1' },
                    { value: '2', label: '2' },
                    { value: '3', label: '3' },
                    { value: '4', label: '4' },
                    { value: '5', label: '5' },
                    { value: '6', label: '6' },
                    { value: '7', label: '7' },
                    { value: '8', label: '8' },
                    { value: '9', label: '9' },
                    { value: '10', label: '10' },
                  ]}
                />
                <DatePicker onChange={(_, dateString) => setDatePickerValue(dateString)} format={'DD/MM/YYYY'} style={{width:'100%', marginBottom:'1rem'}}/>
                <TimePicker onChange={(_, timeString) => setTimePickerValue(timeString)} format={'HH:mm'} style={{width:'100%', marginBottom:'1rem'}}/>
              </Col>
              <Col span={12} offset={6} style={{textAlign:'center'}}>
                <Button style={{width:'100%', marginBottom:'1rem'}} onClick={submitReservationList}>Book now</Button>
              </Col>
            </Row>
          </Card>
        </Flex>
      )}
      {isBooked && (
        <Flex style={{justifySelf:'center', alignSelf:'center'}}>
          <Card style={{width:'100%', marginTop:'3rem'}}>
            <Row>
              <Col span={12} offset={6} style={{textAlign:'center', marginTop:'2rem'}}>
                <h1 style={{marginBottom:'1rem', marginTop:'0px'}}>Contact Details</h1>
                <p>You are making a reservation for {selectValue} persons, on {datePickerValue} at {timePickerValue}</p>
                <Form>
                  <Form.Item name="Name" rules={[{required: true}]}>
                    <Input placeholder="Name"/>
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                  >
                    <Space.Compact block>
                      {prefixSelector}
                      <Input placeholder="Phone number" style={{ width: '100%' }} />
                    </Space.Compact>
                  </Form.Item>
                </Form> 
              </Col>
              <Col span={12} offset={6} style={{textAlign:'center'}}>
                <Button style={{width:'100%', marginBottom:'1rem'}} onClick={confirmReservationList}>Confirm Reservation</Button>
              </Col>
            </Row>
          </Card>
        </Flex>
      )}
    </>
  )
} 

export default BookTable;
