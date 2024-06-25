import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
import { Snackbar } from 'react-native-paper';

export const UserContext = createContext();
const INVALID_DATA_ERROR_MESSAGE = "Error: Los datos ingresados son inválidos.";

export const UserProvider = ({ children }) => {
  const { userData, setDataUser } = useContext(AuthContext);
  //estos estados se usan para visualizar los Snackbar 
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const onDismissSnackBar = () => setVisible(false);

  const updateUser = async (data) => {
    let result = false;
    try {
      const combinedData = { ...userData, ...data }; // Combinar datos existentes con nuevos datos
      const jsonValue = JSON.stringify(combinedData);
      //Validamos todos los  campos
      const isValid = validateAddress(combinedData.address) &&
                      validatePhone(combinedData.phone) &&
                      validateBloodType(combinedData.bloodType);
      if (isValid) {
        if (userData.id != null) {
          //Buscamos a la persona por el id, este se crea al momento de hacer el register
          const personaId = userData.id;
          const apiUrl = `https://665b5468003609eda4609543.mockapi.io/people/${personaId}`;
          //Hacemos un patch para agregar nuevos atributos al user
          const response = await fetch(apiUrl, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(combinedData),
          });
          //Si la respuesta es correcta guardamos los datos en el storage y seteamos los datos nuevos agregandolos a los ya existentes
          if (response.ok) {
            await AsyncStorage.setItem("user", jsonValue);
            setDataUser(combinedData);
            result = true;
            setMessage("Los datos fueron agregados correctamente");
            setVisible(true);
          }
        }
      } else {
        setMessage(INVALID_DATA_ERROR_MESSAGE);
        setVisible(true);
      }
    } catch (error) {
      console.error("Error al guardar los datos", error);
    }
    return result;
  };

  // Funciones de validación
  const validateAddress = (address) => {
    return address && address.trim() !== "";
  };

  const validatePhone = (phone) => {
    return phone && phone.trim().length === 10;
  };

  const validateBloodType = (bloodType) => {
    return bloodType && ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(bloodType);
  };

  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={3000}
      >
        {message}
      </Snackbar>
    </UserContext.Provider>
  );
};
