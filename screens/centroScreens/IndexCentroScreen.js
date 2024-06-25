import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CentroContext } from '../../context/CentroContext';
import { AuthContext } from '../../context/AuthContext';

const IndexCentroScreen = () => {
  const { centros, fetchCentros } = useContext(CentroContext);
  const navigation = useNavigation();
  const { userData } = useContext(AuthContext);

  // Actualizar la lista de centros al cargar la pantalla
  useEffect(() => {
    fetchCentros();
  }, []);

  // Función para renderizar cada elemento de la lista
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("DetailsCentro", { centro: item })}>
      <View style={styles.row}>
        <Text style={styles.cell}>{item.direccion}</Text>
        <Text style={styles.cell}>{item.nombre}</Text>
      </View>
    </TouchableOpacity>
  );

  // Validar si el usuario es administrador para mostrar el botón de agregar centro
  return (
    <View style={styles.container}>
      {/* Encabezados de la lista de centros */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Nombre del Centro</Text>
        <Text style={styles.headerText}>Dirección</Text>
      </View>
      {/* Lista de centros */}
      <FlatList
        data={centros}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false} // Ocultar la barra de desplazamiento vertical
      />
      {/* Botón para agregar centro, visible solo para administradores */}
      {userData.admin && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddCentro")}
        >
          <Text style={styles.buttonText}>Agregar Centro</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  header: {
    flexDirection: 'row',
    paddingBottom: 8,
    marginBottom: 8,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth, 
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20, 
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  flatListContainer: {
    flexGrow: 1, 
  },
});

export default IndexCentroScreen;
