import React, { createContext, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";

export const UserContext = createContext();
const INVALID_DATA_ERROR_MESSAGE = "Error: Los datos ingresados son inválidos.";
export const UserProvider = ({ children }) => {
  const { userData,setDataUser } = useContext(AuthContext);
  const updateUser = async (data) => {
    try {
      const combinedData = { ...userData, ...data }; // Combinar datos existentes con nuevos datos
      const jsonValue = JSON.stringify(combinedData);
      //Validamos todos los  campos
      const isValid = validateAddress(combinedData.address) &&
                      validatePhone(combinedData.phone) &&
                      validateBirthDate(combinedData.birthDate) &&
                      validateBloodType(combinedData.bloodType);
      if(isValid){
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
            setDataUser(combinedData)
            alert("Los datos fueron agregados correctamente")
          }
        }
      }else{
        alert(INVALID_DATA_ERROR_MESSAGE)
      }
    } catch (error) {
      console.error("Error al guardar los datos", error);
    }
  };

 // Funciones de validación
const validateAddress = (address) => {
  return address && address.trim() !== "";
};

const validatePhone = (phone) => {
  return phone && phone.trim().length === 10;
};

const validateBirthDate = (birthDate) => {
  // Regex para validar formato DD/MM/YYYY
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!regex.test(birthDate)) return false;

  // Verificar que la fecha sea válida
  const [day, month, year] = birthDate.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
};

const validateBloodType = (bloodType) => {
  return bloodType && ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(bloodType);
};
//Devolvemos el userData para proder proveerlo a toda la app 
  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
