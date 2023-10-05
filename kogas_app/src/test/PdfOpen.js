/**
 * Copyright (c) 2017-present, Wonday (@wonday.org)
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

// import React from 'react';
// import { StyleSheet, Dimensions, View } from 'react-native';
// import Pdf from 'react-native-pdf';

/*export default class PdfOpen extends React.Component {
    render() {
        const source = { uri: 'https://www.google.com/', cache: true };
        //const source = require('./test.pdf');  // ios only
        //const source = {uri:'bundle-assets://test.pdf' };
        //const source = {uri:'file:///sdcard/test.pdf'};
        //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};
        //const source = {uri:"content://com.example.blobs/xxxxxxxx-...?offset=0&size=xxx"};
        //const source = {uri:"blob:xxxxxxxx-...?offset=0&size=xxx"};

        return (
            <View style={styles.container}>
                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});
*/


import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import WebView from 'react-native-webview';

export default class PdfOpen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
            <WebView
                    style={styles.webview}
                //source={{ uri: 'http://docs.google.com/gview?embedded=true&url=http://192.168.0.169:5000/view/test.pdf' }}
                source={{ uri: 'https://www.google.com/' }}
                    //source={{ uri: 'http://www.africau.edu/images/default/sample.pdf' }}
                    //source={{ uri: 'http://192.168.0.169:5000/view/test.pdf' }}
                    onError={(error) => console.error('PDF error', error)}
                />
                
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


// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import PDFView from 'react-native-pdf';

// export default class PdfOpen extends React.Component {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <PDFView
//                     fadeInDuration={250.0}
//                     style={{ flex: 1 }}
//                     source={{ uri: 'http://www.africau.edu/images/default/sample.pdf' }}
//                 />
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
// });
