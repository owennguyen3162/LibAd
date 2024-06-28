import { View, Text } from 'react-native'
import React from 'react'
import { InterstitialAds } from './src/admob/InterstitialAds/InterstitialAds'
import { TestIds } from 'react-native-google-mobile-ads'

const App = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <InterstitialAds adUnitId={TestIds.INTERSTITIAL} timeOutDisplayAd={10} cbNextScreen={() => {

      }} preLoad={true} />
      <InterstitialAds adUnitId={TestIds.INTERSTITIAL_VIDEO} timeOutDisplayAd={10} cbNextScreen={() => {

      }} preLoad={true} />
    </View>
  )
}

export default App