import type { TArticleParams } from '../types'

import { currentArticleModel } from '@mst'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { isString } from 'radashi'
import { useEffect } from 'react'

export const useArticleParams = (): TArticleParams['id'] => {
  const localSearchParams = useLocalSearchParams<TArticleParams>()
  const navigation = useNavigation()

  const { body, title } = currentArticleModel

  useEffect(() => {
    body.setText(localSearchParams.body ?? '')
    title.setText(localSearchParams.title ?? '')

    const isUpdate =
      isString(localSearchParams.body) && isString(localSearchParams.title)

    navigation.setOptions({ title: isUpdate ? 'Edit' : 'Create' })
  }, [body, localSearchParams.body, localSearchParams.title, navigation, title])

  return localSearchParams.id
}
