import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CustomPasswordButton = ({ visible, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
      <MaterialCommunityIcons
        name={visible ? 'eye-off-outline' : 'eye-outline'}
        size={24}
        color="black"
      />
    </TouchableOpacity>
  );
};

export default CustomPasswordButton;