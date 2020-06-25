import React, { Component, useState } from 'react';
import { View, Button, StyleSheet, ImageBackground, Image, Text } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import * as SecureStore from 'expo-secure-store';

const image = require('./photos/bedroomproposal.jpg');


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false,
            wrong: false
        };
    }
    

    static navigationOptions = {
        title: 'Login'
    }

   
    handleLogin() {
        const { navigate } = this.props.navigation;
        
        if((this.state.username =='kablegaspi')&&(this.state.password=='password'))
        {navigate('Home')}
        else{       
         
        this.state.wrong = true;
        
        this.errorMessage();
        
        {navigate('Login')}
        
        
        
        }
       
        
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync('userinfo', JSON.stringify(
                {username: this.state.username, password: this.state.password}))
                .catch(error => console.log('Could not save user info', error));
        } else {
            SecureStore.deleteItemAsync('userinfo')
                .catch(error => console.log('Could not delete user info', error));
        }
    
    }
    errorMessage(wrong) {
        let message = null;
        
        if(this.state.wrong == true){
        message = (<View><Text>Invalid credentials!</Text></View>)
        console.log('Invalid credentials, Please try again!')
        
        }
        else{
            message = ( <View><Text></Text></View>)
        }
        return message;
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then(userdata => {
                const userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true})
                }
            });
    }

    render() {
               
        return (
            <ImageBackground source={image} style={styles.image}>
            <View style={styles.container} backgroundColor = 'rgba(204, 204, 204, 0.51)'>
            <View style ={styles.container}>
                    <Image source={require('./photos/logo.png')} style={styles.drawerImage} />
                    <Text style={styles.drawerHeaderText}>Epitome Designs</Text>
                    <Text style={styles.drawerHeaderText2}>CONNECT</Text>
                </View>
                <Input
                    placeholder='Username'
                    leftIcon={{type: 'font-awesome', name: 'user-o'}}
                    onChangeText={username => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                    placeholderTextColor = "#000000"
                />
                <Input
                    placeholder='Password'
                    secureTextEntry={true}
                    leftIcon={{type: 'font-awesome', name: 'key'}}
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                    placeholderTextColor = "#000000"
                />
                <CheckBox
                    title='Remember Me'
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                />
               
               {this.handleLogin}
                <View style={styles.formButton}>
                    <Button 
                    
                        onPress={() => 
                            this.handleLogin()
                        
                
                            
                        }
                        title='Login'
                        color='#000000'
                    />
                      
                </View>
                
            </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 10
    },
    formCheckbox: {
        margin: 10,
        backgroundColor: null
    },
    formButton: {
        margin: 40
    },
    input: {
        color: '#000000'
    },
    drawerImage: {
        marginLeft: 120,
        
        height: 80,
        width: 80
    },
    drawerHeaderText: {
        color: '#000000',
        fontSize: 26,
        fontWeight: 'bold',
        marginLeft: 60
    },
    drawerHeaderText2: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 120
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
      text: {
        color: "#000000",
        fontSize: 30,
        fontWeight: "bold"
      }
});

export default Login;