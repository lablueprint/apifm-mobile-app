import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import CheckboxIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  popupContainer: {
    width: 330,
    height: 470,
    backgroundColor: '#FFFFFF',
  },
});

function FilterPopup({
  setVisibility, aZ, setAZ, zA, setZA, lowHigh, setLowHigh, highLow, setHighLow,
  seasonal, setSeasonal, vegetables, setVegetables, fruits, setFruits,
}) {
  const chooseSortOption = (sortBool, setSortBool, otherSetSortBools) => {
    if (sortBool) {
      setSortBool(false);
    } else {
      otherSetSortBools[0](false);
      otherSetSortBools[1](false);
      otherSetSortBools[2](false);
      setSortBool(true);
    }
  };

  return (
    <View style={styles.popupContainer}>
      <View>
        <Text>Filter & Sort</Text>
        <TouchableOpacity onPress={() => { setVisibility(false); }}>
          <CheckboxIcon name="close" />
        </TouchableOpacity>
      </View>
      <View>
        <Text>A to Z (Alphabetical)</Text>
        <TouchableOpacity>
          <CheckboxIcon onPress={() => { chooseSortOption(aZ, setAZ, [setZA, setLowHigh, setHighLow]); }} name={aZ ? 'radiobox-marked' : 'radiobox-blank'} size={20} />
        </TouchableOpacity>
      </View>
      <View>
        <Text>Z to A (Alphabetical)</Text>
        <TouchableOpacity>
          <CheckboxIcon onPress={() => { chooseSortOption(zA, setZA, [setAZ, setLowHigh, setHighLow]); }} name={zA ? 'radiobox-marked' : 'radiobox-blank'} size={20} />
        </TouchableOpacity>
      </View>
      <View>
        <Text>Price Low to High</Text>
        <TouchableOpacity>
          <CheckboxIcon onPress={() => { chooseSortOption(lowHigh, setLowHigh, [setAZ, setZA, setHighLow]); }} name={lowHigh ? 'radiobox-marked' : 'radiobox-blank'} size={20} />
        </TouchableOpacity>
      </View>
      <View>
        <Text>Price High to Low</Text>
        <TouchableOpacity>
          <CheckboxIcon onPress={() => { chooseSortOption(highLow, setHighLow, [setAZ, setZA, setLowHigh]); }} name={highLow ? 'radiobox-marked' : 'radiobox-blank'} size={20} />
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
  setVisibility: PropTypes.func.isRequired,
  aZ: PropTypes.bool.isRequired,
  setAZ: PropTypes.func.isRequired,
  zA: PropTypes.bool.isRequired,
  setZA: PropTypes.func.isRequired,
  lowHigh: PropTypes.bool.isRequired,
  setLowHigh: PropTypes.func.isRequired,
  highLow: PropTypes.bool.isRequired,
  setHighLow: PropTypes.func.isRequired,
  seasonal: PropTypes.bool.isRequired,
  setSeasonal: PropTypes.func.isRequired,
  vegetables: PropTypes.bool.isRequired,
  setVegetables: PropTypes.func.isRequired,
  fruits: PropTypes.bool.isRequired,
  setFruits: PropTypes.func.isRequired,
};

export default FilterPopup;
