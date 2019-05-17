import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { MediaLibrary, Permissions, ImagePicker } from 'expo';

export default class PhotoPickerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      photoLibrary: null,
      hasCameraPermission: null
    };
  }

  static navigationOptions = () => {
    return {
      title: "Photo Library",
    };
  };

  async componentDidMount() {
    //- get camera roll permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  _getPhotoLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
      exif: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ image: result });
    }
    this.props.navigation.setParams({
      image: this.state.image
    });
  };

  render() {
    const { hasCameraPermission, image } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.activeImageContainer}>
            {image ? (
              <Image source={{ uri: image.uri }} style={{ flex: 1 }} />
            ) : (
              <View />
            )}
          </View>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Button
              onPress={this._getPhotoLibrary.bind(this)}
              title="Photo Picker Screen!"
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  activeImageContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
    backgroundColor: "#eee",
    borderBottomWidth: 0.5,
    borderColor: "#fff"
  },
  photosContainer: {
    alignItems: "flex-start",
    width: Dimensions.get("window").width
  },
  photo: {
    width: Dimensions.get("window").width / 4,
    height: Dimensions.get("window").width / 4,
    borderWidth: 0.5,
    borderColor: "#fff"
  }
});