import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, ScrollView, TextInput, Alert, Linking,
} from 'react-native';
import { Text, Button } from 'react-native-paper';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/Entypo';

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};
const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

const styles = StyleSheet.create({
  container: {
    marginLeft: '6%',
    marginRight: '6%',
    width: '88%',
    height: '100%',
  },
  title: {
    marginTop: '18%',
    fontSize: 26,
    fontFamily: 'JosefinSans-Bold',
    color: '#1D763C',
  },
  subTitle: {
    marginTop: 8,
    marginBottom: '5%',
    marginLeft: 7,
    fontSize: 17,
    fontFamily: 'JosefinSans-Regular',
    color: '#1D763C',
  },
  textFields: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#1D763C',
    fontSize: 14,
    marginBottom: 12,
    paddingLeft: 20,
    height: 40,
    backgroundColor: '#FFFFFF',
    color: '#7A7A7A',
    fontFamily: 'JosefinSans-Regular',
  },
  messageTextField: {
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 14,
    marginBottom: 15,
    paddingLeft: 20,
    height: 130,
    borderColor: '#1D763C',
    backgroundColor: '#FFFFFF',
    fontFamily: 'JosefinSans-Regular',
    textAlignVertical: 'top', // prevents text from going to the centre
  },
  sendButton: {
    marginTop: 3,
    backgroundColor: '#1D763C',
    borderRadius: 20,
    height: 50,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'JosefinSans-SemiBold',
  },
  bottomText: {
    marginTop: '4%',
    fontSize: 14,
    color: '#A4A4A4',
    fontFamily: 'JosefinSans-Regular',
  },
  bottomTextItalic: {
    marginTop: -2,
    fontSize: 14,
    color: '#A4A4A4',
    fontFamily: 'JosefinSans-MediumItalic',
  },
  iconContainer: {
    marginTop: '3%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIcon: {
    margin: 16,
    fontSize: 35,
    color: '#000000',
  },
});

// eslint-disable-next-line no-unused-vars
export default function ContactScreen({ navigation }) { // unused navigation
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [subject, setSubject] = useState(null);
  const [message, setMessage] = useState(null);

  const sendEmailOnPress = () => {
    if (!name || !email || !subject || !message) { // Return w/o creating record if incomplete form
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
    <ScrollView style={{ backgroundColor: '#FCF7F0', height: '100%' }}>
      <View style={styles.container}>
        <Text style={styles.title}> Get In Touch! </Text>
        <Text style={styles.subTitle}>
          Have a question? Just fill out this contact form.
        </Text>
        <TextInput
          onChangeText={setName}
          placeholder="Name"
          value={name}
          style={styles.textFields}
        />
        <TextInput
          onChangeText={setEmail}
          placeholder="Email"
          value={email}
          style={styles.textFields}
          keyboardType="email-address"
        />
        <TextInput
          onChangeText={setSubject}
          placeholder="Subject"
          value={subject}
          style={styles.textFields}
        />
        <TextInput
          onChangeText={setMessage}
          placeholder="Message"
          value={message}
          style={styles.messageTextField}
          multiline
        />
        <Button
          onPress={sendEmailOnPress}
          style={styles.sendButton}
        >
          <Text style={styles.sendButtonText}>
            Send
          </Text>
        </Button>
        <Text style={styles.bottomText}>
          We&rsquo;re located at the Special Service for Asian Pacific Islander Forward Movement
          Office at:
        </Text>
        <Text style={styles.bottomTextItalic}>
          905 East 8th Street, Los Angeles, CA 90021
        </Text>
        {/* Bottom row of icons */}
        <View style={styles.iconContainer}>
          <Icon
            style={styles.socialIcon}
            name="link"
            onPress={() => Linking.openURL('https://www.foodroots.co/about')}
          />
          <Icon
            style={styles.socialIcon}
            name="facebook"
            onPress={() => Linking.openURL('https://www.facebook.com/forwardapi/')}
          />
          <Icon
            style={styles.socialIcon}
            name="instagram"
            onPress={() => Linking.openURL('https://www.instagram.com/forwardapi/?hl=en')}
          />
        </View>
      </View>
    </ScrollView>
  );
}

ContactScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
