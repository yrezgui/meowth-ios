let React = require('react-native');
var base64 = require('base-64');
let Constants = require('./Constants');
let AudioRecorder = require('NativeModules').AudioRecorder;
let HttpRequest = require('NativeModules').HttpRequest;
let RecordButton = require('./RecordButton');

let {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
} = React;

let Status = Constants.STATUS;

function generateBasicAuth(username, password) {
  return 'Basic ' + base64.encode(username + ':' + password);
}

class RecordPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: Status.WAITING,
    };
  }

  _onRecognize(error, rawResponse) {
    let response = JSON.parse(rawResponse);

    let transcript = null;
    let alternatives = response.results.length && response.results[0].alternatives;

    if (alternatives.length) {
      transcript = alternatives[0].transcript;
    }

    this.setState({
      status: Status.WAITING,
      transcript: transcript,
    });

    AlertIOS.alert(transcript);
  }

  _onPress() {
    switch(this.state.status) {
      case Status.WAITING:
        AudioRecorder.setup(Constants.RECORD_FILE, function callback (fullPath) {
          AudioRecorder.start();

          this.setState({
            status: Status.RECORDING,
            fullPath: fullPath,
          });
        }.bind(this));
        break;

      case Status.RECORDING:
        this.setState({
          status: Status.RECOGNIZING,
        });

        let headers = {
          'Authorization': generateBasicAuth(Constants.USERNAME, Constants.PASSWORD),
          'Content-Type': Constants.MIME_TYPE,
          'Transfer-Encoding': 'chunked',
        };

        AudioRecorder.stop();
        HttpRequest.postFile(Constants.API_URL, headers, this.state.fullPath, this._onRecognize.bind(this));
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Touch to record your voice
        </Text>
        <RecordButton
          status={this.state.status}
          onPress={this._onPress.bind(this)}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    alignItems: 'center',
    backgroundColor: '#084265',
  },
  instructions: {
    color: '#F5FCFF',
    fontSize: 17,
    textAlign: 'center',
    margin: 10,
  },
});

module.exports = RecordPage;
