import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList,
    Modal, StyleSheet,
     Image, TouchableOpacity } from 'react-native';
import { Card, Icon, Rating, Input} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFinal } from '../redux/ActionCreators';
import { postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      proposals: state.proposals,
      comments: state.comments,
      finals: state.finals
    };
};

const mapDispatchToProps = {
    postFinal: proposalId => (postFinal(proposalId)),
    postComment: (proposalId, rating, author, text) => (postComment(proposalId, rating, author, text))
};

function RenderRequirements() {
        const requirements = [
            {
                startDate: '  04/25/2020',
                style: '  Mid century modern',
                targetDate: '  05/25/2020',
                budget: '  $5000-$7000'
            }
           ];
          
    
            return (
                <View>
                <Card title="REQUIREMENT(S)">
                    {
                    requirements.map((u, i) => {
                    return (
                        <View key={i} style={{tintColor: "#000000", 
                        flexDirection: 'row', height: 180, width: 150, flexWrap: 'wrap'}}>
                        <Text style={{fontSize: 15,
                            fontWeight: 'bold', textAlign: 'left', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}> 
                               Start Date:  
                        </Text>
                        <Text style={{fontSize: 15,
                            fontStyle: 'italic', textAlign: 'left'}}> 
                            {u.startDate}</Text>
                            <Text style={{fontSize: 15,
                            fontWeight: 'bold', textAlign: 'left'}}> 
                               Theme/Style:  
                        </Text>
                        <Text style={{fontSize: 15,
                            fontStyle: 'italic', textAlign: 'left'}}> 
                            {u.style}</Text>
                            <Text style={{fontSize: 15,
                            fontWeight: 'bold', textAlign: 'left'}}> 
                              Target Date:  
                        </Text>  
                       <Text style={{fontSize: 15,
                            fontStyle: 'italic', textAlign: 'left'}}> 
                            {u.targetDate}</Text>
                        <Text style={{fontSize: 15,
                            fontWeight: 'bold', alignItems: 'center',
                            justifyContent: 'flex-start'}}> 
                                Budget in total:</Text> 
                                <Text style={{fontSize: 15,
                            fontStyle: 'italic'}}> 
                            {u.budget}</Text>
                            <Text style={{fontSize: 15,
                            fontWeight: 'bold',color: 'red', alignItems: 'center',
                            justifyContent: 'flex-start'}}> 
                                REVISION #:</Text> 
                                <Text style={{fontSize: 15, color: 'red',
                            fontStyle: 'italic'}}> 
                            7</Text>
                            
                        </View>
                        
                    );
                    })
                }
                </Card>
            </View>
            );
    
}


function RenderProposal(props) {

    const {proposal} = props;

    const view = React.createRef();

  if (proposal) {
        return (
            <Animatable.View
            
                animation='fadeInDown'
                duration={2000}
                delay={1000}
                ref={view}>
                <Card title={proposal.name}>
                     <View style={styles.cardRow}>
                     <Image
                            style={{
                               resizeMode: "contain",
                                height: 280,
                                width: 380,
                                alignItems: 'center',
                                justifyContent: 'center',
                               
                              }}
                            resizeMode="cover"
                            source={{uri: baseUrl + proposal.image}}
                        />
                </View>

                <Text style={{margin: 10}}>
                    {proposal.description}
                </Text>
                <View style={styles.cardRow}>
                <Icon
                    name={props.final ? 'check-circle' : 'check'}
                    type='font-awesome'
                    color='#f50'
                    raised
                    reverse
                    onPress={() => props.final ? 
                        console.log('Design Already Approved') : props.markFinal()}
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
                 type='heart'
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
            author: 'John Waters',
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
    
    markFinal(proposalId) {
        this.props.postFinal(proposalId);
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
                    final={this.props.finals.includes(proposalId)}
                    markFinal={() => this.markFinal(proposalId)}
                    onShowModal={() => this.toggleModal()}
                />
                <RenderRequirements />
                <RenderComments comments={comments} />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}>
                    <View style={styles.modal}>
                        <Text style={styles.text}>Did we nail it?</Text>
                    <Rating
                        showRating 
                        imageSize={40}
                        type='heart'
                        startingValue={this.state.rating}
                        style={{paddingVertical: 10}}
                        onFinishRating={(rating)=>this.setState({rating: rating})} 
                    />
                    
                    <Input
                        placeholder="Feedback"
                        leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                        leftIconContainerStyle={{paddingRight: 20}}
                        onChangeText={value => this.setState({ text: value })}
                    />
                    <View  style={{margin: 10}}>
                    <TouchableOpacity onPress={() => {
                                this.handleComment(proposalId);
                                this.resetForm();
                            }}>
                    <View style = {{backgroundColor: '#FFCA26', alignItems: 'center', 
                    justifyContent: 'center', borderRadius: 10, height: 30}}>
                        <Text style = {{color: 'black',fontSize: 15}}>SEND</Text>
                    </View>
                    </TouchableOpacity>

                    </View>
                    <View  style={{margin: 10}}>
                        <TouchableOpacity onPress={() => {
                                 this.toggleModal();
                                 this.resetForm();
                            }}>
                            <View style = {{backgroundColor: '#000000', alignItems: 'center', 
                            justifyContent: 'center', borderRadius: 10, height: 30}}>
                                <Text style = {{color: 'white',fontSize: 15}}>CANCEL</Text>
                            </View>
                    </TouchableOpacity>
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
    text:
    {
        textAlign: 'center',
        color: '#000000',
        fontSize: 24, fontWeight: 'bold',
        fontStyle: 'italic'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProposalInfo);