import { View, Text, Pressable, Button } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
    AdEventType,
    InterstitialAd,
    TestIds,
} from 'react-native-google-mobile-ads';

interface IInterstitialAds {
    adUnitId?: string;
    onAdClose: () => void;
    adDisplayTimeout: number;
    preload?: boolean;
}

export const InterstitialAds = (props: IInterstitialAds) => {

    const { adUnitId = TestIds.INTERSTITIAL, onAdClose, adDisplayTimeout, preload = true } = props;
    const [paidInterAds, setPaidInterAds] = React.useState<any>({});
    const interstitial = useRef(InterstitialAd.createForAdRequest(__DEV__ ? TestIds.INTERSTITIAL : adUnitId, {
        keywords: ['fashion', 'clothing'],
    })).current
    let lastAdShownTime = useRef(new Date().getTime()).current;

    React.useEffect(() => {
        if (Object.keys(paidInterAds).length != 0) {
            //log revenue event
            //log tracking event
        }
    }, [paidInterAds]);

    useEffect(() => {
        const handleAdLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            interstitial.show();
            lastAdShownTime = new Date().getTime();
        });

        const handleAdClicked = interstitial.addAdEventListener(AdEventType.CLICKED, () => {
        });

        const handleAdClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
            onAdClose?.();
        });

        const handleAdError = interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
        });

        const handleAdOpened = interstitial.addAdEventListener(AdEventType.OPENED, () => {
        });

        const handleAdPaid = interstitial.addAdEventListener(AdEventType.PAID, (paid) => {
            if (paid) {
                setPaidInterAds(paid);
            }
        });

        return () => {
            handleAdLoaded?.();
            handleAdClicked?.();
            handleAdClosed?.();
            handleAdError?.();
            handleAdOpened?.();
            handleAdPaid?.();
        };

    }, []);

    const showAd = () => {
        const currentTime = new Date().getTime();
        if ((currentTime - lastAdShownTime) / 1000 > adDisplayTimeout) {
            if (interstitial.loaded) {
                interstitial.show();
                lastAdShownTime = currentTime;
            } else {
                interstitial.load();
            }
        } else {
            onAdClose?.();
        }
    };

    return (
        <Button
            title="Show Interstitial Ad"
            onPress={showAd}
        />
    );
};