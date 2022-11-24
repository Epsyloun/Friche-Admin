import React, { useState, useEffect } from "react";
import { getRegisters } from "../../firebase/api";
import { useThemeHook } from "../../hooks/useTheme";
//Info de graficos en estadisticas

function CobrosGraficosArray() {
  const colors = useThemeHook();

  const [arrayCobros, setArrayCobros] = useState([]);

  const collectionName = "cobros";

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
      //Se carga la info al state
      setCobrosListSearch(cobrosList);
    }
  }, [getInfo, cobrosList]); //Se actualiza cada vez que que estos variables o estados cambien

  function createGraficosDeudas() {
    let newArr = [];
    let newArr2 = [];
    let newArr3 = [];
    let sumaMenor10 = 0;
    let sumaMenor30 = 0;
    let sumaMenor50 = 0;
    let sumaMenor100 = 0;
    let sumaMayor = 0;

    newArr = cobrosListSearch.map(({ nombre, monto }) => {
      return { nombre, monto };
    });
    newArr = newArr.sort((a, b) => b.monto - a.monto);
    let grafico1 = {
      label: "Top 5 personas que mas deben",
      type: "bar",
      allData: {
        labels: [...newArr.slice(0, 5).map(({ nombre }) => nombre)],
        datasets: [
          {
            label: "Cantidad de deuda",
            backgroundColor: colors.palette.secondary.main,
            borderColor: colors.palette.secondary.main,
            data: [...newArr.slice(0, 5).map(({ monto }) => monto)],
          },
        ],
      },
    };
    newArr2 = cobrosListSearch.map(({ nombre, monto }) => {
      return { nombre, monto };
    });
    newArr2 = newArr2.sort((a, b) => a.monto - b.monto);
    let grafico2 = {
      label: "Top 5 personas que menos deben",
      type: "bar",
      allData: {
        labels: [...newArr2.slice(0, 5).map(({ nombre }) => nombre)],
        datasets: [
          {
            label: "Cantidad de deuda",
            backgroundColor: colors.palette.secondary.main,
            borderColor: colors.palette.secondary.main,
            data: [...newArr2.slice(0, 5).map(({ monto }) => monto)],
          },
        ],
      },
    };
    newArr3 = cobrosListSearch.map(({ monto }) => {
      if (monto <= 10) {
        sumaMenor10++;
      } else if (monto <= 30) {
        sumaMenor30++;
      } else if (monto <= 50) {
        sumaMenor50++;
      } else if (monto <= 100) {
        sumaMenor100++;
      } else if (monto > 100) {
        sumaMayor++;
      }
    });

    let grafico3 = {
      label: "Suma de deudas por cantidad",
      type: "bar",
      allData: {
        labels: [
          "Menores o igual a 10",
          "Menores o igual a 30",
          "Menores o igual a 50",
          "Menores o igual a 100",
          "Mayores a 100",
        ],
        datasets: [
          {
            label: "Cantidad de deuda",
            backgroundColor: colors.palette.secondary.main,
            borderColor: colors.palette.secondary.main,
            data: [
              sumaMenor10,
              sumaMenor30,
              sumaMenor50,
              sumaMenor100,
              sumaMayor,
            ],
          },
        ],
      },
    };

    setArrayCobros([grafico3, grafico1, grafico2]);
  }

  useEffect(() => {
    createGraficosDeudas();
  }, [cobrosListSearch]);
  return arrayCobros;
}

function PedidosGraficosArray() {
  const colors = useThemeHook();

  const [arrayPedidos, setArrayPedidos] = useState([]);

  const collectionName = "pedidos";

  const [pedidosList, setPedidosList] = useState([]); //state para traer la lista de cobros de la base de datos
  const [pedidosListSearch, setPedidosListSearch] = useState([]); //state para filtrar la lista de cobros de el estado anterior
  const [getInfo, setGetInfo] = useState(false); //state que utiliza para saber si ya cargo la informacion o aun no

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
      //Se carga la info al state
      setPedidosListSearch(pedidosList);
    }
  }, [getInfo, pedidosList]); //Se actualiza cada vez que que estos variables o estados cambien

  function createGraficosPedidos() {
    let newArr = [];
    let pedidoRealizado = 0;
    let pedidoPendiente = 0;
    newArr = pedidosListSearch.map(({ estado }) => {
      if (estado === "0") {
        pedidoPendiente++;
      } else if (estado === "1") {
        pedidoRealizado++;
      }
    });

    let grafico1 = {
      label: "Estado de todos los pedidos",
      type: "doughnut",
      allData: {
        labels: ["Pendientes", "Realizados"],
        datasets: [
          {
            label: "Estado de todos los pedidos",
            backgroundColor: [colors.palette.secondary.main, "skyblue"],
            data: [pedidoPendiente, pedidoRealizado],
          },
        ],
      },
    };

    setArrayPedidos([grafico1]);
  }

  useEffect(() => {
    createGraficosPedidos();
  }, [pedidosListSearch]);
  return arrayPedidos;
}
function InventarioGraficosArray() {
  const colors = useThemeHook();

  const [arrayInventario, setArrayInventario] = useState([]);

  const collectionName = "inventario";

  const [inventarioList, setInventarioList] = useState([]); //state para traer la lista de inventario de la base de datos
  const [inventarioListSearch, setInventarioListSearch] = useState([]); //state para filtrar la lista de inventario de el estado anterior
  const [getInfo, setGetInfo] = useState(false); //state que utiliza para saber si ya cargo la informacion o aun no

  //Funcion para traer todos los registros de deudas de la DB
  const getInventario = () => {
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
      setInventarioList(data); //Almacenando la data en el state
      setGetInfo(true); //Actualizando el state para informar que la info esta lista
    });
    return querySnapshot; //Retornando la query
  };
  //Traer la informacion cada ves que se ingresa un valor nuevo
  useEffect(() => {
    const unSuscribe = getInventario();
    return () => {
      unSuscribe();
    };
  }, []);

  //Buscador de informacion
  useEffect(() => {
    if (!getInfo) {
      //Si no esta lista la info no hace nada solo muestra la animacion de carga
    } else {
      //Se carga la info al state
      setInventarioListSearch(inventarioList);
    }
  }, [getInfo, inventarioList]); //Se actualiza cada vez que que estos variables o estados cambien

  function createGraficosInventario() {
    let newArr = [];
    let newArr2 = [];
    let newArr3 = [];
    let cantidadSalados = 0;
    let cantidadDulces = 0;
    let cantidadPicantes = 0;

    newArr = inventarioListSearch.map(({ categoria, cantidad }) => {
      if (categoria === "1") {
        cantidadSalados += parseFloat(cantidad);
      } else if (categoria === "2") {
        cantidadDulces += parseFloat(cantidad);
      } else if (categoria === "3") {
        cantidadPicantes += parseFloat(cantidad);
      }
    });

    let grafico1 = {
      label: "Cantidad de inventario por categoria",
      type: "doughnut",
      allData: {
        labels: ["Salados", "Dulces", "Picantes"],
        datasets: [
          {
            label: "Cantidad de inventario por categoria",
            backgroundColor: [
              colors.palette.secondary.main,
              "rgba(255, 205, 86)",
              "skyblue",
            ],
            data: [cantidadSalados, cantidadDulces, cantidadPicantes],
          },
        ],
      },
    };
    newArr2 = inventarioListSearch.map(({ nombre, cantidad }) => {
      return { nombre, cantidad };
    });
    newArr2 = newArr2.sort((a, b) => b.cantidad - a.cantidad);
    let grafico2 = {
      label: "Top 5 de producto con mas inventario",
      type: "bar",
      allData: {
        labels: [...newArr2.slice(0, 5).map(({ nombre }) => nombre)],
        datasets: [
          {
            label: "cantidad de inventario",
            backgroundColor: colors.palette.secondary.main,
            borderColor: colors.palette.secondary.main,
            data: [...newArr2.slice(0, 5).map(({ cantidad }) => cantidad)],
          },
        ],
      },
    };
    newArr3 = inventarioListSearch.map(({ nombre, cantidad }) => {
      return { nombre, cantidad };
    });
    newArr3 = newArr3.sort((a, b) => a.cantidad - b.cantidad);
    let grafico3 = {
      label: "Top 5 de producto con menos inventario",
      type: "bar",
      allData: {
        labels: [...newArr3.slice(0, 5).map(({ nombre }) => nombre)],
        datasets: [
          {
            label: "cantidad de inventario",
            backgroundColor: colors.palette.secondary.main,
            borderColor: colors.palette.secondary.main,
            data: [...newArr3.slice(0, 5).map(({ cantidad }) => cantidad)],
          },
        ],
      },
    };

    setArrayInventario([grafico1, grafico2, grafico3]);
  }

  useEffect(() => {
    createGraficosInventario();
  }, [inventarioListSearch]);
  return arrayInventario;
}
function FinanzasGraficosArray() {
  const colors = useThemeHook();

  const [arrayFinanzas, setarrayFinanzas] = useState([]);
  const collectionName = "finanzas";
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
    const querySnapshot = getRegisters("cobros", (snapshot) => {
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
    const querySnapshot = getRegisters("pedidos", (snapshot) => {
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
    const querySnapshot = getRegisters("inventario", (snapshot) => {
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
    if (
      !getInfoCaja &&
      !getInfoIventario &&
      !getInfoPedido &&
      !getInfoIventario
    ) {
      //Si no esta lista la info no hace nada solo muestra la animacion de carga
    } else {
      let cajaTotal = 0;
      let cobrosTotal = 0;
      let pedidosTotal = 0;
      let inventarioTotal = 0;
      let totalTotal = 0;

      //obteniendo informacion de las cantidades de los modulos
      finanzasList.forEach((caja) => {
        cajaTotal += parseFloat(caja.caja);
      });

      cobrosList.forEach((cobro) => {
        cobrosTotal += parseFloat(cobro.monto);
      });
      pedidosList.forEach((pedido) => {
        pedidosTotal += parseFloat(pedido.total);
      });
      inventarioList.forEach((item) => {
        inventarioTotal += parseFloat(item.cantidad) * parseFloat(item.precio);
      });

      //parseando la informacion
      cajaTotal = Number(cajaTotal.toFixed(2));

      cobrosTotal = Number(cobrosTotal.toFixed(2));
      pedidosTotal = Number(pedidosTotal.toFixed(2));
      inventarioTotal = Number(inventarioTotal.toFixed(2));

      totalTotal = cobrosTotal + pedidosTotal + inventarioTotal + cajaTotal;
      totalTotal = Number(totalTotal.toFixed(2));

      let grafico1 = {
        label: "Cantidad de entradas por tipos",
        type: "doughnut",
        allData: {
          labels: ["Caja", "Cobros", "Pedidos", "Inventario"],
          datasets: [
            {
              label: "Tipos de entrada",
              backgroundColor: [
                colors.palette.secondary.main,
                "rgba(255, 205, 86)",
                "skyblue",
                "seagreen",
              ],
              data: [cajaTotal, cobrosTotal, pedidosTotal, inventarioTotal],
            },
          ],
        },
      };
      setarrayFinanzas([grafico1]);
    }
  }, [
    getInfoCaja,
    getInfoDeuda,
    getInfoIventario,
    getInfoPedido,
    finanzasList,
    cobrosList,
    pedidosList,
    inventarioList,
  ]); //Se actualiza cada vez que que estos variables o estados cambien

  return arrayFinanzas;
}

export {
  CobrosGraficosArray,
  PedidosGraficosArray,
  InventarioGraficosArray,
  FinanzasGraficosArray,
};
