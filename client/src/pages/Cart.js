import React from 'react';

import {
    Paper,
    Grid,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Divider,
    Button
} from '@mui/material'
import { alpha, styled } from '@mui/material/styles';
import PublicIcon from '@mui/icons-material/Public';
import DownloadIcon from '@mui/icons-material/Download';
const CartPaper = styled(Paper)(({ theme }) => ({
    padding : theme.spacing(2),
}));


const Cart = () => {
    const genPdf = ()=>{
        // var prtContent = document.getElementById("invoice");
        var printContents = document.getElementById("invoice").innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload()
    }
    return (
        <div>
            <CartPaper  elevation={20}>
                <Grid spacing={3} container id="invoice">
                    <Grid item xs={12} sm={12} lg={12} sx={{margin:'20px'}}>
                        <PublicIcon/>
                        <Typography variant="h4">Ecomm Pvt Limited</Typography>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12} sx={{margin:'20px'}}>
                        <Grid spacing={3} container>
                            <Grid item xs={4} sm={4} lg={4}>
                                <b>From :</b> <br/>
                                Ecomm Pvt Limitted, <br/>
                                Somaiya Ayurvihar, <br/>
                                Sion, <br/>
                                Mumbai West 400022<br/>
                            </Grid>
                            <Grid item xs={4} sm={4} lg={4}>
                                <b>To :</b> <br/>
                                Keshav Mishra, <br/>
                                Somaiya Ayurvihar, <br/>
                                Sion, <br/>
                                Mumbai West 400022<br/>
                            </Grid>
                            <Grid item xs={4} sm={4} lg={4}>
                                <b>Invoice : #00001</b> <br/>
                                Order Id : 4F3S8J <br/>
                                {/* Somaiya Ayurvihar, <br/>
                                Sion, <br/>
                                Mumbai West 400022<br/> */}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                        <CartPaper>
                            <TableContainer>
                                <Table sx={{ minWidth: 650 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell> #</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell>Product Name</TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell>Barcode</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Line Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    <TableRow>
                                            <TableCell> #</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell>Product Name</TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Line Total</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CartPaper>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12} sx={{margin:'20px'}}>
                            <Grid container>
                                <Grid item xs={3} sm={3} lg={3} >
                                    Subtotal
                                </Grid>
                                <Grid item xs={6} sm={6} lg={6} >
                                    <b>1000 Rs</b>
                                </Grid>
                                
                            </Grid>
                            <Divider/>
                            <Grid container>
                                <Grid item xs={3} sm={3} lg={3} >
                                    GST
                                </Grid>
                                <Grid item xs={6} sm={6} lg={6} >
                                    <b>18%</b>
                                </Grid>
                            </Grid>
                            <Divider/>
                            <Grid container>
                                <Grid item xs={3} sm={3} lg={3} >
                                    Total Payable Amount
                                </Grid>
                                <Grid item xs={6} sm={6} lg={6} >
                                    <b>1180 Rs</b>
                                </Grid>
                            </Grid>
                            <Divider/>
                            <Grid container>
                                <Grid item xs={3} sm={3} lg={3} >
                                    Total Amount Paid
                                </Grid>
                                <Grid item xs={6} sm={6} lg={6} >
                                    <b>0 Rs</b>
                                </Grid>
                            </Grid>
                            <Divider/>
                    </Grid>
                </Grid>
                <Grid spacing={3} container>
                    <Grid item xs={12} sm={12} lg={12} align="right">
                        <Button variant="contained" sx={{background : '#3D56B2', margin:'2px'}}>Place Order</Button>
                        <Button variant="contained" sx={{background : '#3D56B2', margin:'2px'}} onClick={genPdf}><DownloadIcon/>Download Invoice</Button>
                    </Grid>
                </Grid>

            </CartPaper>
        </div>
    )
}

export default Cart;
