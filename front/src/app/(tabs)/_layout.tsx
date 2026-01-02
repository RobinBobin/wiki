import { getTabBarIcon } from '@helpers/tabs'
import { Tabs } from 'expo-router'
import React from 'react'

const TabLayout: React.FC = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          tabBarIcon: getTabBarIcon('home'),
          title: 'Home'
        }}
      />
      <Tabs.Screen
        name='article'
        options={{
          tabBarIcon: getTabBarIcon('edit'),
          title: 'Create'
        }}
      />
    </Tabs>
  )
}

export default TabLayout
