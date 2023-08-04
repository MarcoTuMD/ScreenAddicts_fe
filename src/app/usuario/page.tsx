"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Paper, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EditNomeDialog from '../components/edit/editNomeDialog';
import EditEmailDialog from '../components/edit/editEmailDialog';
import EditDataDialog from '../components/edit/editDataNascDialog';
import EditDataNascDialog from '../components/edit/editDataNascDialog';
import EditCpfDialog from '../components/edit/editCpfDialog';
import EditSenhaDialog from '../components/edit/editSenhaDialog';
import ExcluirContaDialog from '../components/ExcluirContaDialog';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';







export default function Usuario() {

    const [user, setUser] = useState<any>({});

    const [openNome, setOpenNome] = useState(false);
    const [openEmail, setOpenEmail] = useState(false);
    const [openDataNsc, setOpenDataNsc] = useState(false);
    const [openCpf, setOpenCpf] = useState(false);
    const [openSenha, setOpenSenha] = useState(false);
    const [openExcluirConta, setOpenExcluirConta] = useState(false);
    const router = useRouter();





    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user") || ""));
    }, [openNome, openEmail, openDataNsc, openCpf, openSenha])

    useEffect(() => {
        if (localStorage.getItem("user") == "{}") {
            router.push("/login")
        }
    }, [])


    const sair = () => {
        localStorage.setItem("user", "{}");
        router.push("/login")
    }


    return (
        <>
            <NavBar />
            <EditNomeDialog open={openNome} onClose={() => { setOpenNome(false) }} />
            <EditEmailDialog open={openEmail} onClose={() => { setOpenEmail(false) }} />
            <EditDataNascDialog open={openDataNsc} onClose={() => { setOpenDataNsc(false) }} />
            <EditCpfDialog open={openCpf} onClose={() => { setOpenCpf(false) }} />
            <EditSenhaDialog open={openSenha} onClose={() => setOpenSenha(false)} />
            <ExcluirContaDialog open={openExcluirConta} onClose={() => setOpenExcluirConta(false)} />

            <Typography variant="h4" sx={{ ml: "35%", mt: 2 }}>Informações do usuario: </Typography>
            <Box sx={{ mt: 5, width: "90%", ml: "5%" }}>
                <Paper elevation={3} sx={{ p: 1, display: 'flex', justifyContent: "space-between" }}>
                    <Typography variant="h6" >Nome: {user.nome}</Typography>
                    <IconButton aria-label="edit" color='warning' onClick={() => setOpenNome(true)}>
                        <EditIcon />
                    </IconButton>
                </Paper>
                <Paper elevation={3} sx={{ p: 1, mt: 2, display: 'flex', justifyContent: "space-between" }}>
                    <Typography variant="h6" >Email: {user.email}</Typography>
                    <IconButton aria-label="edit" color='warning' onClick={() => setOpenEmail(true)}>
                        <EditIcon />
                    </IconButton>
                </Paper>
                <Paper elevation={3} sx={{ p: 1, mt: 2, display: 'flex', justifyContent: "space-between" }}>
                    <Typography variant="h6" >Data de nascimento: {user.dataNascimento}</Typography>
                    <IconButton aria-label="edit" color='warning' onClick={() => { setOpenDataNsc(true) }}>
                        <EditIcon />
                    </IconButton>
                </Paper>
                <Paper elevation={3} sx={{ p: 1, mt: 2, display: 'flex', justifyContent: "space-between" }}>
                    <Typography variant="h6" >Cpf: {user.cpf}</Typography>
                    <IconButton aria-label="edit" color='warning' onClick={() => setOpenCpf(true)}>
                        <EditIcon />
                    </IconButton>
                </Paper>
                <Paper elevation={3} sx={{ p: 1, mt: 2, display: 'flex', justifyContent: "space-between" }}>
                    <Typography variant="h6"  >Senha: ********</Typography>
                    <IconButton aria-label="edit" color='warning' onClick={() => setOpenSenha(true)}>
                        <EditIcon />
                    </IconButton>
                </Paper>

                <Button variant="contained" sx={{ mt: 2 }} startIcon={<LogoutIcon />} onClick={sair}>
                    Sair
                </Button>

                <Button variant='contained' color='error' sx={{ mt: 2, float: 'right' }} onClick={() => setOpenExcluirConta(true)}>Excluir Conta</Button>

            </Box>


        </>

    );
}