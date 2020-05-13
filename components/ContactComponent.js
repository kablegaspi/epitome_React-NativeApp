import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

class Contact extends Component {
    
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
                        Phone: 1-800-777{"\n"}
                        Email: info@epitomedesigns.co
                    </Text>
                </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
    static navigationOptions = {
        title: 'Contact Us',
        
    }
}
export default Contact;