import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { CentroContext } from "./CentroContext";
import { Snackbar } from 'react-native-paper';

export const TurnoContext = createContext();

export const TurnoProvider = ({ children }) => {
    const { userData } = useContext(AuthContext);
    const { eliminarHorario, reAgregarHorario } = useContext(CentroContext);
    const [turno, setTurno] = useState(null);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');

    const onDismissSnackBar = () => setVisible(false);

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

            fetchTurno();
        }
    }, [userData,]);

    // Este metodo se encarga de gestionar el turno recive por parametro el ID del centro
    const handleTurno = async (centro, fecha, hora) => {
        const canCreateTurno = await validarUser();  // Valida si el usuario ya tiene un turno activo
        if (canCreateTurno) {
            try {
                const response = await fetch("https://6678608a0bd45250561e79c7.mockapi.io/turnos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        centroId: centro,
                        usuarioId: userData.id,
                        fecha: fecha,
                        hora: hora,
                    }),
                });

                if (response.ok) {
                    setMessage("Turno cargado correctamente");
                    setVisible(true);
                    eliminarHorario(centro, fecha, hora);
                    const newTurno = await response.json();
                    setTurno(newTurno);
                }

            } catch (error) {
                console.error("Error al cargar el turno:", error);
            }
        } else {
            setMessage("Ya posee un turno activo");
            setVisible(true);
        }
    };

    const cancelarTurno = async (turnoId) => {
        try {
            const response = await fetch(`https://6678608a0bd45250561e79c7.mockapi.io/turnos/${turnoId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setMessage("Tu turno ha sido cancelado.");
                setVisible(true);
                if (turno) {
                    // Reagregar el turno cancelado a la lista de horarios disponibles
                    reAgregarHorario(turno.centroId, turno.fecha, turno.hora);
                }
                setTurno(null);
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
            value={{ turno, handleTurno, cancelarTurno }}
        >
            {children}
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                duration={3000}
            >
                {message}
            </Snackbar>
        </TurnoContext.Provider>
    );
}
