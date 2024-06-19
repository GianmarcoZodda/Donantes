import React, { useState,useContext,} from 'react';
import { View, Text, TextInput, TouchableOpacity , StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import CustomPasswordButton from '../components/CustomPasswordButton'

  const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { status,login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const passwordState = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    if(status == 'authenticated'){
      alert("Ya esta autenticado")
    }else{
      if(login(email,password)){
        navigation.navigate('Home');
      }
    }
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
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword} // Oculta la contraseña si showPassword es false
        />
        <CustomPasswordButton visible={showPassword} onPress={passwordState} />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    borderRadius: 4,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    padding: 8,
  },
  loginButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LoginScreen;