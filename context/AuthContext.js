
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';

export const AuthContext = createContext();
const COMPATIBILIDAD_ERROR = 'La autenticación biométrica no es compatible en este dispositivo';
const HUELLA_NOT_FOUND = 'No hay biometría registrada en este dispositivo';
const AUTENTICATE_ERROR = 'La autenticación biométrica falló';

export const AuthProvider = ({ children }) => {

    const [status, setStatus] = useState('checking');
    const [userData, setDataUser] = useState(null);
 useEffect(() => {
    // Utilizamos este useEffect para setear si hay algun cambio en el estado
    const cargarEstadoAuth = async () => {
        const isAuthenticated = await AsyncStorage.getItem('isAuthenticated')
    //Persistimos los datos del usuario y validamos la huella cuando el status del user es autenticado
        if (isAuthenticated === 'true') {
            try {
                await persistData()
                await authenticateBiometric();
                setStatus('authenticated');
            } catch (error) {
                setStatus('unauthenticated');
                alert('Autenticación biométrica fallida');
            }
        } else {
            setStatus('unauthenticated');
        }
    }
    /* Chequeamos que la info del user este actualizada y parseamos el value del storage para poder utilizarlo,
    seteamos el objeto a los datos del user asi usarlo en cualquier parte de la app */
    // - No se si esto podria ser comprometedor en terminos de seguridad - Chequear con el profe
        const persistData = async() => {
            const persist = await AsyncStorage.getItem('user')
            if(persist != null){
               const jsonPersist =  JSON.parse(persist)
                setDataUser(jsonPersist)
            }
        }
        cargarEstadoAuth()
    }, [])

    const login = async (email, password) => {
        let resultado = false
        try {
            // Hacemos el fetch y nos traemos todos los usuarios para validar si el usuario ya esta registrado 
            if(validarDatosUsuario(email,password)){
            const respuesta = await fetch('https://665b5468003609eda4609543.mockapi.io/people');
            const users = await respuesta.json()
            const user = users.find( element => element.email === email && element.password === password)
            if (user){
            //Seteamos el cambio en el storage y actualizamos el status
                await AsyncStorage.setItem('isAuthenticated', 'true')
                setStatus('authenticated')
            // Seteamos el item user con el value JSON.stringify(user)), esto para guardar todos los datos
                await AsyncStorage.setItem('user', JSON.stringify(user))
                setDataUser(JSON.stringify(user))
                alert("Sesion iniciada")
                resultado = true
            }else{
                alert('Error en login')
                setStatus('unauthenticated')
                resultado = false
            }
        }
        return resultado
        } catch (error) {
            console.error('Error en el fetch: ', error)
            alert('Error en login catch')
        }
    }
    const register = async (userData) => {
        let resultado = false
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
                    resultado = true;
                } else {
                    alert('Error al registrar el usuario');
                    resultado = false;
                }
                }else{alert("Ya existe una cuenta con este email")}} else {
                    resultado = false
            }
            return resultado
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
        await AsyncStorage.removeItem('user');
        setDataUser(null)
    }
//Funcion que se encarga de hacer la validacion biometrica
    const authenticateBiometric = async () => {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        if (!compatible) {
            alert(COMPATIBILIDAD_ERROR);
        }

        const enrolled = await LocalAuthentication.isEnrolledAsync();
        if (!enrolled) {
            alert(HUELLA_NOT_FOUND);
        }

        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Autenticar',
        });

        if (!result.success) {
            alert(AUTENTICATE_ERROR);
        }
    }

    return (
        <AuthContext.Provider value={{ userData,setDataUser,status, login, register, logout,authenticateBiometric }}>
            { children }
        </AuthContext.Provider>
     )
}