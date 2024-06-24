import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CentroContext } from '../../context/CentroContext';
import Centro from '../../components/Centro';

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
          
          <Centro centro={centro} />

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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 16,
    },
});

export default DeleteCentroScreen;
