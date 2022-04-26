import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import CheckboxIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
  popupContainer: {
    width: 330,
    height: 470,
    backgroundColor: '#FFFFFF',
  },
});

function CalendarPopup({
  setVisibility,
}) {
  return (
    <View style={styles.popupContainer}>
      <View>
        <Text>Choose your delivery date</Text>
        <TouchableOpacity>
          <CheckboxIcon onPress={() => { setVisibility(false); }} name="close" />
        </TouchableOpacity>
      </View>
      <Button>
        <Text>Monday</Text>
      </Button>
      <Button>
        <Text>Friday</Text>
      </Button>
    </View>
  );
}

CalendarPopup.propTypes = {
  setVisibility: PropTypes.func.isRequired,
};

export default CalendarPopup;
