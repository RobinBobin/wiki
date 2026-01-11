import { snackbarModel } from '@mst'
import { observer } from 'mobx-react-lite'
import { Snackbar as RNPSnackbar } from 'react-native-paper'

const defaultDuration = 3000

export const Snackbar: React.FC = observer(() => {
  const { hide, options } = snackbarModel

  if (!options) {
    return undefined
  }

  return (
    <RNPSnackbar
      duration={options.duration ?? defaultDuration}
      onDismiss={hide}
      visible={true}
    >
      {options.text}
    </RNPSnackbar>
  )
})
