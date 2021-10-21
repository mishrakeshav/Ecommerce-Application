import React from 'react'
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack,Button } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';
import shoppingCartFill from '@iconify/icons-eva/shopping-cart-fill';
import heartOutline from '@iconify/icons-eva/heart-outline';
import heartFill from '@iconify/icons-eva/heart-fill';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';
import {addItemToCart, addItemToWishlist} from '../../../api';
// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ product }) {
  const { name, cover, price, image } = product;
  const addToCart = async ()=>{
    const data = await addItemToCart({product : product.id, quantity : 1});
    toast('Item Added to Cart')
  }

  const addToWishlist = async ()=>{
    const data = await addItemToWishlist({product : product.id});
    toast('Item Added to Wishlist')
  }

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={name} src={image} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={`/dashboard/products/${product.id}`} color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}

          <Typography variant="subtitle1">
            &nbsp;
            {`₹ ${price} `}
          </Typography>
          <Button variant="outlined" onClick={addToCart}><Icon icon={shoppingCartFill} width={24} height={24} /></Button>
          <Button variant="outlined" onClick={addToWishlist}><Icon icon={heartOutline} width={24} height={24} /></Button>
        </Stack>
      </Stack>
    </Card>
  );
}
