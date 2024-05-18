import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

const YourComponent = () => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                style={styles.image}
                resizeMode="cover"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // Flex ensures the container takes up all available space it can
        flex: 1,
        width: '100%', // Takes the full width of the parent
        // You can adjust the height as needed, or leave it flexible
    },
    image: {
        width: '100%',
        height: '100%', // Height is set to '100%' to adjust to the container size
    },
});

export default YourComponent;
