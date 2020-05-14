import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
      proposals: state.proposals,
      ideas: state.ideas,
      partners: state.partners
    };
};
function RenderItem(props) {
    const {item} = props;

    if (props.isLoading) {
        return <Loading />;
    }
    if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }
    if (item) {
        return (
            <Card 
                featuredTitle="Featured Partner"
                image={{uri: baseUrl + item.image}}>
                <Text
                    style={{margin: 10, fontSize: 20}}>
                      {item.name}
                    
                </Text>
                <Text
                    style={{margin: 2, fontSize: 15, }}>
                    {item.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scaleValue: new Animated.Value(0)
        };
    }

    animate() {
        Animated.timing(
            this.state.scaleValue,
            {
                toValue: 1,
                duration: 1500
            }
        ).start();
    }

    componentDidMount() {
        this.animate();
    }

    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            <Animated.ScrollView style={{transform: [{scale: this.state.scaleValue}]}}>
                <RenderItem
                    item={this.props.proposals.proposals.filter(proposal => proposal.featured)[0]}
                    isLoading={this.props.proposals.isLoading}
                    errMess={this.props.proposals.errMess}
                />
                <RenderItem
                    item={this.props.ideas.ideas.filter(idea => idea.featured)[0]}
                    isLoading={this.props.ideas.isLoading}
                    errMess={this.props.ideas.errMess}
                />
                
                <RenderItem
                    item={this.props.partners.partners.filter(partner => partner.featured)[0]}
                    isLoading={this.props.partners.isLoading}
                    errMess={this.props.partners.errMess}
                />
            </Animated.ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);