import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import CheckboxIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { initialWindowMetrics } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  popupContainer: {
    width: 330,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingTop: 20,
    paddingBottom: 20,
  },

  headingContainer: {
    flexDirection: 'row',
  },

  title: {
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 22,
    color: '#34221D',
    marginLeft: 'auto',
    left: 20,
  },

  closeButton: {
    marginLeft: 'auto',
    marginRight: 25,
    marginTop: 8,
  },

  subtitle: {
    fontFamily: 'JosefinSans-SemiBold',
    fontSize: 18,
    color: '#34221D',
    marginBottom: 12,
    marginLeft: 25,
  },

  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 6,
  },

  text: {
    fontFamily: 'JosefinSans-SemiBold',
    color: '#34221D',
    fontSize: 14,
    marginLeft: 50,
  },

  checkbox: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 25,
  },

  divider: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
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
      <View style={styles.headingContainer}>
        <Text style={styles.title}>Filter & Sort</Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => { setVisibility(false); }}>
          <CheckboxIcon size={20} color="#34221D" name="close" />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <Text style={styles.subtitle}>Sort</Text>
      <View style={styles.checkboxContainer}>
        <Text style={styles.text}>A to Z (Alphabetical)</Text>
        <TouchableOpacity style={styles.checkbox}>
          <CheckboxIcon color="#34221D" onPress={() => { chooseSortOption(aZ, setAZ, [setZA, setLowHigh, setHighLow]); }} name={aZ ? 'radiobox-marked' : 'radiobox-blank'} size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.checkboxContainer}>
        <Text style={styles.text}>Z to A (Alphabetical)</Text>
        <TouchableOpacity style={styles.checkbox}>
          <CheckboxIcon color="#34221D" onPress={() => { chooseSortOption(zA, setZA, [setAZ, setLowHigh, setHighLow]); }} name={zA ? 'radiobox-marked' : 'radiobox-blank'} size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.checkboxContainer}>
        <Text style={styles.text}>Price Low to High</Text>
        <TouchableOpacity style={styles.checkbox}>
          <CheckboxIcon color="#34221D" onPress={() => { chooseSortOption(lowHigh, setLowHigh, [setAZ, setZA, setHighLow]); }} name={lowHigh ? 'radiobox-marked' : 'radiobox-blank'} size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.checkboxContainer}>
        <Text style={styles.text}>Price High to Low</Text>
        <TouchableOpacity style={styles.checkbox}>
          <CheckboxIcon color="#34221D" onPress={() => { chooseSortOption(highLow, setHighLow, [setAZ, setZA, setLowHigh]); }} name={highLow ? 'radiobox-marked' : 'radiobox-blank'} size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <Text style={styles.subtitle}>Filters</Text>
      <View style={styles.checkboxContainer}>
        <Text style={styles.text}>Seasonal</Text>
        <TouchableOpacity style={styles.checkbox}>
          <CheckboxIcon color="#34221D" onPress={() => { setSeasonal(!seasonal); }} name={seasonal ? 'close-box-outline' : 'checkbox-blank-outline'} size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.checkboxContainer}>
        <Text style={styles.text}>Vegetables</Text>
        <TouchableOpacity style={styles.checkbox}>
          <CheckboxIcon color="#34221D" onPress={() => { setVegetables(!vegetables); }} name={vegetables ? 'close-box-outline' : 'checkbox-blank-outline'} size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.checkboxContainer}>
        <Text style={styles.text}>Fruits</Text>
        <TouchableOpacity style={styles.checkbox}>
          <CheckboxIcon color="#34221D" onPress={() => { setFruits(!fruits); }} name={fruits ? 'close-box-outline' : 'checkbox-blank-outline'} size={20} />
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
