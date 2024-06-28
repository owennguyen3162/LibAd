import { View, Text, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import {
    AdEventType,
    InterstitialAd,
    TestIds,
} from 'react-native-google-mobile-ads';

interface IInterstitialAds {
    adUnitId: string;
    cbNextScreen: () => void;
    timeOutDisplayAd: number;
    preLoad: boolean;
}

let timeClicked = new Date().getTime()

export const InterstitialAds = (props: IInterstitialAds) => {
    const { adUnitId, cbNextScreen, timeOutDisplayAd, preLoad } =
        props;

    const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
        keywords: ['fashion', 'clothing'],
    });

    useEffect(() => {
        const interstitialLoaded = interstitial.addAdEventListener(
            AdEventType.LOADED,
            () => {
                console.log('Loaded', adUnitId);
                interstitial.show();
                timeClicked = new Date().getTime()
            },
        );

        const interstitialClicked = interstitial.addAdEventListener(
            AdEventType.CLICKED,
            () => { },
        );

        const interstitialClosed = interstitial.addAdEventListener(
            AdEventType.CLOSED,
            () => {
                cbNextScreen?.();
            },
        );

        const interstitialError = interstitial.addAdEventListener(
            AdEventType.ERROR,
            error => {
                console.log(error);
            },
        );

        const interstitialOpened = interstitial.addAdEventListener(
            AdEventType.OPENED,
            () => {
                console.log('OPENED ', adUnitId);
            },
        );

        const interstitialPaid = interstitial.addAdEventListener(
            AdEventType.PAID,
            () => { },
        );

        // Unsubscribe from events on unmount
        return () => {
            [
                interstitialLoaded,
                interstitialClicked,
                interstitialClosed,
                interstitialError,
                interstitialOpened,
                interstitialPaid,
            ].forEach(e => e?.());
        };
    }, []);

    const _handleShowAd = () => {
        if ((new Date().getTime() - timeClicked) / 1000 > timeOutDisplayAd) {
            if (interstitial.loaded) {
                interstitial.show();
                timeClicked = new Date().getTime()
            } else {
                interstitial.load();
            }
        } else {
            cbNextScreen?.();
        }
    };

    return (
        <Pressable
            onPress={() => {
                _handleShowAd();
            }}
            style={{ marginVertical: 100 }}>
            <Text>InterstitialAds {adUnitId}</Text>
        </Pressable>
    );
};
