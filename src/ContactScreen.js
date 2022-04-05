import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, TextInput, Button, Alert,
} from 'react-native';
import { Text } from 'react-native-paper';
import Config from 'react-native-config';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

// eslint-disable-next-line no-unused-vars
const styles = StyleSheet.create({
  image: {
    width: 205,
    height: 386,
  },
});

// eslint-disable-next-line no-unused-vars
export default function ContactScreen({ navigation }) {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [subject, setSubject] = useState(null);
  const [message, setMessage] = useState(null);

  const sendEmailOnPress = () => {
    if (!name || !email || !subject || !message) {
      Alert.alert('Missing value', 'All fields (name, email, subject, and message) must be filled');
      return;
    }
    base('ContactEmail').create([{ // Create email record
      fields: {
        name,
        email,
        subject,
        message,
      },
    }], (err) => {
      if (err) {
        Alert.alert(err.error, err.message);
      }
    });
    Alert.alert('Thanks! Your email has been sent to APIFM.');
    setName(''); // Reset all values for next email
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <View>
      <Text> Get In Touch! </Text>
      <Text> Have a question! Just fill out this contact form. </Text>
      <TextInput
        onChangeText={setName}
        placeholder="Name"
        value={name}
      />
      <TextInput
        onChangeText={setEmail}
        placeholder="Email"
        value={email}
      />
      <TextInput
        onChangeText={setSubject}
        placeholder="Subject"
        value={subject}
      />
      <TextInput
        onChangeText={setMessage}
        placeholder="Message"
        value={message}
        multiline
      />
      <Button
        title="Send"
        color="#f194ff"
        onPress={sendEmailOnPress}
      />
      <Text>
        We&rsquo;re located at the Special Service for Asian Pacific Islander Forward Movement
        Office at:
        905 East 8th Street, Los Angeles, CA 90021
      </Text>
    </View>
  );
}

ContactScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
