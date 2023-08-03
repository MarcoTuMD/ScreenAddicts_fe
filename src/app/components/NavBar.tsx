"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';


import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

import { useEffect, useState } from 'react';



function NavBar() {
    const router = useRouter();
    const [user, setUser] = useState<any>({});

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user") || ""));
    }, [])

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between', display: 'flex' }}>
                    <Box onClick={() => { router.push("/"); }} sx={{
                        '&:hover': {
                            cursor: 'pointer'
                        },
                    }}>
                        <Typography variant="h5" color="white">ScreenAddicts</Typography>
                    </Box>

                    <Box sx={{
                        display: 'flex', '&:hover': {
                            cursor: 'pointer'
                        },
                    }} onClick={() => { router.push("/usuario"); }}>
                        <Avatar />
                        <Typography variant="body1" color="white" sx={{ mt: 1, ml: 1 }}>{user.nome}</Typography>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavBar;