import React, {useState, useEffect} from "react";
import { FinanzasVerticalCard } from "../../components/FinanzasComponents/FinanzasVerticalCard";
import { Grid } from "@mui/material";
import { FinanazasOptions } from "./FinanzasOptions";
import { LoaderFinanzas } from "../GenericComponents/Skeletons";
import { getRegisters } from "../../firebase/api";

function FinanzasList({ collectionName }) {

  const id="uHsExW6Kau78dLV1b8lz";
  const [value, setValue] = useState('');
  const [loader, setLoader] = useState(true);
	const [getInfoCaja, setGetInfoCaja] = useState(false); //state que utiliza para saber si ya cargo la informacion o aun no
  const [getInfoDeuda, setGetInfoDeuda] = useState(false);
  const [getInfoPedido, setGetInfoPedido] = useState(false);
  const [getInfoIventario, setGetInfoIventario] = useState(false);

  //states de informacion
  const [finanzasList, setFinanzasList] = useState([]);
  const [cobrosList, setCobrosList] = useState([]);
  const [pedidosList, setPedidosList] = useState([]);
  const [inventarioList, setinventarioList] = useState([]);

  //states de precio
  const [totalcaja, setTotalCaja] = useState({});
  const [totalCobros, setTotalCobros] = useState({});
  const [totalPedidos, setTotalPedidos] = useState({});
  const [totalInventario, setTotalInventario] = useState({});
  const [total, setTotal] = useState({});

  //Funcion para traer todos los registros de la caja de la DB
  const getFinanzasCaja = () => {
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
      setFinanzasList(data); //Almacenando la data en el state
      setLoader(false); //Removiendo animacion de carga
			setGetInfoCaja(true);
		});
    return querySnapshot; //Retornando la query
  };
  //Funcion para traer todos los registros de la cobros de la DB
  const getFinanzasDeuda = () => {
    console.log("requesting registers"); //console log para saber si se ejecuta la funcion
    const querySnapshot = getRegisters('cobros', (snapshot) => {
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
			setGetInfoDeuda(true);
		});
    return querySnapshot; //Retornando la query
  };
  //Funcion para traer todos los registros de la pedidos de la DB
  const getFinanzasPedido = () => {
    console.log("requesting registers"); //console log para saber si se ejecuta la funcion
    const querySnapshot = getRegisters('pedidos', (snapshot) => {
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
			setGetInfoPedido(true);
		});
    return querySnapshot; //Retornando la query
  };
  //Funcion para traer todos los registros de la cobros de la DB
  const getFinanzasInventario = () => {
    console.log("requesting registers"); //console log para saber si se ejecuta la funcion
    const querySnapshot = getRegisters('inventario', (snapshot) => {
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
      setinventarioList(data); //Almacenando la data en el state
      setLoader(false); //Removiendo animacion de carga
			setGetInfoIventario(true);
		});
    return querySnapshot; //Retornando la query
  };

  //Traer la informacion cada ves que se ingresa un valor nuevo
  useEffect(() => {
    const unSuscribeDeuda = getFinanzasDeuda();
    const unSuscribePedido = getFinanzasPedido();
    const unSuscribeInventario = getFinanzasInventario();
    const unSuscribeCaja = getFinanzasCaja();
    return () => {
      unSuscribeCaja();
      unSuscribeDeuda();
      unSuscribePedido();
      unSuscribeInventario();
    };
  }, []);

	  //Buscador de informacion
		useEffect(() => {
			if (!getInfoCaja && !getInfoIventario && !getInfoPedido && !getInfoIventario) {
				//Si no esta lista la info no hace nada solo muestra la animacion de carga
			} else {

        let cajaTotal = 0;
        let cobrosTotal = 0;
        let pedidosTotal = 0;
        let inventarioTotal = 0;
        let totalTotal = 0;
        let cajaPorcentaje = 0;
        let cobrosPorcentaje = 0;
        let pedidosPorcentaje = 0;
        let inventarioPorcentaje = 0;
        let totalPorcentaje = 0;

        //obteniendo informacion de las cantidades de los modulos
        finanzasList.forEach((caja)=>{
          cajaTotal += parseFloat(caja.caja);
        })

        cobrosList.forEach((cobro)=>{
          cobrosTotal += parseFloat(cobro.monto);
        })
        pedidosList.forEach((pedido)=>{
          pedidosTotal += parseFloat(pedido.total);
        })
        inventarioList.forEach((item)=>{
          inventarioTotal += parseFloat(item.cantidad) * parseFloat(item.precio);
        })

        //parseando la informacion
        cajaTotal= Number(cajaTotal.toFixed(2));
        setValue(cajaTotal);

        cobrosTotal = Number(cobrosTotal.toFixed(2));
        pedidosTotal = Number(pedidosTotal.toFixed(2));
        inventarioTotal = Number(inventarioTotal.toFixed(2));

        totalTotal = cobrosTotal + pedidosTotal + inventarioTotal + cajaTotal;
        totalTotal = Number(totalTotal.toFixed(2));

        cajaPorcentaje = (cajaTotal/totalTotal)*100;
        cobrosPorcentaje = (cobrosTotal/totalTotal)*100;
        pedidosPorcentaje = (pedidosTotal/totalTotal)*100;
        inventarioPorcentaje = (inventarioTotal/totalTotal)*100;

        //Parseando los porcentajes
        cajaPorcentaje = Number(cajaPorcentaje.toFixed(2));
        cobrosPorcentaje = Number(cobrosPorcentaje.toFixed(2));
        pedidosPorcentaje = Number(pedidosPorcentaje.toFixed(2));
        inventarioPorcentaje = Number(inventarioPorcentaje.toFixed(2));

        cajaTotal = cajaTotal.toString();
        totalTotal = totalTotal.toString();
        cobrosTotal = cobrosTotal.toString();
        pedidosTotal = pedidosTotal.toString();
        inventarioTotal = inventarioTotal.toString();
        cajaPorcentaje = cajaPorcentaje.toString()
        cobrosPorcentaje = cobrosPorcentaje.toString()
        pedidosPorcentaje = pedidosPorcentaje.toString()
        inventarioPorcentaje = inventarioPorcentaje.toString()

        //seteamos la info
        setTotalCaja({'total':cajaTotal, 'porcentaje':cajaPorcentaje})
        setTotalCobros({'total':cobrosTotal, 'porcentaje':cobrosPorcentaje});
        setTotalPedidos({'total':pedidosTotal, 'porcentaje':pedidosPorcentaje});
        setTotalInventario({'total':inventarioTotal, 'porcentaje':inventarioPorcentaje});
        setTotal({'total':totalTotal});





			}
		}, [ getInfoCaja, getInfoDeuda, getInfoIventario, getInfoPedido, finanzasList, cobrosList, pedidosList, inventarioList]); //Se actualiza cada vez que que estos variables o estados cambien


  return (
    <>
      {loader && (
        <>
          <LoaderFinanzas />
        </>
      )}
      {!loader && (
        <>
          <Grid container spacing={2} display="flex" alignItems="stretch">
            <Grid item xs={12} md={3}>
              <FinanzasVerticalCard
                image={"attach_money"}
                title={"Dinero en caja"}
                info={'$ '+totalcaja.total}
                subtitle={"42% de las ventas"}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FinanzasVerticalCard
                image={"payments"}
                title={"Dinero de cobros"}
                info={'$ '+totalCobros.total}
                subtitle={totalCobros.porcentaje+"% de ingresos"}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FinanzasVerticalCard
                image={"receipt_long"}
                title={"Dinero de pedidos"}
                info={'$ '+totalPedidos.total}
                subtitle={totalPedidos.porcentaje+"% de ingresos"}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FinanzasVerticalCard
                image={"store"}
                title={"Dinero de inventario"}
                info={'$ '+totalInventario.total}
                subtitle={totalInventario.porcentaje+"% de ingresos"}
              />
            </Grid>
            <Grid item xs={12} md={6} className="finanzas-settings">
              <FinanzasVerticalCard
                image={"query_stats"}
                title={"Suma de entradas"}
                info={'$ '+total.total}
                subtitle={""}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FinanazasOptions id={id} collectionName={collectionName} value={value} setValue={setValue}/>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export { FinanzasList };
