import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import {Input} from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Animatable from 'react-native-animatable';

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
                  
            date: '',
        };
    }

    static navigationOptions = {
        title: 'Schedule a Huddle'
    }
    
    handleReservation(){
        Alert.alert(
            'You are all set!   ',
            'See you on: '+ this.state.date,
            [
                { 
                    text: 'Cancel', 
                    style: ' cancel'
                },
                {
                    text: 'OK',
                }
            ],
            { cancelable: false }
        );

    }

    render() {
        return (
            <Animatable.View animation='zoomIn' duration={2000} delay={1000}>
                
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>{'\n'}{'\n'}Pick the best date that works for you!{'\n'}</Text>
                </View>
                <View style={styles.formRow}></View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date</Text>
                    <DatePicker
                        style={{flex: 2, marginRight: 20}}
                        date={this.state.date}
                        format='YYYY-MM-DD'
                        mode='date'
                        placeholder='Select Date'
                        minDate={new Date().toISOString()}
                        confirmBtnText='Confirm'
                        cancelBtnText='Cancel'
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={date => {this.setState({date: date})}}
                    />
                    
                </View>
                <View style={styles.formRow}></View>
                <View style={styles.formRow}>
                    <Button
                        onPress={() => this.handleReservation()
                    }
                        title='Set'
                        color='#000000'
                        accessibilityLabel='Tap me to schedule a meeting with your designer'
                    />
                </View>
                           
            </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }    
});

export default Reservation;