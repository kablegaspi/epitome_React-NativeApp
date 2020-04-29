import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';

class Contact extends Component {
    
    render() {
        return (
            <ScrollView>
                <Card
                title='Contact Information'
                wrapperStyle={{margin: 10}}>
                <Text style={{marginBottom: 10}}>
                    1 Nucamp Way {"\n"}
                        Seattle, WA 98001 {"\n"}
                        U.S.A.{"\n"}{"\n"}
                        Phone: 1-206-555-1234{"\n"}
                        Email: campsites@nucamp.co
                </Text>
                </Card>
            </ScrollView>
        );
    }
    static navigationOptions = {
        title: 'Contact Us'
    }
}
export default Contact;