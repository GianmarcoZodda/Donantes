import React, { useState } from 'react';
import { View, Platform, Text, StyleSheet,TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateOfBirthPicker = ({ selectedDate, onDateChange }) => {
  const [date, setDate] = useState(selectedDate ? new Date(selectedDate) : new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios'); // En iOS, mantener el DatePicker visible
    setDate(currentDate);
     // Ajustar la fecha local para evitar problemas de zona horaria
     const localDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
     const formattedDate = formatDate(localDate);
     onDateChange(formattedDate); 
   };
 
   const formatDate = (date) => {
     const day = date.getDate().toString().padStart(2, '0');
     const month = (date.getMonth() + 1).toString().padStart(2, '0');
     const year = date.getFullYear();
     return `${day}-${month}-${year}`;
   };

  const showDatepicker = () => {
    setShow(true); // Mostrar el DatePicker cuando se presiona el botón
  };

  return (
    <View>
      <TouchableOpacity onPress={showDatepicker} style={styles.button}>
        <Text style={styles.buttonText}>Fecha de Nacimiento</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
          maximumDate={new Date()} // Limitar la fecha máxima a hoy
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10, // Hacer el botón más redondo
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DateOfBirthPicker;