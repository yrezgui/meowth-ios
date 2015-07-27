let React = require('react-native');
let RecordButton = require('./RecordButton');
let Constants = require('./Constants');
let AudioRecorder = require('NativeModules').AudioRecorder;
let {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

let Status = Constants.STATUS;

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
        AudioRecorder.setup(Constants.RECORD_FILE);
        AudioRecorder.start();
        this.setState({
          status: Status.RECORDING,
        });
        break;

      case Status.RECORDING:
        this.setState({
          status: Status.WAITING,
        });
        AudioRecorder.stop();
        break;

      // case Status.PLAYING:
      //   this.setState({
      //     status: Status.WAITING,
      //   });
      //   break;
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
