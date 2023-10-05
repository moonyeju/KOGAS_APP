import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import WebView from 'react-native-webview';

export default class PDF extends React.Component {
    render() {
        return (
            <View style={styles.container}>
            <WebView
                    style={styles.webview}
                source={{ uri: 'http://docs.google.com/gview?embedded=true&url=http://www.africau.edu/images/default/sample.pdf' }} />
                {/* source={{ uri: 'https://www.google.com/' }} />  */}
           </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  webview: {
    flex: 1,
    width: 400,
    height: 300,
  },
});

