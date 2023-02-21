import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Colors } from '../../theme/Colors'
import { Titles } from '../../utils/Titles'
import { InputLable } from '../../utils/InputLable'

export const CreateAccountComponent = () => {

    const mainSchema = Yup.object().shape({
        email: Yup.string().required('Required'),
        password: Yup.string().max(10,"too long").required('Required'),
        confirmPassword: Yup.string().when("password", {
            is: (val:string) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref("password")],
              "La contraseña ingresada no coincide"
            )
        })
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
                    <View style={styles.inputContentGeneral}>
                        <InputLable 
                            label="Correo"
                            onValueChange={handleChange('email')}
                            onBlurChange={handleBlur('email')}
                            value={values.email}
                        />
                        {errors.email && touched.email && <Text style={{color:"red"}}>{errors.email}</Text>}
                    </View>
                    <View style={styles.inputContentGeneral}>
                        <InputLable 
                            label="Contraseña"
                            onValueChange={handleChange('password')}
                            onBlurChange={handleBlur('password')}
                            value={values.password}
                        />
                        {errors.password && touched.password && <Text style={{color:"red"}}>{errors.password}</Text>}
                    </View>
                    <View style={styles.inputContentGeneral}>
                        <InputLable 
                            label="Repita Contraseña"
                            onValueChange={handleChange('confirmPassword')}
                            onBlurChange={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                        /> 
                        <Text style={{color:"red"}}>{errors.confirmPassword}</Text>
                    </View>
                    <View style={{alignItems:"center"}}>
                        <TouchableOpacity
                            style={{width:"90%",height:55}}
                            disabled={!(isValid && dirty)}
                            onPress={() => console.log(dirty)}
                        >
                            <View style={{
                                    ...styles.buttonSignInContent,
                                    borderColor: (isValid && dirty)
                                        ? Colors.primary_dark : Colors.gray2
                                }}>
                                <Titles 
                                    text="Ingresar"
                                    color={(isValid && dirty) ? Colors.primary_dark : Colors.gray2}
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
        height:'100%',
        borderWidth:1,
        borderRadius:5
    }
})