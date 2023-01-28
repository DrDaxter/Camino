import React from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Colors } from '../../theme/Colors'
import { InputLable } from '../../utils/InputLable'

export type formProps = {
    email:'email',
    password:'password'
}
export const LoginForm = () => {

    const signupSchema = Yup.object().shape({
        email: Yup.string().required('Required'),
        password: Yup.string().max(10,"too long").required('Required')
    })
  return (
    <ScrollView style={styles.formContent}>
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
            <View style={styles.inputContentGeneral}>
                <InputLable 
                    label="Email"
                    onValueChange={handleChange('email')}
                    onBlurChange={handleBlur('email')}
                    value={values.email}
                />
                {errors.email && touched.email && <Text style={{color:"red"}}>{errors.email}</Text>}
            </View>
        )}
        </Formik>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    formContent:{
        
    },
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
})