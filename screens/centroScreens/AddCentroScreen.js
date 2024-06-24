import { StyleSheet, View, Button, TextInput } from 'react-native';
import React, { useContext, useState} from 'react';
import { CentroContext } from '../../context/CentroContext';
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
    //el metodo del context se encarga dee la logica, como validacion de los campos. 
    //aca solo encierro todo en try catch para ver si el booleano que me devuelve es tru y salio todo ok
        try{
              const nuevoCentro = {nombre,direccion,telefonoConsultas,telefonoEmergencias,email};
              let result = await addCentro(nuevoCentro);
              if(result){
                navigation.navigate('Home');
              }
        }
        catch(error){
            console.error(error)
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