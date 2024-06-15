import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CentroContext } from '../../context/CentroContext';

const DeleteCentroScreen = () => {
    const { deleteCentro } = useContext(CentroContext);
    const navigation = useNavigation();
    const route = useRoute();
    const { centro } = route.params;

    const handleDelete = async () => {
        try {
            let result = await deleteCentro(centro.id);
            if(result){
                navigation.navigate("Home");
            }   
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nombre del Centro:</Text>
            <Text style={styles.value}>{centro.nombre}</Text>
            <Text style={styles.label}>Dirección:</Text>
            <Text style={styles.value}>{centro.direccion}</Text>
            <Text style={styles.label}>Teléfono de Consultas:</Text>
            <Text style={styles.value}>{centro.telefonoConsultas}</Text>
            <Text style={styles.label}>Teléfono de Emergencias:</Text>
            <Text style={styles.value}>{centro.telefonoEmergencias}</Text>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{centro.email}</Text>

            <View style={styles.buttonContainer}>
                <Button title="Confirmar Eliminar" onPress={handleDelete} color="red" />
                <Button title="Cancelar" onPress={() => navigation.goBack()} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 16,
    },
});

export default DeleteCentroScreen;
