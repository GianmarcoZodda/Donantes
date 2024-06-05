
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [status, setStatus] = useState('checking');
// Utilizamos este useEffect para estar si hay algun cambio en el estado
 useEffect(() => {
        const cargarEstadoAuth = async () => {
            const isAuthenticated = await AsyncStorage.getItem('isAuthenticated')

            if(isAuthenticated === 'true'){
                setStatus('authenticated')
            }else{
                setStatus('unauthenticated')
            }

        }

        cargarEstadoAuth()
    }, [])

    const login = async (email, password) => {

        try {
            // Hacemos el fetch y nos traemos todos los usuarios para validar si el usuario ya esta registrado 
            const respuesta = await fetch('https://665b5468003609eda4609543.mockapi.io/people');
            const users = await respuesta.json()
            const user = users.find( element => element.email === email && element.password === password)
            //Si se encuentra al usuario guardamos el cambio en el storage y actualizamos el status
            if (user){
                await AsyncStorage.setItem('isAuthenticated', 'true')
                setStatus('authenticated')
                alert("Sesion iniciada")
                return true
            }else{
                alert('Error en login else')
                setStatus('unauthenticated')
                return false
            }
            
        } catch (error) {
            console.error('Error en el fetch: ', error)
            alert('Error en login catch')
        }
    }

    const register = async (userData) => {
        try {
            //validamos los datos pasados por parametro
            if (validarDatosUsuario(userData.email, userData.password)) {
                //validamos si el email existe dentro de nuestra api, si no existe procedemos a registrar al usuario
                const respuesta = await fetch('https://665b5468003609eda4609543.mockapi.io/people')
                const users = await respuesta.json()
                if(!users.find( element => element.email === userData.email)){
                    const response = await fetch('https://665b5468003609eda4609543.mockapi.io/people', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                })
                if (response.ok) {  
                    return true;
                } else {
                    alert('Error al registrar el usuario');
                    return false;
                }
                }else{alert("Ya existe una cuenta con este email")}} else {
                return false
            }
        } catch (error) {
            console.log(error);
            alert('Error al registrar el usuario');
        }
    }
// Validacion de datos tipo email y password / utilizando una expresion regular para el email y un numero de caracteres minimos para la password
    function validarDatosUsuario(correo, contrasena) {

        let regexCorreo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(regexCorreo.test(correo) && contrasena.length >= 8){
            return true
        }
        alert("Error en validacion de email o contraseña")
        return false;
      }

// Ralizamos el logout eliminando el estado del storage y seteando el nuevo valor
    const logout = async () => {
        await AsyncStorage.removeItem('isAuthenticated');
        setStatus('unauthenticated')
    }

    return (
        <AuthContext.Provider value={{ status, login, register, logout}}>
            { children }
        </AuthContext.Provider>
     )
}