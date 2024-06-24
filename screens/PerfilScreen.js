import React, {useContext,useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import UserProfile from '../components/UserProfile';
import { View, StyleSheet,Text,Button } from 'react-native';
import ModalProfileUpdate from '../components/ModalProfileUpdate';
import { useNavigation } from '@react-navigation/native';
import { TurnoContext } from '../context/TurnoContext';

export default function PerfilScreen({}) {
const {userData} = useContext(AuthContext);
const [modalVisible, setModalVisible] = useState(false);
const {updateUser} = useContext(UserContext);
const { turno, cancelarTurno } = useContext(TurnoContext);
const navigation = useNavigation();


//Enviamos los datos del modal al userContext para que maneje la logica y validaciones
  const handleSave = async (data) => {
    try {
      //await para esperar que se actualice
      const result = await updateUser(data); 
      // si tiene los datos completos, redirijo al index de los centros
      if (result) {
        navigation.navigate('CentroStack', { screen: 'IndexCentro' });
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      // Manejar el error si updateUser falla
    }
  };
return (
    <View style={styles.container}>
      <UserProfile userData={userData}/>
      <Text style={styles.tamanio}>Direccion: {userData.address || ''}</Text>
      <Text style={styles.tamanio}>Celular: {userData.phone || ''}</Text>
      <Text style={styles.tamanio}>Fecha de nacimiento: {userData.birthDate || ''}</Text>
      <Text style={styles.tamanio}>Tipo de sangre: {userData.bloodType || ''}</Text>
      <Button title="Agregar datos" onPress={() => setModalVisible(true)} />
      <ModalProfileUpdate
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />

      {turno ? (
        <View style={styles.turnoContainer}>
          <Text style={styles.turnoTitle}>Tu próximo turno</Text>
          <Text style={styles.turnoInfo}>Centro: {turno.centro}</Text>
          <Text style={styles.turnoInfo}>Fecha: {turno.fecha}</Text>
          <Text style={styles.turnoInfo}>Hora: {turno.hora}</Text>
          <Button title="Cancelar Turno" onPress={() => cancelarTurno(turno.id)} />
        </View>
      ) : (
        <View style={styles.noTurnoContainer}>
          <Text style={styles.noTurnoText}>Sin Proximo Turno</Text>
        </View>
    )}

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9', 
    borderRadius: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, 
    margin: 20,
  },
  tamanio:{
    fontSize: 20,
  },
  turnoContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  turnoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  turnoInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  noTurnoContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    alignItems: 'center',
  },
  noTurnoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
  },
  });