import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { post, put } from '@/services/ApiRequest';

type Props = {
    open: boolean,
    onClose: (() => void)
}


export default function CadastrarUsuarioDialog({ open, onClose }: Props) {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [dataNasc, setDataNasc] = useState("");
    const [senha, setSenha] = useState("");
    const [senhaConfirmar, setSenhaConfirmar] = useState("");

    const changeNome = (nome: string) => {
        setNome(nome);
    }

    const changeEmail = (email: string) => {
        setEmail(email);
    }

    const changeCpf = (cpf: string) => {
        setCpf(cpf);
    }

    const changeDataNasc = (dataNasc: string) => {
        setDataNasc(dataNasc);
    }

    const changeSenha = (senha: string) => {
        setSenha(senha);
    }

    const changeSenhaConfirmar = (senha: string) => {
        setSenhaConfirmar(senha);
    }

    const criar = async () => {
        if (nome != "" && email != "" && cpf != "" && dataNasc != "" && senha != "" && senhaConfirmar != "") {
            if (senha == senhaConfirmar) {
                const body = {
                    nome: nome,
                    dataNascimento: dataNasc,
                    email: email,
                    cpf: cpf,
                    senha: senha
                }

                await post("usuario", body);
                onClose();
                setNome("");
                setEmail("");
                setCpf("");
                setDataNasc("");
                setSenha("");
                setSenhaConfirmar("");
            }
        }
    }



    return (
        <div>
            <Dialog open={open} onClose={() => onClose()} fullWidth>
                <DialogTitle>Criar Conta</DialogTitle>

                <DialogContent>
                    <TextField id="outlined-basic" fullWidth required label="Nome" variant="outlined" sx={{ mt: 2 }} value={nome} onChange={(e) => { changeNome(e.target.value); }} />
                    <TextField id="outlined-basic" fullWidth required label="Email" variant="outlined" sx={{ mt: 2 }} value={email} onChange={(e) => { changeEmail(e.target.value); }} type='email' />
                    <TextField id="outlined-basic" fullWidth required label="Cpf" variant="outlined" sx={{ mt: 2 }} value={cpf} onChange={(e) => { changeCpf(e.target.value); }} />
                    <TextField id="outlined-basic" fullWidth required label="Data de Nascimento" variant="outlined" sx={{ mt: 2 }} value={dataNasc} onChange={(e) => { changeDataNasc(e.target.value); }} type='date' />
                    <TextField id="outlined-basic" fullWidth required label="Senha" variant="outlined" sx={{ mt: 2 }} value={senha} onChange={(e) => { changeSenha(e.target.value); }} type='password' />
                    <TextField id="outlined-basic" fullWidth required label="Confirmar Senha" variant="outlined" sx={{ mt: 2 }} value={senhaConfirmar} onChange={(e) => { changeSenhaConfirmar(e.target.value); }} type='password' />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        onClose(); setNome("");
                        setEmail("");
                        setCpf("");
                        setDataNasc("");
                        setSenha("");
                        setSenhaConfirmar("");
                    }} color='error'>Cancelar</Button>
                    <Button onClick={() => criar()}>Criar Conta</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}