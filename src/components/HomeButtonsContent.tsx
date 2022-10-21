import React, { useCallback, useMemo, useRef } from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SimpleButtonIconText } from './SimpleButtonIconText';

export const HomeButtonsContent = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);
  return (
    <>
    <BottomSheet 
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={()=>console.log("ALGO")}
        enablePanDownToClose={true}
        >

            <View style={styles.buttonsContainer}>
            <SimpleButtonIconText
                text={"Servicio \nmecánico"}
                iconName="briefcase-outline"
                action={handleClosePress}
            />
            <SimpleButtonIconText 
                text={"Cambio de \nllantas"}
                iconName="build-outline"
            />
            <SimpleButtonIconText 
                text={"Servicio de \ngrua"}
                iconName="car-outline"
            />
            </View>
    </BottomSheet>
    </>
  )
}

const styles = StyleSheet.create({
    buttonsContainer:{
        marginVertical:30,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
})