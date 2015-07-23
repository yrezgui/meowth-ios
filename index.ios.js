let React = require('react-native');
let {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBarIOS
} = React;

class Meowth extends React.Component {
  componentWillMount() {
    StatusBarIOS.setStyle('light-content');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Meowth
        </Text>
        <Text style={styles.instructions}>
          Subtitle
        </Text>
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
  welcome: {
    color: '#F5FCFF',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#CCCCCC',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('meowth', () => Meowth);
