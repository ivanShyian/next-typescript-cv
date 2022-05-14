import {Course, Techs} from '@/models/Education'
export default function clearRefCourseHelper(array: Techs[], compareArrayName: string, compareCourse: Course, type?: 'extend' | 'add'): {
  array: Techs[],
  isModified: boolean
} {
  const foundTechIndex = array.findIndex((tech: Techs) => tech.name === compareArrayName)
  if (foundTechIndex !== -1) {
    array[foundTechIndex].courses = array[foundTechIndex].courses.filter((c: Course) => {
      if (c._id) return c._id !== compareCourse._id
      return c.name !== compareCourse.name
    })
    if (type === 'extend' && array[foundTechIndex].courses.length === 0) {
      array.splice(foundTechIndex, 1)
    }
    return {
      array,
      isModified: true
    }
  }
  return {
    array,
    isModified: false
  }
}