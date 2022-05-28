import 'react-native-gesture-handler';
import {
  View, Text, Image, TouchableOpacity, StyleSheet,
} from 'react-native';
import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#C1DDA9',
    position: 'relative',
  },

  backButton: {
    marginLeft: 'auto',
    marginRight: 10,
    marginTop: 10,
  },

  header: {
    marginLeft: 30,
    marginTop: 30,
  },

  photo: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginBottom: 15,
  },

  title: {
    color: '#34221D',
    fontSize: 24,
    marginBottom: 2,
    fontFamily: 'JosefinSans-SemiBold',
  },

  subtitle: {
    color: '#34221D',
    fontSize: 14,
    fontFamily: 'JosefinSans-Regular',
  },

  drawers: {
    marginTop: 20,
    marginLeft: 10,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    marginBottom: 30,
    padding: 20,
  },

  footerDrawer: {
    fontSize: 14,
    paddingLeft: 17,
    width: '100%',
    color: '#34221D',
    bottom: 1,
    fontFamily: 'JosefinSans-Medium',
  },
});

function CustomDrawer(props) {
  const { navigation } = props;

  return (
    <View style={styles.main}>
      <DrawerContentScrollView
        {...props}
      >
        <Icon
          size={26}
          name="close"
          color="#34221D"
          style={styles.backButton}
          onPress={() => { navigation.toggleDrawer(); }}
        />
        <View style={styles.header}>
          <Image
            // eslint-disable-next-line global-require
            source={require('../assets/imgs/placeholder.png')}
            style={styles.photo}
          />
          <Text style={styles.title}>
            Joe Bruin
          </Text>
          <Text style={styles.subtitle}>
            Organization Name
          </Text>
        </View>
        <View style={styles.drawers}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View>
        <TouchableOpacity />
        <View style={styles.footer}>
          <Icon
            size={26}
            name="logout-variant"
            color="#34221D"
            onPress={() => { navigation.navigate('Log In'); }} // TODO: change to signed out screen once it is implemented
          />
          <Text
            style={styles.footerDrawer}
            onPress={() => { navigation.navigate('Log In'); }} // TODO: change to signed out screen once it is implemented
          >
            Log out
          </Text>
        </View>
      </View>
    </View>
  );
}

CustomDrawer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    toggleDrawer: PropTypes.func,
  }).isRequired,
};

export default CustomDrawer;
