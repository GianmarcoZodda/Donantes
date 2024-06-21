import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {UserContext } from '../context/UserContext.js';


const DonarScreen = () => {

    const navigation = useNavigation();
    const {userData} = useContext(UserContext);

    const HandleDonationProcess = () =>{
        //hay un error trayendome la data:
        if (!userData) {
            alert("Error: Datos del usuario no disponibles.");
            return;
        }

        //chequeo si el usuario completo previamente datos importantes, como su tipo de sangre y su edad, x ejemplo
        const tieneDataCompleta = (userData.birthDate != null) && (userData.bloodType != null);

        //si lo hizo, me muestras los centros disponibles
        if(tieneDataCompleta){
            console.log(tieneDataCompleta)
            navigation.navigate('CentroStack', { screen: 'IndexCentro' });
        }

        //si no, me manda a llenar los datos
        else{
          alert('Para donar por favor completa tus datos');
            navigation.navigate('Profile');
        }
        
    }



  return (
    <View style={styles.container}>
      <Text style={styles.reminderText}>Recuerda acudir con 8 horas de ayuno</Text>
      <Text style={styles.scheduleText}>Los horarios de extracción son de lunes a viernes, de 08:00 hs a 12:00 hs</Text>
      <Button 
        title="Ver centros disponibles" 
        onPress={HandleDonationProcess} 
        color="#841584"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  reminderText: {
    fontSize: 18,
    color: '#d9534f',
    marginBottom: 20,
    textAlign: 'center',
  },
  scheduleText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 40,
    textAlign: 'center',
  },
});

export default DonarScreen;
