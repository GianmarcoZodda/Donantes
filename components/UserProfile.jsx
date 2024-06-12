import React from 'react';
import { View, Text,StyleSheet} from 'react-native';

const UserProfile = ({ userData }) => {
  console.log(userData.name)
  return (
<View>
      <Text style={styles.tamanio}>Nombre: {userData.name} {userData.lastName}</Text>
      <Text style={styles.tamanio}>Email: {userData.email}</Text>
    </View>
  );

};

const styles = StyleSheet.create({
  tamanio:{
    fontSize: 20,  
  }
})


export default UserProfile;