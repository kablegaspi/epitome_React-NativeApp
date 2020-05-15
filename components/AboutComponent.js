import React, { Component } from 'react';
import { ScrollView, Text, FlatList, View, Image, StyleSheet } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      partners: state.partners
    };
};

const users = [
    {
       name: '  Eddyza Esmas',
       avatar: require('./photos/eddyza.jpg')
    },
    {
        name: '  Jaina Simpas',
        avatar: require('./photos/jaina.jpg')
     },
     {
        name: '  Kyiel Legaspi',
        avatar: require('./photos/kyiel.jpg')
     },
     {
        name: '  Leonora Waters',
        avatar: require('./photos/leonora.jpg')
     },
   ];
   

class Mission extends Component {


    render() {
        return (
            <ScrollView>
                <Card
                title='HOW WE STARTED'
                 wrapperStyle={{margin: 10}}>
                    <View style={styles.cardRow}>
                     <Image
                            style={{
                               resizeMode: "contain",
                                height: 380,
                                width: 380,
                                alignItems: 'center',
                                justifyContent: 'center',
                               
                              }}
                            resizeMode="cover"
                            source={require('./photos/about.jpg')}
                        />
                </View>
                <Text style={{marginBottom: 10, textAlign: 'center'}}>
                   Epitome Designs began in the summer of 2012 when a group of friends got together to remodel the living room of its founder, Lenora. The entire process went so smooth and everyone had a good time, and thats when we realized we all had a passion for interior design. Since then, we have designed projects for thousands of customers in the past 8 years and we have never had a disappointed customer.
                </Text>
                </Card>

                <Card title="TOP DESIGNERS OF THE MONTH">
                    {
                    users.map((u, i) => {
                    return (
                        <View key={i} style={{tintColor: "#000000", 
                        flexDirection: 'row', height: 50}}
                        >
                           <Image
                            style={{
                               resizeMode: "contain",
                                height: 40,
                                width: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                               
                              }}
                            resizeMode="cover"
                            source={u.avatar} 
                        />
                            
                        <Text style={{fontSize: 18,
                            fontWeight: 'bold', alignItems: 'center',
                            justifyContent: 'center'}}> 
                                {u.name}
                        </Text>
                        </View>
                    );
                    })
                }
                </Card>

            </ScrollView>
        );
    }

}

class About extends Component {
    
        static navigationOptions = {
        title: 'About Us'
    };

    render() {
        const renderPartner = ({item}) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{source: {uri: baseUrl + item.image}}}
                />
            );
        };

        if (this.props.partners.isLoading) {
            return (
                <ScrollView>
                    <Mission />
                    <Card
                        title='OUR PARTNERS'>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }
        if (this.props.partners.errMess) {
            return (
                <ScrollView>
                    <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                        <Mission />
                        <Card
                            title="OUR PRTNERS">
                            <Text>{this.props.partners.errMess}</Text>
                        </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }
        return (
            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                    <Mission />
                    <Card
                        title="OUR PARTNERS">
                        <FlatList
                            data={this.props.partners.partners}
                            renderItem={renderPartner}
                            keyExtractor={item=>item.id.toString()}
                        />
                    </Card>
                </Animatable.View>
            </ScrollView>
        );
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
        flex: 1,
        margin: 10
    },
    modal: { 
        justifyContent: 'center',
        margin: 20
    },
    text:
    {
        textAlign: 'center',
        color: '#000000',
        fontSize: 24, fontWeight: 'bold',
        fontStyle: 'italic'
    }
});
export default connect(mapStateToProps)(About);