import React, {useEffect, useState} from "react";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { Buscador } from "../GenericComponents/Buscador";
import { getRegisters } from "../../firebase/api";
import { LoaderInventario } from "../GenericComponents/Skeletons";
import { CardProduct } from "./CardProduct";


//Componente de la lista de inventario
function ListProductos({collectionName, setCantidad, cantidad, carrito, setCarrito}) {

  const [loader, setLoader] = useState(true); //state que utiliza para mostrar informacion de loading

  const [productosList, setProductosList] = useState([]); //state para traer la lista de productos de la base de datos
  const [productosListSearch, setProductosListSearch] = useState([]); //state para filtrar la lista de productos de el estado anterior
  const [getInfo, setGetInfo] = useState(false); //state que utiliza para saber si ya cargo la informacion o aun no

  //Funcion para traer todos los registros inventario de la DB
  const getProductos = () => {
    console.log("requesting registers"); //console log para saber si se ejecuta la funcion
    const querySnapshot = getRegisters(collectionName, (snapshot) => {
      //Almacenando la query en una variable
      const data = snapshot.docs.map((element) => {
        //Mapeando la informacion dentro de una variable
        const dataCard = element._document.data.value.mapValue.fields;
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

      setProductosList(data); //Almacenando la data en el state
      setLoader(false); //Removiendo animacion de carga
      setGetInfo(true); //Actualizando el state para informar que la info esta lista
    });
    return querySnapshot; //Retornando la query
  };

  //Traer la informacion cada ves que se ingresa un valor nuevo
  useEffect(() => {
    const unSuscribeProductos = getProductos();
    return () => {
      unSuscribeProductos();
    };
  }, []);

  //Buscador de informacion
    useEffect(() => {
    if (!getInfo) {
      //Si no esta lista la info no hace nada solo muestra la animacion de carga
    } else {
      //Si el buscador esta vacio muestra toda la info
      setProductosListSearch(productosList);
    }
  }, [getInfo, productosList, productosListSearch]); //Se actualiza cada vez que que estos variables o estados cambien

  return (
    <>

      <Box
        sx={{
          bgcolor: "background.default",
          width: "auto",
          animation: "fade-in ease 0.5s",
        }}
      >

        {loader && <LoaderInventario /> /*Muestra el componente de carga*/}
        {!loader /*Muestra el componente de lista cuando la info esta lista*/ && (
            <>
              <CardProduct cantidadT={cantidad} setCantidad={setCantidad} carrito={carrito} setCarrito={setCarrito} data={productosListSearch}/>
            </>
        )}
      </Box>
    </>
  );
}

export { ListProductos };