import React from "react";
import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

//Componente del buscador
function Buscador({ setOpenEoD, setOpen, search, setSearch }) {
  //Styled Components
  const StyledPaper = {
    justifyContent: "center",
    borderRadius: "20px",
    marginBottom: "1.5em",
    backgroundColor: "background.default",
  };

  //Funcion para manejar el input en el buscador
  function handleChange(e) {
    setSearch(e.target.value);
  }

  //Funcion para manejar el modal
  function handleOpen() {
    setOpen(true);
    setOpenEoD(false);
  }

  return (
    <form autoComplete="off">
      <Grid container spacing={1} sx={StyledPaper}>
        <Grid item md={8} xs={8}>
          <TextField
            fullWidth={true}
            id="outlined-basic"
            label="Buscar"
            value={search}
            onChange={handleChange}
            name="search"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item md={2} xs={4}>
          <Button
            onClick={handleOpen}
            startIcon={<AddIcon />}
            sx={{ height: "100%" }}
            fullWidth={true}
            variant="outlined"
          >
            Nuevo
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

//Exportamos el componente
export { Buscador };
