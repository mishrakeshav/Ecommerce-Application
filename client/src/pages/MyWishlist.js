import React,{useState, useEffect} from 'react';
import {
    Grid,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    TextField
} from '@mui/material'
;

import { alpha, styled } from '@mui/material/styles';
import { getAllOrders } from '../api';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
const CartPaper = styled(Paper)(({ theme }) => ({
    padding : theme.spacing(2),
}));

const Row = (props)=>{
    console.log('here');
    const [edit, setEdit] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const handleEdit = ()=>{
        setEdit(true);
    }
    const handleDelete = ()=>{
        setEdit(false);
    }
    const handleUpdate = ()=>{
        setEdit(false)
    }
    // const handleU
    let order_status;
    if(props.order.status == 'DL'){
        order_status = 'Delivered'
    }else if(props.order.status == 'CA'){
        order_status = 'In Cart';
    }else if(props.order.status == 'PL'){
        order_status = 'Placed';
    }else if(props.order.status == 'PK'){
        order_status = 'Packed';
    }else if(props.order.status == 'SH'){
        order_status = 'Shipped';
    }
      
    return (
        <>
        {
            edit ? (
                <TableRow>
                    <TableCell>{props.order?.id}</TableCell>

                    {/* <TableCell>
                        {props.order?.id}
                    </TableCell> */}
                    <TableCell>
                        <TextField
                            variant="outlined"
                            fullwdith
                            size="small"
                            label="Quantity"
                            type="number"
                            value={quantity}
                            onChange={(e)=>{
                                setQuantity(e.target.value);
                            }}
                        />
                    </TableCell>
                    <TableCell>
                        {props.order?.price}
                    </TableCell>
                    <TableCell>
                    {props.order?.category}
                    </TableCell>
                    <TableCell>
                        <Button variant="outlined" sx={{color:'#193498', borderColor:'#193498'}}>
                            Update
                        </Button>
                    </TableCell>
                    <TableCell><Button onClick={handleDelete}>Cancel</Button></TableCell>
            </TableRow>

            ): (
                <TableRow>
                    <TableCell>{props.idx+1}</TableCell>
                    <TableCell> <img width="150px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"/></TableCell>
                    <TableCell>{props.order?.id}</TableCell>
                    <TableCell>{order_status}</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>{props.order?.price}</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>{props.order?.shipping_address}</TableCell>
                    <TableCell><Button onClick={handleEdit}>EDIT</Button></TableCell>
                    <TableCell><Button onClick={handleDelete}>DELETE</Button></TableCell>

                </TableRow>
            )
        }
        </>
        
    )
}


const Orders = () => {
    const [orders, setOrders] = useState([]);
    const fetchAllOrders = async ()=>{
        
        const data = await getAllOrders();
        console.log(data?.data);
        setOrders(data?.data);
      }
    useEffect(()=>{
    fetchAllOrders();
    },[])

     

    return (
        <CartPaper elevation={15}>
            <Grid spacing={3} container>
            <Grid item xs={12} sm={12} lg={12} sx={{margin:'20px'}}>
                <Typography variant="h5">All Orders</Typography>
            </Grid>
            <Grid item xs={12} sm={12} lg={12}>
                        <CartPaper>
                            <TableContainer>
                                <Table sx={{ minWidth: 650 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell> #</TableCell>
                                            {/* <TableCell></TableCell> */}
                                            <TableCell>Order Image</TableCell>
                                            <TableCell>Order ID</TableCell>                                      
                                            <TableCell>Order Status</TableCell>
                                            <TableCell>Total Items</TableCell>
                                            <TableCell>Total Cost</TableCell>
                                            <TableCell> Category </TableCell>
                                            <TableCell> Shipping Address </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            orders.map((value,idx)=>(
                                                <Row order={value} idx={idx}/>
                                            ))
                                        }
                                        
                                   
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CartPaper>
                    </Grid>
            </Grid>
        </CartPaper>
    )
}

export default Orders;
