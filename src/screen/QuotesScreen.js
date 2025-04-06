
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View ,Button,Image,TouchableOpacity ,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BannerAd, BannerAdSize, InterstitialAd ,AdEventType,TestIds } from 'react-native-google-mobile-ads';
import { Card, Avatar } from 'react-native-elements'; 
import {quotes_localization} from '../../script/quotes_localization'; 
import {styles} from '../../style/styles'; 
import {i18n,translations} from '../../script/i18n'; 
import {adUnitIdInterstittial,adUnitIdBanner} from '../../script/admob'; 
 import ShareApp from './ShareApp';
 import Footer  from './Footer';
const interstitial = InterstitialAd.createForAdRequest(adUnitIdInterstittial, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

function QuotesScreen({route,navigation}) {
  const [showBannerAds, setShowBannerAds] = useState(true); 
  const [isLoading, setIsLoading] = useState(true);
  const lang = route.params.lang;
  const [quote, setQuote] = useState({});  
  const  quotesData = quotes_localization[lang];
  const [indexQuote, setIndexQuote] = useState(0); 
  useEffect(() => { 
      
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      interstitial.show();
   
    }); 
    showNewQuote(); 
    return unsubscribe;
  }, []);
 
  const showNewQuote = async ()  => { 
     setIsLoading(true);
    setTimeout(async function(){
      let randomIndex = indexQuote;
      if(randomIndex == 0){
          var indexStorage = await AsyncStorage.getItem('indexQuote') ; 
          if(indexStorage != null){
            randomIndex = Number(indexStorage);
          } else{
            randomIndex = 0;
          }
        
      }  
      randomIndex++; 
      if(!quotesData[randomIndex]){
        randomIndex = 0;
      }  
      const randomQuote = quotesData[randomIndex];  
      setIndexQuote(randomIndex);
      setQuote(randomQuote);
      await AsyncStorage.setItem('indexQuote', randomIndex.toString());
      if(randomIndex%3 == 0)
      interstitial.load();
      setIsLoading(false);
    },1000)
     
  
  }

  const handleLinkPress = () => {
 
    const url = 'https://my-mobile-apps.000webhostapp.com/privacy-policy.html'; 
    Linking.openURL(url)
      .catch((err) => console.error('Error opening URL:', err));
};
const onAdFailedToLoad = ()=>{ 
  setShowBannerAds(false);
 }
  return (
    
    <View style={styles.container}>
        {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large"   color={styles.loader.color} />
        </View>
      )}
    {!isLoading && 
      <>
      {quote.text&&
        <Card containerStyle={styles.cardContainer}>
        <Card.Title style={styles.quoteText}>{quote.text}</Card.Title>
        <View style={styles.authorContainer}> 
          <Text style={styles.authorText}>{i18n.t('author')} : {quote.author}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={showNewQuote}>
        <Text style={styles.buttonText}>{i18n.t('new_quote')}</Text>
      </TouchableOpacity>
      <ShareApp text={quote.author+":"+quote.text}/>
      </Card>
      } 
    
   
      </>
      
    }
      
      <Footer/>
    </View>
  );
}

export default QuotesScreen;