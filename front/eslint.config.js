import parentConfig from '@robinbobin/eslint-config-react-native'
import { defineConfig } from 'eslint/config'

export default defineConfig(
  parentConfig,
  {
    ignores: ['babel.config.cjs', 'dist/*', 'expo-env.d.ts']
  },
  {
    rules: {
      '@typescript-eslint/prefer-readonly-parameter-types': [
        'error',
        {
          ignoreInferredTypes: true
        }
      ]
    }
  }
)
