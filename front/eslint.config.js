import parentConfig from '@robinbobin/eslint-config-react-native'
import { defineConfig } from 'eslint/config'

export default defineConfig(
  parentConfig,
  {
    ignores: ['.expo', 'babel.config.cjs', 'dist/*', 'expo-env.d.ts']
  },
  {
    rules: {
      '@typescript-eslint/no-invalid-void-type': [
        'error',
        {
          allowAsThisParameter: true
        }
      ],
      '@typescript-eslint/no-shadow': [
        'error',
        {
          allow: ['Screen']
        }
      ],
      '@typescript-eslint/prefer-readonly-parameter-types': [
        'error',
        {
          ignoreInferredTypes: true
        }
      ]
    }
  },
  {
    files: ['src/mst/**/*.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off'
    }
  }
)
