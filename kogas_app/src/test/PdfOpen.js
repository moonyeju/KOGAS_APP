/**
 * Copyright (c) 2017-present, Wonday (@wonday.org)
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import WebView from 'react-native-webview';

export default class PDFOpen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
            <WebView
          style={styles.webview}
          source={{ uri: 'https://www.google.com/' }} /></View>
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
    width: 300,
    height: 300,
  },
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

