import {Course, Techs} from '@/models/Education'

export default function transformCourseHelper(course: any, techName: string, techs: Techs[], lang: 'uk' | 'en'): {
  transformedCourse: Course,
  injection: {techIdx: number, courseIdx: number}
} {
  let courseCopy: Course
  const oppositeLang = lang === 'en' ? 'uk' : 'en'
  const {description, ...other} = course
  const techsCopy = [...techs]
  const techIndex = techsCopy.findIndex((tech: Techs) => tech.name === techName)
  // find existing
  const courseIndex = techsCopy[techIndex].courses.findIndex((c: Course) => {
    if (course._id) return c._id === course._id
    return course.name === c.name
  })
  if (courseIndex !== -1) {
    courseCopy = {
      ...techsCopy[techIndex].courses[courseIndex],
      ...other,
      description: {
        [lang]: description,
        [oppositeLang]: techsCopy[techIndex].courses[courseIndex].description[oppositeLang] || ''
      }
    }
  } else {
    courseCopy = {
      ...other,
      description: {
        [lang]: description,
        [oppositeLang]: ''
      }
    }
  }
  return {
    transformedCourse: courseCopy,
    injection: {techIdx: techIndex, courseIdx: courseIndex}
  }
}