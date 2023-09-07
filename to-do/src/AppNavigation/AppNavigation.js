import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllNotes from '../screens/AllNotes/AllNotes';
import Note from '../screens/Note/Note';
import CreateNote from '../screens/CreateNote/CreateNote';

const Stack = createNativeStackNavigator();

export default function AppNavigation({AppState}) {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                                                {/*options={{headerShown: false}}*/}
                <Stack.Screen name="AllNotes" options={{ headerShown: false }}>
                    {props => <AllNotes {...props} AppState={AppState} />}
                </Stack.Screen>

                <Stack.Screen name="Note" options={{ headerShown: false }}>
                    {props => <Note {...props} AppState={AppState} />}
                </Stack.Screen>

                <Stack.Screen name="CreateNote" options={{ headerShown: false }}>
                    {props => <CreateNote {...props} AppState={AppState} />}
                </Stack.Screen>

            </Stack.Navigator>
        </NavigationContainer>
    );

}