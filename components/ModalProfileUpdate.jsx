import React, { useState } from 'react';
import { View, Modal, TextInput, TouchableOpacity , StyleSheet,Text  } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateOfBirthPicker from './DateOfBirthPicker';

const ModalProfileUpdate = ({ visible, onClose, onSave }) => {
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [bloodType, setBloodType] = useState('');
  
    const handleSave = () => {
    
    // Validamos fecha de nacimiento que sea MENOR a hoy  
      const today = new Date();
    if (birthDate && birthDate > today) {
      alert("Fecha de Nacimiento Invalida.");
      return;
    }
      onSave({ address, phone,birthDate,bloodType });      
      onClose();
    };
  
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.name}>Actualizar Perfil</Text>
            <TextInput
              placeholder="Direccion"
              value={address}
              onChangeText={setAddress}
              style={styles.input}
            />
            <TextInput
              placeholder="Numero de celular"
              value={phone}
              onChangeText={setPhone}
              keyboardType="numeric"
              maxLength={10}
              style={styles.input}
            />
            <View style={styles.datePickerContainer}>
              <DateOfBirthPicker
                selectedDate={birthDate}
                onDateChange={(date) => setBirthDate(date)}
              />
              {birthDate ? <Text style={styles.selectedDate}>{birthDate}</Text> : null}
            </View>
            <Picker style={styles.pickerStyles}
              selectedValue={bloodType}
              onValueChange={(itemValue) => setBloodType(itemValue)}
            >
              <Picker.Item label="Tipo de sangre" value="" />
              <Picker.Item label="A+" value="A+" />
              <Picker.Item label="A-" value="A-" />
              <Picker.Item label="B+" value="B+" />
              <Picker.Item label="B-" value="B-" />
              <Picker.Item label="AB+" value="AB+" />
              <Picker.Item label="AB-" value="AB-" />
              <Picker.Item label="O+" value="O+" />
              <Picker.Item label="O-" value="O-" />
            </Picker>
            <TouchableOpacity onPress={handleSave} style={styles.button}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={[styles.button, { backgroundColor: 'gray' }]}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      width: '90%',
      backgroundColor: '#f9f9f9',
      borderRadius: 10,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
      textAlign: 'center',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    datePickerContainer: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    selectedDate: {
      marginLeft: 30,
      fontSize: 18,
      color: '#333',
    },
    pickerStyles: {
      marginBottom: 10,
      marginTop: 10
    },
    button: {
      backgroundColor: '#007bff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
    },
  });
  
  export default ModalProfileUpdate;