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
  TouchableHighlight
} = React;

let Status = Constants.STATUS;

function generateBasicAuth (username, password) {
  return 'Basic ' + base64.encode(username + ':' + password);
}

function generateHttpHeaders () {
  return {
    'Authorization': generateBasicAuth(Constants.USERNAME, Constants.PASSWORD),
    'Content-Type': Constants.MIME_TYPE,
    'Transfer-Encoding': 'chunked',
  };
}

class RecordPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: Status.WAITING,
    };
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
        });
        break;

      case Status.RECORDING:
        this.setState({
          status: Status.RECOGNIZING,
        });

        AudioRecorder.stop();
        HttpRequest.postFile(Constants.API_URL, generateHttpHeaders(), this.state.fullPath);
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
    justifyContent: 'center',
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
