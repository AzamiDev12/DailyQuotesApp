import React, { useState ,useEffect, useRef } from 'react';
import { StyleSheet,View, Text ,Button ,TouchableOpacity,ActivityIndicator,Linking} from 'react-native';
import CountryPicker , { DARK_THEME  } from 'react-native-country-picker-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Avatar } from 'react-native-elements'; 
import {i18n,translations} from '../../script/i18n'; 
import {styles} from '../../style/styles'; 
import { BannerAd, BannerAdSize,TestIds } from 'react-native-google-mobile-ads';
import ShareApp from './ShareApp';
import {adUnitIdBanner} from '../../script/admob';  


 
function Footer({route,navigation}) { 
  const [showBannerAds, setShowBannerAds] = useState(true); 
  
   
  
  const handleLinkPress = () => {
 
    const url = 'https://my-mobile-apps.000webhostapp.com/privacy-policy.html'; 
    Linking.openURL(url)
      .catch((err) => console.error('Error opening URL:', err));
};
const onAdFailedToLoad = ()=>{ 
  setShowBannerAds(false);
 }

  return (
   
<View style={styles.footer}> 
      {showBannerAds &&
       <BannerAd
       unitId={adUnitIdBanner}
       size={BannerAdSize.BANNER}
       onAdFailedToLoad={onAdFailedToLoad}
    /> 
     } 
         
      <View style={{ alignItems: 'center', flexDirection: 'row'}}>
          <Text style={styles.footerText}>
            © 2024 All rights reserved 
          </Text>
          <TouchableOpacity onPress={handleLinkPress}>
          <Text style={styles.footerPrivacy}> Privacy policy</Text>
        </TouchableOpacity>
      </View>
    </View> 
  );
}
 
 
export default Footer;