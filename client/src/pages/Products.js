import { useFormik } from 'formik';
import React,{ useState,useEffect } from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../components/_dashboard/products';
//
import PRODUCTS from '../_mocks_/products';
import DrawerCart from '../components/DrawerCart';
import { getAllProducts } from '../api/auth';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);
  const [openDrawer, setDrawer] = useState(false);
  const [products, setProducts] = useState([]);
  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleOpenDrawer = ()=>{
    setDrawer(true);
  }
  const handleCloseDrawer = ()=>{
    setDrawer(false);
  }
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };
  const fetchAllProducts = async ()=>{
    const data = await getAllProducts();
    setProducts(data?.data);
  }
  useEffect(()=>{
    fetchAllProducts();
  },[])
  return (
    <Page title="Dashboard: Products | Minimal-UI">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1}}>
            <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={products} />
        <DrawerCart 
           isOpenFilter={openDrawer}
           onOpenFilter={handleOpenDrawer}
           onCloseFilter={handleCloseDrawer}
        />
      </Container>
    </Page>
  );
}
