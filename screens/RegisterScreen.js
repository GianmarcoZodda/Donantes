import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useContext, useState} from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import CustomPasswordButton from '../components/CustomPasswordButton'

export default function RegisterScreen( {} ) {

    const { register } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('')
    const navigation = useNavigation()
    const [showPassword, setShowPassword] = useState(false);



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
    const passwordState = () => {
      setShowPassword(!showPassword);
    };

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
       <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <CustomPasswordButton visible={showPassword} onPress={passwordState}/>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Registrarme</Text>
      </TouchableOpacity>
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
  },
  registerButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
  },
});


