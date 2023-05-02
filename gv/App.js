import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Homepage from './Components/Screens/Homepage';
import AuthenticationPage from './Components/Screens/AuthenticationPage';
import AuthProvider from './Components/Providers/AuthProvider';
import Timetable from './Components/Screens/Timetable';
import CrudScore from './Components/Screens/CrudScore';
import UserInfo from './Components/Screens/UserInfo';


const Stack = createNativeStackNavigator();

const App = () => {
    return (
      <AuthProvider>
          <NavigationContainer>
              <Stack.Navigator>
                    <Stack.Screen
                        name='AuthenticationPage'
                        component={AuthenticationPage}
                        options={{ 
                            title: 'Xác thực', 
                            headerStyle: {
                                backgroundColor: '#dcddde',
                            },
                            headerTintColor: 'black',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            }
                        }}
                    />
                   <Stack.Screen
                        name='UserInfo'
                        component={UserInfo}
                        options={{ 
                            title: 'Thông tin', 
                            headerStyle: {
                                backgroundColor: '#dcddde',
                            },
                            headerTintColor: 'black',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            }
                        }}
                    />
                  <Stack.Screen
                        name='Homepage'
                        component={Homepage}
                        options={{ 
                            title: 'ErukaLearn', 
                            headerStyle: {
                                backgroundColor: '#dcddde',
                            },
                            headerTintColor: 'black',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            }
                        }}
                  />
                    <Stack.Screen
                            name='Timetable'
                            component={Timetable}
                            options={{ 
                                title: 'ErukaLearn', 
                                headerStyle: {
                                    backgroundColor: '#dcddde',
                                },
                                headerTintColor: 'black',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                }
                            }}
                    />
                    <Stack.Screen
                        name='CrudScore'
                        component={CrudScore}
                        options={{ 
                            title: 'ErukaLearn', 
                            headerStyle: {
                                backgroundColor: '#dcddde',
                            },
                            headerTintColor: 'black',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            }
                        }}
                    />
                    {/* <Stack.Screen
                        name='AuthenticationPage'
                        component={AuthenticationPage}
                        options={{ 
                            title: 'Xác thực', 
                            headerStyle: {
                                backgroundColor: '#dcddde',
                            },
                            headerTintColor: 'black',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            }
                        }}
                    /> */}
              </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
    )
}

export default App;