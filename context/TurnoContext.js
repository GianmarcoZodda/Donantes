import React, { createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { CentroContext } from "./CentroContext";


export const TurnoContext = createContext();


export const TurnoProvider = ({ children }) => {
    const {userData} = useContext(AuthContext);
    const{eliminarHorario} = useContext(CentroContext);
// Este metodo se encarga de gestionar el turno recive por parametro el ID del centro
    const handleTurno = async(centro,fecha,hora) => {
        if(validarUser){
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
                }
    
            } catch (error) {
                console.error("Error al cargar el turno:", error);
            }
        }else{
            alert("Ya posee un turno activo")
        }
    };

    const cancelarTurno= async () =>{

    }
    // Validamos si el miismo user ya tiene un turno -- Se podria agregar una validacion para que no pueda sacar turno con menos de 3 meses de separacion
    const validarUser= async()=>{
        let resul = true
        const response = await fetch("https://6678608a0bd45250561e79c7.mockapi.io/turnos");
        if(response.find((element) => element.id === id)){
            resul = false;
        }
        return resul

    }

    return (
        <TurnoContext.Provider
          value={{handleTurno}}
        >
          {children}
        </TurnoContext.Provider>
      ); 
}