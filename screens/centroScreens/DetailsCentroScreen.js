import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { CentroContext } from "../../context/CentroContext";
import DateTimePicker from '@react-native-community/datetimepicker';
import Centro from "../../components/Centro"


const DetailsCentroScreen = () => {
  const navigation = useNavigation();

  //de la ruta, agarro solo el centro (desestructuro lo que esta en params)
  const route = useRoute();
  const { centro } = route.params;
  const { userData } = useContext(AuthContext);
  const { agregarHorarioCentro, fetchCentros } = useContext(CentroContext);

  // Estados para el nuevo horario
  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const HandleNavigation = (viewname, centro) => {
    navigation.navigate(viewname, { centro });
  };

  const handleAgregarHorario = () => {
    const formattedFecha = formatDate(fecha);
    const formattedHora = formatTime(hora);
    agregarHorarioCentro(centro.id, formattedFecha, formattedHora);
    Alert.alert("Éxito", "Fecha agregada correctamente", [
      {
        text: "OK",
        onPress: () => fetchCentros(), // Recargar los datos
      },
    ]);
  };

 //edito el formato de las fechas para mejor legibilidad
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatTime = (time) => {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }; 

  return (
    <View style={styles.container}>
      
      <Centro centro={centro} />

      {userData.admin && (
        <View>
        <Button
          title="Editar Centro"
          onPress={() => HandleNavigation("EditCentro", centro)}
        />
        <Button
          title="Eliminar Centro"
          onPress={() => HandleNavigation("DeleteCentro", centro)}
        />
        <View style={styles.formContainer}>
          <Button onPress={() => setShowDatePicker(true)} title="Seleccionar Fecha Nueva" />
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={fecha}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setFecha(selectedDate);
              }}
              minimumDate={new Date()}
            />
          )}
          <Text>Fecha nueva seleccionada: {formatDate(fecha)}</Text>
          
          <Button onPress={() => setShowTimePicker(true)} title="Seleccionar Hora Nueva" />
          {showTimePicker && (
            <DateTimePicker
              testID="timeTimePicker"
              value={hora}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
                setShowTimePicker(false);
                if (selectedTime) setHora(selectedTime);
              }}
            />
          )}
          <Text>Hora nueva seleccionada: {formatTime(hora)}</Text>
          
          <Button title="Agregar Horario" onPress={handleAgregarHorario} />
        </View>
      </View>
    )}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  formContainer: {
    marginTop: 20,
  },
});

export default DetailsCentroScreen;
