import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

export default function AppNavigation({ AppState }) {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/*options={{headerShown: false}}*/}
                <Stack.Screen name="Home" options={{ headerShown: false }}>
                    {props => <Home {...props} AppState={AppState} />}
                </Stack.Screen>

            </Stack.Navigator>
        </NavigationContainer>
    );

}