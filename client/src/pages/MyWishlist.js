import React,{useState, useEffect} from 'react';
import {toast} from 'react-toastify';
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
import { getWishlist, removeWishlist } from '../api';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
const CartPaper = styled(Paper)(({ theme }) => ({
    padding : theme.spacing(2),
}));

const Row = (props)=>{
    console.log('here');

    const [edit, setEdit] = useState(false);
    const handleEdit = ()=>{
        setEdit(true);
    }
    const handleDelete = ()=>{
        setEdit(false);
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
                        {props.order?.product?.price}
                    </TableCell>
                    <TableCell>
                    {props.order?.product?.category}
                    </TableCell>
                    <TableCell><Button onClick={handleDelete}>Cancel</Button></TableCell>
            </TableRow>

            ): (
                <TableRow>
                    <TableCell>{props.idx+1}</TableCell>
                    <TableCell> <img width="150px" src={ 'http://localhost:8000' +  props.order?.product?.image } /></TableCell>
                    <TableCell>{props.order?.product?.id}</TableCell>
                    <TableCell>{props.order?.product?.price}</TableCell>
                    <TableCell>Category</TableCell>
                    {/* <TableCell><Button onClick={handleEdit}>EDIT</Button></TableCell> */}
                    <TableCell><Button onClick={handleDelete}>DELETE</Button></TableCell>

                </TableRow>
            )
        }
        </>

    )
}


const Orders = () => {
    const [orders, setOrders] = useState([]);

    const fetchWishlist = async ()=>{
        const data = await getWishlist();
        console.log('Got Wishlist: ')
        console.log(data?.data?.results);
        setOrders(data?.data?.results);
      }
    const handleDelete = async (id)=>{
        const data = await removeWishlist({id:id});
        toast ('Item Deleted from Wishlist');
        fetchWishlist();
    }
    useEffect(
        ()=>{
            fetchWishlist();
    },
    [])



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
                                            <TableCell>Product Image</TableCell>
                                            <TableCell>Product ID</TableCell>
                                            <TableCell>Product Cost</TableCell>
                                            <TableCell> Category </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            orders.map((value,idx)=>(
                                                <TableRow>
                                                <TableCell>{idx+1}</TableCell>
                                                <TableCell> <img width="150px" src={ 'http://localhost:8000' +  value?.product?.image } /></TableCell>
                                                <TableCell>{value?.product?.id}</TableCell>
                                                <TableCell>{value?.product?.price}</TableCell>
                                                <TableCell>Category</TableCell>
                                                {/* <TableCell><Button onClick={handleEdit}>EDIT</Button></TableCell> */}
                                                <TableCell><Button onClick={()=>{handleDelete(value.id)}}>DELETE</Button></TableCell>
                            
                                            </TableRow>
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
