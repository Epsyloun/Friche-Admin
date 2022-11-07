import {
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./config"; //Importamos el archivo de config de la DB

//Funcion para guardar un nuevo registro
export const saveNewRegister = (collectionName, newLink) =>
  addDoc(collection(db, collectionName), newLink);

//Funcion para modificar un nuevo registro
export const updateRegister = (collectionName, id, updatedFields) =>
  updateDoc(doc(db, collectionName, id), updatedFields);

//Funcion para obtener un solo registro de una collection
export const onGetCorreos = (collectionName, callback) => {
  const unsub = onSnapshot(collection(db, collectionName), callback);
  return unsub;
};

//Funcion para obtener todos los registros de una collection
export const getRegisters = (collectionName, callback) => onSnapshot(collection(db, collectionName), callback);

//Funcion para eliminar un registro de una collection
export const deleteRegister = (collectionName, id) => deleteDoc(doc(db, collectionName, id));

//Funcion para obtener un registro de una collection
export const getOneRegister = (collectionName, id) => getDoc(doc(db, collectionName, id));