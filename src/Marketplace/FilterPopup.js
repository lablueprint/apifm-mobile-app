import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import CheckboxIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
// checkbox-blank-outline
// close-box-outline
// radiobox-blank
// radiobox-marked

const styles = StyleSheet.create({
  popupContainer: {
    width: 330,
    height: 470,
    backgroundColor: '#FFFFFF',
  },
});

function FilterPopup({
  seasonal, setSeasonal, vegetable, setVegetable, fruits, setFruits,
}) {
  return (
    <View style={styles.popupContainer}>
      <View>
        <Text>Seasonal</Text>
        <TouchableOpacity>
          <CheckboxIcon onPress={() => { setSeasonal(!seasonal); }} name={seasonal ? 'close-box-outline' : 'checkbox-blank-outline'} size={30} />
        </TouchableOpacity>
      </View>
      <View>
        <Text>vegetable</Text>
        <TouchableOpacity>
          <CheckboxIcon onPress={() => { setVegetable(!vegetable); }} name={vegetable ? 'close-box-outline' : 'checkbox-blank-outline'} size={30} />
        </TouchableOpacity>
      </View>
      <View>
        <Text>Fruits</Text>
        <TouchableOpacity>
          <CheckboxIcon onPress={() => { setFruits(!fruits); }} name={fruits ? 'close-box-outline' : 'checkbox-blank-outline'} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

FilterPopup.propTypes = {
  seasonal: PropTypes.bool.isRequired,
  setSeasonal: PropTypes.func.isRequired,
  vegetable: PropTypes.bool.isRequired,
  setVegetable: PropTypes.func.isRequired,
  fruits: PropTypes.bool.isRequired,
  setFruits: PropTypes.func.isRequired,
};

export default FilterPopup;
