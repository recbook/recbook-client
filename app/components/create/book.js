import React, { Component, PropTypes } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import Styles from './styles';

export class Book extends Component {

  constructor(props) {
    super(props);
    this.state = {
      thumbnail: this.props.book.thumbnail ?
        this.props.book.thumbnail.replace('http', 'https') : this.props.book.thumbnail
    };
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onpressBook(this.props.book);
          this.props.onBookSelected(this.props.book);
        }}
        activeOpacity={1}
      >
        <View>
          {(this.props.book.thumbnail) ?
             <View style={Styles.bookContainer}>
               <Image
                 source={{uri: this.state.thumbnail}}
                 style={Styles.book}
               />
             </View>
             :
             <View style={[Styles.bookContainer, {backgroundColor:'#a3a3a3'}]}/>
           }
          <View style={Styles.textContainerTitle}>
             <Text style={Styles.textBookTitle} numberOfLines = {2}>
               {this.props.book.title}
             </Text>
          </View>
          <View style={Styles.textContainerInfo}>
            <Text style={Styles.textBookInfo} numberOfLines={2}>by {this.props.book.author}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
