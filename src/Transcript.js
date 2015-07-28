let React = require('react-native');
let {
  StyleSheet,
  Text,
  View
} = React;

class Transcript extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={styles.view}
      >
        <Text>
          {this.props.text}
        </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  view: {
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 15,
  },
});

module.exports = Transcript;
