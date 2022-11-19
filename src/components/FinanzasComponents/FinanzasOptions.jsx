import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { getOneRegister, updateRegister } from "../../firebase/api";
import Swal from "sweetalert2";

//Styled Components
const marginButton = {
  marginTop: "1em",
};

const StyledCard = {
  borderRadius: "20px",
  animation: "fade-in ease 0.5s",
  display: "flex",
  wrap: "wrap",
  height: "100%",
  "&:hover": {
    margin: "-3px",
    border: "3px solid",
    borderColor: "secondary.main",
  },
};

const StyledBox = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-evenly",
};
const StyledCardContent = { width: "70%" };

const StyledInput = { marginTop: "0.5em", textAlign: "center" };

function FinanazasOptions({ id, collectionName, value, setValue }) {
  //Inicializando el tema de colores de la app
  const theme = useTheme();
  //Manejar los datos de los textfields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValue(value);
  };

  //Funcion para editar
  async function modificarCaja(e) {
    e.preventDefault();
    let newValue = parseFloat(value)
    newValue = Number(newValue.toFixed(2))
    newValue = newValue.toString()
    let arreglo = { 'caja': value };

    const docSnap = await getOneRegister(collectionName, id);

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
          updateRegister(collectionName, id, arreglo);
          Swal.fire({
            title: "Cobro actualizado",
            icon: "success",
            text: "El cobro fue actualizado",
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
    <Card className="styled-card" sx={StyledCard}>
      <Box sx={StyledBox}>
        <CardContent sx={StyledCardContent}>
          <form autoComplete="off" onSubmit={modificarCaja}>
            <Typography
              color="secondary.main"
              variant="h4"
              align="center"
              ml="2%"
            >
              Dinero en caja
            </Typography>
            <TextField
              fullWidth
              value={value}
              id="box-money-day"
              type="number"
              required
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              sx={StyledInput}
            />
            <Stack alignItems="flex-end">
              <Button
                type="submit"
                color="secondary"
                sx={marginButton}
                variant="contained"
                startIcon={<PaidIcon />}
              >
                Actualizar
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Box>
    </Card>
  );
}

export { FinanazasOptions };
