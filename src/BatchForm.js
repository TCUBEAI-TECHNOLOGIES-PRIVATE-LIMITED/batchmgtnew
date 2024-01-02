import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { generateClient } from 'aws-amplify/api';
import { createBatch } from './graphql/mutations';

// import axios from 'axios'; //

const BatchForm = ({ onAddBatch }) => {
  const client = generateClient();
  

  const [batchData, setBatchData] = useState({
    cpyName: '',
    address: '',
    link: '',
    batchNumber: '',
    productName: '',
    mfgDate: new Date().toISOString().split('T')[0], // Set to today's date
    expiryDate: '',
    mrp: '',
    quantity: '',
    measure: 'ml', // Added measure field with 'ml' as the default
    value: '', // Added value field
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'expiryDate' || name === 'mfgDate') {
      // Format the date as needed (e.g., YYYY-MM-DD)
      const formattedDate = new Date(value).toISOString().split('T')[0];
      setBatchData({
        ...batchData,
        [name]: formattedDate,
      });
    } else {
      setBatchData({
        ...batchData,
        [name]: value,
      });
    }
  };

  const calculateUSP = () => {
    const { mrp, measure, value } = batchData;
    // Convert value to ml if it's in kg
    const mlValue = measure === 'kg' ? value * 1000 : value;
    const usp = parseFloat(mrp) / parseFloat(mlValue);
    return usp.toFixed(3);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const usp = calculateUSP();
      const requestBody = { ...batchData, usp, value: batchData.value };

      const newBatch = await client.graphql({
        query: createBatch,
        variables: {
          input: requestBody
        }
      });
    
    

      // Pass the batch data with USP to the onAddBatch function
      onAddBatch({ ...batchData, usp });

      // Reset the form fields
      setBatchData({
        batchNumber: '',
        cpyName: '',
        link: '',
        address: '',
        productName: '',
        mfgDate: new Date().toISOString().split('T')[0],
        expiryDate: '',
        mrp: '',
        quantity: '',
        measure: 'ml',
        value: '',
        
      });

    } catch (error) {
      // Handle error if the API request fails
      console.error('API Request Error:', error);
    }
  };



  return (
    <Container >
    <Form onSubmit={handleSubmit}>
      <Row >
        <Col xs={12} sm={6} md={4} style={{marginTop:"20px"}}>
          <Form.Group controlId="cpyName">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              name="cpyName"
              value={batchData.cpyName}
              onChange={handleInputChange}
              placeholder="Company Name"
              required
            />
          </Form.Group>
        </Col>

        <Col xs={12} sm={6} md={4} style={{marginTop:"20px"}}>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea" // Set the "as" prop to "textarea"
              rows={3}
              type="text"
              name="address"
              value={batchData.address}
              onChange={handleInputChange}
              placeholder="Address"
              required
            />
          </Form.Group>
        </Col>

        <Col xs={12} sm={6} md={4} style={{marginTop:"20px"}}>
          <Form.Group controlId="link">
            <Form.Label>Company Website</Form.Label>
            <Form.Control
              type="text"
              name="link"
              value={batchData.link}
              onChange={handleInputChange}
              placeholder="Enter Company Website"
              required
            />
          </Form.Group>
        </Col>

        <Col xs={12} sm={6} md={4}>
          <Form.Group controlId="batchNumber">
            <Form.Label>Batch Number</Form.Label>
            <Form.Control
              type="text"
              name="batchNumber"
              value={batchData.batchNumber}
              onChange={handleInputChange}
              placeholder="Enter Batch Number"
              required
            />
          </Form.Group>
        </Col>

        <Col xs={12} sm={6} md={4}>
          <Form.Group controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              value={batchData.productName}
              onChange={handleInputChange}
              placeholder="Enter Product Name"
              required
            />
          </Form.Group>
        </Col>

        <Col xs={12} sm={6} md={4}>
          <Form.Group controlId="mfgDate">
            <Form.Label>Manufacture Date</Form.Label>
            <Form.Control
              type="date"
              name="mfgDate"
              value={batchData.mfgDate}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>

        <Col xs={12} sm={6} md={4}>
          <Form.Group controlId="expiryDate">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              type="date"
              name="expiryDate"
              value={batchData.expiryDate}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>

        <Col xs={12} sm={6} md={4}>
          <Form.Group controlId="mrp">
            <Form.Label>MRP</Form.Label>
            <Form.Control
              type="text"
              name="mrp"
              value={batchData.mrp}
              onChange={handleInputChange}
              placeholder="Enter MRP"
              required
            />
          </Form.Group>
        </Col>

        <Col xs={12} sm={6} md={4}>
          <Form.Group controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="text"
              name="quantity"
              value={batchData.quantity}
              onChange={handleInputChange}
              placeholder="Enter Quantity"
              required
            />
          </Form.Group>
        </Col>

       

        <Col xs={12} sm={6} md={4}>
          <Form.Group controlId="value">
            <Form.Label>Volume or Weight</Form.Label>
            <Form.Control
              type="text"
              name="value"
              value={batchData.value}
              onChange={handleInputChange}
              placeholder="Enter Volume or Weight"
              required
            />
          </Form.Group>
        </Col>

        <Col xs={12} sm={6} md={4}>
          <Form.Group controlId="measure">
            <Form.Label>Measure</Form.Label>
            <Form.Control
              as="select"
              name="measure"
              value={batchData.measure}
              onChange={handleInputChange}
              required
            >
              <option value="ml">ml</option>
              <option value="kg">kg</option>
            </Form.Control>
          </Form.Group>
        </Col>

        <Col xs={12} style={{ marginTop: "20px" }}>
          <Button variant='success' type="submit">Add Batch</Button>
        </Col>
      </Row>
    </Form>
  </Container>
  );
};

export default BatchForm;