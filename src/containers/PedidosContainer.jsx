import React, { useEffect, useState } from "react";
import { Buscador } from "../components/GenericComponents/Buscador";
import { LoaderPedidos } from "../components/GenericComponents/Skeletons";
import { TableComponent } from "../components/GenericComponents/Table";
import { Title } from "../components/GenericComponents/Title";
import { EditOrDeletePedido } from "../components/PedidosComponents/EditOrDeletePedido";
import { NewPedido } from "../components/PedidosComponents/NewPedido";
import { getRegisters } from "../firebase/api";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function PedidosContainer() {
  const [loader, setLoader] = useState(true); //state que utiliza para mostrar informacion de loading
  const [open, setOpen] = useState(false);
  const [openEoD, setOpenEoD] = useState(false);
  const collectionName = "pedidos";

  const [searchValue, setSearchValue] = useState("");
  const [pedidosList, setPedidosList] = useState([]);
  const [searchPedidos, setSearchPedidos] = useState([]);
  const [getInfo, setGetInfo] = useState(false);

  const [id, setId] = useState(0);

  //Funcion para traer todos los registros de deudas de la DB
  const getPedidos = () => {
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

      setPedidosList(data); //Almacenando la data en el state
      setLoader(false); //Removiendo animacion de carga
      setGetInfo(true); //Actualizando el state para informar que la info esta lista
    });
    return querySnapshot; //Retornando la query
  };

  //Traer la informacion cada ves que se ingresa un valor nuevo
  useEffect(() => {
    const unSuscribe = getPedidos();
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
        setSearchPedidos(pedidosList);
      } else {
        //Si el buscador tiene valores filtra la info
        setSearchPedidos(
          pedidosList.filter(({ nombre }) => {
            //Filtra a traves del nombre
            const pedidosName = nombre.toLowerCase(); //Todas los nombres de las deudas a minusculas
            const searchName = searchValue.toLowerCase(); //Todas las letras del buscador a minusculas
            return pedidosName.includes(searchName); //Retorna el arreglo que incluya solamente lo que se busco
          })
        );
      }
    }
  }, [getInfo, pedidosList, searchValue]); //Se actualiza cada vez que que estos variables o estados cambien

  function createData(nombre, fecha, total, estado, id) {
    return { nombre, fecha, total, estado, id };
  }
  const columns = [
    { id: "nombre", label: "Nombre" },
    { id: "fecha", label: "Fecha" },
    { id: "total", label: "Total" },
    { id: "estado", label: "Estado" },
  ];

  const sendRow = [];
  searchPedidos.map((row) => {
    let estadoEnvio;
    row.estado === "0"
      ? (estadoEnvio = "Pendiente")
      : (estadoEnvio = "Realizado");
    sendRow.push(
      createData(row.nombre, row.fecha, row.total, estadoEnvio, row.id)
    );
  });

  return (
    <>
      {!open && (
        <>
          <Title titleText="Pedidos" />
          <Buscador
            setSearch={setSearchValue}
            open={open}
            setOpen={setOpen}
            setOpenEoD={setOpenEoD}
          />
          <EditOrDeletePedido collectionName={collectionName} pedidoId={id} setPedidoId={setId} openEoD={openEoD} setOpenEoD={setOpenEoD}/>
          {loader && <LoaderPedidos />}
          {!loader && <TableComponent columns={columns} rows={sendRow} setPedidoId={setId} setOpenEoD={setOpenEoD}/>}
        </>
      )}
      ;
      {open && (
        <>
          <Title titleText="Agregar nuevo pedido" />
          <NewPedido collectionName={collectionName} setOpen={setOpen} />
        </>
      )}
    </>
  );
}

export { PedidosContainer };
