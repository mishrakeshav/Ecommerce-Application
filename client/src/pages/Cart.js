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


const Cart = (props) => {
    const genPdf = ()=>{
        // var prtContent = document.getElementById("invoice");
        var printContents = document.getElementById("invoice").innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload()
    }
    let total = 0;
    props.cartItems.results.map((value,idx)=>{
        total += parseInt(value.product.price)*parseInt(value.quantity)
    })
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
                                {props.userData.first_name} {props.userData.last_name}, <br/>
                                {props.shippingDetails.address}, <br/>
                                {props.shippingDetails.city} {props.shippingDetails.state} {props.shippingDetails.pincode} <br/>
                               
                            </Grid>
                            {/* <Grid item xs={4} sm={4} lg={4}>
                                <b>Invoice : </b> <br/>
                                <b>Order Id :</b>  <br/>
                            </Grid> */}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                        <CartPaper>
                            <TableContainer>
                                <Table sx={{ minWidth: 650 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell> #</TableCell>
                                           
                                            <TableCell>Product Name</TableCell>
                                            <TableCell>Model </TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Line Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            props.cartItems.results.map((value,idx)=>(
                                                <TableRow>
                                                    <TableCell> {idx + 1}</TableCell>
                                                   
                                                    <TableCell>{value.product.name}</TableCell>
                                                    <TableCell>{value.product.model_number}</TableCell>
                                                    <TableCell>{value.quantity}</TableCell>
                                                    <TableCell>{value.price} Rs</TableCell>
                                                    
                                                    <TableCell>{value.quantity*value.price} Rs</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    
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
                                    <b>{total} Rs</b>
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
                                    <b>{total + total*0.18} Rs</b>
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
                        {
                            props.back && (
                                <Button variant="contained" sx={{background : '#3D56B2', margin:'2px'}} onClick={props.cancelPlaceOrder}>Back</Button>
                            )
                        }
                        <Button variant="contained" sx={{background : '#3D56B2', margin:'2px'}} onClick={props.finalPlaceOrder}>Place Order</Button>
                        <Button variant="contained" sx={{background : '#3D56B2', margin:'2px'}} onClick={genPdf}><DownloadIcon/>Download Invoice</Button>
                    </Grid>
                </Grid>

            </CartPaper>
        </div>
    )
}

export default Cart;
