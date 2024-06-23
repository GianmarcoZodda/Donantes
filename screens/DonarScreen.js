import React, { useContext,useState } from 'react';
import { View, Text,TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {UserContext } from '../context/UserContext.js';
import {Picker} from '@react-native-picker/picker';
import { CentroContext } from '../context/CentroContext.js';
import { TurnoContext } from '../context/TurnoContext.js';
import TurnoPickerComponent from '../components/FechaTurno.jsx'



const DonarScreen = () => {

    const navigation = useNavigation();
    const {userData} = useContext(UserContext);
    const { centros } = useContext(CentroContext);
    const [selectedCentroId, setSelectedCentroId] = useState(null);
    const [selectedDia, setSelectedDia] = useState(null);
    const [selectedHora, setSelectedHora] = useState(null);
    const {handleTurno} = useContext(TurnoContext);

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
            handleTurno(selectedCentroId,selectedDia,selectedHora)
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
  
        {/* Selector de centros */}
        <Picker
          selectedValue={selectedCentroId}
          onValueChange={(itemValue, itemIndex) => setSelectedCentroId(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seleccione un centro" value={null} />
          {centros.map(centro => (
            <Picker.Item key={centro.id} label={centro.nombre} value={centro.id} />
          ))}
        </Picker>
  

        {/* Selector de días */}
      <View style={styles.datePickerContainer}>
      <TurnoPickerComponent selectedDate={selectedDia}  onDateChange={(date) => setSelectedDia(date)}/>
      <Text style={styles.selectedDate}>{selectedDia}</Text>
      </View>

      {/* Selector de horas */}
      <Picker
        selectedValue={selectedHora}
        onValueChange={(itemValue) => setSelectedHora(itemValue)}
        style={styles.picker}
        enabled={selectedDia !== null}
      >
        <Picker.Item label="Seleccione un horario" value={null} />
        {selectedDia && centros.find(centro => centro.id === selectedCentroId)?.horarios.find(horario => horario.fecha === selectedDia)?.horas.map(hora => (
          <Picker.Item key={hora} label={hora} value={hora} />
        ))}
      </Picker>
  
    <TouchableOpacity style={styles.agendarButton} onPress={HandleDonationProcess} disabled={!selectedCentroId || !selectedHora}>
        <Text style={styles.agendarButtonText}>Agendar Turno</Text>
      </TouchableOpacity>
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
      marginBottom: 20,
      textAlign: 'center',
    },
    picker: {
      width: '100%',
      marginBottom: 20,
    },
    agendarButton: {
      backgroundColor: 'blue',
      padding: 12,
      borderRadius: 4,
      alignItems: 'center',
    },
    agendarButtonText: {
      color: 'white',
      fontSize: 16,
    },
    datePickerContainer: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    selectedDate: {
      marginLeft: 30, // Aumentar el espacio entre la fecha y el botón
      fontSize: 18,
      color: '#333',
    }
  });
  
  export default DonarScreen;
