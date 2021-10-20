import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import products from 'src/_mocks_/products';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];

function SwipeableTextMobileStepper({product}) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: '100%', flexGrow: 1 }}>
      {/* <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{images[activeStep].label}</Typography>
      </Paper> */}
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        align="center"
      >
        {
          product.image && (
            <div key={product.image}>
              <Box
                component="img"
                sx={{
                  height: 600,
                  display: 'block',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  // width: '100%',
                }}
                src={product.image}
                alt={product.name}
              />
          </div>
          )
        }
        {
          product.image1 && (
            <div key={product.image1}>
              <Box
                component="img"
                sx={{
                  height: 600,
                  
                  display: 'block',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  // width: '100%',
                }}
                src={product.image1}
                alt={product.name}
              />
          </div>
          )
        }
        {/* {
          product.image2 && (
            <div key={product.image2}>
              <Box
                component="img"
                sx={{
                  height: 600,
                  // width : 300,
                  display: 'block',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  // width: '100%',
                }}
                src={product.image2}
                alt={product.name}
              />
          </div>
          )
        } */}
        {
          product.image2 && (
            <div key={product.image2}>
              <Box
                component="img"
                sx={{
                  height: 600,
                  // width : 300,
                  display: 'block',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  // width: '100%',
                }}
                src={product.image2}
                alt={product.name}
              />
          </div>
          )
        }
        {
          product.image3 && (
            <div key={product.image3}>
              <Box
                component="img"
                sx={{
                  height: 600,
                  // width : 300,
                  display: 'block',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  // width: '100%',
                }}
                src={product.image3}
                alt={product.name}
              />
          </div>
          )
        }
        {
          product.image4 && (
            <div key={product.image4}>
              <Box
                component="img"
                sx={{
                  height: 600,
                  // width : 300,
                  display: 'block',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  // width: '100%',
                }}
                src={product.image4}
                alt={product.name}
              />
          </div>
          )
        }
        {
          product.image5 && (
            <div key={product.image5}>
              <Box
                component="img"
                sx={{
                  height: 600,
                  // width : 300,
                  display: 'block',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  // width: '100%',
                }}
                src={product.image5}
                alt={product.name}
              />
          </div>
          )
        }
        
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default SwipeableTextMobileStepper;
