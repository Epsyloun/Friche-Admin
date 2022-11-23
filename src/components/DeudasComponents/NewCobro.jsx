import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { saveNewRegister } from '../../firebase/api'
import { useTheme } from '@mui/material/styles';

//Componente modal de new Cobro
function NewCobro({ collectionName, open, setOpen, openEoD, setOpenEoD }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    color: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //Inicializando el tema de colores de la app
  const theme = useTheme();

  //Funcion para obtener la fecha actual
  let fecha = new Date();
  let diaf = fecha.getDate();
  let mes = fecha.getMonth();
  mes = mes + 1;
  let ano = fecha.getFullYear();

  //Funcion para cerrar el modal
  function handleClose() {
    setOpen(false);
    setOpenEoD(false);
  }

  //Datos iniciales para guardar un nuevo cobro
  const initialState = {
    nombre: '',
    apellido: '',
    correo: '',
    fecha: `${diaf}/${mes}/${ano}`,
    monto: ''
  }

  
  const [addCobro, setAddCobro] = useState(initialState);//state del nuevo cobro

  //Manejar los datos de los textfields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddCobro({ ...addCobro, [name]: value })
  }

  //Funcion para manejar el submit al guardar un nuevo registro
  async function handleSubmit(e) {
    e.preventDefault();
    //Validar el tamaño de los caracteres
    if (addCobro.nombre.length < 15 && addCobro.apellido.length < 15 && addCobro.correo.length < 25) {
      if (isNaN(addCobro.nombre) && isNaN(addCobro.apellido)) {
        if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(addCobro.correo)) {
          if (addCobro.monto < 1000000) {

            await saveNewRegister(collectionName, addCobro);
            Swal.fire({
              title: 'Cobro añadido',
              icon: 'success',
              text: 'Nuevo cobro añadido',
              timer: 2000,
              iconColor: theme.palette.text.icon,
              color: theme.palette.text.accent,
              background: theme.palette.background.paper,
            }
            ).then(
              setAddCobro(initialState),
              handleClose()
            )

          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Ingrese una cantidad meno',
              timer: 2000,
              iconColor: theme.palette.text.icon,
              color: theme.palette.text.accent,
              background: theme.palette.background.paper,
            })
          }
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Ingrese dirrecion de correo correcto',
            timer: 2000,
            iconColor: theme.palette.text.icon,
            color: theme.palette.text.accent,
            background: theme.palette.background.paper,
          })
        }

      }
      else {

        Swal.fire({
          icon: 'error',
          title: 'Ingrese nombre correcto',
          timer: 2000,
          iconColor: theme.palette.text.icon,
          color: theme.palette.text.accent,
          background: theme.palette.background.paper,
        })
      }
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Ingrese menos caracteres',
        timer: 2000,
        iconColor: theme.palette.text.icon,
        color: theme.palette.text.accent,
        background: theme.palette.background.paper,
      })
    }

  }

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSubmit} autoComplete="off">
          <Box sx={style}>
            <Typography align="center" variant="h3" component="h3">
              Nuevo cobro
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              mt={2}
            >
              <Grid item md={8} xs={12}>
                <TextField
                  name="nombre"
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="outlined-required"
                  label="Nombre"
                  placeholder="Nombre del cliente"
                  value={addCobro.nombre}
                />
              </Grid>
              <Grid item md={8} xs={12}>
                <TextField
                  name="apellido"
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="outlined-required"
                  label="Apellido"
                  placeholder="Apellido del cliente"
                  value={addCobro.apellido}
                />
              </Grid>
              <Grid item md={8} xs={12}>
                <TextField
                  name="correo"
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="outlined-required"
                  label="Correo"
                  placeholder="Correo del cliente"
                  value={addCobro.correo}
                />
              </Grid>
              <Grid item md={8} xs={12}>
                <TextField
                  name="monto"
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="outlined-required"
                  label="Cobro"
                  type="number"
                  placeholder="0.00"
                  value={addCobro.monto}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item align="center" md={8} xs={12}>
                <Button type="submit" variant="contained">Aceptar</Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Modal>
    </Grid>
  );
}

//Exportamos el componente
export { NewCobro };