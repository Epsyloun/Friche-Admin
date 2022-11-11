import React, {useEffect, useState} from "react";
import { TabsInventario } from "./Tabs";
import { Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import { Buscador } from "../GenericComponents/Buscador";
import { NewInventario } from "./NewInventario";
import { getRegisters } from "../../firebase/api";
import { LoaderInventario } from "../GenericComponents/Skeletons";
import { EditOrDeleteInventario } from "./EditOrDeleteInventario";


//Componente del panel de cada Tab
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

//Componente de la lista de inventario
function ListInventario({collectionName}) {

  //State para los buscadores
  const [searchSalados, setSearchSalados] = useState('');
  const [searchDulces, setSearchDulces] = useState('');
  const [searchPicantes, setSearchPicantes] = useState('');

  //Funcion para manejar la categoria
  const [categoriaIndex, setCategoriaIndex] = useState(0);

  const [loader, setLoader] = useState(true); //state que utiliza para mostrar informacion de loading

  const [productosList, setProductosList] = useState([]); //state para traer la lista de productos de la base de datos
  const [productosListSearch, setProductosListSearch] = useState([]); //state para filtrar la lista de productos de el estado anterior
  const [getInfo, setGetInfo] = useState(false); //state que utiliza para saber si ya cargo la informacion o aun no
  const [salado, setSalado] = useState([]);
  const [dulce, setDulce] = useState([]);
  const [picante, setPicante] = useState([]);

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

  //state para filtrar informacion en los tabs
  useEffect(()=>{
    setProductosListSearch(
        productosList.filter(({ categoria }) => {
          //Filtra a traves de la categoria
          return categoria.includes(categoriaIndex); //Retorna el arreglo que incluya solamente lo que se busco
        }))
  },[categoriaIndex, productosList])

  //Buscador de informacion
    useEffect(() => {
    if (!getInfo) {
      //Si no esta lista la info no hace nada solo muestra la animacion de carga
    } else {
      //if para saldos
      if (searchSalados === "") {
        //Si el buscador esta vacio muestra toda la info
        setSalado(productosListSearch);
      } else {
        //Si el buscador tiene valores filtra la info
        setSalado(
          productosListSearch.filter(({ nombre }) => {
            //Filtra a traves del nombre
            const productoName = nombre.toLowerCase(); //Todas los nombres de productos a minusculas
            const searchName = searchSalados.toLowerCase(); //Todas las letras del buscador a minusculas
            return productoName.includes(searchName); //Retorna el arreglo que incluya solamente lo que se busco
          })
        );
      }
      //id para dulces
      if (searchDulces === "") {
        //Si el buscador esta vacio muestra toda la info
        setDulce(productosListSearch);
      } else {
        //Si el buscador tiene valores filtra la info
        setDulce(
          productosListSearch.filter(({ nombre }) => {
            //Filtra a traves del nombre
            const productoName = nombre.toLowerCase(); //Todas los nombres de productos a minusculas
            const searchName = searchDulces.toLowerCase(); //Todas las letras del buscador a minusculas
            return productoName.includes(searchName); //Retorna el arreglo que incluya solamente lo que se busco
          })
        );
      }
      //if para picantes
      if (searchPicantes === "") {
        //Si el buscador esta vacio muestra toda la info
        setPicante(productosListSearch);
      } else {
        //Si el buscador tiene valores filtra la info
        setPicante(
          productosListSearch.filter(({ nombre }) => {
            //Filtra a traves del nombre
            const productoName = nombre.toLowerCase(); //Todas los nombres de productos a minusculas
            const searchName = searchPicantes.toLowerCase(); //Todas las letras del buscador a minusculas
            return productoName.includes(searchName); //Retorna el arreglo que incluya solamente lo que se busco
          })
        );
      }
    }
  }, [searchSalados, searchDulces, searchPicantes, getInfo, productosList, productosListSearch]); //Se actualiza cada vez que que estos variables o estados cambien

  //Inicializando el tema de colores de la app
  const theme = useTheme();

  //State para manejar el tab activo
  const [value, setValue] = React.useState(0);

  //Funcion para manejar el cambio de tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //Funcion para manejar el cambio de tab en el index
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  //Manejo de variables de Edit or Delete
  const [productoId, setProductoId] = useState(0);
  //State para los modals
  const [openNew, setOpenNew] = useState(false);
  const [openEoD, setOpenEoD] = useState(false);

  return (
    <>

      <Box
        sx={{
          bgcolor: "background.default",
          width: "auto",
          animation: "fade-in ease 0.5s",
        }}
      >

        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab
              sx={{ bgcolor: "background.tableHead", color: "white" }}
              label="Salados"
              {...a11yProps(0)}
            />
            <Tab
              sx={{ bgcolor: "background.tableHead", color: "white" }}
              label="Dulces"
              {...a11yProps(1)}
            />
            <Tab
              sx={{ bgcolor: "background.tableHead", color: "white" }}
              label="Picantes"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>
        {loader && <LoaderInventario /> /*Muestra el componente de carga*/}
        {!loader /*Muestra el componente de lista cuando la info esta lista*/ && (
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Buscador search={searchSalados} setSearch={setSearchSalados} setOpen={setOpenNew} />
            <TabsInventario setProductoId={setProductoId} data={salado} setOpen={setOpenNew} setOpenEoD={setOpenEoD} />
            <NewInventario collectionName={collectionName} open={openNew} setOpen={setOpenNew} categoria={"Salado"} categoriaIndex={categoriaIndex} setCategoriaIndex={setCategoriaIndex} />
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <Buscador search={searchDulces} setSearch={setSearchDulces} setOpen={setOpenNew} />
            <TabsInventario setProductoId={setProductoId} data={dulce} setOpen={setOpenNew} setOpenEoD={setOpenEoD} />
            <NewInventario collectionName={collectionName} open={openNew} setOpen={setOpenNew} categoria={"Dulce"} categoriaIndex={categoriaIndex} setCategoriaIndex={setCategoriaIndex} />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Buscador search={searchPicantes} setSearch={setSearchPicantes} setOpen={setOpenNew} />
            <TabsInventario setProductoId={setProductoId} data={picante} setOpen={setOpenNew} setOpenEoD={setOpenEoD}/>
            <NewInventario collectionName={collectionName} open={openNew} setOpen={setOpenNew} categoria={"Picante"} categoriaIndex={categoriaIndex} setCategoriaIndex={setCategoriaIndex} />
          </TabPanel>
        </SwipeableViews>
        )}
        <EditOrDeleteInventario
        collectionName={collectionName}
        productoId={productoId}
        setProductoId={setProductoId}
        openEoD={openEoD}
        setOpenNew={setOpenNew}
        setOpenEoD={setOpenEoD}
        />
      </Box>
    </>
  );
}

export { ListInventario };