import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { useState } from 'react';


export default function RegisterScreen( {navigation} ) {


    const [email, setEmail] = useState(' ');
    const [password, setPassword] = useState(' ');


    const handleRegister = () => {
        //aca vamos a poner la logica para el registro (validaciones y otras cosas)
        
        //si algo sale mal

        //if( sale mal ){
            //alert("algo malio sal");
        //}

        //si sale todo bien, el usuario queda registrado (agregar logica)
        //y lo dirigimos al edit de su perfil para que agreguetodos sus datos
        navigation.navigate('Edit');

    }


  return (
    <View style={styles.container}>
    <Text style={styles.title}>Registro</Text>
    <TextInput
      style={styles.input}
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
    />
    <TextInput
      style={styles.input}
      placeholder="Password"
      value={password}
      onChangeText={setPassword}
    />
    <Button title="Registrarme" onPress={handleRegister} />
  </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
      textAlign: 'center',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 12,
      padding: 8,
      borderRadius: 4,
    },
  });


