import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Amplify } from 'aws-amplify';
// import { Auth } from 'aws-amplify/auth';
import {generateClient} from 'aws-amplify/api';
import {listBatches} from './graphql/queries'
import config from './amplifyconfiguration.json';
import { Button, withAuthenticator } from '@aws-amplify/ui-react';
import {  deleteBatch } from './graphql/mutations';
import { Link } from 'react-router-dom';

Amplify.configure(config); // Use AmplifyConfig instead of Amplify
const client = generateClient();

const AllBatches =  () => {
  const [batch, setBatch] = useState([]);

  const calculateDays = (mfgDate, expiryDate) => {
    const mfgDateTime = new Date(mfgDate).getTime();
    const expiryDateTime = new Date(expiryDate).getTime();
    const daysDifference = (expiryDateTime - mfgDateTime) / (1000 * 3600 * 24); // Calculate the difference in days
    return daysDifference.toFixed(0);
  };

  useEffect (() => {
    fetchBatch();
  },[])

  

  // const fetchBatch = await client.graphql({ query: listBatches });

 const fetchBatch = async() => {
  try{
    // const user = await Auth.currentAuthenticatedUser();
    const batchData = await client.graphql({ query: listBatches });
    // console.log('GraphQL Response:', batchData);
    const batchList = batchData.data.listBatches.items;
    console.log('batch list',batchList);
    setBatch(batchList)
  } catch (error) {
    console.log('error on fetching batch', error);
  }
 }


 const handleDelete = async (itemId) => {
  try {
    const result = await client.graphql({
      query: deleteBatch,
      variables: {
        input: {
          id: itemId
        }
      }
    });
    console.log(result);
    fetchBatch(); // Refresh the list after deletion
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};


  return (
    <>
    
      <div style={{ padding: '12px', textAlign:"center"}}>
        <h1>My Batches</h1>
        <div style={{overflowX: "auto"  }} >
          <Table striped bordered hover responsive style={{textAlign:"center", alignItems:"center"}}>
            <thead>
              <tr>
                <th>Batch Number</th>
                <th>Product Name</th>
                <th>Mfg Date</th>
                <th>Expiry Date</th>
                <th>MRP</th>
                <th>Quantity</th>
                <th>Volume/Weight</th>
                <th>USP</th>
                <th>Shelf Life</th>
                <th></th>
              </tr>
            </thead>
            <tbody style={{ fontSize:"15px"}}>
              {batch.map((product) => (
                <tr key={product.id}>
                  <td>{product.batchNumber}</td>
                  <td>{product.productName}</td>
                  <td>{product.mfgDate}</td>
                  <td>{product.expiryDate}</td>
                  <td>{product.mrp}</td>
                  <td>{product.quantity}</td>
                  <td>{product.value}{product.measure}</td>
                  <td>{product.usp}</td>
                  <td>
                    {calculateDays(product.mfgDate, product.expiryDate)} Days
                    </td>         
                   <td style={{ display:'flex', gap:"2px"}}>
                    <Link to={`/batch/${product.id}`}>
                    <Button variation="primary" colorTheme="info">View</Button>
                    </Link>
                  <Button variation="primary" colorTheme="error" onClick={() => handleDelete(product.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default withAuthenticator(AllBatches);
