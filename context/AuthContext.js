import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import * as Crypto from "expo-crypto";
import { Snackbar } from 'react-native-paper';

export const AuthContext = createContext();

// Constantes para mensajes de error y URLs
const COMPATIBILIDAD_ERROR = "La autenticación biométrica no es compatible en este dispositivo";
const HUELLA_NOT_FOUND = "No hay biometría registrada en este dispositivo";
const AUTENTICATE_ERROR = "La autenticación biométrica falló";
const ERROR_ENCRYPT_PASSWORD = "Error en el encriptado de la contraseña";
const ERROR_COMPARE = "Error comparando contraseñas";
const URL_PERSONAS = "https://665b5468003609eda4609543.mockapi.io/people";

export const AuthProvider = ({ children }) => {
  const [status, setStatus] = useState("checking");
  const [userData, setDataUser] = useState();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('info');

  useEffect(() => {
    // Utilizamos este useEffect para setear si hay algun cambio en el estado
    const cargarEstadoAuth = async () => {
      const isAuthenticated = await AsyncStorage.getItem("isAuthenticated");
      // Persistimos los datos del usuario y validamos la huella cuando el status del user es autenticado
      if (isAuthenticated === "true") {
        try {
          await persistData();
          await authenticateBiometric();
          setStatus("authenticated");
        } catch (error) {
          setStatus("unauthenticated");
          showSnackbar("Autenticación biométrica fallida", "error");
        }
      } else {
        setStatus("unauthenticated");
      }
    };

    // Chequeamos que la info del user este actualizada y parseamos el value del storage para poder utilizarlo,
    // seteamos el objeto a los datos del user asi usarlo en cualquier parte de la app
    const persistData = async () => {
      const persist = await AsyncStorage.getItem("user");
      if (persist != null) {
        const jsonPersist = JSON.parse(persist);
        setDataUser(jsonPersist);
      }
    };

    cargarEstadoAuth();
  }, []);

  // Función para manejar la apertura del Snackbar
  const showSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarVisible(true);
  };

  // Función para manejar el cierre del Snackbar
  const hideSnackbar = () => setSnackbarVisible(false);

  // Función para el login
  const login = async (email, password) => {
    let resultado = false;
    try {
      // Hacemos el fetch y nos traemos todos los usuarios para validar si el usuario ya está registrado
      if (validarDatosUsuario(email, password)) {
        const respuesta = await fetch(URL_PERSONAS);
        const users = await respuesta.json();
        const user = users.find((element) => element.email === email);
        if (user) {
          // Comparamos la contraseña ingresada con la que está en la API (Primero se encripta la ingresada para comparar el hash de las 2)
          const matchPassword = await comparePassword(password, user.password);
          if (matchPassword) {
            // Seteamos el cambio en el storage y actualizamos el status
            await AsyncStorage.setItem("isAuthenticated", "true");
            setStatus("authenticated");
            // Seteamos el item user con el value JSON.stringify(user)), esto para guardar todos los datos
            await AsyncStorage.setItem("user", JSON.stringify(user));
            setDataUser(user);
            showSnackbar("Sesión iniciada", "success");
            resultado = true;
          } else {
            showSnackbar("Error en login", "error");
            setStatus("unauthenticated");
          }
        } else {
          // Si no se encuentra el usuario, mostramos un mensaje de error
          showSnackbar("Usuario no encontrado. Por favor, regístrese.", "error");
          setStatus("unauthenticated");
        }
      }
      return resultado;
    } catch (error) {
      console.error("Error en el fetch: ", error);
      showSnackbar("Error en login catch", "error");
    }
  };

  // Función para el registro
  const register = async (userData) => {
    let resultado = false;
    try {
      // Validamos los datos pasados por parámetro
      if (validarDatosUsuario(userData.email, userData.password)) {
        // Validamos si el email existe dentro de nuestra API, si no existe procedemos a registrar al usuario
        const respuesta = await fetch(URL_PERSONAS);
        const users = await respuesta.json();
        // Encripto la password para persistir los datos en la API
        const encryptPassword = await hashPassword(userData.password);
        if (!users.find((element) => element.email === userData.email) && encryptPassword != undefined) {
          const response = await fetch(
            URL_PERSONAS,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...userData, password: encryptPassword, admin: false }),
            }
          );
          if (response.ok) {
            resultado = true;
          } else {
            showSnackbar("Error al registrar el usuario", "error");
            resultado = false;
          }
        } else {
          showSnackbar("Ya existe una cuenta con este email", "warning");
        }
      } else {
        resultado = false;
      }
      return resultado;
    } catch (error) {
      console.log(error);
      showSnackbar("Error al registrar el usuario", "error");
    }
  };

  // Función para validar datos de usuario (email y password)
  function validarDatosUsuario(correo, contrasena) {
    let regexCorreo =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regexCorreo.test(correo) && contrasena.length >= 8) {
      return true;
    }
    showSnackbar("Error en validación de email o contraseña", "error");
    return false;
  }

  // Función para hacer la validación biométrica
  const authenticateBiometric = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      showSnackbar(COMPATIBILIDAD_ERROR, "error");
    }

    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) {
      showSnackbar(HUELLA_NOT_FOUND, "warning");
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Autenticar",
    });

    if (!result.success) {
      showSnackbar(AUTENTICATE_ERROR, "error");
    }
  };

  // Función para encriptar la contraseña usando el algoritmo SHA-256
  const hashPassword = async (password) => {
    try {
      const encryptPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );
      return encryptPassword;
    } catch (error) {
      console.error(ERROR_ENCRYPT_PASSWORD, error);
      showSnackbar(ERROR_ENCRYPT_PASSWORD, "error");
    }
  };

  // Función para comparar contraseñas encriptadas
  const comparePassword = async (inputPassword, encryptPassword) => {
    try {
      const hashInput = await hashPassword(inputPassword);
      return hashInput === encryptPassword;
    } catch (error) {
      console.error(ERROR_COMPARE, error);
      showSnackbar(ERROR_COMPARE, "error");
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    await AsyncStorage.removeItem("isAuthenticated");
    setStatus("unauthenticated");
    await AsyncStorage.removeItem("user");
    setDataUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        setDataUser,
        status,
        login,
        register,
        logout,
        authenticateBiometric,
      }}
    >
      {children}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={hideSnackbar}
        duration={3000}
        theme={{ colors: { surface: '#000000' } }}
      >
        {snackbarMessage}
      </Snackbar>
    </AuthContext.Provider>
  );
};
