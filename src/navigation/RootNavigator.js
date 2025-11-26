import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';
import StackNavigator from './StackNavigator';

const Tab = createBottomTabNavigator();
export default function RootNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerTitleAlign: 'center'
            }}
        >
            <Tab.Screen name="Home" component={StackNavigator} />
            <Tab.Screen name="List" component={ListScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
            <Tab.Screen name="About" component={AboutScreen} />
        </Tab.Navigator>
    );
}