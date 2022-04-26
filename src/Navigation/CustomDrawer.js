import 'react-native-gesture-handler';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

function CustomDrawer(props) {
  const { navigation } = props;

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#C1DDA9',
      position: 'relative',
    }}
    >
      <DrawerContentScrollView
        {...props}
      >
        <Icon
          size={26}
          name="close"
          color="#34221D"
          style={{
            marginLeft: 'auto', marginRight: 10, marginTop: 10,
          }}
          onPress={() => { navigation.toggleDrawer(); }}
        />
        <View style={{ marginLeft: 30, marginTop: 30 }}>
          <Image
            // eslint-disable-next-line global-require
            source={require('../assets/imgs/placeholder.png')}
            style={{
              height: 120, width: 120, borderRadius: 60, marginBottom: 15,
            }}
          />
          <Text style={{
            color: '#34221D', fontSize: 24, marginBottom: 2, fontWeight: '600',
          }}
          >
            Joe Bruin
          </Text>
          <Text style={{ color: '#34221D', fontSize: 14, fontWeight: '400' }}>Organization Name</Text>
        </View>
        <View style={{
          marginTop: 20, marginLeft: 10,
        }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20 }}>
        <TouchableOpacity
          style={{ paddingVertical: 15 }}
        />
        <View
          style={{
            flexDirection: 'row', alignItems: 'center', marginLeft: 8, marginBottom: 30,
          }}
        >
          <Icon
            size={26}
            name="logout-variant"
            color="#34221D"
            onPress={() => { navigation.navigate('SignIn'); }} // TODO: change to signed out screen once it is implemented
          />
          <Text
            style={{
              fontSize: 14,
              paddingLeft: 17,
              width: '100%',
              color: '#34221D',
              fontWeight: '500',
              bottom: 1,
            }}
            onPress={() => { navigation.navigate('SignIn'); }} // TODO: change to signed out screen once it is implemented
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
