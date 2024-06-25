import React, { useContext, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { CentroContext } from '../../context/CentroContext';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditCentroScreen = () => {
  const route = useRoute();
  const { centro } = route.params;

  const [nombre, setNombre] = useState(centro.nombre);
  const [direccion, setDireccion] = useState(centro.direccion);
  const [telefonoConsultas, setTelefonoConsultas] = useState(centro.telefonoConsultas);
  const [telefonoEmergencias, setTelefonoEmergencias] = useState(centro.telefonoEmergencias);
  const [email, setEmail] = useState(centro.email);

  const navigation = useNavigation();
  const { editCentro } = useContext(CentroContext);

  const handleEditCentro = async () => {
    try {
      const centroEditado = {
        id: centro.id,
        nombre,
        direccion,
        telefonoConsultas,
        telefonoEmergencias,
        email,
      };

      let result = await editCentro(centroEditado);

      if (result) {
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        value={direccion}
        onChangeText={setDireccion}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono Consultas"
        value={telefonoConsultas}
        onChangeText={setTelefonoConsultas}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono Emergencias"
        value={telefonoEmergencias}
        onChangeText={setTelefonoEmergencias}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleEditCentro}>
        <Text style={styles.loginButtonText}>Confirmar Edición</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default EditCentroScreen;
