import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import CheckboxIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-paper';
import Config from 'react-native-config';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

const styles = StyleSheet.create({
  popupContainer: {
    width: 360,
    height: 335,
    backgroundColor: '#FFFFFF',
  },
  topLineContainer: {
    alignSelf: 'flex-end',
    color: '#000000',
    marginTop: 12,
    marginRight: 15,
  },
  titleText: {
    alignSelf: 'center',
    color: '#34221D',
    fontSize: 20,
  },
  midContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: 240,
    height: 65,
    alignSelf: 'center',
  },
  dateContainer: {
    width: 92,
    height: 62,
  },
  buttonUnpressed: {
    marginTop: 5,
    color: '#34221D',
    backgroundColor: '#F1E8DB',
    width: 90,
    height: 30,
    borderRadius: 15,
    textAlign: 'center',
  },
  buttonPressed: {
    marginTop: 5,
    color: '#FFFFFA',
    backgroundColor: '#1D763C',
    borderRadius: 15,
    width: 90,
    height: 30,
    textAlign: 'center',
  },
});

function CalendarPopup({
  userId, setVisibility, mondayDelivery, setMondayDelivery,
  fridayDelivery, setFridayDelivery, setShowAlert,
}) {
  const [monday, setMonday] = useState(mondayDelivery);
  const [friday, setFriday] = useState(fridayDelivery);
  const [save, setSave] = useState(false);

  // currently unsure as to how the date ordering restrictions should work
  // if it is a weekend (when no one can order) should the user not be able to view any
  // of the produce? or can they? if so, should their order date default to blank so that they
  // can view all possible orders?
  // if it is a weekday and it has passed the deadline for say a Friday order and the user has
  // previously selected Friday, should the user's default order date be automatically switched
  // to Monday in case so that the user can still view produce available to them?
  // const today = new Date();
  const tempToday = new Date();
  const thisFriday = new Date(tempToday.setDate((tempToday.getDate() - tempToday.getDay() + 5)));
  const displayFriday = `${String(thisFriday.getMonth() + 1).padStart(2, '0')}/${String(thisFriday.getDate()).padStart(2, '0')}`;
  const nextMonday = new Date(tempToday.setDate((tempToday.getDate() - tempToday.getDay() + 8)));
  const displayMonday = `${String(nextMonday.getMonth() + 1).padStart(2, '0')}/${String(nextMonday.getDate()).padStart(2, '0')}`;

  const updateDelivery = () => {
    setMondayDelivery(monday);
    setFridayDelivery(friday);
    let date = '';
    if (monday) {
      date = 'Monday';
      setShowAlert(true);
    }
    if (friday) {
      date = 'Friday';
      setShowAlert(true);
    }
    if (save) {
      base('Users').update([
        {
          id: userId,
          fields: {
            'Delivery Date': date,
          },
        },
      ], (err) => {
        if (err) {
          Alert.alert(err.error, err.message);
        }
      });
    }
    setVisibility(false);
  };

  // conditional render of components depending on day
  return (
    <View style={styles.popupContainer}>
      <TouchableOpacity style={styles.topLineContainer} onPress={() => { setVisibility(false); }}>
        <CheckboxIcon name="close" size={22} />
      </TouchableOpacity>
      <Text style={styles.titleText}>Choose your delivery date</Text>
      <View style={styles.midContainer}>
        {/* {(today.getDay() !== 0 && today.getDay() !== 6
          && (today.getDay() !== 2
          && (today.getHours() <= 16 && today.getMinutes() <= 59 && today.getSeconds() <= 59)))
          && ( */}
        <View style={styles.dateContainer}>
          <Text>{displayFriday}</Text>
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
            <Text>
              Friday
            </Text>
          </TouchableOpacity>
        </View>
        {/* )} */}
        {/* {(today.getDay() !== 0 && today.getDay() !== 6
        && (today.getDay() !== 5
        && (today.getHours() <= 14 && today.getMinutes() <= 59 && today.getSeconds() <= 59)))
        && ( */}
        <View style={styles.dateContainer}>
          <Text>{displayMonday}</Text>
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
            <Text>
              Monday
            </Text>
          </TouchableOpacity>
        </View>
        {/* )} */}
      </View>

      <View>
        <TouchableOpacity>
          <CheckboxIcon onPress={() => { setSave(!save); }} name={save ? 'close-box-outline' : 'checkbox-blank-outline'} size={20} />
        </TouchableOpacity>
        <Text>Save this day of the week for future deliveries.</Text>
      </View>
      <Button
        onPress={updateDelivery}
      >
        Done
      </Button>
    </View>
  );
}

CalendarPopup.propTypes = {
  userId: PropTypes.string.isRequired,
  setVisibility: PropTypes.func.isRequired,
  mondayDelivery: PropTypes.bool.isRequired,
  setMondayDelivery: PropTypes.func.isRequired,
  fridayDelivery: PropTypes.bool.isRequired,
  setFridayDelivery: PropTypes.func.isRequired,
  setShowAlert: PropTypes.func.isRequired,
};

export default CalendarPopup;
