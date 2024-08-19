'use client';

import Image from "next/image";
import getStripe from "../../utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Container, TextField, Button, Typography, Box, AppBar, Toolbar, Grid } from "@mui/material";
import Head from "next/head";

export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' }, 
      // needs to be replaced with { origin: currentOrigin}, before deploying
    })
    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }
  
    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })
  
    if (error) {
      console.warn(error.message)
    }
  }
  return (
    <>
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcard from your text" />
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          backgroundImage: 'url("/images/flashcard1.jpg")',  // Replace with your image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white', // Adjust text color for readability
          textAlign: 'center',
          py: 8, // Adjust padding for spacing
        }}
      >

      </Box>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h2" gutterBottom>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5" gutterBottom>
          The easiest way to create flashcards from your text.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2 }} href="/generate">
          Get Started
        </Button>
        <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
          Learn More
        </Button>
      </Box>
      <Container>
        <Box sx={{ my: 6 }}>
          <Typography variant="h4" gutterBottom>Features</Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
              <Typography>
                Simply input your text and let our software do the rest.
                Creating flashcards has never been easier.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>Smart Flashcards</Typography>
              <Typography>
                Our AI intelligently breaks down your text
                into concise flashcards, perfect for studying.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>Accessible Anywhere</Typography>
              <Typography>
                Access your flashcards from any device, at any time.
                Study on the go with ease.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ my: 6, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>Pricing</Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Box sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
              }}>
                <Typography variant="h5" gutterBottom>Basic Plan</Typography>
                <Typography variant="h6" gutterBottom>0$ / month</Typography>
                <Typography>
                  Get started with our free plan, which includes basic flashcard creation features
                  and limited storage.
                </Typography>
                <Button variant="contained" color="primary" sx={{mt: 2}}>
                  Choose Basic
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
              }}>
                <Typography variant="h5" gutterBottom>Pro Plan</Typography>
                <Typography variant="h6" gutterBottom>1$ / month</Typography>
                <Typography>
                  Upgrade to the Pro Plan for more advanced features, including unlimited flashcards and AI-enhanced study modes.
                </Typography>
                <Button variant="contained" color="primary" sx={{mt: 2}} onClick={handleSubmit}>
                  Choose Pro
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}