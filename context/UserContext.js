import React, { createContext, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const {userData} = useContext(AuthContext);
    const updateUser = async (data) => {
        try {
            const combinedData = { ...userData, ...data }; // Combinar datos existentes con nuevos datos
            
            const jsonValue = JSON.stringify(combinedData);
            await AsyncStorage.setItem('userData', jsonValue);
            console.log("COMBINED DATA",combinedData)
            userData(combinedData);
          } catch (error) {
            console.error('Error al guardar los datos', error);
          }
        };
        console.log(userData)

    return (
        <UserContext.Provider value={{userData,updateUser}}>
            { children }
        </UserContext.Provider>
     )
}