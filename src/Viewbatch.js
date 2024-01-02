import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import Papa from 'papaparse';
import { Modal } from 'react-bootstrap';
import QRCode from 'qrcode';
import { generateClient } from 'aws-amplify/api';
import * as queries from './graphql/queries';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@aws-amplify/ui-react';

const client = generateClient();

const Viewbatch = () => {
  const [batch, setBatch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrCodes, setQrCodes] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchBatch = async () => {
      try {
        const batchData = await client.graphql({
          query: queries.getBatch,
          variables: { id: id }
        });
        const batchInfo=batchData.data.getBatch;
        setBatch(batchInfo)
        console.log(batchData)
      } catch (error) {
        console.error('Error fetching batch:', error);
      }
    };

    fetchBatch();
  }, [id]);

  const handleExportCSV = () => {
    if (!batch) return;
  
    const rows = [
      ['ProductName', 'BatchNumber', 'MfgDate', 'ExpiryDate', 'MRP', 'USP', 'Link'],
    ];
  
    for (let i = 0; i < batch.quantity; i++) {
      rows.push([
        batch.productName,
        batch.batchNumber,
        new Date(batch.mfgDate).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        new Date(batch.expiryDate).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        batch.mrp,
        batch.usp,
        batch.link,
      ]);
    }
  
    const csv = Papa.unparse(rows);
    const csvBlob = new Blob([csv], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvBlob);
  
    // Create a link and trigger a click to start the download
    const link = document.createElement('a');
    link.href = csvUrl;
    link.setAttribute(
      'download',
      `${batch.cpyName} ${batch.productName} ${batch.batchNumber} ${batch.mfgDate}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const generateQRCodes = async () => {
    if (!batch) return;

    const codes = await Promise.all(
      Array.from({ length: batch.quantity }, (_, index) => {
        return QRCode.toDataURL(batch.link);
      })
    );

    setQrCodes(codes);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<div style="margin: 10px;">');
  
    const codesPerPage = 4;
  
    for (let i = 0; i < qrCodes.length; i += codesPerPage) {
      const codesInRow = qrCodes.slice(i, i + codesPerPage);
  
      printWindow.document.write('<div style="display: flex; flex-wrap: wrap;">');
  
      codesInRow.forEach((code, index) => {
        printWindow.document.write(`
          <div style="margin: 20px; display: flex; align-items: center;">
            <img src="${code}" alt="QR Code ${i + index + 1}" style="width: 60px; height: 60px; margin-right: 10px;" />
            <div style="font-size: 10px; display: flex; flex-direction: column;">
              <span>Product Name: ${batch.productName}</span>
              <span>Batch Number: ${batch.batchNumber}</span>
              <span>Mfg Date: ${batch.mfgDate}</span>
              <span>Expiry Date: ${batch.expiryDate}</span>
              <span>MRP: ${batch.mrp} INR</span>
              <span>USP: ${batch.usp}</span>
            </div>
          </div>
        `);
      });
  
      printWindow.document.write('</div>');
    }
  
    printWindow.document.write('</div></body></html>');
    printWindow.document.close();
    printWindow.print();
  };
  
 

  return (
    <div>
    
      <div style={{ margin:"10px"}}>
      <Table highlightOnHover={true}>
    <TableHead>
      <TableRow>
        <TableCell as="th" colSpan={2} style={{ textAlign:"center", fontSize:"20px"}}>
         Batch Details
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody style={{ textAlign:"center", fontSize:"10px"}}>
    {batch && (
      <>
      <TableRow >
                <TableCell>Batch Name</TableCell>
                <TableCell>{batch.batchNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>{batch.productName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity </TableCell>
                <TableCell>{batch.quantity}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>MRP </TableCell>
                <TableCell>{batch.mrp}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Volume </TableCell>
                <TableCell>{batch.value}{batch.measure}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>USP </TableCell>
                <TableCell>{batch.usp}</TableCell>
              </TableRow>
              <TableRow>
                  <TableCell>Mfg Date</TableCell>
                  <TableCell>{batch.mfgDate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Expiry Date</TableCell>
                  <TableCell>{batch.expiryDate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Website Link</TableCell>
                  <TableCell>{batch.link}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><Button variation="primary" colorTheme="success" onClick={generateQRCodes}>Print QR Codes</Button></TableCell>
                  <TableCell><Button variation="primary" colorTheme="info" onClick={handleExportCSV}>Export CSV file</Button></TableCell>
                </TableRow>
                </>
       )}
        </TableBody>
  </Table>

   {/* React Bootstrap Modal for displaying QR codes */}
   <Modal show={isModalOpen} onHide={closeModal} dialogClassName="modal-90w">
  <Modal.Header closeButton style={{ display:"flex", justifyContent:"space-between", gap:"12px"}}>
    <Modal.Title>QR Codes</Modal.Title>
    <Button variation="primary" onClick={handlePrint}>Print</Button>
  </Modal.Header>
  <Modal.Body>
    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
      {qrCodes.map((code, index) => (
        <div key={index} style={{ marginBottom: '20px', display: 'flex',  alignItems: 'center', minWidth: '200px' }}>
          <img src={code} alt={`QR Code ${index + 1}`} style={{ width: '60px', height: '60px', marginBottom: '5px' }} />
          <div style={{ textAlign: 'center', fontSize: '10px', display:"flex", flexDirection:"column" }}>
            <span>Product Name: {batch.productName}</span>
            <span>Batch Number: {batch.batchNumber}</span>
            <span>Mfg Date: {batch.mfgDate}</span>
            <span>Expiry Date: {batch.expiryDate}</span>
            <span>MRP: {batch.mrp} INR</span>
            <span>USP: {batch.usp}</span>
          </div>
        </div>
      ))}
    </div>
  </Modal.Body>
  <Modal.Footer>
  <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
      
  </Modal.Footer>
</Modal>


     
      </div>
    </div>
  )
}

export default Viewbatch
