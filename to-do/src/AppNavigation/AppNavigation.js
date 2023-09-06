import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/AllNotes/AllNotes';

import AllNotes from '../screens/AllNotes/AllNotes';
import Note from '../screens/Note/Note';
import CreateNote from '../screens/CreateNote/CreateNote';

const Stack = createNativeStackNavigator();

export default function AppNavigation({AppState}) {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                                                {/*options={{headerShown: false}}*/}
                <Stack.Screen name="All My Notes" >
                    {props => <AllNotes {...props} AppState={AppState} />}
                </Stack.Screen>

                <Stack.Screen name="Note" >
                    {props => <Note {...props} AppState={AppState} />}
                </Stack.Screen>

                <Stack.Screen name="Create Note" >
                    {props => <CreateNote {...props} AppState={AppState} />}
                </Stack.Screen>

            </Stack.Navigator>
        </NavigationContainer>
    );

}