/***
 * @author Pumani bCPAP Team
 * @description
 * This code is the entry point for a React Native app. 
 * In essence, it initializes the app's appearance, navigation, and state management,
 * and it's ready to show notifications respectively
 */
// libraries
import React from 'react'
import { PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import Toast from 'react-native-toast-message'

// custom component
import theme from './theme'
import Navigation from './navigation/BottomTabs'
import { AppProvider } from './provider/AppProvider'

const App: React.FC = () => {
  return (
    <>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <AppProvider>
            <Navigation />
          </AppProvider>
        </NavigationContainer>
      </PaperProvider>

      <Toast />
    </>
  )
}

export default App