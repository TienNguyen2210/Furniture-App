import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Ionicons, Fontisto} from '@expo/vector-icons';
import styles from './home.style';
import { Carousel, Headings, ProductRow, Welcome } from '../components';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem('id')
    const useId = `user${JSON.parse(id)}`
    
    try {
      const currentUser = await AsyncStorage.getItem(useId);
      
      if(currentUser !== null) {
        const parsedData = JSON.parse(currentUser)
        setUserData(parsedData)
        setUserLogin(true)
      } 
    } catch (error) {
      console.log("Error retreiving the data:", error)
    }
  }
  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>

        <View style={styles.appBar}>
          <Ionicons name="location-outline" size={24} />
          
          <Text style={styles.location}> {userData ? userData.location : 'ShangHai China'} </Text>
          
          <View style={{alignItems: "flex-end"}}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}>8</Text>
            </View>
            <TouchableOpacity>
              <Fontisto name='shopping-bag' size={24} />
            </TouchableOpacity>
          </View>
        </View>

      </View>

      <ScrollView>
        <Welcome />
        <Carousel />
        <Headings />
        <ProductRow />
      </ScrollView>

    </SafeAreaView>
  );
};

export default Home;
