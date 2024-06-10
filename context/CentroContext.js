import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const CentroContext = createContext();

//constante para la longitud del nombre (para su posterior validacion) y mensaje de error
const MIN_LONGITUD_NOMBRE = 2;
const MSG_ERROR_CREACION = "Error al ingresar el centro, intentelo nuevamente";

// URL de la API
const API_URL = 'https://666388ee932baf9032a87188.mockapi.io/api/v1/centros/centro';

// Proveedor del contexto
export const CentroProvider = ({ children }) => {
  const [centros, setCentros] = useState([]);

  // Obtener los centros almacenados al cargar el componente
  useEffect(() => {
    const fetchCentros = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setCentros(data);
      } catch (error) {
        console.error('Error al obtener los centros:', error);
      }
    };

    fetchCentros();
  }, []);

  // Función para agregar un nuevo centro
  const addCentro = async (newCentro) => {
    let result = false;
    try {
        if (validateCenter(newCentro)) {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCentro),
            });

            if (res.ok) {
                // Si la solicitud es exitosa, actualizar el estado de los centros
                setCentros(prevCentros => [...prevCentros, newCentro]);
                console.log("El centro se agregó correctamente:", newCentro);
                result = true;
            } else {
                // Si la solicitud no es exitosa, muestro err
                alert(MSG_ERROR_CREACION);
            }
        } else {
            // Si el centro no pasa la validación, muestro err
            alert(MSG_ERROR_CREACION)
        }
    } catch (error) {
        // Si ocurre un error durante la solicitud, muestro de error
        alert(MSG_ERROR_CREACION);
    }
    return result;
}




//funcion para validar los datos ingresados por el cliente

const validateCenter = (newCentre) => {
    const {nombre, email, telefonoConsultas, telefonoEmergencias} = newCentre;
    let result = false;

        const isNombreValido = validateName(nombre);
        //const isDireccionValida = validateAddress(direccion);
        const isEmailValido = validateMail(email);
        const isPhoneOneValido = validatePhone(telefonoConsultas);
        const isPhoneTwoValido = validatePhone(telefonoEmergencias);

        if (isNombreValido && isEmailValido && isPhoneOneValido && isPhoneTwoValido) {
            result = true;
        }

        return result;
}

  const validateMail = (email) => {
        let result = false;
        let regexCorreo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(regexCorreo.test(email)){
            result = true
        }
        return result;
  }

  const validateName = (nombre) => {
    let result = false;
    if(nombre.trim().length >= MIN_LONGITUD_NOMBRE){
        result = true;
    }
    return result;
}

const validatePhone = (telefono) => {
    let result = false;
    const integerRegex = /^[0-9]+$/;
    if(integerRegex.test(telefono)){
        result = true;
    }
    return result;
}



  // Proveer el estado y las funciones a los componentes hijos
  return (
    <CentroContext.Provider value={{ centros, addCentro }}>
      {children}
    </CentroContext.Provider>
  );
};