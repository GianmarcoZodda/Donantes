import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { useContext, useState, useEffect} from 'react';
import { CentroContext } from '../context/CentroContext';
import { useNavigation } from '@react-navigation/native';

const AddCentroScreen = ({  }) => {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefonoConsultas, setTelefonoConsultas] = useState('');
  const [telefonoEmergencias, setTelefonoEmergencias] = useState('');
  const [email, setEmail] = useState('');
  const { addCentro } = useContext(CentroContext);
  const navigation = useNavigation()

  const handleAddCentro = async() => {
    // valido que los parametros que me llegan no sean nulos. despues, el contexto se encarga de validar su formato y agregarlo a bd
    if(validateInputs(nombre, direccion, email, telefonoConsultas, telefonoEmergencias)){
        try{
            const nuevoCentro = {
                nombre,
                direccion,
                telefonoConsultas,
                telefonoEmergencias,
                email,
              };
              if(await addCentro(nuevoCentro)){
                alert("centro agregado correctamente")
                navigation.navigate('Home');
              }
        }
        catch(error){
            console.log(error)
            alert("error creando el centro")
        }
    }
   
  };

  const validateInputs = (nombre, direccion, email, telefonoConsultas, telefonoEmergencias) => {
    let result = true;
    if (!nombre || !direccion || !email || !telefonoConsultas || !telefonoEmergencias) {
        alert('Por favor, completa todos los campos');
        result = false;
    }
    return result;
}
  

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
        placeholder="Teléfono de Consultas"
        value={telefonoConsultas}
        onChangeText={setTelefonoConsultas}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono para Urgencias"
        value={telefonoEmergencias}
        onChangeText={setTelefonoEmergencias}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Agregar Centro" onPress={handleAddCentro} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddCentroScreen;