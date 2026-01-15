import type { UndefinedOnPartialDeep } from 'type-fest'
import type { TArticleParams } from '../types'

import { View } from '@commonComponents'
import { useRouter } from 'expo-router'
import { isNumber, isString } from 'radashi'
import { Button } from 'react-native-paper'

import { onClearAll, onCreate, onResetToBlank, onUpdate } from './helpers'
import styles from './styles'

type TTopContainerProps = UndefinedOnPartialDeep<Pick<TArticleParams, 'id'>>

export const TopContainer: React.FC<TTopContainerProps> = props => {
  const router = useRouter()

  const id = isString(props.id) ? Number.parseInt(props.id) : undefined
  const hasId = isNumber(id)

  const onErase = hasId ? onResetToBlank(router) : onClearAll()
  const onSave = hasId ? onUpdate(id) : onCreate

  const eraseTitle = hasId ? 'Reset' : 'Clear all'
  const saveTitle = hasId ? 'Update' : 'Create'

  return (
    <View style={styles.container}>
      <Button onPress={onErase}>{eraseTitle}</Button>
      <Button onPress={onSave}>{saveTitle}</Button>
    </View>
  )
}
