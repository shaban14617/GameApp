import { View, Text, Pressable, StyleSheet } from 'react-native';
function PrimaryButton({ children, onPress }) {
  return (
    <View style={style.buttonOuterContainer}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) =>
          pressed
            ? [style.buttonInnerContainer, style.pressed]
            : [style.buttonInnerContainer]
        }
      >
        <Text style={style.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const style = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    backgroundColor: '#a60154',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
});
