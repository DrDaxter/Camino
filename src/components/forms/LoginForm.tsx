import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Colors } from '../../theme/Colors'
import { InputLable } from '../../utils/InputLable'

interface formProps{
    email:string,
    password:string
}
export const LoginForm = () => {
    const {control,handleSubmit,formState:{errors}} = useForm<formProps>()
    const onSubmit = handleSubmit((data) => {
        console.log(data)
    })

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
    <View style={styles.formContent}>
        <View>
            <Controller 
                control={control}
                rules={{required:true}}
                render={({field:{onChange,onBlur,value}})=>(
                    <View>
                        <InputLable 
                            label="Email"
                        />
                    </View>
                )}
                name="email"
            />
            {errorText(errors.email?.type,"Email")}
        </View>
        
        
        <View style={styles.inputContentGeneral}>
            <Controller 
                control={control}
                rules={{
                    required:true,
                    maxLength:20
                }}
                render={({field:{onChange,onBlur,value}}) => (
                    <View>
                        <InputLable 
                            label="Password"
                        />
                    </View>
                )}
                name="password"
            /> 
            {errorText(errors.password?.type,"Contraseña")}
        </View>
    </View>
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