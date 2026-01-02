import React from 'react'
import { View } from 'react-native'

interface IVerticalGapProps {
  height: number
}

export const VerticalGap: React.FC<IVerticalGapProps> = ({ height }) => {
  return <View style={{ height }} />
}
