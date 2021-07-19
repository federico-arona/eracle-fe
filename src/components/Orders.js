import React, { useEffect } from 'react';
import { useState } from "react";
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Title from './Title';

import API from "../utlis/Api";

import readXlsxFile from 'read-excel-file'

// Generate Order Data
function createData(id, ean, asin, name, description, amazonPrice, buyBoxPrice) {
  return { id, ean, asin, name, description, amazonPrice, buyBoxPrice};
}



const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44, 212.79),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99, 212.79),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81, 212.79),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39, 212.79),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79, 212.79),
];


function preventDefault(event) {
  event.preventDefault();
  //getWatchlistData(event);
}

function exportToPdf(event) {
  
  event.preventDefault();
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'arraybuffer';
  xhr.open("GET", "http://127.0.0.1:8000/api/users/1/watchlist/actions/export", true);
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var FileSaver = require('file-saver');
        var blob = new Blob([xhr.response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        FileSaver.saveAs(blob, 'watchlist.xlsx');
      } else {
        console.error(xhr.statusText);
      }
    }
  }.bind(this);
  xhr.onerror = function (e) {
    console.error(xhr.statusText);
  };
  xhr.send(null);  
}

function readPdf(event) {
  
  //event.preventDefault();
  var file = event.target.files[0];
  var eansToSend = [];

  readXlsxFile(file).then((rows) => {
    
    // `rows` is an array of rows
    // each row being an array of cells.
    rows.forEach(element =>
      {
        eansToSend.push(element[0]);
      });
      sendEans(eansToSend);
  });

  event.target.value = null;
}

function sendEans(data)
{
  var myobj = {eans: ""};
  myobj.eans = data; 
  console.log(myobj);

  API.post('users/1/watchlist', myobj)
    .then(response =>  {
        console.log(response);
    })
    .catch(error => {
        //this.setState({ errorMessage: error.message });
        console.log(error);
        console.error('There was an error!', error);  
    });
}

const input = document.getElementById('input')



const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {

  const classes = useStyles();
  const [products, setProduct] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const getWatchlistData = async () => {
  
    API.get('/users/1/watchlist')
    .then(response =>  {
      setProduct(response['data']);
    })
    .catch(error => {
        //this.setState({ errorMessage: error.message });
        console.log(error);
        console.error('There was an error!', error);
       
    });
  }

  useEffect(()  =>{
    getWatchlistData();
  },[])
  
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>EAN</TableCell>
            <TableCell>ASIN</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Amazon Price</TableCell>
            <TableCell align="right">Buy Box Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.ean}>
              <TableCell>{product.ean}</TableCell>
              <TableCell>{product.asin}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell align="right">{product.amazon_price}</TableCell>
              <TableCell align="right">{product.buy_box_price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Grid container spacing={1}>
        <Grid item >
            <div className={classes.seeMore}>
              <Link color="primary" href="#" onClick={getWatchlistData}>
                Refresh
              </Link>
            </div>
          </Grid>
          <Grid item>
            <div className={classes.seeMore}>
              <Link color="primary" href="#" onClick={exportToPdf}>
                Export to xlsx
              </Link>
            </div>
          </Grid>
          <Grid item>
            <div className={classes.seeMore}>
              <input
                type="file"
                value={selectedFile}
                onChange={(e) => readPdf(e)}
              />
            </div>
          </Grid>
      </Grid>
      
      
    </React.Fragment>
  );
}