import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Centro = ({ centro }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.nombre}>{centro.nombre}</Text>
      <Text style={styles.info}>Dirección: {centro.direccion}</Text>
      <Text style={styles.info}>Teléfono Consultas: {centro.telefonoConsultas}</Text>
      <Text style={styles.info}>Teléfono Urgencias: {centro.telefonoEmergencias}</Text>
      <Text style={styles.info}>Email: {centro.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  info: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default Centro;