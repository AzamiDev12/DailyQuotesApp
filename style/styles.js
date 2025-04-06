import { StyleSheet  } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
     
    },
    loader:{
    color :'#e74c3c'
    },
    langNotFound:{
      fontSize: 13, 
      fontWeight: 'bold',
      color: 'red', 
      marginTop:10
    },
    cardContainer: {
      width: '80%',
      borderRadius: 10,
      elevation: 5,  
      shadowColor: '#000000', 
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    quoteText: {
      fontSize: 25,
      color: '#333333',  
    },
    hello: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 15,
      color: '#e74c3c', 
      
    },
    countryPicker: { 
      backgroundColor: '#e74c3c',  
      padding: 10,
      borderRadius: 8,
      marginTop: 20,
      alignItems :'center',
      
   
   
    },
    chooseCountry: {
      marginTop: 10,
      fontSize: 15,
      fontWeight: 'bold', 
      color: '#333333', 
      textDecorationLine:'underline',
      color: '#ffffff', 
    }, 
    selectedCountry: {
      marginTop: 10,
      fontSize: 15,
    fontWeight:'bold',
    color: '#ffffff', 
      
    }, 
    authorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
    authorText: {
      marginLeft: 0,
      fontSize: 16,
      fontStyle:'italic',
      color: '#555555',  
    },
    button: {
      backgroundColor: '#e74c3c',  
      padding: 15,
      borderRadius: 8,
      marginTop: 30,
      alignItems :'center'
    },
    buttonText: {
      color: '#ffffff',  
      fontSize: 15,
      fontWeight: 'bold', 
    },
    footer: {  
      justifyContent: 'center',
      alignItems: 'center' ,
      position:'absolute',
      bottom:10
     
    },
    footerText: { 
      color: 'gray', // Set your desired text color
      fontSize: 12,
      
    },
    footerPrivacy: { 
      fontSize: 13,
      color: 'blue', 
      textDecorationLine: 'underline' 
      
      
    }
  });
  

  export {styles}