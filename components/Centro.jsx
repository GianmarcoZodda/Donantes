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

      {/* Validación para mostrar los horarios solo si centro.horarios está definido y no está vacío */}
      {centro.horarios && centro.horarios.length > 0 && (
        <>
          <Text style={styles.horariosTitle}>Horarios:</Text>
          {centro.horarios.map((horario) => (
            <Text key={horario.fecha} style={styles.horarios}>
              {horario.fecha}: {horario.horas.join(', ')}
            </Text>
          ))}
        </>
      )}
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  info: {
    fontSize: 16,
    marginBottom: 6,
    color: '#34495e',
  },
  horariosTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  horarios: {
    fontSize: 14,
    marginLeft: 10,
  },
});

export default Centro;
