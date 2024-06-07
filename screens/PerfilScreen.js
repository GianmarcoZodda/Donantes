import React, {useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import UserProfile from '../components/UserProfile';
import { View, StyleSheet,Text } from 'react-native';

export default function PerfilScreen({}) {
const {userData} = useContext(AuthContext);
console.log("click perfil",userData)
return (
    <View style={styles.container}>
      <UserProfile userData={userData} />
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });