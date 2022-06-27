export const HOST = process.env.API_ENDPOINT || process.env.NEXT_PUBLIC_API_ENDPOINT

const imageSource = (src: string): string => `${HOST}/${src}`

export default imageSource
