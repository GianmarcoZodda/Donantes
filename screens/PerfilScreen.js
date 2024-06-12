import React, {useContext,useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import UserProfile from '../components/UserProfile';
import { View, StyleSheet,Text,Button } from 'react-native';
import ModalProfileUpdate from '../components/ModalProfileUpdate';

export default function PerfilScreen({}) {
const {userData} = useContext(AuthContext);
const [modalVisible, setModalVisible] = useState(false);
const {updateUser} = useContext(UserContext);
const [additionalData, setAdditionalData] = useState({
  address: '',
  phone: '',
  birthDate: '',
  bloodType: ''
});


const handleSave = async (data) => {
  console.log(data)
  updateUser(data)
  setAdditionalData(data);
}
return (
    <View style={styles.container}>
      <UserProfile userData={userData}/>
      <Text style={styles.tamanio}>Direccion: {userData.address}</Text>
      <Text style={styles.tamanio}>Celular: {userData.phone}</Text>
      <Text style={styles.tamanio}>Fecha de nacimiento: {userData.birthDate}</Text>
      <Text style={styles.tamanio}>Tipo de sangre: {userData.bloodType}</Text>
      <Button title="Agregar datos" onPress={() => setModalVisible(true)} />
      <ModalProfileUpdate
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9', // Fondo suave y claro
    borderRadius: 10, // Bordes redondeados
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Sombra en Android
    margin: 20,
  },
  tamanio:{
    fontSize: 20,
  }
  });