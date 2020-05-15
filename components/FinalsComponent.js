import React, { Component } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import Swipeout from 'react-native-swipeout';
import { deleteFinal } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        proposals: state.proposals,
        finals: state.finals
    };
};

const mapDispatchToProps = {    deleteFinal: proposalId => (deleteFinal(proposalId))};



class Finals extends Component {

    static navigationOptions = {
        title: 'Approved Designs'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderFinalItem = ({item}) => {
            const rightButton = [
                {
                    text: 'Delete', 
                    type: 'delete',
                    onPress: () => {
                        Alert.alert(
                            'Delete?',
                            'Are you sure you wish to remove the approved design for ' + item.name + '?',
                            [
                                { 
                                    text: 'Cancel', 
                                    onPress: () => console.log(item.name + ' Not Deleted'),
                                    style: ' cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () => this.props.deleteFinal(item.id)
                                }
                            ],
                            { cancelable: false }
                        );
                    }
                }
            ];
        
            return (
                <Swipeout right={rightButton} autoClose={true}>
                    <Animatable.View animation='fadeInRightBig' duration={2000}>
                        <ListItem
                        title={item.name}
                        subtitle={item.description}
                        leftAvatar={{source: {uri: baseUrl + item.image}}}
                        onPress={() => navigate('ProposalInfo', {proposalId: item.id})}
                        />
                    </Animatable.View>
                </Swipeout>
            );
        };

        if (this.props.proposals.isLoading) {
            return <Loading />;
        }
        if (this.props.proposals.errMess) {
            return (
                <View>
                    <Text>{this.props.proposals.errMess}</Text>
                </View>
            );
        }
        return (
            <FlatList
                data={this.props.proposals.proposals.filter(
                    proposal => this.props.finals.includes(proposal.id)
                )}
                renderItem={renderFinalItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Finals);