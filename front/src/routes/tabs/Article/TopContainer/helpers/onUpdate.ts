import { currentArticleModel, snackbarModel } from '@mst'

export const onUpdate = (id: number): (() => void) => {
  return () => {
    const {
      body: { text: body },
      title: { text: title }
    } = currentArticleModel

    snackbarModel.show({
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      text: `Update: ${id}, ${title}, ${body.substring(0, 10)}`
    })
  }
}
