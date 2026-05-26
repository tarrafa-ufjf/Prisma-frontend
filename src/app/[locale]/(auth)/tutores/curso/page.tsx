import SelectCourse from '@/components/pages/SelectCourses/select-course';
import { getCourses } from '@/utils/api-server';

export default async function Page() {
  const cursos = await getCourses()

  return <SelectCourse path='curso/' courses={cursos} />;
}
