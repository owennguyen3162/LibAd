import React, { useEffect, useRef } from 'react';
import { AppState, Button } from 'react-native';
import { AdEventType, AppOpenAd, TestIds } from 'react-native-google-mobile-ads';

interface IAppOpenAdss {
    adUnitId?: string;
    onAdClose: () => void;
    preload?: boolean;
}

export const AppOpenAds = (props: IAppOpenAdss) => {

    const { adUnitId = TestIds.APP_OPEN, onAdClose, preload = true } = props;

    const appOpenAd = useRef(AppOpenAd.createForAdRequest(__DEV__ ? TestIds.APP_OPEN : adUnitId, {
        keywords: ['fashion', 'clothing'],
    })).current

    const appState = useRef(AppState.currentState);

    useEffect(() => {

        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/background/) &&
                nextAppState === 'active'
            ) {
                if (appOpenAd.loaded) {
                    appOpenAd.show()
                } else {
                    appOpenAd.load()
                }
            }

            appState.current = nextAppState;
        });


        const handleAdLoaded = appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
            appOpenAd.show();
        });

        const handleAdClicked = appOpenAd.addAdEventListener(AdEventType.CLICKED, () => {
        });

        const handleAdClosed = appOpenAd.addAdEventListener(AdEventType.CLOSED, () => {
            onAdClose?.();
        });

        const handleAdError = appOpenAd.addAdEventListener(AdEventType.ERROR, (error) => {
        });

        const handleAdOpened = appOpenAd.addAdEventListener(AdEventType.OPENED, () => {
        });

        const handleAdPaid = appOpenAd.addAdEventListener(AdEventType.PAID, () => {
        });

        return () => {
            handleAdLoaded?.();
            handleAdClicked?.();
            handleAdClosed?.();
            handleAdError?.();
            handleAdOpened?.();
            handleAdPaid?.();
            subscription?.remove();
        };
    }, []);

    return (
        <Button
            title="AppOpenAds"
            onPress={() => { }}
        />

    )
}