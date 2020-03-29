import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import NavigationUtil from '../../navigator/NavigationUtil';
import Icon from '../Icon/MyIcon';

export class MessageItem extends Component {
    constructor(props) {
        super(props);
    }
    openDetail=()=>{
        NavigationUtil.goPage(
        {
            navigation: this.props.navigation,
            data: this.props.data
        },
        'DetailPage',
        );
    }
    render() {
        return (
            <TouchableOpacity onPress={this.openDetail} style={styles.item}>
                <View style={styles.text}>
                    <View style={styles.title}>
                        <Text>{this.props.data.title}</Text>
                    </View>
                    <View style={styles.label}>
                        <View style={styles.type}>
                            <Text>{this.props.data.type}·</Text>
                            <Text>{this.props.data.time}</Text>
                        </View>
                        <View style={styles.comments}>
                            <Icon name={'home'} size={16} />
                            <Text>{this.props.data.comments}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.img}>
                    <Image style={styles.image}
                        source={{
                            uri: this.props.data.image,
                        }}
                    />
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        height: 110,
        width: '100%',
        borderTopWidth: 2,
        borderTopColor: '#ccc',
        flexDirection: 'row',
    },
    text: {
        width: '60%',
        height: '100%',
        padding: 5,
    },
    title: {
        height: '80%',
    },
    label: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    type: {
        flexDirection: 'row',
    },
    comments: {
        flexDirection: 'row',
    },
    img: {
        width: '40%',
        height: '100%',
    },
    image: {
        height: '100%',
        width: '100%',
    },
})

export default MessageItem;
