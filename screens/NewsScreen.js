import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NewsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Noticias sobre Donación de Sangre</Text>
      {/* ver si podemos consumir info desde algun portal de noticias */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d9534f',
  },
});

export default NewsScreen;
