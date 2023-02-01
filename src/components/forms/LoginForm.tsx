import React from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Colors } from '../../theme/Colors'
import { InputLable } from '../../utils/InputLable'
import { Titles } from '../../utils/Titles'

export const LoginForm = () => {

    const signupSchema = Yup.object().shape({
        email: Yup.string().required('Required'),
        password: Yup.string().max(10,"too long").required('Required')
    })
  return (
    <View>
        <Formik
            initialValues={{email:'',password:''}}
            onSubmit={({email,password}) => {
                console.log(email,password)
            }}
            validationSchema={signupSchema}
        >
        {({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            isValid,
            touched,
            errors,
            resetForm,
        }) => (
            <View>
                <View style={styles.inputContentGeneral}>
                    <InputLable 
                        label="Email"
                        onValueChange={handleChange('email')}
                        onBlurChange={handleBlur('email')}
                        value={values.email}
                    />
                    {errors.email && touched.email && <Text style={{color:"red"}}>{errors.email}</Text>}
                </View>
                <View style={styles.inputContentGeneral}>
                    <InputLable 
                        label="Password"
                        onValueChange={handleChange('password')}
                        onBlurChange={handleBlur('password')}
                        value={values.password}
                    />
                    {errors.password && touched.password && <Text style={{color:"red"}}>{errors.password}</Text>}
                </View>
                <View style={{alignItems:"center"}}>
                    <TouchableOpacity
                        style={{width:"90%",height:100}}
                    >
                        <View style={styles.buttonSignInContent}>
                            <Titles 
                                text="Ingresar"
                                color={Colors.black1}
                                font="Roboto-Regular"
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )}
        </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
    inputContentGeneral:{
        marginVertical:15,
    },
    input: {
        color:Colors.black1,
        borderBottomWidth:1,
        borderColor: Colors.black2,
        height: 40,
        padding: 10,
        borderRadius: 4,
    },
    buttonSignInContent:{
        width:'100%',
        height:60,
        borderWidth:1.5,
        borderColor:Colors.primary_dark,
        borderRadius:5
    }
})