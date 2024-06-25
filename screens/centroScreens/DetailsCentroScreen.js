import React, { useContext, useState } from "react";
import {View,Text,StyleSheet,TouchableOpacity, Alert,} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { CentroContext } from "../../context/CentroContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import Centro from "../../components/Centro";

const DetailsCentroScreen = () => {
  const navigation = useNavigation();

  // De la ruta, agarro solo el centro (desestructuro lo que está en params)
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

  const handleAgregarHorario = async () => {
    try {
      const formattedFecha = formatDate(fecha);
      const formattedHora = formatTime(hora);
      await agregarHorarioCentro(centro.id, formattedFecha, formattedHora);
      Alert.alert("Éxito", "Fecha agregada correctamente", [
        {
          text: "OK",
          onPress: () =>
            fetchCentros().catch((error) =>
              console.error("Error al recargar los centros:", error)
            ), // Recargar los datos
        },
      ]);
    } catch (error) {
      console.error("Error al agregar horario:", error);
      Alert.alert("Error", "No se pudo agregar la fecha");
    }
  };

  // Función para formatear la fecha como DD-MM-YYYY
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Función para formatear la hora como HH:mm
  const formatTime = (time) => {
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <View style={styles.container}>
      <Centro centro={centro} />

      {userData.admin && (
        <View style={styles.adminContainer}>
          <TouchableOpacity
            style={styles.adminButton}
            onPress={() => HandleNavigation("EditCentro", centro)}
          >
            <Text style={styles.adminButtonText}>Editar Centro</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.adminButton}
            onPress={() => HandleNavigation("DeleteCentro", centro)}
          >
            <Text style={styles.adminButtonText}>Eliminar Centro</Text>
          </TouchableOpacity>

          <View style={styles.formContainer}>
            <View style={styles.pickerContainer}>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.buttonText}>Seleccionar Fecha</Text>
              </TouchableOpacity>
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
              <Text style={styles.selectionText}>
                Fecha seleccionada: {formatDate(fecha)}
              </Text>
            </View>
            <View style={styles.pickerContainer}>
              <TouchableOpacity
                style={styles.timePickerButton}
                onPress={() => setShowTimePicker(true)}
              >
                <Text style={styles.buttonText}>Seleccionar Hora</Text>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={hora}
                  mode="time"
                  display="default"
                  onChange={(event, selectedTime) => {
                    setShowTimePicker(false);
                    if (selectedTime) setHora(selectedTime);
                  }}
                />
              )}
              <Text style={styles.selectionText}>
                Hora seleccionada: {formatTime(hora)}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAgregarHorario}
              disabled={!fecha || !hora}
            >
              <Text style={styles.buttonText}>Agregar Horario</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  adminContainer: {
    marginTop: 20,
  },
  adminButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  adminButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  formContainer: {
    marginTop: 20,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  datePickerButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timePickerButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  selectionText: {
    marginTop: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default DetailsCentroScreen;
