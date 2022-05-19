export default function objectToFormData(object: any, valuesToExcludeFromStringify: string[] = []): FormData {
  const formData = new FormData()
  let extendedValuesToExclude = [...valuesToExcludeFromStringify, 'image']
  for (let key in object) {
    if (key === 'fileToUpload[]') {
      object[key].forEach((file: File) => {
        formData.append(key, file)
      })
    } else {
      const value = Array.isArray(object[key]) || (typeof object[key] === 'object' && !extendedValuesToExclude.includes(key))
        ? JSON.stringify(object[key])
        : object[key]
      formData.append(key, value)
    }
  }
  return formData
}