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
        name='index'
        options={{
          tabBarIcon: getTabBarIcon('search'),
          title: 'Search'
        }}
      />
      <Tabs.Screen
        name='explore'
        options={{
          tabBarIcon: getTabBarIcon('edit'),
          title: 'Create'
        }}
      />
    </Tabs>
  )
}

export default TabLayout
