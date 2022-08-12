/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import CheckboxIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
  popupContainer: {
    width: '92%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },

  topLineContainer: {
    alignSelf: 'flex-end',
    color: '#000000',
    marginLeft: 'auto',
  },

  titleText: {
    alignSelf: 'center',
    color: '#34221D',
    fontSize: 18,
    fontFamily: 'JosefinSans-SemiBold',
    marginTop: 10,
  },

  midContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: 240,
    height: 100,
    alignSelf: 'center',
  },

  midText: {
    color: '#34221D',
    fontFamily: 'JosefinSans-SemiBold',
    textAlign: 'center',
    marginBottom: 4,
  },

  dateTextPressed: {
    color: '#FFFFFF',
    fontFamily: 'JosefinSans-Regular',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: 13,
  },

  dateTextUnpressed: {
    color: '#34221D',
    fontFamily: 'JosefinSans-Regular',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: 13,
  },

  bottomText: {
    color: '#34221D',
    fontFamily: 'JosefinSans-SemiBold',
  },

  buttonTextUnpressed: {
    color: '#5D5D5D',
    fontFamily: 'JosefinSans-SemiBold',
    textTransform: 'capitalize',
    fontSize: 20,
    letterSpacing: 0,
  },

  buttonTextPressed: {
    color: '#FFFFFF',
    fontFamily: 'JosefinSans-SemiBold',
    textTransform: 'capitalize',
    fontSize: 20,
    letterSpacing: 0,
  },

  largeButtonTextUnpressed: {
    color: '#5D5D5D',
    fontFamily: 'JosefinSans-SemiBold',
    textTransform: 'capitalize',
    fontSize: 20,
    letterSpacing: 0,
    lineHeight: 23,
  },

  largeButtonTextPressed: {
    color: '#FFFFFF',
    fontFamily: 'JosefinSans-SemiBold',
    textTransform: 'capitalize',
    fontSize: 20,
    letterSpacing: 0,
    lineHeight: 23,
  },

  divider: {
    borderStyle: 'solid',
    borderLeftWidth: 1,
    borderColor: '#C4C4C4',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 60,
    marginTop: 25,
  },

  buttonUnpressed: {
    marginTop: 5,
    color: '#34221D',
    backgroundColor: '#F1E8DB',
    width: 90,
    height: 28,
    borderRadius: 14,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  buttonPressed: {
    marginTop: 5,
    color: '#FFFFFA',
    backgroundColor: '#1D763C',
    borderRadius: 14,
    width: 90,
    height: 28,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  largeButtonUnpressed: {
    marginTop: 20,
    marginBottom: 20,
    color: '#34221D',
    backgroundColor: '#E5E5E5',
    width: 160,
    height: 40,
    borderRadius: 20,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  largeButtonPressed: {
    marginTop: 20,
    marginBottom: 20,
    color: '#34221D',
    backgroundColor: '#1D763C',
    width: 160,
    height: 40,
    borderRadius: 20,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  descriptionText: {
    color: '#5D5D5D',
    fontFamily: 'JosefinSans-Regular',
    textAlign: 'center',
    width: '75%',
  },

  oneDateContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    position: 'absolute',
    marginTop: 50,
  },

  twoDateContainer: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },

});

function CalendarPopup({
  setVisibility, mondayDelivery, setMondayDelivery,
  fridayDelivery, setFridayDelivery, setShowAlert,
  displayMonday, displayFriday,
}) {
  const [monday, setMonday] = useState(mondayDelivery);
  const [friday, setFriday] = useState(fridayDelivery);

  const updateDelivery = () => {
    setMondayDelivery(monday);
    setFridayDelivery(friday);
    if (monday || friday) {
      setShowAlert(true);
    }
    setVisibility(false);
  };

  const today = new Date();
  const mondayOnly = (today.getDay() === 4 || today.getDay() === 5);

  return (
    <View style={styles.popupContainer}>
      <TouchableOpacity style={styles.topLineContainer} onPress={() => { setVisibility(false); }}>
        <CheckboxIcon size={20} color="#34221D" name="close" />
      </TouchableOpacity>
      <Text style={styles.titleText}>Choose your delivery date</Text>

      {mondayOnly
        ? (
          <View style={styles.midContainer}>
            <View>
              <Text style={styles.descriptionText}>
                The order deadline for Friday delivery has passed.
              </Text>
            </View>
            <View style={styles.oneDateContainer}>
              <Text style={styles.midText}>{displayMonday}</Text>
              <TouchableOpacity
                style={monday ? styles.buttonPressed : styles.buttonUnpressed}
                activeOpacity={1}
                onPress={() => {
                  const newState = !monday;
                  if (newState) {
                    setFriday(false);
                  }
                  setMonday(newState);
                }}
              >
                <Text style={monday ? styles.dateTextPressed : styles.dateTextUnpressed}>
                  Monday
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )
        : (
          <View style={styles.midContainer}>
            <View style={styles.twoDateContainer}>
              <Text style={styles.midText}>{displayFriday}</Text>
              <TouchableOpacity
                style={friday ? styles.buttonPressed : styles.buttonUnpressed}
                activeOpacity={1}
                onPress={() => {
                  const newState = !friday;
                  if (newState) {
                    setMonday(false);
                  }
                  setFriday(newState);
                }}
              >
                <Text style={friday ? styles.dateTextPressed : styles.dateTextUnpressed}>
                  Friday
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <View style={styles.twoDateContainer}>
              <Text style={styles.midText}>{displayMonday}</Text>
              <TouchableOpacity
                style={monday ? styles.buttonPressed : styles.buttonUnpressed}
                activeOpacity={1}
                onPress={() => {
                  const newState = !monday;
                  if (newState) {
                    setFriday(false);
                  }
                  setMonday(newState);
                }}
              >
                <Text style={monday ? styles.dateTextPressed : styles.dateTextUnpressed}>
                  Monday
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

      <Button
        style={friday ? styles.largeButtonPressed
          : monday ? styles.largeButtonPressed
            : styles.largeButtonUnpressed}
        onPress={updateDelivery}
      >
        <Text style={friday ? styles.largeButtonTextPressed
          : monday ? styles.largeButtonTextPressed
            : styles.largeButtonTextUnpressed}
        >
          Done
        </Text>
      </Button>
    </View>
  );
}

CalendarPopup.propTypes = {
  setVisibility: PropTypes.func.isRequired,
  mondayDelivery: PropTypes.bool.isRequired,
  setMondayDelivery: PropTypes.func.isRequired,
  fridayDelivery: PropTypes.bool.isRequired,
  setFridayDelivery: PropTypes.func.isRequired,
  setShowAlert: PropTypes.func.isRequired,
  displayMonday: PropTypes.string.isRequired,
  displayFriday: PropTypes.string.isRequired,
};

export default CalendarPopup;
