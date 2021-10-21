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
    TextField,
    Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { alpha, styled } from '@mui/material/styles';
import { getCartItems } from '../api';
import Cart from './Cart';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
const CartPaper = styled(Paper)(({ theme }) => ({
    padding : theme.spacing(2),
}));

const Row = (props)=>{
    console.log('here');
    const [edit, setEdit] = useState(false);
    const [quantity, setQuantity] = useState(props.order.quantity);
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
                    <TableCell>{props.order?.id}</TableCell>
                    <TableCell> <img width="150px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"/></TableCell>
                    
                    <TableCell>
                        <TextField
                            variant="outlined"
                            size="small"
                            label="Quantity"
                            type="number"
                            value={quantity}
                            onChange={(e)=>{
                                setQuantity(e.target.value);
                            }}
                        />
                    </TableCell>
                    <TableCell>{props.order?.price}</TableCell>
                    <TableCell></TableCell>
                    
                    <TableCell>
                            <Button 
                                variant="contained" 
                                sx={{background : '#3D56B2', margin:'2px'}}
                                onClick={handleEdit}>
                                    <SaveIcon/>
                                </Button>
                    </TableCell>
                    <TableCell>
                        <Button  
                            variant="contained" 
                            sx={{background : 'red', margin:'2px'}}
                            onClick={handleDelete}>
                            <DeleteIcon/>
                        </Button>
                    </TableCell>

                </TableRow>
            )
        }
        </>
        
    )
}


const Orders = () => {
    const [cartItems, setCartItems] = useState({results : []});
    const [placeOrder, setPlaceOrder] = useState(localStorage.getItem('placeOrder')==='YES');
    const fetchAllOrders = async ()=>{
        const data = await getCartItems();
        console.log(data?.data);
        setCartItems(data?.data);
    }
    const postPlaceOrder = ()=>{
        localStorage.setItem('placeOrder', 'YES');
        setPlaceOrder(true);
    }
    const cancelPlaceOrder = ()=>{
        localStorage.setItem('placeOrder', 'No');
        setPlaceOrder(false);
    }
    useEffect(()=>{
    fetchAllOrders();
    },[])

     

    return (
        <>
           {!placeOrder ? (

            <Grid spacing={3} container>
            <Grid item xs={12} sm={12} lg={12} sx={{margin:'20px'}}>
                <Typography variant="h5">My Cart</Typography>
            </Grid>
            <Grid item xs={12} sm={12} lg={12}>
                        <CartPaper elevation={10}>
                            <TableContainer>
                                <Table sx={{ minWidth: 650 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell> #</TableCell>
                                            {/* <TableCell></TableCell> */}
                                            <TableCell>Order ID</TableCell>                                      
                                            <TableCell>Product Image</TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Line Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            cartItems.results.map((value,idx)=>(
                                                <Row order={value} idx={idx}/>
                                            ))
                                        }
                                        
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CartPaper>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                    <CartPaper elevation={10}>
                        <Grid spacing={3} container sx={{padding : '20px'}}>
                            <Grid item xs={12} sm={12} lg={12}>
                                <Typography variant="h5">Shipping Details</Typography>
                                <Divider/>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={12}>
                                <TextField
                                    variant="outlined"
                                    multiline
                                    fullWidth
                                    label="Shipping Address"
                                    rows={3}
                                >

                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={4}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Pincode"
                                >

                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={4}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="City"
                                >

                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={4}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="State"
                                >

                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={12} align="center">
                                <Button
                                    variant="contained"
                                    sx={{background : '#3D56B2', margin:'2px'}}
                                    onClick={postPlaceOrder}
                                >
                                    <AddShoppingCartIcon/> Place Order
                                </Button>
                            </Grid>
                        </Grid>
                    </CartPaper>
                    </Grid>
            </Grid>
            ) : (
                <Cart back={true} cancelPlaceOrder={cancelPlaceOrder}/>
            )}
        
        </>
    )
}

export default Orders;
