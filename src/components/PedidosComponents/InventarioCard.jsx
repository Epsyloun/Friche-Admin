import React,{useState,useEffect} from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

//Styled Components
const StyledCard = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "20px",
  animation: "fade-in ease 0.5s"
};

const StyleDidiver = {
    width: '90%',
    bgcolor: 'background.paper',
}

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

function InventarioCard({ idProduct, title, cantidad, precio, setCantidad, cantidadT, carrito, setCarrito}) {

  const [cantidadLabel, setCantidadLabel] = useState(0);

  function add(){
    if(parseInt(cantidad) > cantidadLabel){
      setCantidadLabel(cantidadLabel+1)
      setCantidad(cantidadT+1)

      let find = carrito.find(({ id }) => id === idProduct)
      console.log(find)
      if(find === undefined){
        setCarrito([...carrito, {id:idProduct, nombre:title, cantidad:cantidadLabel, precio:precio}])
      }else{
        console.log('se repite, que solo se actualice la cantidad y no que se añada uno nuevo');
      }
    }
  }
  function less(){
    if(cantidadLabel > 0){
      setCantidadLabel(cantidadLabel-1)
      setCantidad(cantidadT-1)
    }
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
        <Divider sx={StyleDidiver} />
        <CardContent>
          <Typography
            component="div"
            variant="h6"
            align="center"
            color="text.primary"
          >
            Cantidad:
          </Typography>
          <Grid container spacing={2} sx={{justifyContent:"center", alignContent:"center"}}>
            <Grid item xs={3} sx={{justifyContent:'center'}}>
            <IconButton aria-label="añadir" onClick={less}>
              <RemoveCircleIcon fontSize="inherit" />
            </IconButton>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6" align="center">{cantidadLabel}</Typography>
            </Grid>
            <Grid item xs={3}>
            <IconButton aria-label="restar" onClick={add}>
              <AddCircleIcon fontSize="inherit" />
            </IconButton>
            </Grid>
          </Grid>
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
      </Box>
    </Card>
  );
}

export { InventarioCard };
