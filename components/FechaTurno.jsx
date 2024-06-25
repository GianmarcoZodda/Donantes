import React, { useState } from 'react';
import { View, TouchableOpacity, Platform, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TurnoPickerComponent = ({ selectedDate, onDateChange }) => {
  const [date, setDate] = useState(selectedDate ? new Date(selectedDate) : new Date());
  const [show, setShow] = useState(false);

  // Función para manejar el cambio de fecha seleccionada
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios'); // Mantener el DatePicker visible en iOS
    setDate(currentDate);
    // Formatear la fecha seleccionada antes de pasarla al padre
    const localDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const formattedDate = formatDate(localDate);
    onDateChange(formattedDate); // Llamar a la función del padre con la fecha formateada
  };

  // Función para formatear la fecha como DD-MM-YYYY
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Función para mostrar el DatePicker cuando se presiona el botón
  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View>
      <TouchableOpacity onPress={showDatepicker} style={styles.button}>
        <Text style={styles.buttonText}>Seleccionar fecha</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
          minimumDate={new Date()} // Limitar la fecha máxima a hoy
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TurnoPickerComponent;
