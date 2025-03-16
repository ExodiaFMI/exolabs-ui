import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router';
import {
  CourseResponseDto,
  CoursesApi,
  CreateCourseDto,
  SubjectsApi,
} from '../../codegen';
import { useApiClient } from '../../hooks/useApi';
import useJWT from '../../hooks/useJWT';
import CourseCard from './CourseCard';
import CourseCreateDialog from './CourseCreateDialog';

const CourseCardList: FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigate = useNavigate();

  const onCourseClick = (id?: number) => {
    const url = id ? `/study/${id}` : '.';
    navigate(url);
  };

  const { user } = useJWT();
  const courseClient = useApiClient(CoursesApi);
  const { data: courses } = useSuspenseQuery<CourseResponseDto[]>({
    queryKey: ['courses', user?.id],
    queryFn: () =>
      courseClient.courseControllerGetCoursesByUser({ userId: user?.id ?? 0 }),
  });

  const subjectsClient = useApiClient(SubjectsApi);
  const { data: subjects } = useSuspenseQuery({
    queryKey: ['subjects'],
    queryFn: () => subjectsClient.subjectControllerGetAllSubjects(),
  });

  const mutation = useMutation({
    mutationKey: ['courses'],
    mutationFn: (createCourseDto: CreateCourseDto) =>
      courseClient.courseControllerCreateCourse({ createCourseDto }),
  });

  const handleCourseCreate = (newCourse: CreateCourseDto) => {
    mutation.mutate(newCourse);
  };
  const images = Array.from({ length: 10 }, (_, i) => `courses/${i + 1}.svg`);
  console.log(images);
  return (
    <>
      <div className="grid grid-cols-3 items-stretch gap-10">
        {courses.map((card, i) => (
          <div
            key={card.id}
            className="cursor-pointer"
            onClick={() => onCourseClick(card.id)}>
            <CourseCard
              progress={20}
              title={card.name ?? 'Subject'}
              description={card.description ?? 'Subject description'}
              imageSrc={images[i]}
            />
          </div>
        ))}
        <section
          className="w-full h-70 border border-4 border-dashed border-secondary hover:border-info rounded gap-3 flex items-center justify-center text-secondary hover:text-info cursor-pointer"
          onClick={() => setIsDialogOpen(true)}>
          <HiOutlinePlusCircle size={60} />
          <h1 className="text-2xl">Add course</h1>
        </section>
      </div>
      <CourseCreateDialog
        subjects={subjects}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCreate={(newCourse: CreateCourseDto) => handleCourseCreate(newCourse)}
      />
    </>
  );
};

export default CourseCardList;
