import { View, Text, ScrollView, SafeAreaView, Image, TextInput, Touchable, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import styles from './login.style'
import { BackBtn, Button } from '../components';
import {Formik} from 'formik'
import * as Yup from 'yup'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { COLORS } from '../constants';
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios';


const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
});


const LoginPage = ({navigation}) => {
    const [loader, setLoader] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [obsecureText, setObsecureText] = useState(false);

    const invalidForm = () => {
      Alert.alert(
        "Invalid Form",
        "Please provide all required fields",
        [
          {
            text: "Cancel", onPress: () => console.log("cancel pressed")
          },
          {
            text: "Continue", onPress: () => console.log("pressed")
          },
          {defaultIndex: 1}
        ]
      )
    }

    const login = async(values) => {
      setLoader(true)
      try {
        const endpoint = "http://localhost:3000/api/login"
        const data = values;

        const reponse = await axios.post(endpoint, data)
        if(reponse.status === 200){
          setLoader(false)
          setResponseData(reponse.data)

          await AsyncStorage.setItem(`user${responseData._id}`, JSON.stringify(reponseData))
          await AsyncStorage.setItem(`id`, JSON.stringify(reponseData._id))
          navigation.replace('Bottom Navigation')

        } else {
          Alert.alert(
            "Error Logging in",
            "Invalid email/password. Please provide valid credentials",
            [
              {
                text: "Cancel", 
              },
              {
                text: "Continue", 
              },
              {defaultIndex: 1}
            ]
          )
        }
      } catch (error) {
        Alert.alert(
          "Error",
          "Oops, Error logging in, try again!",
          [
            {
              text: "Try Again", 
            },
  
            {defaultIndex: 1}
          ]
        )
      } finally {
        setLoader(false)
      }
    }


  return (
    <ScrollView>
      <SafeAreaView style={{marginHorizontal: 20}}>
        <View>
          <BackBtn onPress={() => navigation.goBack()}/>
          <Image source={require('../assets/images/bk.png')}
            style={styles.cover}
          />

          <Text style={styles.title}>Unlimited Luxurious Funiture</Text>

          <Formik initialValues={{email: '', password: ''}}
            validationSchema={validationSchema}
            onSubmit={(values) => login(values)}
          >
            {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched}) => (
              <View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputWrapper(touched.email ? COLORS.primary: COLORS.offwhite)}>
                    <MaterialCommunityIcons name='email-outline' size={20}
                      color={COLORS.gray}
                      style={{marginRight: 10}}
                    />
                    <TextInput
                      placeholder='Enter email'
                      onFocus={() => {setFieldTouched('email')}}
                      onBlur={() => {setFieldTouched('email', '')}}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      autoCapitalize='none'
                      autoCorrect={false}
                      style={{flex: 1}}
                    />
                  </View> 
                  {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputWrapper(touched.password ? COLORS.primary: COLORS.offwhite)}>
                    <MaterialCommunityIcons name='lock-outline' size={20}
                      color={COLORS.gray}
                      style={{marginRight: 10}}
                    />
                    <TextInput
                      secureTextEntry={obsecureText}
                      placeholder='Password'
                      onFocus={() => {setFieldTouched('password')}}
                      onBlur={() => {setFieldTouched('password', '')}}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      autoCapitalize='none'
                      autoCorrect={false}
                      style={{flex: 1}}
                    />

                    <TouchableOpacity onPress={() => setObsecureText(!obsecureText)}>
                      <MaterialCommunityIcons name={obsecureText ? "eye-outline" : "eye-off-outline"}
                       size={20} />
                    </TouchableOpacity>
                  </View> 
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>

                <Button title={"L O G I N"} 
                  onPress={isValid ? handleSubmit : invalidForm} 
                  isValid={isValid}
                  loader={loader}
                />
                
                <View style={styles.registerWrapper}> 
                  <Text> Doesn't have an account? </Text>
                  <Text onPress={() => navigation.navigate('SignUp')} style={styles.registration}> Sign Up </Text>
                </View>
              </View>
            )}

          </Formik>

          
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default LoginPage