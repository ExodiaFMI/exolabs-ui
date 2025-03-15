import { FC, use, useEffect, useState } from 'react';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import CourseCard from '../components/user-dashboard/CourseCard';
import { COURSE_CARDS } from '../constants/courses';
import BreadcrumbContext from '../layout/breadcrumbContext';
import { Button } from '../lib/catalyst/button';
import { Dialog, DialogActions, DialogBody, DialogTitle } from '../lib/catalyst/dialog';
import { Field, Label } from '../lib/catalyst/fieldset';
import { Input } from '../lib/catalyst/input';
import { Listbox, ListboxLabel, ListboxOption } from '../lib/catalyst/listbox';
import { useNavigate } from 'react-router';

const Dashboard: FC = () => {
  const { setBreadcrumb } = use(BreadcrumbContext);
  useEffect(() => {
    setBreadcrumb('Dashboard');
  }, [setBreadcrumb]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigate = useNavigate();

  const onCourseClick = (id: number) => {
    navigate(`/study/${id}`);
  };

  return (
    <section className="text-dark p-6">
      <div className="grid grid-cols-3 gap-10">
        {COURSE_CARDS.map(card => (
          <div className="cursor-pointer" onClick={() => onCourseClick(card.id)}>
            <CourseCard
              key={card.id}
              progress={card.progress}
              title={card.title}
              description={card.message}
            />
          </div>
        ))}
        <section
          className="w-full gap-3 h-full flex items-center justify-center text-secondary hover:text-info cursor-pointer"
          onClick={() => setIsDialogOpen(true)}>
          <HiOutlinePlusCircle size={60} />
          <h1 className="text-2xl">Add course</h1>
        </section>
      </div>
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
    </section>
  );
};

export default Dashboard;
