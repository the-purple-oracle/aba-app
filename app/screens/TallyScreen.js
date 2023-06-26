import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
var { width } = Dimensions.get('window');

const TallyScreen = (props) => {
  const { title } = props;
  const [count, setCount] = useState(0);

  const pressHandler = () => {
    let newCount = count + 1;
    setCount(newCount);
    props.getTally(title, newCount);
  };
  const longPressHandler = () => {
    let curCount = count;
    if (curCount > 0) {
      let newCount = count - 1;
      setCount(newCount);
      props.getTally(title, newCount);
    }
  };

  return (
    <View style={styles.outer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <TouchableOpacity
        onLongPress={() => longPressHandler()}
        onPress={() => pressHandler()}
      >
        <View style={styles.container}>
          <Text>{count}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  outer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: width / 3,
    height: width / 3,
    flexDirection: 'row',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    width: width / 3,
    alignSelf: 'center',
    bottom: 0,
  },
  titleContainer: {
    height: width / 6,
    width: width / 3,
  },
});
export default TallyScreen;
