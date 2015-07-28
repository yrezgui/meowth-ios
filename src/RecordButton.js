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
        label = 'Stop recording';
        break;

      case Status.RECOGNIZING:
        label = 'Recognizing…';
        break;
    }

    return label;
  }

  getBackgroundColor(status) {
    let bgColor = '#5B99FA';

    switch(status) {
      case Status.RECORDING:
        bgColor = '#FA5B8B';
        break;

      case Status.RECOGNIZING:
        bgColor = null;
        break;
    }

    return {
      backgroundColor: bgColor
    };
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor="#3969B4"
        style={[styles.button, this.getBackgroundColor(this.props.status)]}
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
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
  },
  label: {
    color: '#fff',
    fontSize: 18,
  },
});

module.exports = RecordButton;
