import Share from 'react-native-share';
import React, { useState ,useEffect } from 'react';
import { StyleSheet,View, Text ,Button ,TouchableOpacity,ActivityIndicator} from 'react-native';
import {i18n,translations} from '../../script/i18n'; 
import {styles} from '../../style/styles'; 


function ShareApp({text}){
    const shareMyApp = async () => {
        try {
          const options = {
            message: text+"  "+i18n.t('msg_share'),
            url: 'https://play.google.com/store/apps/details?id=com.developper.mobile.it.DailyQuotesApp&pcampaignid=web_share',
            title: 'Share App',
          };
    
          await Share.open(options);
        } catch (error) {
          console.log('Error while sharing:', error.message);
        }
      };

  return (
    <TouchableOpacity style={styles.button} onPress={shareMyApp}>
    <Text style={styles.buttonText}>{i18n.t('share')} </Text>
  </TouchableOpacity>
  );
};

export default ShareApp;