import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import image from '../assets/vintage-cars.png'
// import { Typography } from '@mui/material' ---> mesma coisa / vantagem de importar vários separados por vírgulas 

export default function Homepage (){

    return (
        <>
            <Typography variant='h1' sx={{
                mb: '50px' //marginBottom
            }}>
                Bem-vindo(a) à loja Karangos!
            </Typography>
            <Box sx={{
                textAlign: 'center',
                '& img': {
                maxWidth: '800px',
                width: '80vh'
                }
            }}>
                <img src={image} alt="Carros antigos"/>
            </Box>
        </>
    )
}