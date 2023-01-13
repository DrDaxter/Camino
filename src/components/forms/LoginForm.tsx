import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Colors } from '../../theme/Colors'
import { Titles } from '../../utils/Titles'

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
    <View>
        <Titles 
            text="Email"
            color={Colors.black1}
            size={15}
            align="flex-start"
            marginVertical={0}
        />
        <Controller 
            control={control}
            rules={{required:true}}
            render={({field:{onChange,onBlur,value}})=>(
                <TextInput 
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="example@email.com"
                />
            )}
            name="email"
        />
        {errorText(errors.email?.type,"Email")}
        
        

        <Controller 
            control={control}
            rules={{
                required:true,
                maxLength:20
            }}
            render={({field:{onChange,onBlur,value}}) => (
                <View>
                    <Titles 
                        text="Contraseña"
                        color={Colors.black1}
                        size={15}
                        align="flex-start"
                        marginVertical={0}
                    />
                    <TextInput 
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        textContentType="password"
                    />
                </View>
            )}
            name="password"
        />
        {errorText(errors.password?.type,"Contraseña")}
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        
        color:Colors.black1,
        borderBottomWidth:1,
        borderColor: Colors.black2,
        height: 40,
        padding: 10,
        borderRadius: 4,
    },
})