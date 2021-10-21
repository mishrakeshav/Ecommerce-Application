// material
import React,{useState,useEffect} from 'react';
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';

import {getCounts} from '../api/auth';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';
import DailySales from '../components/DailySales';
import MonthlySales from '../components/MonthlySales';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [counts, setCounts] = useState({});
  const fetchCounts = async ()=>{
    const data = await getCounts();
    setCounts(data?.data);
  }
  useEffect(()=>{
    fetchCounts();
  },[])
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales counts={counts} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers  counts={counts} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders  counts={counts} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports  counts={counts} />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid> */}

          <Grid item xs={12} md={6} lg={12}>
            <DailySales />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <MonthlySales />
          </Grid>

         
        </Grid>
      </Container>
    </Page>
  );
}
