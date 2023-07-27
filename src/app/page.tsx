"use client";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, IconButton, Typography } from '@mui/material';
import Publicacao from './components/Publicacao';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NavBar from './components/NavBar';
import PublicacaoDialog from './components/PublicacaoDialog';
import { useEffect, useState } from 'react';
import { get } from "../services/ApiRequest";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [publicacoes, setPublicacoes] = useState([]);

  const getPublicacoes = async () => {
    const resp = await get("publicacao", {});
    setPublicacoes(resp);
    console.log(resp);
  }

  useEffect(() => {
    getPublicacoes();
  }, [])

  const onClose = () => {
    getPublicacoes();
    setOpen(false)
  }

  return (
    <>
      <PublicacaoDialog open={open} onClose={() => { onClose() }} />
      <NavBar />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

        {publicacoes.map((publicacao) => <Publicacao publicacao={publicacao} />)}



      </Box>


      <IconButton aria-label="delete" color='info' sx={{ position: 'fixed', bottom: 20, right: 30 }} onClick={() => { setOpen(true) }}>
        <AddCircleIcon style={{ fontSize: 60 }} />
      </IconButton>
    </>


  )
}
