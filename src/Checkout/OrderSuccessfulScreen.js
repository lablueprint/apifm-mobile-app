import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
  Text, Button,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import logo from '../assets/imgs/square_logo.png';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '700',
  },
  bodyText: {
    fontSize: 14,
  },
  button: {
    width: '60%',
    marginTop: 10,
    backgroundColor: '#0492c2',
  },
  subcontainer: {
    marginHorizontal: '8%',
  },
});

const Airtable = require('airtable');

const airtableConfig = {
  apiKey: Config.REACT_APP_AIRTABLE_USER_KEY,
  baseKey: Config.REACT_APP_AIRTABLE_BASE_KEY,
};

const base = new Airtable({ apiKey: airtableConfig.apiKey })
  .base(airtableConfig.baseKey);

export default function OrderSuccessfulScreen({ navigation }) {
  const [total, setTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);

  const calcTotal = (useremail) => {
    base('Cart TBD').select({ filterByFormula: `({user}='${useremail}')` }).all()
      .then((items) => {
        let sum = 0;
        // eslint-disable-next-line array-callback-return
        items.map((item) => {
          const price = item.get('price of produce');
          sum += item.fields.quantity * price;
        });
        setTotal(sum);
      });
  };

  useEffect(() => {
    calcTotal('helen@gmail.com');
    setDeliveryFee(10);
  }, []);

  return (
    <View>
      <View style={[styles.subcontainer, {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '8%',
        marginHorizontal: '16%',
        marginBottom: '8%',
      }]}
      >
        <Image style={{ width: 275, height: 275 }} source={logo} />
        <Text style={[styles.bodyText, { marginLeft: '0%', marginTop: '8%' }]}>
          Your order has been placed! Our staff will contact you alskjfslfjd lsjfhl sjdfljs
          dflj f delivery shipping money stlsjf lfj lsfj slfj lfdj lkjdnsvnfskv ndfjn sdfn
        </Text>
      </View>

      <View style={styles.subcontainer}>
        <Text style={[styles.titleText, {
          fontSize: 22,
          marginLeft: '0%',
        }]}
        >
          Order Overview
        </Text>
        <Text style={[styles.bodyText, { marginBottom: '8%' }]}> Cart (multiple produce cards) reused here  </Text>
        <View style={{
          flexDirection: 'row', justifyContent: 'space-between', marginTop: '4%',
        }}
        >
          <Text style={[styles.titleText, { marginLeft: '0%' }]}>
            Total due at delivery:
          </Text>
          <Text style={[styles.titleText, { marginRight: '0%' }]}>
            $
            {total + deliveryFee}
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Marketplace')}
        >
          Return To Marketplace
        </Button>
      </View>
    </View>
  );
}

OrderSuccessfulScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};
