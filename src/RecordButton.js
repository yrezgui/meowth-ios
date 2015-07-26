let React = require('react-native');
let Status = require('./Constants').STATUS;
let {
  StyleSheet,
  Text,
  TouchableHighlight
} = React;

class RecordButton extends React.Component {
  constructor(props) {
    super(props);
  }

  getTextContent(status) {
    let label;

    switch(status) {
      case Status.WAITING:
        label = 'Record';
        break;

      case Status.RECORDING:
        label = 'Recording…';
        break;

      case Status.PLAYING:
        label = 'Playing…';
        break;
    }

    return label;
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor="#3969B4"
        style={styles.button}
        onPress={this.props.onPress}
      >
        <Text style={styles.label}>
          {this.getTextContent(this.props.status)}
        </Text>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  button: {
    marginTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#5B99FA',
    borderRadius: 4,
  },
  label: {
    color: '#fff',
    fontSize: 18,
  },
});

module.exports = RecordButton;
