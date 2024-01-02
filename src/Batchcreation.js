import React, { useState } from 'react';
import './App.css';
import BatchForm from './BatchForm';
import BatchTable from './BatchTable';
import Papa from 'papaparse';
import { Button } from 'react-bootstrap';

function Batchcreation() {
  const [batches, setBatches] = useState([]);


  const handleAddBatch = (batchData) => {
    // Generate serial numbers for the batch
    const serialNumbers = generateSerialNumbers(batchData.quantity);
    const batchWithSerialNumbers = {
      ...batchData,
      serialNumbers: serialNumbers,
    };

    // Add the batch with serial numbers to the state
    setBatches([...batches, batchWithSerialNumbers]);
  };

  const generateSerialNumbers = (quantity) => {
    const characters = '0123456789';
    const serialNumberLength = 10;
    const serialNumbers = [];

    for (let i = 0; i < quantity; i++) {
      let serialNumber = '';
      for (let j = 0; j < serialNumberLength; j++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        serialNumber += characters.charAt(randomIndex);
      }
      serialNumbers.push(serialNumber);
    }

    return serialNumbers;
  };

  const exportToCSV = () => {
    const dataForExport = [];
    batches.forEach((batch) => {
      batch.serialNumbers.forEach((serialNumber) => {
        dataForExport.push({
          ProductName: batch.productName,
          BatchNumber: batch.batchNumber,
          // SerialNumber: serialNumber,
          MfgDate: new Date(batch.mfgDate).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
          ExpiryDate: new Date(batch.expiryDate).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
          MRP: batch.mrp,
          USP: batch.usp,
          Link: batch.link,
        });
      });
    });

    const csvData = Papa.unparse(dataForExport);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const filename = `${batches[0].cpyName} ${batches[0].productName} ${batches[0].batchNumber} ${batches[0].mfgDate}.csv`;

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };

  return (
    <div className="App">
   
    
     <div >

      <BatchForm onAddBatch={handleAddBatch} />
      <br />
      <Button variant="info" onClick={exportToCSV}>
        Export to CSV
      </Button>
      <p>"To print the table, you can use the 'Ctrl + P' keyboard shortcut or click the 'Print' button."</p>

      <BatchTable batches={batches} />
      </div>
    </div>
  );
}

export default Batchcreation;
