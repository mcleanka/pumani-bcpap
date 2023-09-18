import React from 'react'
import { PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import theme from './theme'
import Navigation from './navigation'
import Toast from 'react-native-toast-message'
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