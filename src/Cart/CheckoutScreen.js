import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Title, Text, Button,
} from 'react-native-paper';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    marginBottom: 10,
  },
  bodyText: {
    marginLeft: 5,
    marginRight: 5,
  },
  button: {
    width: '30%',
    marginTop: 10,
    backgroundColor: '#0492c2',
  },
});

// const [profile, setProfile] = useState([]);

//   const getUserInfo = () => {
//     base('Users').select({ maxRecords: 1,
//        filterByFormula: "({email}='aaronqqshi@gmail.com')" }).firstPage()
//     // base('Users').select({
//     //   filterByFormula: '{email} = "aaronqqshi@gmail.com"',
//     // })
//     // base('Users').select({ view: 'Grid view' }).all()
//       .then((records) => {
//         console.log(records);
//         setProfile(records[0].fields);
//       });
//   };

//   // useEffect(() => {
//   //   base('Users').find('recOkJcPA7K37psGa', (err, record) => {
//   //     if (err) { console.error(err); return; }
//   //     console.log(record);
//   //     setProfile(record.fields);
//   //   });
//   // }, []);

//   useEffect(() => {
//     getUserInfo();
//   }, []);

export default function CheckoutScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>
        Checkout
      </Title>
      <Text style={styles.bodyText}> Shipping Address </Text>
      <Text style={styles.bodyText}> location icon + shipping location</Text>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('Checkout')}
      >
        MARKETPLACE
      </Button>
    </View>
  );
}

CheckoutScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
