import React, { useState,useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

  const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { status,login } = useContext(AuthContext);

  const handleLogin = () => {
  //aca va la logica del inicio de sesion

    //1) ir a la bd y consultar x algun user con ese mail
    //2) traermelo y chequear las password

    //caso a, datos incorrectos o no existe user: (ejemplo basico)
    if(status == 'authenticated'){
      alert("Ya esta autenticado")
    }else{
      if(login(email,password)){
        navigation.navigate('Home');
      }
    }
    //caso b, existe el user y la password es correcta
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión</Text>
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
      <Button title="Iniciar Sesión" onPress={handleLogin} />
    </View>
  );
};

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

export default LoginScreen;