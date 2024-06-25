import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import UserProfile from "../components/UserProfile";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import ModalProfileUpdate from "../components/ModalProfileUpdate";
import { useNavigation } from "@react-navigation/native";
import { TurnoContext } from "../context/TurnoContext";
import { CentroContext } from "../context/CentroContext";

export default function PerfilScreen({}) {
  const { userData } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const { updateUser } = useContext(UserContext);
  const { turno, cancelarTurno } = useContext(TurnoContext);
  const { buscarCentro } = useContext(CentroContext);
  const [centro, setCentro] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const traerCentro = async () => {
      if (turno && turno.centroId) {
        const fetchedCentro = await buscarCentro(turno.centroId);
        setCentro(fetchedCentro);
      }
    };
    traerCentro();
  }, [turno, buscarCentro]);

  const handleSave = async (data) => {
    try {
      const result = await updateUser(data);
      if (result) {
        navigation.navigate("Donar");
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  // Función para verificar si todos los campos están llenos
  const allFieldsFilled = () => {
    return (
      userData.address &&
      userData.phone &&
      userData.birthDate &&
      userData.bloodType
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Datos</Text>
      <UserProfile userData={userData} />
      <Text style={styles.infoText}>Dirección: {userData.address || ""}</Text>
      <Text style={styles.infoText}>Celular: {userData.phone || ""}</Text>
      <Text style={styles.infoText}>
        Fecha de nacimiento: {userData.birthDate || ""}
      </Text>
      <Text style={styles.infoText}>
        Tipo de sangre: {userData.bloodType || ""}
      </Text>
      {/* Cambio dinámico del texto del botón */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>
          {allFieldsFilled() ? "Editar datos" : "Agregar datos"}
        </Text>
      </TouchableOpacity>
      <ModalProfileUpdate
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
      {turno ? (
        <View style={styles.turnoContainer}>
          <Text style={styles.turnoTitle}>Tu próximo turno</Text>
          {centro ? (
            <>
              <Text style={styles.turnoInfo}>Centro: {centro.nombre}</Text>
              <Text style={styles.turnoInfo}>Fecha: {turno.fecha}</Text>
              <Text style={styles.turnoInfo}>Hora: {turno.hora}</Text>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => cancelarTurno(turno.id)}
              >
                <Text style={styles.buttonText}>Cancelar Turno</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.turnoInfo}>Cargando turno...</Text>
          )}
        </View>
      ) : (
        <View style={styles.noTurnoContainer}>
          <Text style={styles.noTurnoText}>Sin Próximo Turno</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    margin: 20,
  },
  infoText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#e74c3c",
    marginTop: 10,
  },
  turnoContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  turnoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  turnoInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  noTurnoContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    alignItems: "center",
  },
  noTurnoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
  },
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 10,
  },
});
