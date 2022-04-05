import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  popupContainer: {
    width: 330,
    height: 470,
    backgroundColor: '#FFFFFF',
  },
});

function FilterPopup({
  sortOptions, updateSort, filterOptions, updateFilter,
}) {
  return (
    <View style={styles.popupContainer}>
      <Text>
        Here
      </Text>
    </View>
  );
}

// FilterPopup.propTypes = {
//   sortOptions: PropTypes.arrayOf(PropTypes.shape({
//     label: PropTypes.string.isRequired,
//     active: PropTypes.bool.isRequired,
//   })).isRequired,
//   updateSort: PropTypes.func.isRequired,
//   filterOptions: PropTypes.arrayOf(PropTypes.shape({
//     label: PropTypes.string.isRequired,
//     active: PropTypes.bool.isRequired,
//   })).isRequired,
//   updateFilter: PropTypes.func.isRequired,
// };

export default FilterPopup;
