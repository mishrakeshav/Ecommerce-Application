import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router';
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
import {getUserData,getOrder} from '../api/index';


const CartPaper = styled(Paper)(({ theme }) => ({
    padding : theme.spacing(2),
}));



const Order = (props) => {
    let { id } = useParams();
    const [userData, setUserData] = useState({});
    const [order, setOrder] = useState({item_list : []});
    const genPdf = ()=>{
        // var prtContent = document.getElementById("invoice");
        var printContents = document.getElementById("invoice").innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload()
    }
    const fetchUserData = async  ()=>{
        try{
            const data = await getUserData();
            setUserData(data?.data);
            console.log(data);
        }catch(error){
            console.log(error);
        }
    }
    const fetchOrderData = async ()=>{
        try{
            const data = await getOrder({id:id});
            setOrder(data?.data)
            console.log(order);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchOrderData();
        fetchUserData();
    },[]);
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
                                {userData.first_name} {userData.last_name}, <br/>
                                {userData.username}, <br/>
                                
                                {order.shipping_address}, <br/>
                            </Grid>
                            <Grid item xs={4} sm={4} lg={4}>
                                <b>Invoice : #0000{order.id}</b> <br/>
                                Order Id : 4F3S8{order.id} <br/>
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
                                   
                                            {
                                                order.item_list?.map((value,idx)=>(
                                                    <TableRow>
                                                        <TableCell> {idx + 1}</TableCell>
                                                        {/* {`http://localhost:8000${value.product.image}`} */}
                                                        <TableCell><image src={`http://localhost:8000${value.product.image}`}  /></TableCell>
                                                        <TableCell>{value.product.name}</TableCell>
                                                        <TableCell>{value.quantity}</TableCell>
                                                        <TableCell>{value.product.barcode_number}</TableCell>
                                                        <TableCell>{value.price}</TableCell>
                                                        <TableCell>{value.quantity*value.price}</TableCell>
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
                                    <b>{order.total_price} Rs</b>
                                </Grid>
                                
                            </Grid>
                            <Divider/>
                            <Grid container>
                                <Grid item xs={3} sm={3} lg={3} >
                                    GST
                                </Grid>
                                <Grid item xs={6} sm={6} lg={6} >
                                    <b>{order.total_price + order.total_price*0.18} Rs</b>
                                </Grid>
                            </Grid>
                            <Divider/>
                            <Grid container>
                                <Grid item xs={3} sm={3} lg={3} >
                                    Total Payable Amount
                                </Grid>
                                <Grid item xs={6} sm={6} lg={6} >
                                    <b>{order.total_price + order.total_price*0.18} Rs</b>
                                </Grid>
                            </Grid>
                            <Divider/>
                            <Grid container>
                                <Grid item xs={3} sm={3} lg={3} >
                                    Total Amount Paid
                                </Grid>
                                <Grid item xs={6} sm={6} lg={6} >
                                    {
                                        order.status ==='DL' ? (
                                            <b>{order.total_price + order.total_price*0.18} Rs</b>
                                        ) : (
                                            <b>0 Rs</b>
                                        )
                                    }
                                    
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
                        {/* <Button variant="contained" sx={{background : '#3D56B2', margin:'2px'}}>Place Order</Button> */}
                        <Button variant="contained" sx={{background : '#3D56B2', margin:'2px'}} onClick={genPdf}><DownloadIcon/>Download Invoice</Button>
                    </Grid>
                </Grid>

            </CartPaper>
        </div>
    )
}

export default Order;
