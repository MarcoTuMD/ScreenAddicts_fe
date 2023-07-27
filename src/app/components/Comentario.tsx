"use client";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChatIcon from '@mui/icons-material/Chat';
import { Box, Collapse } from '@mui/material';

type Props = {
    comentario: any
}


export default function Comentario({ comentario }: Props) {
    const [corpo, setCorpo] = useState(comentario.corpo);
    const [autor, setAutor] = useState(comentario.autor.nome);
    const [data, setData] = useState(comentario.data);
    return (
        <>
            <Card sx={{ maxWidth: '95%', mb: 2, float: 'right' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                    }

                    title={autor}
                    subheader={data}
                />
                <CardContent>
                    <Typography variant="body1" sx={{ mt: 1 }} color="text.secondary">
                        {corpo}
                    </Typography>
                </CardContent>
            </Card>
        </>

    )
}
