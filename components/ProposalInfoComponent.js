import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList,
    Modal, Button, StyleSheet,
    Alert, PanResponder } from 'react-native';
import { Card, Icon, Rating, Input} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import { postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      proposals: state.proposals,
      comments: state.comments,
      favorites: state.favorites
    };
};

const mapDispatchToProps = {
    postFavorite: proposalId => (postFavorite(proposalId)),
    postComment: (proposalId, rating, author, text) => (postComment(proposalId, rating, author, text))
};

function RenderProposal(props) {

    const {proposal} = props;

    const view = React.createRef();

    const recognizeDrag = ({dx}) => (dx < -200) ? true : false;
    const recognizeComment = ({dx}) => (dx > 200) ? true : false;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            view.current.rubberBand(1000)
            .then(endState => console.log(endState.finished ? 'finished' : 'canceled'));
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log('pan responder end', gestureState);
            if (recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + proposal.name + ' to favorites?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => console.log('Cancel Pressed')
                        },
                        {
                            text: 'OK',
                            onPress: () => props.favorite ?
                                console.log('Already set as a favorite') : props.markFavorite()
                        }
                    ],
                    { cancelable: false }
                );
            }
            else if (recognizeComment(gestureState)) {
                props.onShowModal();
            }

        
            return true;
        }
    });

    if (proposal) {
        return (
            <Animatable.View
                animation='fadeInDown'
                duration={2000}
                delay={1000}
                ref={view}
                {...panResponder.panHandlers}>
                <Card
                featuredTitle={proposal.name}
                image={{uri: baseUrl + proposal.image}}>
                <Text style={{margin: 10}}>
                    {proposal.description}
                </Text>
                <View style={styles.cardRow}>
                <Icon
                    name={props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    raised
                    reverse
                    onPress={() => props.favorite ? 
                        console.log('Already set as a favorite') : props.markFavorite()}
                />
                <Icon style={styles.cardItem}
                    name='pencil'
                    type='font-awesome'
                    color='#5637DD'
                    raised
                    reverse
                    onPress={() => props.onShowModal()}
                    
                    
                />
                </View>
                </Card>
            </Animatable.View>
        );
    }
    return <View />;
}

function RenderComments({comments}) {

    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Rating readonly
                    startingValue={item.rating}
                    imageSize={10}
                    style={{alignItems: 'flex-start', paddingVertical: 5}}
                />
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    return (
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
            <Card title='Comments'>
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

class ProposalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            rating: 5,
            author: '',
            text: ''
        };
    }
    onShowModal() {
        this.setState({showModal: this.state.showModal})
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleComment(proposalId){
        this.props.postComment(proposalId, this.state.rating, this.state.author, this.state.text)
        this.toggleModal();
        
    }
    resetForm() {
        this.setState({
            rating: 5.0,
            author: '',
            text: '',
            showModal: false
        });
    }
    
    markFavorite(proposalId) {
        this.props.postFavorite(proposalId);
    }

    static navigationOptions = {
        title: 'Proposal Information'
    };

    render() {
        const proposalId = this.props.navigation.getParam('proposalId');
        const proposal = this.props.proposals.proposals.filter(proposal => proposal.id === proposalId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.proposalId === proposalId);
        
        return (
            <ScrollView>
                 <RenderProposal proposal={proposal}
                    favorite={this.props.favorites.includes(proposalId)}
                    markFavorite={() => this.markFavorite(proposalId)}
                    onShowModal={() => this.toggleModal()}
                />
                <RenderComments comments={comments} />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}>
                    <View style={styles.modal}>
                    <Rating
                        showRating 
                        imageSize={40}
                        startingValue={this.state.rating}
                        style={{paddingVertical: 10}}
                        onFinishRating={(rating)=>this.setState({rating: rating})} 
                    />
                    <Input
                        placeholder="Author"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        leftIconContainerStyle={{paddingRight: 10}}
                        onChangeText={value => this.setState({ author: value })}
                    />
                    <Input
                        placeholder="Comment"
                        leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                        leftIconContainerStyle={{paddingRight: 10}}
                        onChangeText={value => this.setState({ text: value })}
                    />
                    <View  style={{margin: 10}}>
                        <Button
                            onPress={() => {
                                this.handleComment(proposalId);
                                this.resetForm();
                            }}
                            color='#5637DD'
                            title='Submit'
                        />
                    </View>
                    <View  style={{margin: 10}}>
                        <Button
                            onPress={() => {
                                this.toggleModal();
                                this.resetForm();
                            }}
                            color='#808080'
                            title='Cancel'
                        />
                    </View>
                </View>
                </Modal>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ProposalInfo);