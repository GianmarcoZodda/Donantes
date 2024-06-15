import React,{useContext, useEffect}from 'react';
import { View, Text, Button, StyleSheet, Image, FlatList } from 'react-native';
import { AuthContext } from '../context/AuthContext.js';

const HomeScreen = ({ navigation }) => {
  const { status,logout } = useContext(AuthContext);

    //creo un array de elementos. a algunos les agrego contenido (un titulo o parrafo) y los otros son para redirigir

  const data = [
    { key: '1', title: '¿Por qué donar sangre?', content: 'Donar sangre es un acto altruista que puede salvar muchas vidas. Cada donación puede ayudar hasta a tres personas en situaciones de emergencia, cirugías y tratamientos de enfermedades crónicas.' },
    { key: '2', title: 'Estadísticas de Donantes', content: 'En el mundo, millones de personas necesitan transfusiones de sangre cada año. Ayuda a aumentar el número de donantes y a salvar vidas.' },
    { key: '3', title: 'Perfil', action: () => navigation.navigate('Profile') },
    { key: '4', title: 'Iniciar Sesión', action: () => navigation.navigate('Login') },
    { key: '5', title: 'Registrarme', action: () => navigation.navigate('Register') },
    { key: '6', title: 'Ver Centros', action: () => navigation.navigate('IndexCentro') },
    { key: '7', title: 'Ver Noticias', action: () => navigation.navigate('News') },
    { key: '8', title: 'Cerrar Sesion ', action: () => logout() },
    { key: '9', title: status }, 
    
    //aca falta agregar a los donantes y medicos (index general). despues un edit, details,remove para c/u
  ];
  const filteredData = data.filter(item => {
    if (status === 'unauthenticated') {
      return item.key !== '3' && item.key !== '8';
    } else {
      return item.key !== '4' && item.key !== '5';
    }
  });

//a esta funcion le llega un item (elemento de data)
  const renderItem = ({ item }) => {

    //si el item tiene contenido, lo muestra con los estilos para los titulos, parrafos etc
    if (item.content) {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{item.title}</Text>
          <Text style={styles.text}>{item.content}</Text>
        </View>
      );
    } 
    
    //caso contrario crea un boton y  con onPress llama a la "action" de c/u (redireccion a la screen correspondiente)
    else {
      return (
        <View style={styles.buttonContainer}>
          <Button
            title={item.title}
            onPress={item.action}
            color="#841584"
          />
        </View>
      );
    }
  };


  //se retorna flatlist por la buena practica de no cargar todos los items, sino solo los que aparecen en pantalla
  //ya que ahora tenemos pocos, pero en el futuro podemos agregar mas
  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={
        <View style={styles.header}> 
          <Text style={styles.title}>¡Dona Sangre, Salva Vidas!</Text>
        </View>
      }
      data={filteredData}
      renderItem={renderItem}
      keyExtractor={item => item.key}
    />
  );
};

//estilos generados con chatgpt (soy un queso con css)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d9534f',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#d9534f',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

export default HomeScreen;
