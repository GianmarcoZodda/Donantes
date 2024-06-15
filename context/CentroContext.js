import React, { createContext, useState, useEffect } from "react";

// Crear el contexto
export const CentroContext = createContext();

//constante para la longitud del nombre (para su posterior validacion) y mensaje de error
const MIN_LONGITUD_NOMBRE = 2;

// URL de la API
const API_URL ="https://666388ee932baf9032a87188.mockapi.io/api/v1/centros/centro";

// Proveedor del contexto
export const CentroProvider = ({ children }) => {
  const [centros, setCentros] = useState([]);

  const fetchCentros = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCentros(data);
    } catch (error) {
      console.error("Error al obtener los centros:", error);
    }
  };

  // Obtener los centros almacenados al cargar el componente
  useEffect(() => {
    fetchCentros();
  }, []);


  //agrego centro
  const addCentro = async (newCentro) => {
    const { nombre, direccion, email, telefonoConsultas, telefonoEmergencias } = newCentro;

    // Validar los datos del nuevo centro
    if (validateInputs(nombre, direccion, email, telefonoConsultas, telefonoEmergencias)) {
        if (validateCenter(nombre, email, telefonoConsultas, telefonoEmergencias)) {
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newCentro),
                });

                if (response.ok) {
                  //me guardo el centro que viene en la response
                    const centroAgregado = await response.json();
                  //agarro todos los centros anteriores y le agrego el newcentro (pero antes le agrego el id que me incluye la response, para que no me de el error)
                    setCentros((prevCentros) => [...prevCentros, { ...newCentro, id: centroAgregado.id }]);
                    return true;
                } else {
                  //muestro tambien el estado de response
                    console.error('Error al agregar el centro:', response.statusText);
                    return false;
                }
            } catch (error) {
              //con console.error, muestro el error como si fallara la app masomenos
                console.error('Error al agregar el centro:', error);
                return false;
            }
        } else {
            console.error('Los datos del centro no son válidos');
            return false;
        }
    } else {
        console.error('Por favor, completa todos los campos');
        return false;
    }
};


// Funciones de validación

//valido que los params del centro no sean nulos
const validateInputs = (nombre, direccion, email, telefonoConsultas, telefonoEmergencias) => {
return nombre && direccion && email && telefonoConsultas && telefonoEmergencias;
};


//valido al centro en gral, utilizando las validaciones de tipo
const validateCenter = (nombre, email, telefonoConsultas, telefonoEmergencias) => {
return validateName(nombre) && validateMail(email) && validatePhone(telefonoConsultas) && validatePhone(telefonoEmergencias);
};

const validateMail = (email) => {
const regexCorreo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
return regexCorreo.test(email);
};

const validateName = (nombre) => {
return nombre.trim().length >= MIN_LONGITUD_NOMBRE;
};

const validatePhone = (telefono) => {
const integerRegex = /^[0-9]+$/;
return integerRegex.test(telefono);
};



  //editar centro
  const editCentro = async (id, updatedCentro) => {
    const { nombre, email, telefonoConsultas, telefonoEmergencias } =
      updatedCentro;

    if (
      validateCenter({ nombre, email, telefonoConsultas, telefonoEmergencias })
    ) {
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCentro),
        });

        if (res.ok) {
          const data = await res.json();
          // Actualizar el estado de centros después de la edición
          setCentros((prevCentros) =>
            prevCentros.map((centro) => (centro.id === id ? data : centro))
          );
          console.log("Centro editado correctamente:", data);
          alert("Centro editado correctamente");
        } else {
          // mostrar un mensaje de error
          alert("Error editando el centro");
        }
      } catch (error) {
        console.error("Error editando el centro:", error);
        alert("Error editando el centro");
      }
    } else {
      // Si los datos no son validos....
      alert("Datos del centro inválidos");
    }
  };

  const deleteCentro = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCentros((prevCentros) =>
          prevCentros.filter((centro) => centro.id !== id)
        );
        alert("Centro eliminado correctamente");
      } else {
        alert("Error eliminando el centro");
      }
    } catch (error) {
      console.error("Error eliminando el centro:", error);
      alert("Error eliminando el centro");
    }
  };

  // Proveer el estado y las funciones a los componentes hijos
  return (
    <CentroContext.Provider
      value={{
        centros,
        addCentro,
        validateInputs,
        editCentro,
        fetchCentros,
        deleteCentro,
      }}
    >
      {children}
    </CentroContext.Provider>
  );
};
