import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserProfile = ({ userData }) => {
  return (
<View style={styles.container}>
      <Text style={styles.name}>{userData.name} {userData.lastName}
      </Text>
      <Text style={styles.email}>{userData.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9', // Fondo suave y claro
    borderRadius: 10, // Bordes redondeados
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Sombra en Android
    margin: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333', // Color de texto suave
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#555', // Color de texto más claro
  },
});

export default UserProfile;