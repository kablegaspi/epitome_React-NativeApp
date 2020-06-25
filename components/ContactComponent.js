import React, { Component } from 'react';
import { ScrollView, Text, View, Linking, Platform, StyleSheet } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';
  
class Contact extends Component {
    dialCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else {phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
     };

     handleEmail = () => {
        MailComposer.composeAsync({
            recipients: ['info@epitomedesigns.com'],
            subject: 'Inquiry',
            body: 'Howdy!'
        })
    }
    
    render() {
        return (
            <ScrollView >
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000} >
                <Card 
                    title='CONTACT US' 
                    image={require('./photos/minimalist.jpg')}>
                    <Text style={{marginBottom: 10 }}>
                        1 Epic Ave. {"\n"}
                        Orlando, Florida 32808 {"\n"}
                        U.S.A.{"\n"}{"\n"}
                        Phone: 1-800-777-777{"\n"}
                        Email: info@epitomedesigns.com
                    </Text>
                    <View style={styles.cardRow}>
                    <Icon style={styles.cardItem}
                    name='phone'
                    type='font-awesome'
                    color='#000000'
                    raised
                    reverse
                    onPress={()=>{this.dialCall(18007777777)}}
                    />
                    <Icon style={styles.cardItem}
                    name='envelope'
                    type='font-awesome'
                    color='#000000'
                    raised
                    reverse
                    onPress={()=>{this.handleEmail()}}
                    />
                    </View>
                    
                </Card>
                
                </Animatable.View>
            </ScrollView>
        );
    }
    static navigationOptions = {
        title: 'Contact Us',
        
    }
}

const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
        cardItem: {
        flex: 5,
        margin: 40
    }
});
export default Contact;