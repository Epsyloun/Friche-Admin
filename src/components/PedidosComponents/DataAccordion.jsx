import { Chip, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";
import { useEffect } from "react";
import { ListProductos } from "./ListProductos";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function DataCliente(setNombre) {

  //Manejar los datos de los textfields
  function handleChangeNombre(e) {
    setNombre(e.target.value);
  }

  return (
    <Grid container spacing={2} mt={1}>
      <Grid item md={6} xs={12}>
        <TextField required onChange={handleChangeNombre} label="Nombre" placeholder="nombre" name="nombre" />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField
          required
          label="Apellido"
          placeholder="apellido"
          name="apellido"
        />
      </Grid>
    </Grid>
  );
}
function DataProductos(setCantidad, cantidad, carrito, setCarrito) {
  return (
    <>
      <ListProductos cantidad={cantidad} setCantidad={setCantidad} carrito={carrito} setCarrito={setCarrito} collectionName={'inventario'}/>
    </>
  );
}
function DataTotal(carrito,setTotalCarrito) {

  let precio = 0;
  useEffect(()=>{
    if(carrito.length===0){
      setTotalCarrito(0)
    }else{
      let total
      carrito.forEach((product)=>{
        precio += parseFloat(product.cantidad) * parseFloat(product.precio);
      })
      total = precio;
      total = Number(total.toFixed(2))
      total = total.toString()
      setTotalCarrito(total)
    }
  },[carrito])

  return (
    <Grid container spacing={2} sx={{justifyContent:"center"}}>
      {carrito.map((product)=>(
        <Grid item key={product.id} mt={2} md={4} xs={12}>
          <Paper elevation={4} p={1} sx={{borderRadius:'20px'}}>
            <Typography p={2} align="center" variant="h4">{product.nombre}</Typography>
            <Divider mb={4}/>
            <Box p={2}>
              <Typography align="left" variant="h6">Cantidad: {product.cantidad}</Typography>
              <Typography align="left" variant="h5">Precio: {product.precio}</Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
function DataFecha(fecha, setFecha) {
  const [value, setValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Fecha de entrega"
        value={value}
        disablePast={true}
        inputFormat="DD/MM/YYYY"
        onChange={(newValue) => {
          setValue(newValue);
          let newFecha = newValue.$D+'/'+(newValue.$M+1)+'/'+newValue.$y
          setFecha(newFecha)
        }}
        renderInput={(params) => <TextField {...params} />}
      />

    </LocalizationProvider>
  );
}

export { DataCliente, DataProductos, DataTotal, DataFecha };
