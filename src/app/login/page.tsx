"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { get } from '@/services/ApiRequest';
import { useRouter } from 'next/navigation';




export default function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const router = useRouter();


    const changeEmail = (email: string) => {
        setEmail(email);
    }

    const changeSenha = (senha: string) => {
        setSenha(senha);
    }

    const fazerLogin = async () => {
        const body = {
            email: email,
            senha: senha,
        }
        const user = await get("usuario", body)

        if (user.length > 0) {
            localStorage.setItem("user", JSON.stringify(user[0]));
            router.push("/");
        }
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '10%' }}>
            <Card sx={{ maxWidth: '40%', minHeight: '30%', textAlign: 'center', bgcolor: 'ButtonFace' }}>
                <CardContent>
                    <Typography variant='h4'>
                        Login
                    </Typography>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Email"
                        fullWidth
                        sx={{ mt: 2 }}
                        value={email}
                        onChange={(e) => { changeEmail(e.target.value); }}
                    />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Senha"
                        fullWidth
                        sx={{ mt: 2 }}
                        type='password'
                        value={senha}
                        onChange={(e) => { changeSenha(e.target.value); }}
                    />
                </CardContent>
                <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button variant='contained' onClick={fazerLogin}>Fazer Login</Button>
                </CardActions>
            </Card>

        </Box>

    );
}