import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      proposals: state.proposals,
    };
};

class Directory extends Component {

    static navigationOptions = {
        title: 'Proposals'
    };

    render() {
        const { navigate } = this.props.navigation;
        const renderDirectoryItem = ({item}) => {
            return (
                <Animatable.View animation='fadeInRightBig' duration={2000}>
                    <Tile
                        title={item.name}
                        caption={item.description}
                        featured
                       
                        onPress={() => navigate('ProposalInfo', { proposalId: item.id })}
                        imageSrc={{uri: baseUrl + item.image}}
                        />
                </Animatable.View>
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
                data={this.props.proposals.proposals}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}



export default connect(mapStateToProps)(Directory);