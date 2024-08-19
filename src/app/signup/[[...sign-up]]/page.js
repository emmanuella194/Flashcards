import React from 'react';
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material';
import { SignIn, SignUp } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignUpPage() {
    return (
        <>
            <AppBar position='static' sx={{ backgroundColor: "#3f51b5" }}>
                <Toolbar>
                    <Typography variant='h6' sx={{ flexGrow: 1, color: 'white' }}>
                        Flashcard SaaS
                    </Typography>
                    <Button>
                        <Link href="/sign-in" passHref>
                            <Typography sx={{ color: 'white' }}>
                                Login
                            </Typography>
                        </Link>
                    </Button>
                    <Button>
                        <Link href="/sign-up" passHref>
                            <Typography sx={{ color: 'white' }}>
                                Sign Up
                            </Typography>
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                sx={{ textAlign: 'center', my: 4 }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Sign In
                </Typography>
                <SignIn />
            </Box>
        </>
    );
}
