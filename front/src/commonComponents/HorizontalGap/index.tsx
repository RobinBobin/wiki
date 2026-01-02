import React from 'react'
import { View } from 'react-native'

interface IHorizontalGapProps {
  width: number
}

export const HorizontalGap: React.FC<IHorizontalGapProps> = ({ width }) => {
  return <View style={{ width }} />
}
