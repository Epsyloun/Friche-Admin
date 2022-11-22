import React from "react";
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

//Styled Components
const StyledCard = {
  borderRadius: "20px",
  animation: "fade-in ease 0.5s",
  height: "100%",
  "&:hover": {
    margin: "-3px",
    border: "3px solid",
    borderColor: "secondary.main",
  },
};
const StyledText = { color: "text.avatar" };
const StyledCardContent = { padding: "5%", flex: "1 1 auto" };
const StyledAvatar = { backgroundColor: "text.avatar", color: "white" };

//Componente card que se muestra en la lista de deudas
function CardDeuda({
  deudaId,
  setDeudaId,
  setOpenEoD,
  setOpen,
  initial,
  title,
  info,
  subtitle,
}) {
  //Funcion para mostrar que se clickea la card
  function showOptions() {
    setDeudaId(deudaId); //Enviamos el id al abrir el modal
    setOpen(false); //Cerramos el modal de new
    setOpenEoD(true); //Abrimos el modal de edit or delete
  }

  return (
    <Card sx={StyledCard}>
      <CardActionArea onClick={showOptions} sx={StyledText}>
        <CardContent sx={StyledCardContent}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar sx={StyledAvatar}>{initial}</Avatar>
            <Typography
              variant="subtitle1"
              color="text.primary"
              align="center"
              component="div"
            >
              {title}
            </Typography>
          </Stack>
          <Typography
            component="div"
            variant="h4"
            align="center"
            color="text.primary"
          >
            ${info}
          </Typography>
          <Typography
            variant="subtitle2"
            align="right"
            component="div"
            color="text.secondary"
          >
            {subtitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

//Exportamos el componente
export { CardDeuda };
