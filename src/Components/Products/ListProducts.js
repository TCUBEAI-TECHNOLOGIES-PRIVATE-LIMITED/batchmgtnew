import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Amplify } from 'aws-amplify';
import {generateClient} from 'aws-amplify/api';
import config from './../../amplifyconfiguration.json';
import { Button } from '@aws-amplify/ui-react';
import {listProducts} from './../../graphql/queries'
import {deleteProduct} from './../../graphql/mutations'

Amplify.configure(config); // Use AmplifyConfig instead of Amplify
const client = generateClient();

const ListProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  
    fetchBatch();
  }, []); // The empty dependency array ensures the effect runs once after the initial render

  const fetchBatch = async() => {
    try{
      // const user = await Auth.currentAuthenticatedUser();
      const batchData = await client.graphql({ query: listProducts });
      // console.log('GraphQL Response:', batchData);
      const batchList = batchData.data.listProducts.items;
      console.log('batch list',batchList);
      setProducts(batchList)
    } catch (error) {
      console.log('error on fetching batch', error);
    }
   }
   const handleDelete = async (itemId) => {
    try {
      const result = await client.graphql({
        query: deleteProduct,
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
    <div>
     
      <div style={{ padding: '12px', textAlign:"center"}}>
      <h2>Product List</h2>
      {products.length === 0 ? (
        <p>No products have been added yet.</p>
      ) : (
        <Table striped style={{textAlign:"center"}}>
          <thead>
            <tr>
              <th>Name</th>
              <th>MRP</th>
              <th>Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.mrp}</td>
                <td>{product.volume}{product.measure}</td>
                <td style={{ display:'flex', gap:"2px"}}>
                    {/* <Link to={`/product/${product.id}`}>
                    <Button variation="primary" colorTheme="info">View</Button>
                    </Link> */}
                  <Button variation="primary" colorTheme="error" onClick={() => handleDelete(product.id)}>Delete</Button>
                  </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      </div>
    </div>
  );
};

export default ListProducts;
