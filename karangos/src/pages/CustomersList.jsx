import React from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButtom from '@mui/material/IconButton'

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
        <IconButtom aria-label='Editar'>
          <EditIcon/>
        </IconButtom>
    },
    {
      field: 'delete',
      headerName: 'Excluir',
      headerAling: 'center',
      align: 'center',
      width: 90,
      renderCell: params => 
      <IconButtom aria-label='Excluir'>
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
  

  return (

    <>
      <Typography variant="h1" sx={{mb: '50px'}}>
        Listagem de clientes
      </Typography>

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