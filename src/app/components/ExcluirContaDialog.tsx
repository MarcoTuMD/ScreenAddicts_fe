import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { post, put, remove } from '@/services/ApiRequest';
import { useRouter } from 'next/navigation';

type Props = {
    open: boolean,
    onClose: (() => void)
}


export default function ExcluirContaDialog({ open, onClose }: Props) {


    const [senha, setSenha] = useState("");
    const router = useRouter();


    const changeSenha = (Senha: string) => {
        setSenha(Senha);
    }


    const excluir = async () => {
        let user = JSON.parse(localStorage.getItem("user") || "");
        if (senha == user.senha) {
            user.senha = senha;
            await remove('usuario', user._id);
            localStorage.setItem("user", JSON.stringify(user));
            onClose();
            setSenha("");
            router.push("/login");
        }

    }




    return (
        <div>
            <Dialog open={open} onClose={() => onClose()} fullWidth>
                <DialogTitle>Excluir Conta</DialogTitle>

                <DialogContent>
                    <TextField id="outlined-basic" fullWidth type='password' label="Senha" variant="outlined" sx={{ mt: 2 }} value={senha} onChange={(e) => { changeSenha(e.target.value); }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { onClose(); setSenha("") }} color='error'>Cancelar</Button>
                    <Button onClick={() => excluir()}>Excluir</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}