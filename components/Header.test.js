import React from 'react'
import renderer from 'react-test-renderer'
// import { render } from 'react-native-testing-library'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContext } from '../AuthContext'
import Header from './Header'

// Mock NavigationContainer
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native')
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  }
})

// Mock AuthContext
jest.mock('./AuthContext', () => ({
  AuthContext: {
    Consumer: ({ children }) => children({ user: /* mock user object */ }),
  },
}))

// Test case
describe('Header Component', () => {
  it('renders header correctly', () => {
    const tree = renderer.create(
      <NavigationContainer>
        <Header />
      </NavigationContainer>
    )
    // Your assertions here
  })
})
