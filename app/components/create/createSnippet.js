import React, { Component, PropTypes} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
import Styles from './styles';
import { Actions, ActionConst } from 'react-native-router-flux';
import ImagesUtil from '../../utils/images.util';
import cancelButton from '../../resources/x btn.png';
import {BookSearchBox} from './bookSearchBox';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import * as BookSnippet from '../../mutations/bookSnippet';
import * as Snippet from '../../mutations/snippet';
import uuid from 'react-native-uuid'

class CreateSnippet extends Component {
  static propTypes = {
    imgPath: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.onpressBook = this.onpressBook.bind(this);
    this.renderBookSearch = this.renderBookSearch.bind(this);
    this.pageNumberHandler = this.pageNumberHandler.bind(this);
    this.renderCreateInfoHeader = this.renderCreateInfoHeader.bind(this);
    this.state = {
      snippetText: undefined,
      book: undefined
    };
  }

  onpressBook(book) {
    this.setState({
      book
    });
  }

  componentDidMount() {
    ImagesUtil.getTextFromImage(this.props.imgPath)
      .then(data => {
        const contents = data.desc.trim().split('.');
        this.setState({
          snippetText: data.desc,
          contents
        });
      })
      .catch(console.log);
  }

  renderCroppedImage(uri) {
    return () => {
      return (
        <View style={{flex:1}}>
          <Image
            style={{flex:1}}
            source={{uri}}
          />
        </View>
      );
    };
  }

  renderCreateInfoHeader() {
    return (
      <View
        style={Styles.createInfoHeaderContainer}
      >
        <TouchableOpacity
          style={Styles.createInfoCancelButton}
          onPress={()=>Actions.pop()}
        >
          <Image
            style={Styles.createInfoCancelButton}
            source={cancelButton}/>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>{
            if ( this.state.contents && this.state.book && this.state.book.isbn && this.state.pageNumber){
              const imageName = `${this.state.book.title}-${this.state.pageNumber}-${uuid.v4()}`;
              let imageData;
              ImagesUtil.upload(this.props.imgPath, imageName)
                .then(uploadData => {
                  imageData = uploadData;
                  const bookSnippet = {
                    title: this.state.book.title,
                    isbn: this.state.book.isbn,
                    author: this.state.book.author,
                    category: this.state.book.category,
                    thumbnail: this.state.book.thumbnail ?
                      this.state.book.thumbnail.replace('http', 'https') : this.state.book.thumbnail,
                    publisher: this.state.book.publisher,
                    publishedDate: this.state.book.publishedDate,
                    page: this.state.pageNumber,
                    contents: this.state.contents
                  };
                  return BookSnippet.createBookSnippet(bookSnippet)
                })
                .then(result => {
                  return Snippet.createSnippet({
                    book: result.createBookSnippet.bookId,
                    contents: this.state.snippetText,
                    page: Number(this.state.pageNumber),
                    imageUrl: imageData.url
                  });
                })
                .then((result) => {
                  Actions.pop({popNum:3, refresh:{}});
                })
                .catch(console.log);
            }
            else {
              console.log("snippet data is required.");
            }
          }}
        >
          <Text
            style={Styles.createInfoSaveButton}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderSnippetText() {
    return (
      <View style={Styles.snippetTextContainer}>
        <ScrollView style={Styles.snippetTextScroll}>
          <Text style={Styles.snippetText}>{this.state.snippetText}</Text>
        </ScrollView>
      </View>
    )
  }

  renderBookSearch() {
    return (
      <View style={Styles.searchContainer}>
        <Text style={Styles.createInfoTitle}>BOOK TITLE</Text>
        <BookSearchBox onpressBook={this.onpressBook}/>
      </View>
    )
  }

  pageNumberHandler(pageNo) {
    this.setState({
      pageNumber: Number(pageNo),
    })
  }

  renderPageNumber() {
    return (
      <View style={Styles.PageNumberContainer}>
        <Text style={Styles.createInfoTitle}>PAGE NUMBER</Text>
        <View style={Styles.pageNumberInputContainer}>
          <TextInput
            style={Styles.pageNumberInput}
            onChangeText={this.pageNumberHandler}
          >
          </TextInput>
        </View>
      </View>
    )
  }

  renderCreateInfo() {
    return (
      <View style={Styles.createInfoContainer}>
        {this.renderCreateInfoHeader()}
        {this.renderSnippetText()}
        {this.renderBookSearch()}
        {this.renderPageNumber()}
      </View>
    );
  }

  renderCreateSnippet() {
    return (
      <View style={{flex:1}}>
        <ParallaxScrollView
          backgroundColor={'#ffffff'}
          parallaxHeaderHeight={300}
          renderForeground={this.renderCroppedImage(this.props.imgPath)}>
          {this.renderCreateInfo()}
        </ParallaxScrollView>
      </View>
    );
  }

  render() {
    return this.renderCreateSnippet();
  }
}

export default CreateSnippet;
