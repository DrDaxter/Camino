import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Colors } from '../../theme/Colors'
import { InputLable } from '../../utils/InputLable'

export type formProps = {
    email:'email',
    password:'password'
}
export const LoginForm = () => {
    const {control,handleSubmit,formState:{errors}} = useForm<formProps>()
    /* const onSubmit = handleSubmit((data) => {
        console.log(data)
    }) */

    const errorText = (type:string|undefined,control:string) => {
        if(type === "required"){
            return <Text style={{color:"red"}}>{control} requerido</Text>
        }else if(type === "maxLength"){
            return <Text style={{color:"red"}}>El maximo de caracteres es de 20</Text>
        }else{
            null
        }
    }


  return (
    <ScrollView style={styles.formContent}>
        <View style={styles.inputContentGeneral}>
            <InputLable 
                control={control}
                name="email"
                label="Email"
                rules={{
                    required: true,
                }}
            />
        </View>
        
        <View style={styles.inputContentGeneral}>
            
        </View>
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