/**
 * Copyright (c) 2017-present, Wonday (@wonday.org)
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import Pdf from 'react-native-pdf';

export default class PDFOpen extends React.Component {
    render() {
        const source = { uri: 'file://C:/Users/mycom/Desktop/KOGAS_APP/test.pdf', cache: false };
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

// import React from 'react';
// import { Text, View, Button } from 'react-native';
// import { WebView } from 'react-native-webview';

// export default class PdfOpen extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showPdfViewer: false, // 초기에 PDF 뷰어를 숨깁니다.
//     };
//   }

//   // 버튼 클릭 시 PDF 뷰어를 보이도록 상태를 변경합니다.
//   showPdfViewer = () => {
//     this.setState({ showPdfViewer: true });
//   }

//   render() {
//     // 상태에 따라 PDF 뷰어를 보이거나 숨깁니다.
//     const pdfViewer = this.state.showPdfViewer ? (
//       <WebView
//         source={{ uri: 'C:/Users/mycom/Desktop/aa.pdf' }}
//         onError={(err) => console.log(err)}
//       />
//     ) : null;

//     return (
//       <View>
//         <Text>d</Text>
//         {pdfViewer}
//         {/* 버튼을 누르면 PDF 뷰어를 보이도록 합니다. */}
//         <Button title="Show PDF" onPress={this.showPdfViewer} />
//       </View>
//     );
//   }
// }

