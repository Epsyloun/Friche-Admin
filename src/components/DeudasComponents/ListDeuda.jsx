import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { CardDeuda } from "./CardDeuda";
import { getRegisters } from "../../firebase/api";
import { LoaderDeudas } from "../GenericComponents/Skeletons";

//Componente de la lista de deuda
function ListDeuda({
  collectionName,
  setDeudaId,
  searchValue,
  open,
  setOpen,
  openEoD,
  setOpenEoD,
}) {
  const [loader, setLoader] = useState(true); //state que utiliza para mostrar informacion de loading

  const [cobrosList, setCobrosList] = useState([]); //state para traer la lista de cobros de la base de datos
  const [cobrosListSearch, setCobrosListSearch] = useState([]); //state para filtrar la lista de cobros de el estado anterior
  const [getInfo, setGetInfo] = useState(false); //state que utiliza para saber si ya cargo la informacion o aun no

  //Funcion para traer todos los registros de deudas de la DB
  const getDeudas = () => {
    console.log("requesting registers"); //console log para saber si se ejecuta la funcion
    const querySnapshot = getRegisters(collectionName, (snapshot) => {
      //Almacenando la query en una variable
      const data = snapshot.docs.map((element) => {
        //Mapeando la informacion dentro de una variable
        const dataCard = element._document.data.value.mapValue.fields; //Guardando la informacion necesaria en una variable
        return Object.keys(dataCard).reduce(
          (prev, key) => {
            //Reestructurando el objeto
            return {
              ...prev, //Almacenando la info anterior
              [key]: dataCard[key].stringValue, //Añadiendo el nuevo valor al objeto
            };
          },
          { id: element.id }
        ); //Añadiendo el id del registro al objeto
      });

      setCobrosList(data); //Almacenando la data en el state
      setLoader(false); //Removiendo animacion de carga
      setGetInfo(true); //Actualizando el state para informar que la info esta lista
    });
    return querySnapshot; //Retornando la query
  };

  //Traer la informacion cada ves que se ingresa un valor nuevo
  useEffect(() => {
    const unSuscribe = getDeudas();
    return () => {
      unSuscribe();
    };
  }, []);

  //Buscador de informacion
  useEffect(() => {
    if (!getInfo) {
      //Si no esta lista la info no hace nada solo muestra la animacion de carga
    } else {
      if (searchValue === "") {
        //Si el buscador esta vacio muestra toda la info
        setCobrosListSearch(cobrosList);
      } else {
        //Si el buscador tiene valores filtra la info
        setCobrosListSearch(
          cobrosList.filter(({ nombre }) => {
            //Filtra a traves del nombre
            const deudasName = nombre.toLowerCase(); //Todas los nombres de las deudas a minusculas
            const searchName = searchValue.toLowerCase(); //Todas las letras del buscador a minusculas
            return deudasName.includes(searchName); //Retorna el arreglo que incluya solamente lo que se busco
          })
        );
      }
    }
  }, [searchValue, getInfo, cobrosList]); //Se actualiza cada vez que que estos variables o estados cambien

  return (
    <>
      {loader && <LoaderDeudas /> /*Muestra el componente de carga*/}
      {!loader /*Muestra el componente de lista cuando la info esta lista*/ && (
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          {cobrosListSearch.map((deudas) => (
            <Grid item xs={12} md={4} key={deudas.id}>
              <CardDeuda
                setDeudaId={setDeudaId}
                deudaId={deudas.id}
                openEoD={openEoD}
                setOpenEoD={setOpenEoD}
                open={open}
                setOpen={setOpen}
                initial={deudas.nombre.charAt(0).toUpperCase()}
                title={deudas.nombre + " " + deudas.apellido}
                info={deudas.monto}
                subtitle={deudas.fecha}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

//Exportamos el componente
export { ListDeuda };
