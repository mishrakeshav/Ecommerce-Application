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
} from '@mui/material';

import { alpha, styled } from '@mui/material/styles';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
const CartPaper = styled(Paper)(({ theme }) => ({
    padding : theme.spacing(2),
}));

const Row = (props)=>{
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
    return (
        <>
        {
            edit ? (
                <TableRow>
                    <TableCell>{props.order?.id}</TableCell>
                    <TableCell>IMAGE</TableCell>
                    <TableCell>
                        {props.order?.id}
                    </TableCell>
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
                    <TableCell>1</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell> <img width="150px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"/></TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell><Button onClick={handleEdit}>EDIT</Button></TableCell>
                    <TableCell><Button onClick={handleDelete}>DELETE</Button></TableCell>

                </TableRow>
            )
        }
        </>
        
    )
}


const Orders = () => {
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
                                            <TableCell></TableCell>
                                            <TableCell>OrderImage</TableCell>
                                            <TableCell>Order ID</TableCell>                                      
                                            <TableCell>Order Status</TableCell>
                                            <TableCell>Total Items</TableCell>
                                            <TableCell>Total Cost</TableCell>
                                            <TableCell> </TableCell>
                                            <TableCell> </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <Row/>
                                   
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
