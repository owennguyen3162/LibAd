import React, { useEffect, useRef } from 'react';
import { Button } from 'react-native';
import { AdEventType, RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

interface IRewardAds {
    adUnitId?: string;
    onAdClose: () => void;
    preload?: boolean;
    onAdEarned?: (value: number) => void
}
export const RewardAds = (props: IRewardAds) => {

    const { adUnitId = TestIds.REWARDED, onAdClose, preload = true, onAdEarned } = props;
    const rewarded = useRef(RewardedAd.createForAdRequest(adUnitId, {
        keywords: ['fashion', 'clothing'],
    })).current


    useEffect(() => {
        const handleAdLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            rewarded.show();
        });

        const handleAdClicked = rewarded.addAdEventListener(AdEventType.CLICKED, () => {
        });

        const handleAdClosed = rewarded.addAdEventListener(AdEventType.CLOSED, () => {
            onAdClose?.();
        });

        const handleAdError = rewarded.addAdEventListener(AdEventType.ERROR, (error) => {
        });

        const handleAdOpened = rewarded.addAdEventListener(AdEventType.OPENED, () => {
        });

        const handleAdPaid = rewarded.addAdEventListener(AdEventType.PAID, (paid) => {
        });

        const handleAdEarned = rewarded.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            reward => {
                if (reward.amount) {
                    onAdEarned?.(reward.amount)
                }
            },
        );

        return () => {
            handleAdLoaded?.();
            handleAdClicked?.();
            handleAdClosed?.();
            handleAdError?.();
            handleAdOpened?.();
            handleAdPaid?.();
            handleAdEarned?.()
        };

    }, []);

    const showAd = () => {
        if (rewarded.loaded) {
            rewarded.show()
        } else {
            rewarded.load()
        }
    };


    return (
        <Button
            title="Show Rewarded Ad"
            onPress={showAd}
        />
    )
}