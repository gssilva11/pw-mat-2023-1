import React from 'react'
import Typography from '@mui/material/Typography'

// Foi modificado o nome da função para CarsForm()
export default function CarsForm() {
    return(
        <>
            {/* Foi modificado o conteúdo do Typography para Cadastro de carros  */}
            <Typography variant="h1" sx={{mb: '50px'}}>
                Cadastro de carros
            </Typography>
        </>
    )
}