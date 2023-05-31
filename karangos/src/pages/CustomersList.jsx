/*
MÉTODOS HTTP
GET -> serve para buscar no back-end
DELETE -> instruir o back-end e excluir uma informação 
POST -> cria uma nova informação no back-end
PUT -> instruir o back-end e modificar uma informação
*/

import React from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButtom from '@mui/material/IconButton'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link } from 'react-router-dom'

export default function CustomersList() {

  const [state, setState] = React.useState({
    customers: {}

  })

  // Desestruturando as variáveis de estado
  const {
    customers
  } = state

  // Este useEffect() será executado apenas uma vez, durante o
  // carregamento da página
  React.useEffect(()=>{
    loadData()   // Carrega dos dados do back-end
  },[])

  async function loadData() {   // async =  quando acontece algo de fora da aplicação
    try {
      const result = await fetch('https://api.faustocintra.com.br/customers')

      // Requisição OK
      if(result.ok) setState({...state, customers: await result.json()})
      // Requisição com erro
      else throw new Error(`[HTTP ${result.status}] ${result.statusText}`)
    }
    catch(error){
      // Exibimos o erro no console
      console.error(error)
    }
  }
  const columns = [
    { 
      field: 'id',
      headerName: 'ID',
      width: 90
    },
    {
      field: 'name',
      headerName: 'Nome',
      width: 300,
    },
    {
      field: 'ident_document',
      headerName: 'CPF',
      align: 'center',
      headerAlign: 'center',
      width: 150,
    },
    {
      field: 'birth_date',
      headerName: 'Data nasc',
      align: 'center',
      headerAlign: 'center',
      width: 100,
      valueFormatter: params => {
        if(params.value) return format(new Date(params.value), 'dd/MM/yyyy')
        else return 
      }
    },
    {
      field: 'city',
      headerName: 'Município/UF',
      align: 'center',
      headerAlign: 'center',
      width: 300,
      // Colocando dois campos na mesma célula -> valueGetter
      valueGetter: params => params.row.city + ' - ' + params.row.uf
    },
    {
      field: 'phone',
      headerName: 'Celular',
      align: 'center',
      headerAlign: 'center',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'E-mail',
      width: 200,
    },
    {
      field: 'edit',
      headerName: 'Editar',
      headerAling: 'center',
      align: 'center',
      width: 90,
      renderCell: params =>
        <Link to={'./' + params.id}> 
          <IconButtom aria-label='Editar'>
            <EditIcon/>
          </IconButtom>
        </Link>
    },
    {
      field: 'delete',
      headerName: 'Excluir',
      headerAling: 'center',
      align: 'center',
      width: 90,
      renderCell: params => 
      <IconButtom 
        aria-label='Excluir'
        onClick={() => handleDeleteButtonClick(params.id)}
        >
        <DeleteForeverIcon color='error'/>
      </IconButtom>
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  
  async function handleDeleteButtonClick(id){
    if(confirm('Deseja realmente excluir este item?')) {
      try {
        // Faz chamada do back-end para excluir o cliente
        const result = await fetch(`https://api.faustocintra.com.br/customers/${id}`, {
          method: 'DELETE'
        })
        // Se a exclusão tiver sido feita com sucesso, atualiza a listagem
        if(result.ok) loadData()
        alert('Exclusão efetuada com sucesso')
      }
      catch(error) {
        console.error(error)
      }
    }
  }

  return (

    <>
      <Typography variant="h1" sx={{mb: '50px'}}>
        Listagem de clientes
      </Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'right',
        mb: '25px' // margin-bottom

      }}>
        <Link to="new">
          <Button 
            variant="contained" 
            color="secondary"
            size="large"
            startIcon={<AddBoxIcon />}
            >
              Cadastrar novo cliente
          </Button>
        </Link>
      </Box>
      <Paper elevation={4} sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={customers}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Paper>
    </>
  )
}