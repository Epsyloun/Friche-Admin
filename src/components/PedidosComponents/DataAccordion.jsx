import { Grid, TextField } from "@mui/material";
import React from "react";
import { ListProductos } from "./ListProductos";

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
function DataTotal() {
  return (
    <>
      <TextField
        required
        id="outlined-required"
        label="Required"
        defaultValue="Hello World"
      />
    </>
  );
}
function DataFecha() {
  return (
    <>
      <TextField
        required
        id="outlined-required"
        label="Required"
        defaultValue="Hello World"
      />
    </>
  );
}

export { DataCliente, DataProductos, DataTotal, DataFecha };
