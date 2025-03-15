import { useSuspenseQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router';
import { CourseResponseDto, CoursesApi } from '../../codegen';
import { useApiClient } from '../../hooks/useApi';
import useJWT from '../../hooks/useJWT';
import { Button } from '../../lib/catalyst/button';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from '../../lib/catalyst/dialog';
import { Field, Label } from '../../lib/catalyst/fieldset';
import { Input } from '../../lib/catalyst/input';
import { Listbox, ListboxLabel, ListboxOption } from '../../lib/catalyst/listbox';
import CourseCard from './CourseCard';

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

  return (
    <div className="grid grid-cols-3 gap-10">
      {courses.map(card => (
        <div
          key={card.id}
          className="cursor-pointer"
          onClick={() => onCourseClick(card.id)}>
          <CourseCard
            progress={20}
            title={card.subject?.name ?? 'Subject'}
            description={card.description ?? 'Subject description'}
          />
        </div>
      ))}
      <section
        className="w-full gap-3 h-full flex items-center justify-center text-secondary hover:text-info cursor-pointer"
        onClick={() => setIsDialogOpen(true)}>
        <HiOutlinePlusCircle size={60} />
        <h1 className="text-2xl">Add course</h1>
      </section>

      <Dialog open={isDialogOpen} onClose={setIsDialogOpen}>
        <DialogTitle>Upload course material</DialogTitle>
        <DialogBody>
          <Field>
            <Label htmlFor="status">Subject*</Label>
            <Listbox name="status">
              <ListboxOption value="1">
                <ListboxLabel>Mathematics</ListboxLabel>
              </ListboxOption>
              <ListboxOption value="2">
                <ListboxLabel>Geography</ListboxLabel>
              </ListboxOption>
              <ListboxOption value="3">
                <ListboxLabel>Biology</ListboxLabel>
              </ListboxOption>
              <ListboxOption value="4">
                <ListboxLabel>Chemistry</ListboxLabel>
              </ListboxOption>
            </Listbox>
          </Field>
          <Field className="mt-4">
            <Label htmlFor="file">Course file*</Label>
            <Input
              accept=".pdf"
              type="file"
              name="file"
              id="file"
              placeholder="Enter course title"
            />
          </Field>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button outline className="border-2" onClick={() => setIsDialogOpen(false)}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CourseCardList;
