export default function readAsDataURL(fileToLoad: File, callback: (data: string | ArrayBuffer | null) => void)  {
  const fileReader = new FileReader()
  fileReader.onload = function(loadedEvent) {
    return callback(loadedEvent.target!.result)
  }
  fileReader.readAsDataURL(fileToLoad)
}