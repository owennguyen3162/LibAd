import { View, Text } from 'react-native'
import React from 'react'
import { InterstitialAds } from './src/admob/InterstitialAds/InterstitialAds'
import { TestIds } from 'react-native-google-mobile-ads'
import { AppOpenAds } from './src/admob/AppOpenAds/AppOpenAds'
import { RewardAds } from './src/admob/RewardAds/RewardAds'

const App = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <InterstitialAds adUnitId={TestIds.INTERSTITIAL} adDisplayTimeout={5} onAdClose={() => {
      }} preload={true} />
      <AppOpenAds adUnitId='test' onAdClose={() => {
      }} preload={false} />
      <RewardAds adUnitId={TestIds.REWARDED} onAdClose={() => {
      }} />
    </View>
  )
}

export default App