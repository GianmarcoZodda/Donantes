import React, { useContext} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity,  } from 'react-native';
import { AuthContext } from '../context/AuthContext.js';
import { Linking } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const { status, logout } = useContext(AuthContext);
  const isAuthenticated = status === "authenticated";

  const data = [
    { key: '1', title: '¿Por qué donar sangre?', content: 'Donar sangre es un acto altruista que puede salvar muchas vidas. Cada donación puede ayudar hasta a tres personas en situaciones de emergencia, cirugías y tratamientos de enfermedades crónicas.' },
    { key: '2', title: 'Estadísticas de Donantes', content: 'En el mundo, millones de personas necesitan transfusiones de sangre cada año. Ayuda a aumentar el número de donantes y a salvar vidas.' },
    { key: '3', title: 'Donar', action: () => navigation.navigate('Donar'), showIfAuthenticated: true },
    { key: '4', title: 'Perfil', action: () => navigation.navigate('Profile'), showIfAuthenticated: true },
    { key: '5', title: 'Iniciar Sesión', action: () => navigation.navigate('Login'), showIfAuthenticated: false },
    { key: '6', title: 'Registrarme', action: () => navigation.navigate('Register'), showIfAuthenticated: false },
    { key: '7', title: 'Ver Centros', action: () => navigation.navigate('CentroStack'), showIfAuthenticated: true },
    { key: '8', title: 'Mas Informacion', action: () => Linking.openURL('https://www.argentina.gob.ar/salud/donarsangre') },
    { key: '9', title: 'Cerrar Sesion ', action: () => logout(), showIfAuthenticated: true },
  ];

  const renderItem = ({ item }) => {
    if (item.showIfAuthenticated !== undefined && item.showIfAuthenticated !== isAuthenticated) {
      return null;
    }

    if (item.content) {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{item.title}</Text>
          <Text style={styles.text}>{item.content}</Text>
        </View>
      );
    } else {
      return (
        <TouchableOpacity style={styles.button} onPress={item.action}>
          <Text style={styles.buttonText}>{item.title}</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}>¡Dona Sangre, Salva Vidas!</Text>
        </View>
      }
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.key}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e74c3c',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333333',
  },
  text: {
    fontSize: 16,
    color: '#555555',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default HomeScreen;
