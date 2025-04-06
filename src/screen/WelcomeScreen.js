import React, { useState ,useEffect, useRef } from 'react';
import { StyleSheet,View, Text ,Button ,TouchableOpacity,ActivityIndicator} from 'react-native';
import CountryPicker , { DARK_THEME  } from 'react-native-country-picker-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Avatar } from 'react-native-elements'; 
import {i18n,translations} from '../../script/i18n'; 
import {styles} from '../../style/styles'; 
import { BannerAd, BannerAdSize,TestIds } from 'react-native-google-mobile-ads';
import ShareApp from './ShareApp';
import Footer from './Footer';
import {adUnitIdBanner} from '../../script/admob';  


 
function WelcomeScreen({route,navigation}) { 
  const [showBannerAds, setShowBannerAds] = useState(true); 
  const [isLoading, setIsLoading] = useState(true);
  const [showCoutries, setShowCoutries] = useState(false);
  const [langIsNotFound, setLangIsNotFound] = useState(false);
  const [country, setCountry] = useState({cca2:'US',name:'United states of america'});   
  const [language, setLanguage] = useState('eng');
  const [langCounytyPicker, setLangCounytyPicker] = useState('eng');
 const countryPickerRef = useRef(null);
  useEffect(() => { 
    setShowCoutries(false);
    fetchLanguages();
  }, []);
  const fetchLanguages = async (selectedCountry) => {
    var language = "English";
    var  locale='eng';
    try {
      if(selectedCountry){
        var mycountry  ={...selectedCountry}; 
      }else{
        var mycountry  ={...country};
        var countrytorage = await AsyncStorage.getItem('country') ;  
        if(countrytorage != null){
          mycountry = JSON.parse(countrytorage);
          setCountry( mycountry); 
        }
      }
    
      const response = await fetch(`https://restcountries.com/v3/alpha/${mycountry.cca2}`);
      const data = await response.json();
      var locale = Object.keys(data[0]?.languages||{})[0] ;
         language = Object.values(data[0]?.languages||{})[0] ; 
        
     if(translations[locale]){
      i18n.locale = locale 
      setLangIsNotFound(false);
     }else{
      i18n.locale = 'eng';
      setLangIsNotFound(true);
     }
    if(!language)language = "NOT_FOUND";
    if(locale)setLangCounytyPicker(locale);
      
    } catch (error) {
      console.error('Error fetching language information:', error);
      i18n.locale = 'eng';
      language = "NOT_FOUND";
      setLangIsNotFound(true);
       
    }
    setIsLoading(false);
    setLanguage(language);
  };
  const onSelect = async (selectedCountry) => {
    await AsyncStorage.setItem('country', JSON.stringify(selectedCountry));
    setCountry(selectedCountry);
    fetchLanguages(selectedCountry)
     
  };
  const goToQuotesScreen = ()=> {  
    navigation.navigate('Quotes',{lang:i18n.locale});
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
    <View style={styles.container }>
        {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large"   color={styles.loader.color} />
        </View>
      )}
      {!isLoading &&
        <Card containerStyle={styles.cardContainer}> 
       <Card.Title> <Text style={styles.hello}>{i18n.t('welcome')}</Text></Card.Title>  
       
       <TouchableOpacity  onPress={()=>{setShowCoutries(true);}}>
       <View style={styles.countryPicker} >
       <Text style={styles.chooseCountry}>{i18n.t('choose_country')}:</Text> 
        <CountryPicker  
        withFilter 
        withAlphaFilter  
        onSelect={onSelect}
        countryCode={country.cca2} 
        onClose={()=>{setShowCoutries(false);}}
        visible={showCoutries}
        
      /> 
      <Text style={styles.selectedCountry}>{i18n.t('your_country')}: {country.name.toUpperCase()}</Text>
      <Text style={styles.selectedCountry}>{i18n.t('your_language')}: {language.toUpperCase()}</Text>
   
          
      </View>
      
       </TouchableOpacity> 
  
   
      
     {langIsNotFound &&  <Text style={styles.langNotFound}>(Translation of the quote in your language is not available)</Text>}
      <TouchableOpacity style={styles.button} onPress={goToQuotesScreen}>
        <Text style={styles.buttonText}>{i18n.t('new_quote')} </Text>
      </TouchableOpacity>
   <ShareApp text="" />
     </Card>  
}
    <Footer/>
    </View>
  );
}
 
 
export default WelcomeScreen;