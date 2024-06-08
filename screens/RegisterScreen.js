import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { useContext, useState, useEffect} from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen( {} ) {

    const { register } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('')
    const navigation = useNavigation()



    const handleRegister = async () => {
        if (validateInputs(name, lastName, email, password, confirmPassword)) {
          const userData = { name, lastName, email, password }
          try {
            if(await register(userData)){
              navigation.navigate('Home');
            }
        } catch (error) {
            console.log(error);
            alert('Error al registrar el usuario');
        }
    }
      };

      const validateInputs = (name, lastName, email, password, confirmPassword) => {
        if (!name || !lastName || !email || !password || !confirmPassword) {
            alert('Por favor, completa todos los campos');
            return false;
        }
        if (password !== confirmPassword) {
            alert('La contraseña no coincide');
            return false;
        }
        return true;
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
      placeholder="Nombre"
      value={name}
      onChangeText={setName}
    />
    <TextInput
      style={styles.input}
      placeholder="Apellido"
      value={lastName}
      onChangeText={setLastName}
    />
    <TextInput
      style={styles.input}
      placeholder="Password"
      value={password}
      onChangeText={setPassword}
    />
    <TextInput
      style={styles.input}
      placeholder="Confirm Password"
      value={confirmPassword}
      onChangeText={setConfirmPassword}
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


