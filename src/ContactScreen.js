import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, TextInput, Button, Alert,
} from 'react-native';
import { Text } from 'react-native-paper';

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
        onPress={() => Alert.alert('Send button pressed')}
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
