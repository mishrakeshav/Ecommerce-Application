import { useFormik } from 'formik';
import React,{ useState,useEffect } from 'react';
import axios from 'axios';
// material
import { 
  Container, 
  Stack, 
  Typography,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Button 
} from '@mui/material';
// components
import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../components/_dashboard/products';
//
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PRODUCTS from '../_mocks_/products';
import DrawerCart from '../components/DrawerCart';
import SearchIcon from '@mui/icons-material/Search';
import { getAllProducts,getAllCategory } from '../api/auth';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);
  const [openDrawer, setDrawer] = useState(false);
  const [products, setProducts] = useState({results : []});
  const [searchParameters, setSearchParameters] = useState({});
  const [categories, setCategories] = useState([]);
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
  const handleSearchParameterChange = (e)=>{
    setSearchParameters({...searchParameters,[e.target.name]:e.target.value})
  }
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
  const paginationNext = async ()=>{
      try{
          const data = await axios.get(products.next);
          setProducts(data?.data)
      }catch(error){
          console.log(error);
      }
  }
  const paginationPrev = async ()=>{
      try{
          const data = await axios.get(products.previous);
          setProducts(data?.data);
      }catch(error){
          console.log(error);
      }
  }
  const fetchAllProducts = async ()=>{
    const data = await getAllProducts(searchParameters);
    console.log(data);
    setProducts(data?.data);
  }
  const fetchAllCategories = async ()=>{
    const data = await getAllCategory();
    setCategories(data?.data?.results);
  }
  useEffect(()=>{
    fetchAllProducts();
    fetchAllCategories();
  },[])
  return (
    <Page title="Ecomm | All Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>
        <Paper elevation={5} sx={{ mb: 5 }}>
          <Grid container spacing={3} sx={{padding : '20px'}}>
            <Grid item xs={12} sm={12} lg={6} >
              <TextField
                variant="outlined"
                label="Search for Items"
                name = "name__contains"
                fullWidth
                value={searchParameters.name__contains}
                onChange={handleSearchParameterChange}
              >
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12} lg={3} >
                <TextField
                  variant="outlined"
                  label="Price"
                  name = "ordering"
                  fullWidth
                  value={searchParameters.ordering}
                  onChange={handleSearchParameterChange}
                  select
                >
                  {
                    [
                      {name : 'Low to High', value:'price'},
                      {name : 'High to Low', value:'-price'},
                    ].map((value,idx)=>(
                      <MenuItem value={value.value}>{value.name}</MenuItem>
                    ))
                  }
                </TextField>
            </Grid>
            <Grid item xs={12} sm={12} lg={3} >
                <TextField
                    variant="outlined"
                    label="Category"
                    name = "category"
                    fullWidth
                    value={searchParameters.category}
                    onChange={handleSearchParameterChange}
                    select
                  >
                    {
                      categories.map((value,idx)=>(
                        <MenuItem value={value.id}>{value.name}</MenuItem>
                      ))
                  }
                  </TextField>
            </Grid>
            <Grid item xs={12} sm={12} lg={6} >
              <TextField
                variant="outlined"
                label="Model Number"
                name = "model_number__contains"
                fullWidth
                value={searchParameters.model_number__contains}
                onChange={handleSearchParameterChange}
              >
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12} lg={6} >
              <TextField
                variant="outlined"
                label="Product Specifications"
                name = "other__contains"
                fullWidth
                value={searchParameters.other__contains}
                onChange={handleSearchParameterChange}
              >
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12} lg={12} align="center">
                  <Button variant="contained" onClick={fetchAllProducts}>Apply Filter</Button>
            </Grid>
          </Grid>
        </Paper>
        <div align="right" sx={{ mb: 5 }}>
            <Button disabled={!products.previous} onClick={paginationPrev} ><NavigateBeforeIcon /></Button>
            <Button  disabled={!products.next} onClick={paginationNext} ><NavigateNextIcon /></Button>
        </div>
        {/* <Stack
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
            
          </Stack>
        </Stack> */}

        <ProductList products={products} />
        <div align="right" sx={{ mt: 5 }}>
            <Button disabled={!products.previous} onClick={paginationPrev} ><NavigateBeforeIcon /></Button>
            <Button  disabled={!products.next} onClick={paginationNext} ><NavigateNextIcon /></Button>
        </div>
        {/* <DrawerCart 
           isOpenFilter={openDrawer}
           onOpenFilter={handleOpenDrawer}
           onCloseFilter={handleCloseDrawer}
        /> */}
      </Container>
    </Page>
  );
}
