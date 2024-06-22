import React, { useState } from 'react';
import { View, Button, Platform, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateOfBirthPicker = ({ selectedDate, onDateChange }) => {
  const [date, setDate] = useState(selectedDate ? new Date(selectedDate) : new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios'); // En iOS, mantener el DatePicker visible
    setDate(currentDate);
    onDateChange(currentDate.toISOString().split('T')[0]); // Convertir la fecha a formato ISO y tomar solo la parte de la fecha
  };

  const showDatepicker = () => {
    setShow(true); // Mostrar el DatePicker cuando se presiona el botón
  };

  return (
    <View>
      <Button onPress={showDatepicker} title="Seleccione su Fecha de Nacimiento" />      
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

export default DateOfBirthPicker;