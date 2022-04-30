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
    width: 330,
    height: 470,
    backgroundColor: '#FFFFFF',
  },
  buttonUnpressed: {
    width: '30%',
    marginTop: 5,
    color: '#34221D',
    backgroundColor: '#F1E8DB',
    borderRadius: 15,
  },
  buttonPressed: {
    width: '30%',
    marginTop: 5,
    color: '#FFFFFA',
    backgroundColor: '#1D763C',
    borderRadius: 15,
  },
});

function CalendarPopup({
  userId, setVisibility, mondayDelivery, setMondayDelivery,
  fridayDelivery, setFridayDelivery, setShowAlert,
}) {
  const [monday, setMonday] = useState(mondayDelivery);
  const [friday, setFriday] = useState(fridayDelivery);
  const [save, setSave] = useState(false);

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

  return (
    <View style={styles.popupContainer}>
      <View>
        <Text>Choose your delivery date</Text>
        <TouchableOpacity onPress={() => { setVisibility(false); }}>
          <CheckboxIcon name="close" />
        </TouchableOpacity>
      </View>
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
