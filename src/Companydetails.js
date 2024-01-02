import React, { useState } from 'react';
import { Form,  Container, Row, Col } from 'react-bootstrap';

const Companydetails = ({ onAddBatch }) => {
  const [company, setCompany] = useState({
    batchNumber: '',
    mfgDate: new Date().toISOString().split('T')[0], // Set to today's date
    expiryDate: '',
    mrp: '',
    quantity: '',
    volume: '50ml',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'expiryDate' || name === 'mfgDate') {
      // Format the date as needed (e.g., YYYY-MM-DD)
      const formattedDate = new Date(value).toISOString().split('T')[0];
      setCompany({
        ...company,
        [name]: formattedDate,
      });
    } else {
      setCompany({
        ...company,
        [name]: value,
      });
    }
  };

  const calculateUSP = () => {
    const { mrp, volume } = company;
    const usp = parseFloat(mrp) / parseFloat(volume.replace('ml', ''));
    return usp.toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const usp = calculateUSP();
    onAddBatch({ ...company, usp });
    setCompany({
      batchNumber: '',
      
      mrp: '',
     
    });
  };

  return (
    <Container>
  
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} sm={6} md={4}>
            <Form.Group controlId="batchNumber">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="batchNumber"
                value={company.batchNumber}
                onChange={handleInputChange}
                placeholder="Company Name"
              />
            </Form.Group>
          </Col>
        
         
          <Col xs={12} sm={6} md={4}>
            <Form.Group controlId="mrp">
              <Form.Label>Address</Form.Label>
              <Form.Control
              as="textarea" // Set the "as" prop to "textarea"
              rows={3} 
                type="text"
                name="mrp"
                value={company.mrp}
                onChange={handleInputChange}
                placeholder="Address"
              />
            </Form.Group>
          </Col>
         
        
          {/* <Col xs={12} style={{ marginTop: "20px" }}>
            <Button type="submit">Add Details</Button>
          </Col> */}
        </Row>
      </Form>
    </Container>
  );
};

export default Companydetails;
