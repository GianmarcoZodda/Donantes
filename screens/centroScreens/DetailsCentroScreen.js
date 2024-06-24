import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";

const DetailsCentroScreen = () => {
  const navigation = useNavigation();

  //de la ruta, agarro solo el centro (desestructuro lo que esta en params)
  const route = useRoute();
  const { centro } = route.params;
  const { userData } = useContext(AuthContext);

  const HandleNavigation = (viewname, centro) => {
    navigation.navigate(viewname, { centro });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.nombre}>{centro.nombre}</Text>
      <Text style={styles.info}>Dirección: {centro.direccion}</Text>
      <Text style={styles.info}>
        Teléfono Consultas: {centro.telefonoConsultas}
      </Text>
      <Text style={styles.info}>
        Teléfono Urgencias: {centro.telefonoEmergencias}
      </Text>
      <Text style={styles.info}>Email: {centro.email}</Text>
      <Text style={styles.horariosTitle}>Horarios:</Text>
      {centro.horarios.map((horario) => (
        <Text key={horario.fecha} style={styles.horarios}>
          {horario.fecha}: {horario.horas.join(", ")}
        </Text>
      ))}

      {userData.admin && (
        <View>
          <Button
            title="Editar"
            onPress={() => HandleNavigation("EditCentro", centro)}
          />
          <Button
            title="Eliminar"
            onPress={() => HandleNavigation("DeleteCentro", centro)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  nombre: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2c3e50",
  },
  info: {
    fontSize: 16,
    marginBottom: 6,
    color: "#34495e",
  },
  horariosTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  horarios: {
    fontSize: 14,
    marginLeft: 10,
  },
});

export default DetailsCentroScreen;
