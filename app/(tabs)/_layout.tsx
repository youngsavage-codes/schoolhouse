import { Tabs } from 'expo-router'
import React from 'react'

const TapLayout = () => {
  return (
    <Tabs>
        <Tabs.Screen name='index' />
        <Tabs.Screen name='inbox' />
        <Tabs.Screen name='forum' />
        <Tabs.Screen name="profile" />
    </Tabs>
  )
}

export default TapLayout