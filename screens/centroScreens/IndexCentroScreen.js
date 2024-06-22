import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CentroContext } from '../../context/CentroContext';

const IndexCentroScreen = () => {
    const { centros, fetchCentros } = useContext(CentroContext);
    const navigation = useNavigation();

    useEffect(() => {
        fetchCentros();
    }, []);

    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => navigation.navigate("DetailsCentro", {centro: item})}>
        <View style={styles.row}>
          <Text style={styles.cell}>{item.direccion}</Text>
          <Text style={styles.cell}>{item.nombre}</Text>
        </View>
      </TouchableOpacity>
    );
    
    /* Agregar boton de turno   --> Un calendario con el dia y otro campo con la hora*/

    return (
        <View style={styles.container}>
            <Button title="Agregar Centro" onPress={() => navigation.navigate("AddCentro")} />
            <View style={styles.header}>
                <Text style={styles.headerText}>Nombre del Centro</Text>
                <Text style={styles.headerText}>Direccion</Text>
            </View>
            <FlatList
                data={centros}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 8,
        marginBottom: 8,
    },
    headerText: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    cell: {
        flex: 1,
        fontSize: 16,
    },
});

export default IndexCentroScreen;
