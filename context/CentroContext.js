import React, { createContext, useState, useEffect } from "react";

// Crear el contexto
export const CentroContext = createContext();

//constante para la longitud del nombre (para su posterior validacion) y mensaje de error
const MIN_LONGITUD_NOMBRE = 2;

// URL de la API
const API_URL =
  "https://665b5468003609eda4609543.mockapi.io/centros";

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
    const { nombre, direccion, email, telefonoConsultas, telefonoEmergencias } =
      newCentro;
    let result = false;

    // Validar los datos del nuevo centro
    if (
      validateInputs(
        nombre,
        direccion,
        email,
        telefonoConsultas,
        telefonoEmergencias
      )
    ) {
      if (
        validateCenter(nombre, email, telefonoConsultas, telefonoEmergencias)
      ) {
        try {
          const response = await fetch(API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newCentro),
          });

          if (response.ok) {
            //me guardo el centro que viene en la response
            const centroAgregado = await response.json();
            //agarro todos los centros anteriores y le agrego el newcentro (pero antes le agrego el id que me incluye la response, para que no me de el error)
            setCentros((prevCentros) => [
              ...prevCentros,
              { ...newCentro, id: centroAgregado.id },
            ]);
            result = true;
          } else {
            //muestro tambien el estado de response
            console.error("Error al agregar el centro:", response.statusText);
          }
        } catch (error) {
          //con console.error, muestro el error como si fallara la app masomenos
          console.error("Error al agregar el centro:", error);
        }
      } else {
        console.error("Los datos del centro no son válidos");
      }
    } else {
      console.error("Por favor, completa todos los campos");
    }
    return result;
  };
  //Esta funcion elimina el horario que agendo el usuario 
  const eliminarHorario = async (centroId, fecha, hora) => {
    try {
      // Obtener el centro por su ID
      const response = await fetch(`${API_URL}/${centroId}`);
      const centro = await response.json();
      if (!response.ok) {
        console.error(`Error al obtener el centro: ${response.status}`);
        return;
      }
  
      // Encontrar el horario específico
      const horarioIndex = centro.horarios.findIndex(h => h.fecha === fecha);
      if (horarioIndex === -1) {
        console.error('Fecha no encontrada en los horarios del centro.');
        return;
      }
  
      // Eliminar la hora específica
      const horas = centro.horarios[horarioIndex].horas;
      const horaIndex = horas.findIndex(h => h === hora);
      if (horaIndex === -1) {
        console.error('Hora no encontrada en la fecha especificada.');
        return;
      }
      horas.splice(horaIndex, 1);
  
      // Si la fecha no tiene más horas, eliminar la fecha
      if (horas.length === 0) {
        centro.horarios.splice(horarioIndex, 1);
      }
  
      // Actualizar el centro en la API
      const updateResponse = await fetch(`${API_URL}/${centroId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(centro),
      });
  
      if (updateResponse.ok) {
        console.log('El horario se eliminó correctamente');
      } else {
        console.error(`Error al actualizar el centro: ${updateResponse.status}`);
      }
    } catch (error) {
      console.error('Error al eliminar el horario:', error);
    }
  };

  // Funciones de validación

  //valido que los params del centro no sean nulos
  const validateInputs = (
    nombre,
    direccion,
    email,
    telefonoConsultas,
    telefonoEmergencias
  ) => {
    return (
      nombre && direccion && email && telefonoConsultas && telefonoEmergencias
    );
  };

  //valido al centro en gral, utilizando las validaciones de tipo
  const validateCenter = (
    nombre,
    email,
    telefonoConsultas,
    telefonoEmergencias
  ) => {
    return (
      validateName(nombre) &&
      validateMail(email) &&
      validatePhone(telefonoConsultas) &&
      validatePhone(telefonoEmergencias)
    );
  };

  const validateMail = (email) => {
    const regexCorreo =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
  const editCentro = async (centro) => {
    //tambien obtengo el id, paraa luego utilizarlo
    const {
      id,
      nombre,
      direccion,
      email,
      telefonoConsultas,
      telefonoEmergencias,
    } = centro;
    let result = false;

    if (
      validateInputs(
        nombre,
        direccion,
        email,
        telefonoConsultas,
        telefonoEmergencias
      )
    ) {
      if (
        validateCenter(nombre, email, telefonoConsultas, telefonoEmergencias)
      ) {
        try {
          //a la url, tambien le paso el id para agarrar el centro que quiero
          const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(centro),
          });

          if (response.ok) {
            const centroActualizado = await response.json();
            // me agarro los centros previos
            //con map los recorro todos para aplicar modificacion (y creear nuevo array)
            //a map le paso la funcion => para que si el centro que tiene coincide el id con el editado, el nuevo array tiene centro actualizado, sino el centro que estaba
            setCentros((prevCentros) =>
              prevCentros.map((centro) =>
                centro.id === id ? centroActualizado : centro
              )
            );
            console.log("Centro editado correctamente:", centroActualizado);
            alert("Centro editado correctamente");
            result = true;
          } else {
            console.error("Error al editar el centro:", response.statusText);
          }
        } catch (error) {
          console.error("Error al editar el centro:", error);
        }
      } else {
        console.error("Los datos del centro no son válidos");
      }
    } else {
      console.error("Por favor, completa todos los campos");
    }
    return result;
  };

  const deleteCentro = async (id) => {
    let result = false;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCentros((prevCentros) =>
          prevCentros.filter((centro) => centro.id !== id)
        );
        result = true;
        alert("Centro eliminado correctamente");
      } else {
        alert("Error eliminando el centro");
      }
    } catch (error) {
      console.error("Error eliminando el centro:", error);
      console.error("Error eliminando el centro");
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
        eliminarHorario
      }}
    >
      {children}
    </CentroContext.Provider>
  );
};
