import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES } from '../constants'
import {Feather, Ionicons} from "@expo/vector-icons"
import styles from './search.style'
import axios from "axios"
import { SearchTitle } from '../components'

const Search = () => {
  const [searchKey, setSearchKey] = useState('');
  const [searchResult, setSearchResults] = useState([]);

  const handleSearch = async() => {
    try {
      const reponse = await axios.get("http://localhost:3000/api/products/${searchKey}")
      setSearchResults(reponse.data)

    } catch (error) {
      console.log('Failed to get products', error);
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
            <TouchableOpacity>
              <Ionicons name="camera-outline" size={SIZES.xLarge} style={styles.searchIcon} />
            </TouchableOpacity>
            <View style={styles.searchWrapper}> 
                <TextInput 
                    style={styles.searchInput}
                    value={searchKey}
                    onChangeText={setSearchKey}
                    placeholder="What are you looking for?"
                />
            </View>
            <View>
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                  <Feather name='search' size={24} color={COLORS.offwhite} />
                </TouchableOpacity>
            </View>
      </View>

      {searchResult.length === 0 ? (
        <View style={{flex: 1}}>
          <Image source={require('../assets/images/Pose23.png')}
            style={styles.searchImage}
          />

        </View>
      ) : (
        <FlatList 
          data={searchResult}
          keyExtractor={(item) => item._id}

          renderItem={({item}) => (<SearchTitle item={item}/>)}
          style={{marginHorizontal: 12}}
        />
      )
      }
    </SafeAreaView>
  )
}

export default Search

