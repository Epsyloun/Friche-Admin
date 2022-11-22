import React, { useEffect, useState } from "react";

import {
  Avatar,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import UpdateIcon from "@mui/icons-material/Update";
import { updateRegister, getOneRegister } from "../../firebase/api";
import Swal from "sweetalert2";
import { useTheme } from "@mui/material/styles";

//Styled Components
const StyledGrid = {
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  animation: "fade-in ease 0.5s",
};
const StyledItemGrid = {
  marginTop: "1.5em",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
const StyledTextfield = {
  marginTop: "10px",
  marginBottom: "10px",
};
const StyledImage = {
  width: "10em",
  height: "10em",
};
const StyledIcon = { color: "white" };

function Ajustes({ collectionName }) {
  //Inicializando el tema de colores de la app
  const theme = useTheme();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [oldNombre, setOldNombre] = useState("");
  const [oldApellido, setOldApellido] = useState("");
  const [oldCorreo, setOldCorreo] = useState("");
  const [userChange, setUserChange] = useState(false);

  const userId = "1Nv9kHxqGe32NDANKj5K";

  async function getUser() {
    const docSnap = await getOneRegister(collectionName, userId);

    if (docSnap.exists()) {
      setNombre(docSnap.data().nombre);
      setApellido(docSnap.data().apellido);
      setCorreo(docSnap.data().correo);

      setOldNombre(docSnap.data().nombre);
      setOldApellido(docSnap.data().apellido);
      setOldCorreo(docSnap.data().correo);

      setUserChange(false);
    }
  }

  useEffect(() => {
    getUser();
    handlerChange();
  }, [userChange]);

  function handlerNombre(event) {
    setNombre(event.target.value);
  }
  function handlerApellido(event) {
    setApellido(event.target.value);
  }
  function handlerCorreo(event) {
    setCorreo(event.target.value);
  }
  function handlerChange() {
    if (
      oldNombre === nombre.trim() &&
      oldApellido === apellido.trim() &&
      oldCorreo === correo.trim()
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }

  //Funcion para editar
  async function editUser(e) {
    e.preventDefault();

    //Se actualiza la fecha
    const arreglo = { nombre: nombre, apellido: apellido, correo: correo };

    const docSnap = await getOneRegister(collectionName, userId);

    if (docSnap.exists()) {
      Swal.fire({
        title: "Guardar cambios",
        icon: "info",
        text: "¿Quieres guardar los cambios?",
        iconColor: theme.palette.text.icon,
        color: theme.palette.text.accent,
        background: theme.palette.background.paper,
        showCancelButton: true,
        confirmButtonColor: theme.palette.secondary.main,
        cancelButtonColor: theme.palette.background.background,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          updateRegister(collectionName, userId, arreglo);
          setUserChange(true);
          Swal.fire({
            title: "Usurario actualizado",
            icon: "success",
            text: "El usuario fue actualizado",
            timer: 2000,
            iconColor: theme.palette.text.icon,
            color: theme.palette.text.accent,
            background: theme.palette.background.paper,
          });
        }
      });
    } else {
      console.log("No such document!");
    }
  }

  return (
    <Paper>
      <form autoComplete="off" onSubmit={editUser}>
        <Grid container sx={StyledGrid}>
          <Grid item xs={12} md={4} sx={StyledItemGrid}>
            <Avatar
              alt="user image"
              src="https://i.pinimg.com/736x/e7/0a/4c/e70a4c9a51ed64b04f71bbae16a9d91b.jpg"
              sx={StyledImage}
            />
            <IconButton
              className="camera-button"
              sx={StyledIcon}
              aria-label="upload picture"
              component="label"
            >
              <input hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton>
          </Grid>
          <Grid m={1} item xs={12} md={8}>
            <TextField
              sx={StyledTextfield}
              fullWidth
              label="Nombre"
              variant="outlined"
              value={nombre}
              type="string"
              onChange={handlerNombre}
              onKeyUp={handlerChange}
            />
            <TextField
              sx={StyledTextfield}
              fullWidth
              label="Apellido"
              id="apellido"
              variant="outlined"
              value={apellido}
              type="string"
              onChange={handlerApellido}
              onKeyUp={handlerChange}
            />
            <TextField
              sx={StyledTextfield}
              fullWidth
              label="Correo"
              variant="outlined"
              type="email"
              value={correo}
              onChange={handlerCorreo}
              onKeyUp={handlerChange}
            />
          </Grid>
          <Grid item xs={12} md={12} align="center" m={2}>
            <Button
              disabled={buttonDisabled}
              type="submit"
              color="secondary"
              variant="contained"
              endIcon={<UpdateIcon />}
            >
              Actualizar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export { Ajustes };
