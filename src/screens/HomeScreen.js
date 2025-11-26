import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../store/counterSlice';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const count = useSelector((state) => state.counter.value);
    const handleShowLocation = () => {
        navigation.navigate('Location'); // this matches HomeStack.Screen name
    };
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>Welcome to My App 👋</Text>
                <Text style={styles.subtitle}>
                    This is the Home screen. You can show a short intro about your app here.
                </Text>
                
                {/* <View style={styles.counterBox}>
                    <Text style={styles.counterLabel}>Counter:</Text>
                    <Text style={styles.counterValue}>{count}</Text>
                </View>

                <View style={styles.buttonsRow}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => dispatch(decrement())}
                    >
                        <Text style={styles.buttonText}>Decrement</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => dispatch(increment())}
                    >
                        <Text style={styles.buttonText}>Increment</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => dispatch(reset())}
                    >
                        <Text style={styles.buttonText}>Reset</Text>
                    </TouchableOpacity>
                </View> */}
                
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        // justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: '600',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 22,
    },
    counterBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    counterLabel: {
        fontSize: 18,
        marginRight: 8,
    },
    counterValue: {
        fontSize: 28,
        fontWeight: '700',
    },
    buttonsRow: {
        flexDirection: 'row',
        gap: 12,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
        borderWidth: 1,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
    },
});
export default HomeScreen;