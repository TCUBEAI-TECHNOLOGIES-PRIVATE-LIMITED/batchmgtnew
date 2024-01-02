import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import QRCode from 'qrcode';
import { Button } from 'react-bootstrap';
import './print-styles.css'; // Import the print styles

const BatchTable = ({ batches }) => {
  const [qrCodeURLs, setQrCodeURLs] = useState([]);

  const handlePrint = () => {
    window.print();
  };


  useEffect(() => {
    const generateQRCode = async (batch) => {
      // const qrCodeData = `${batch.batchNumber}\n${batch.mfgDate}\n${batch.expiryDate}\n${batch.mrp}`;
      // const qrCodeUrl = `/${batch.batchNumber}/${batch.productName}/${batch.mrp}/${batch.mfgDate}/${batch.expiryDate}`;
      const qrCodeUrl = `${batch.link}`;

      try {
        const url = await QRCode.toDataURL(qrCodeUrl, { errorCorrectionLevel: 'H', width: 300,scale:5, margin: 1 });
        setQrCodeURLs((prevURLs) => [...prevURLs, url]);
      } catch (error) {
        console.error(error);
      }
    };

    const generateAllQRs = () => {
      setQrCodeURLs([]); // Reset URLs before generating new ones
      batches.forEach((batch) => {
        for (let i = 0; i < batch.quantity; i++) {
          generateQRCode(batch);
        }
      });
    };

    generateAllQRs();
  }, [batches]);

  const calculateDays = (mfgDate, expiryDate) => {
    const mfgDateTime = new Date(mfgDate).getTime();
    const expiryDateTime = new Date(expiryDate).getTime();
    const daysDifference = (expiryDateTime - mfgDateTime) / (1000 * 3600 * 24); // Calculate the difference in days
    return daysDifference.toFixed(0);
  };

  return (
    <div  id="table-container" style={{  justifyContent: 'center', alignItems: 'center', marginTop: "20px", overflowX: "auto"  }}>
      <Table striped bordered hover responsive>
        <thead>
          <tr style={{ fontSize:"13px"}}>
            <th>Batch Number</th>
            <th>Product Name</th>
            <th>Mfg Date</th>
            <th>Expiry Date</th>
            <th>MRP</th>
            <th>Quantity</th>
            <th>Volume/Weight</th>
            <th>USP</th>
            <th>Shelf Life</th>
            <th>QR Code</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((batch, index) => {
            const rows = [];
            for (let i = 0; i < batch.quantity; i++) {
              rows.push(
                <tr key={index + i} style={{ fontSize:"13px"}}>
                  <td>{batch.batchNumber}</td>
                  <td>{batch.productName}</td>
                  <td>{batch.mfgDate}</td>
                  <td>{batch.expiryDate}</td>
                  <td>{batch.mrp}</td>
                  <td>{batch.quantity}</td>
                  <td>{batch.value}{batch.measure}</td>
                  <td>{batch.usp}</td>
                  <td>
                    {calculateDays(batch.mfgDate, batch.expiryDate)} Days
                    </td>
                     {/* Display the calculated days */}      
                            
                  <td style={{ display: "flex", gap: "6px" }}>
                    {qrCodeURLs[index + i] && (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img
                      src={qrCodeURLs[index + i]}
                      alt="QR Code"
                      style={{ width: "60px", height: "60px" }}
                    />
                  </div>
                    )}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", }}>
                    <span>Product Name: {batch.productName}</span>
                      <span>Batch Number: {batch.batchNumber} </span>
                      <span>Mfg Date: {batch.mfgDate}</span>
                      <span>Expiry Date: {batch.expiryDate}</span>
                      <span>MRP: {batch.mrp} INR</span>
                      <span>USP: {batch.usp}</span>
                    </div>
                  </td>
                </tr>
              );
            }
            return rows;
          })}
        </tbody>
      </Table>
      <Button variant='danger' onClick={handlePrint}>Print</Button>
    </div>
  );
};

export default BatchTable;
