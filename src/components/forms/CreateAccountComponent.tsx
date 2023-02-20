import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Colors } from '../../theme/Colors'
import { Titles } from '../../utils/Titles'

export const CreateAccountComponent = () => {

    const mainSchema = Yup.object().shape({
        email: Yup.string().required('Required'),
        password: Yup.string().max(10,"too long").required('Required'),
        confirmPassword: Yup.string().max(10,"too long").required('Required')
    })
  return (
    <View>
        <Formik
            initialValues={{email:'',password:'',confirmPassword:''}}
            onSubmit={({email,password,confirmPassword}) => {
                console.log(`Password ${password} Confirm Password ${confirmPassword}`)
            }}
            validationSchema={mainSchema}
        >
            {({
                handleChange,
                handleSubmit,
                handleBlur,
                values,
                isValid,
                touched,
                dirty,
                errors,
            }) => (
                <View>
                    <Titles 
                        text="HOLA MUNDO"
                    />
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
        height:'100%',
        borderWidth:1,
        borderRadius:5
    }
})