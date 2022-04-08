import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import CheckboxIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
  aZ, setAZ, zA, setZA, lowHigh, setLowHigh, highLow, setHighLow,
  seasonal, setSeasonal, vegetables, setVegetables, fruits, setFruits,
}) {
  return (
    <View style={styles.popupContainer}>
      <View>
        <Text>A to Z (Alphabetical)</Text>
        <TouchableOpacity>
          <CheckboxIcon onPress={() => { setAZ(!aZ); }} name={aZ ? 'radiobox-marked' : 'radiobox-blank'} size={20} />
        </TouchableOpacity>
      </View>
      <View>
        <Text>Z to A (Alphabetical)</Text>
        <TouchableOpacity>
          <CheckboxIcon onPress={() => { setZA(!zA); }} name={zA ? 'radiobox-marked' : 'radiobox-blank'} size={20} />
        </TouchableOpacity>
      </View>
      <View>
        <Text>Price Low to High</Text>
        <TouchableOpacity>
          <CheckboxIcon onPress={() => { setLowHigh(!lowHigh); }} name={lowHigh ? 'radiobox-marked' : 'radiobox-blank'} size={20} />
        </TouchableOpacity>
      </View>
      <View>
        <Text>Price High to Low</Text>
        <TouchableOpacity>
          <CheckboxIcon onPress={() => { setHighLow(!highLow); }} name={highLow ? 'radiobox-marked' : 'radiobox-blank'} size={20} />
        </TouchableOpacity>
      </View>
      <View>
        <Text>Seasonal</Text>
        <TouchableOpacity>
          <CheckboxIcon onPress={() => { setSeasonal(!seasonal); }} name={seasonal ? 'close-box-outline' : 'checkbox-blank-outline'} size={20} />
        </TouchableOpacity>
      </View>
      <View>
        <Text>Vegetables</Text>
        <TouchableOpacity>
          <CheckboxIcon onPress={() => { setVegetables(!vegetables); }} name={vegetables ? 'close-box-outline' : 'checkbox-blank-outline'} size={20} />
        </TouchableOpacity>
      </View>
      <View>
        <Text>Fruits</Text>
        <TouchableOpacity>
          <CheckboxIcon onPress={() => { setFruits(!fruits); }} name={fruits ? 'close-box-outline' : 'checkbox-blank-outline'} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

FilterPopup.propTypes = {
  seasonal: PropTypes.bool.isRequired,
  setSeasonal: PropTypes.func.isRequired,
  vegetables: PropTypes.bool.isRequired,
  setVegetables: PropTypes.func.isRequired,
  fruits: PropTypes.bool.isRequired,
  setFruits: PropTypes.func.isRequired,
};

export default FilterPopup;
