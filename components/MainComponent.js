import React, { Component } from 'react';
import Home from './HomeComponent';
import Proposal from './ProposalsComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Reservation from './ReservationComponent';
import Finals from './FinalsComponent';
import ProposalInfo from './ProposalInfoComponent';
import { View, Platform, StyleSheet, Text, ScrollView, Image  } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation';
import { Icon } from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';
import { connect } from 'react-redux';
import { fetchProposals, fetchComments, fetchIdeas,
    fetchPartners } from '../redux/ActionCreators';


    
const mapDispatchToProps = {
    fetchProposals,
    fetchComments,
    fetchIdeas,
    fetchPartners
};

const DirectoryNavigator = createStackNavigator(
    {
        Proposal: { 
            screen: Proposal,
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon
                    name='list'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
            })
        },
        ProposalInfo: { screen: ProposalInfo }
    },
    {
        initialRouteName: 'Proposal',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#FFCA26'
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
                color: '#000000',
                fontWeight: 'bold'
            }
        }
    }
);

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#FFCA26'
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
                color: '#000000',
                fontWeight: 'bold'
            },
            headerLeft: <Icon
                name='home'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
); 


const AboutNavigator = createStackNavigator(
    {
        About: { screen: About }
    },
    {
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#FFCA26'
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
                color: '#000000',
                fontWeight: 'bold'
            },
            headerLeft: <Icon
                name='info-circle'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact }
    },
    {
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#FFCA26'
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
                color: '#000000',
                fontWeight: 'bold'
            },
            headerLeft: <Icon
                name='address-card'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const ReservationNavigator = createStackNavigator(
    {
        Reservation: { screen: Reservation }
    },
    {
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#FFCA26'
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
                color: '#000000',
                fontWeight: 'bold'
            },
            headerLeft: <Icon
                name='calendar'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const FinalsNavigator = createStackNavigator(
    {
        Finals: { screen: Finals }
    },
    {
        navigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#FFCA26'
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
                color: '#000000',
                fontWeight: 'bold'
            },
            headerLeft: <Icon
                name='check-circle'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);
  

const CustomDrawerContentComponent = props => (
    <ScrollView>
        <SafeAreaView 
            style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}>
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image source={require('./photos/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Epitome</Text>
                    <Text style={styles.drawerHeaderText}>Designs</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);


const MainNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='home'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Proposal: {
            screen: DirectoryNavigator,
            navigationOptions: {
                drawerLabel: 'Proposals',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='list'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
    
    Reservation: {
        screen: ReservationNavigator,
        navigationOptions: {
            drawerLabel: 'Schedule a Huddle',
            drawerIcon: ({tintColor}) => (
                <Icon
                    name='calendar'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },

    Finals: {
        screen: FinalsNavigator,
        navigationOptions: {
            drawerLabel: 'Approved Designs',
            drawerIcon: ({tintColor}) => (
                <Icon
                    name='check-circle'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    
    About: {
            screen: AboutNavigator,
            navigationOptions: {
                drawerLabel: 'About Us',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='info-circle'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Contact: {
            screen: ContactNavigator,
            navigationOptions: {
                drawerLabel: 'Contact Us',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='address-card'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        }
    },
    {
        drawerBackgroundColor: '#FFFFFF',
        contentComponent: CustomDrawerContentComponent
    }
);

class Main extends Component {

    componentDidMount() {
        this.props.fetchProposals();
        this.props.fetchComments();
        this.props.fetchIdeas();
        this.props.fetchPartners();
    }

    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
                
            }}>
                <MainNavigator />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#000000',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#FFCA26',
        fontSize: 26,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    },
    stackIcon: {
        marginLeft: 10,
        color: '#000000',
        fontSize: 24
    }
});


export default connect(null, mapDispatchToProps)(Main);