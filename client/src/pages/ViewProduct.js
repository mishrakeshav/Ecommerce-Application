import React from 'react';
import ProductImage from '../components/ProductImage/ProductImage';
import {
    Button,
    Grid,
    Paper,
    Typography
} from '@mui/material';
import shoppingCartFill from '@iconify/icons-eva/shopping-cart-fill';
import { Icon } from '@iconify/react';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { toast } from 'react-toastify';
import ShareIcon from '@mui/icons-material/Share';
import Barcode from 'react-barcode';

const ViewProduct = () => {
    
    return (
        <div>
            <Grid  container spacing={3} sx={{padding : '10px'}}>
                <Grid item xs={12} sm={12} lg={12}>
                    <Typography variant="h3">Product Details : SAMSUNG Galaxy F12 (Sea Green, 64 GB)  (4 GB RAM)</Typography>
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                    <Grid container spacing={3} my={1}>
                        <Grid item xs={3} sm={3} lg={3}>
                            <b>Product Name :</b>
                        </Grid>
                        <Grid item xs={9} sm={9} lg={9}>
                            SAMSUNG Galaxy F12 (Sea Green, 64 GB)  (4 GB RAM)
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} my={1}>
                        <Grid item xs={3} sm={3} lg={3}>
                            <b>Price :</b>
                        </Grid>
                        <Grid item xs={9} sm={9} lg={9}>
                        ₹ 9499.0 
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} my={1}>
                        <Grid item xs={3} sm={3} lg={3}>
                            <b>Quantity Availabe :</b>
                        </Grid>
                        <Grid item xs={9} sm={9} lg={9}>
                            10
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} my={1}>
                        <Grid item xs={3} sm={3} lg={3}>
                            <b>Product Category :</b>
                        </Grid>
                        <Grid item xs={9} sm={9} lg={9}>
                            10
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} my={1}>
                        <Grid item xs={3} sm={3} lg={3}>
                            <b>Brand Name :</b>
                        </Grid>
                        <Grid item xs={9} sm={9} lg={9}>
                            Samsung
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} my={1}>
                        <Grid item xs={3} sm={3} lg={3}>
                            <b>Model No:</b>
                        </Grid>
                        <Grid item xs={9} sm={9} lg={9}>
                            SAMSUNG Galaxy F12
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} my={1}>
                        <Grid item xs={3} sm={3} lg={3}>
                            <b>Other Details:</b>
                        </Grid>
                        <Grid item xs={9} sm={9} lg={9}>
                            
                            12 GB RAM | 256 GB ROM
                            19.3 cm (7.6 inch) QXGA+ Display
                            12MP + 12MP + 12MP | 10MP Front Camera
                            4400 mAh Lithium-ion Battery
                            Qualcomm Snapdragon 888 Octa-Core Processor
                        </Grid>
                        <Grid item xs={8} sm={8} lg={12} align="center">
                            <Barcode value="barcodenumber" />
                        </Grid>
                    </Grid>
                    
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                    <ProductImage/>
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                    <Button variant="contained" fullWidth my={1} sx={{padding:'10px', background : '#5C7AEA'}}> 
                        <Typography variant="h5">Add to Cart</Typography>
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                    <Button variant="contained" fullWidth  sx={{padding:'10px'}} > 
                        <Typography variant="h5" >Add to Wishlist  </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                    <Button 
                        variant="contained" 
                        fullWidth 
                        onClick={() =>  {
                            navigator.clipboard.writeText('http://localhost:3000/dashboard/products/1');
                            toast("Product Link Copied to Clipboard");
                            }
                        }  
                        sx={{padding:'10px', background:'#3D2C8D'}} 
                        > 
                        <ShareIcon />  
                    </Button>
                </Grid>
            </Grid>
            
        </div>
    )
}

export default ViewProduct;
