import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function CustomDrawer(props) {
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
        <View style={{ paddingLeft: 30, paddingTop: 50 }}>
          <Image
            source={require('../assets/imgs/apples.jpg')}
            style={{
              height: 120, width: 120, borderRadius: 60, marginBottom: 10,
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
        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Play'); }} style={{ paddingVertical: 15 }} />
        <View style={{
          flexDirection: 'row', alignItems: 'center', marginLeft: 8, marginBottom: 30,
        }}
        >
          <Icon
            size={26}
            name="logout-variant"
            color="#34221D"
          />
          <Text style={{
            fontSize: 14,
            marginLeft: 17,
            color: '#34221D',
            fontWeight: '500',
          }}
          >
            Log out
          </Text>
        </View>
      </View>
    </View>
  );
}

export default CustomDrawer;
