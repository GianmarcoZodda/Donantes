import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const IndexCentroScreen = () => {
    const [centros, setCentros] = useState([]);
    const API_URL = 'https://666388ee932baf9032a87188.mockapi.io/api/v1/centros/centro';
    const navigation = useNavigation()

  useEffect(() => {
    const fetchCentros = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setCentros(data);
      } catch (error) {
        console.error('Error en el fetch:', error);
      }
    };

    fetchCentros();
  }, []);

  const AgregarCentro = () => {
    navigation.navigate("AddCentro");
  }

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.nombre}</Text>
      <Text style={styles.cell}>{item.direccion}</Text>
      <Text style={styles.cell}>{item.telefonoConsultas}</Text>
    </View>
  );

  return (
   
    <View style={styles.container}>
        <Button title="Agregar Centro" onPress={AgregarCentro} />
      <View style={styles.header}>
        <Text style={styles.headerText}>ID</Text>
        <Text style={styles.headerText}>Nombre del Centro</Text>
        <Text style={styles.headerText}>Direccion</Text>
        <Text style={styles.headerText}>Telefono de Consultas</Text>
      </View>
      <FlatList
        data={centros}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
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
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    flex: 1,
    fontSize: 16,
  },
});

export default IndexCentroScreen;