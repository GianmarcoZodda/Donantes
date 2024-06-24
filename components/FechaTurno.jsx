import React, { useState } from 'react';
import { View, Button, Platform, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TurnoPickerComponent = ({ selectedDate,onDateChange }) => {
  const [date, setDate] = useState(selectedDate ? new Date(selectedDate) : new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios'); // Mantener el DatePicker visible en iOS
    setDate(currentDate);
    const localDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const formattedDate = formatDate(localDate);
    onDateChange(formattedDate); 
  };
// Cambia el formato a DD-MM-YYY paar que sea mas legible 
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
      <Button onPress={showDatepicker} title="Seleccionar Fecha" />
      {show && (
        <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode="date"
        display="default"
        onChange={onChange}
        />
      )}
    </View>
  );
};

export default TurnoPickerComponent;