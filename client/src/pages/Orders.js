import React from 'react';
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
    Button
} from '@mui/material';

import { alpha, styled } from '@mui/material/styles';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
const CartPaper = styled(Paper)(({ theme }) => ({
    padding : theme.spacing(2),
}));

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
                                            <TableCell>Order ID</TableCell>
                                            <TableCell>Order Status</TableCell>
                                            <TableCell>Total Items</TableCell>
                                            <TableCell>Total Cost</TableCell>
                                            <TableCell> </TableCell>
                                            <TableCell> </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    
                                    <TableRow>
                                            <TableCell>1</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell>Product Name</TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell><Button variant="outlined" sx={{color:'#193498', borderColor:'#193498'}}><OpenInNewIcon/></Button></TableCell>
                                            <TableCell>Cancel Order</TableCell>
                                        </TableRow>
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
