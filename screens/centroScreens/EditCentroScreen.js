import React, { useContext, useState } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import { CentroContext } from '../../context/CentroContext';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditCentroScreeen = () => {

    //de la ruta, agarro solo el centro (desestructuro lo que esta en params)
    const route = useRoute();
    const { centro } = route.params;

  const [nombre, setNombre] = useState(centro.nombre);
  const [direccion, setDireccion] = useState(centro.direccion);
  const [telefonoConsultas, setTelefonoConsultas] = useState(centro.telefonoConsultas);
  const [telefonoEmergencias, setTelefonoEmergencias] = useState(centro.telefonoEmergencias);
  const [email, setEmail] = useState(centro.email);

  const navigation = useNavigation()

  const { editCentro } = useContext(CentroContext);

  const handleEditCentro = async () => {
   
      try {
          const centroedit = {id: centro.id, nombre, direccion, telefonoConsultas, telefonoEmergencias, email };

          let result = await editCentro(centroedit)

          if(result){
          navigation.navigate("Home");
          }
                    
      } catch (error) {
          console.error('Error: ', error);
      }
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

      <Button title="Confirmar Edición" onPress={handleEditCentro} />
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

export default EditCentroScreeen;
