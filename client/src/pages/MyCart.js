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
import { toast } from 'react-toastify';
import {getUserData,placeUserOrder,updateCartItem, deleteCartItem} from '../api/index';
import { useNavigate } from 'react-router';


import OpenInNewIcon from '@mui/icons-material/OpenInNew';
const CartPaper = styled(Paper)(({ theme }) => ({
    padding : theme.spacing(2),
}));

const Row = (props)=>{
    console.log('here');
    const [edit, setEdit] = useState(false);
    const [quantity, setQuantity] = useState(props.order.quantity);
    const handleEdit = async ()=>{
        try{
            const data = await updateCartItem({quantity:parseInt(quantity), price : props.order.price, id : props.order.id});
            
            toast('Order Item Updated');
            window.location.reload();
            
        }catch(error){
            console.log(error);
        }
        setEdit(true);
    }
    const handleDelete = async ()=>{
        try{
            const data = await deleteCartItem({id : props.order.id});
            toast('Order Item Deleted');
            window.location.reload();
            
        }catch(error){
            console.log(error);
        }
        setEdit(false);
    }
    const handleUpdate = ()=>{
        setEdit(false)
    }
    // const handleU
      
    return (
        <>
                <TableRow>
                    <TableCell>{props.idx+1}</TableCell>
                    <TableCell>{props.order?.id}</TableCell>
                    
                    <TableCell> <img  src={`http://localhost:8000${props.order.product.image}/`}  height="100px"/></TableCell>
                    <TableCell>{props.order?.product.name}</TableCell>
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
                    <TableCell>{props.order?.price*props.order.quantity}</TableCell>
                    
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
        </>
        
    )
}


const Orders = () => {
    const [cartItems, setCartItems] = useState({results : []});
    const [placeOrder, setPlaceOrder] = useState(localStorage.getItem('placeOrder')==='YES');
    const [shippingDetails, setShippingDetails] = useState(JSON.parse(localStorage.getItem('shippingDetails')) || {});
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const handleShippingDetailChange = (e)=>{
        setShippingDetails({...shippingDetails, [e.target.name]:e.target.value});
    }
    const fetchAllOrders = async ()=>{
        const data = await getCartItems();
        console.log(data?.data);
        setCartItems(data?.data);
    }
    
    const postPlaceOrder = ()=>{
        if(
            !shippingDetails.address || shippingDetails.address === '' ||
            !shippingDetails.pincode || shippingDetails.pincode === '' ||
            !shippingDetails.city || shippingDetails.city === '' ||
            !shippingDetails.state || shippingDetails.state === '' 
        ){
            toast('Please Enter All Shipping Details');
            return;
        };
        if(cartItems.results.length === 0){
            toast('There are not items in Cart');
            return;
        }
        localStorage.setItem('shippingDetails', JSON.stringify(shippingDetails));
        localStorage.setItem('placeOrder', 'YES');
        setPlaceOrder(true);
    }
    const cancelPlaceOrder = ()=>{
        localStorage.setItem('placeOrder', 'NO');
        setPlaceOrder(false);
    }
    const finalPlaceOrder = async ()=>{
        let orderItems = [];
        cartItems.results.map((value,idx)=>{
            orderItems.push(value.id);
        })
        console.log(orderItems)
        const data = await placeUserOrder({
            shipping_address : shippingDetails.address,
            pincode : shippingDetails.pincode,
            city : shippingDetails.city,
            state : shippingDetails.city,
            order_item : orderItems
        })
        if(data?.status===200){
            localStorage.setItem('placeOrder', 'NO');
            toast('Your order has been placed');
            navigate('/dashboard/CartNew/', { replace: true });
        }
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
    useEffect(()=>{
    fetchAllOrders();
    fetchUserData();
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
                                            <TableCell>Product Name</TableCell>
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
                                    name="address"
                                    value={shippingDetails.address}
                                    onChange={handleShippingDetailChange}
                                    rows={3}
                                >

                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={4}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Pincode"
                                    name="pincode"
                                    value={shippingDetails.pincode}
                                    onChange={handleShippingDetailChange}
                                >

                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={4}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="City"
                                    name="city"
                                    value={shippingDetails.city}
                                    onChange={handleShippingDetailChange}
                                >

                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={4}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="State"
                                    name="state"
                                    value={shippingDetails.state}
                                    onChange={handleShippingDetailChange}
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
                <Cart fetchAllOrders={fetchAllOrders} finalPlaceOrder={finalPlaceOrder} cartItems={cartItems} back={true} userData={userData} cancelPlaceOrder={cancelPlaceOrder} shippingDetails={shippingDetails}/>
            )}
        
        </>
    )
}

export default Orders;
