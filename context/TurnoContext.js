import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { CentroContext } from "./CentroContext";


export const TurnoContext = createContext();


export const TurnoProvider = ({ children }) => {
    const {userData} = useContext(AuthContext);
    const{eliminarHorario} = useContext(CentroContext);
    const [turno, setTurno] = useState(null);

    useEffect(() => {
        if (userData) {
        // Obtener el turno del usuario al cargar el componente
        const fetchTurno = async () => {
          try {
            const response = await fetch("https://6678608a0bd45250561e79c7.mockapi.io/turnos");
            const turnos = await response.json();
            const userTurno = turnos.find((element) => element.usuarioId === userData.id);
            setTurno(userTurno || null);
          } catch (error) {
            console.error("Error al obtener el turno:", error);
          }
        };
    
        fetchTurno();}
      }, [userData]);
// Este metodo se encarga de gestionar el turno recive por parametro el ID del centro
    const handleTurno = async(centro,fecha,hora) => {
        const canCreateTurno = await validarUser();  // Valida si el usuario ya tiene un turno activo
        if (canCreateTurno){
            try {
                const response = await fetch("https://6678608a0bd45250561e79c7.mockapi.io/turnos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        centroId: centro.id,
                        usuarioId: userData.id,
                        fecha: fecha,
                        hora: hora,
                    }),
                });
    
                if (response.ok) {
                    alert("Turno cargado correctamente")
                    eliminarHorario(centro,fecha,hora)
                    const newTurno = await response.json();
                    setTurno(newTurno);
                }
    
            } catch (error) {
                console.error("Error al cargar el turno:", error);
            }
        }else{
            alert("Ya posee un turno activo")
        }
    };

    const cancelarTurno = async (turnoId) => {
        try {
          const response = await fetch(`https://6678608a0bd45250561e79c7.mockapi.io/turnos/${turnoId}`, {
            method: "DELETE",
          });
    
          if (response.ok) {
            alert("Tu turno ha sido cancelado.");
            setTurno(null);
          } else {
            console.error("Error al cancelar el turno.");
          }
        } catch (error) {
          console.error("Error al cancelar el turno:", error);
        }
      };
      
    const validarUser = async () => {
    try {
        const response = await fetch("https://6678608a0bd45250561e79c7.mockapi.io/turnos");
        const turnos = await response.json();
        // Verifica si ya existe un turno para el usuario actual
        return !turnos.some((element) => element.usuarioId === userData.id);
    } catch (error) {
        console.error("Error al validar usuario:", error);
        return false;  // Si hay un error en la validación, asume que no puede crear un turno
    }
    };

    return (
        <TurnoContext.Provider
          value={{turno, handleTurno, cancelarTurno}}
        >
          {children}
        </TurnoContext.Provider>
      ); 
}