export default function objectToFormData(object: any, valuesToExcludeFromStringify: string[] = []): FormData {
  const formData = new FormData()
  let extendedValuesToExclude = [...valuesToExcludeFromStringify, 'image']
  for (let key in object) {
    const value = Array.isArray(object[key]) || (typeof object[key] === 'object' && !extendedValuesToExclude.includes(key))
      ? JSON.stringify(object[key])
      : object[key]
    formData.append(key, value)
  }
  return formData
}