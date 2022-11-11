import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

//Styled Components
const StyledCard = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "20px",
};

const StyledBox = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
};

const StyledInput = {
  textAlign: "center",
};

const StyleTypography = {
  width:"90%",
  marginLeft:'20px',
  marginRight:'20px',
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap"
}

function InventarioCard({ id, title, cantidad, precio, setOpenEoD, setProductoId}) {

    //Funcion para abrir los modal
    function openEoD() {
      setOpenEoD(true);
      setProductoId(id)
    }

  return (
    <Card sx={StyledCard}>
      <Box sx={StyledBox}>
        <Typography
          sx={StyleTypography}
          noWrap
          mt="0.3em"
          component="div"
          variant="h4"
          align="center"
          color="text.primary"
        >
          {title}
        </Typography>
        <CardContent>
          <Typography
            component="div"
            variant="h6"
            align="center"
            color="text.primary"
          >
            Cantidad:
          </Typography>
          <TextField
            inputProps={{ style: StyledInput }}
            fullWidth
            disabled
            hiddenLabel
            value={cantidad}
            variant="filled"
            size="small"
          />
          <Typography
            component="div"
            variant="h6"
            align="center"
            color="text.primary"
          >
            Precio:
          </Typography>
          <TextField
            inputProps={{ style: StyledInput }}
            fullWidth
            disabled
            hiddenLabel
            value={precio}
            variant="filled"
            size="small"
          />
        </CardContent>
        <CardActions>
          <Button onClick={openEoD} color="secondary" variant="outlined" size="medium">
            Actualizar
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}

export { InventarioCard };
