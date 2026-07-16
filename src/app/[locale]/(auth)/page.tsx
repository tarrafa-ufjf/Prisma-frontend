'use client';
import Home from '@/components/pages/Homepage/Home';
import { useCookie } from '@/hooks/useCookie';

export default function HomeLayout() {
  const [savedCourse, setCourse, deleteCourse, setCourseOnly, deleteCourseOnly] = useCookie('course', null)
  deleteCourseOnly()

  return (<Home />);
}
