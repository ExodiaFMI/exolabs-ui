import { FC, useContext, useEffect, useState } from 'react';
import CourseCard from '../components/user-dashboard/CourseCard';
import BreadcrumbContext from '../layout/breadcrumbContext';
import { COURSE_CARDS } from '../constants/courses';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from '../lib/catalyst/dialog';
import { Field, Label } from '../lib/catalyst/fieldset';
import { Input } from '../lib/catalyst/input';
import { Button } from '../lib/catalyst/button';

const Dashboard: FC = () => {
  const { setBreadcrumb } = useContext(BreadcrumbContext);
  useEffect(() => {
    setBreadcrumb('Dashboard');
  }, [setBreadcrumb]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section className="text-dark p-6">
      <div className="grid grid-cols-3 gap-10">
        {COURSE_CARDS.map(card => (
          <CourseCard
            key={card.id}
            progress={card.progress}
            title={card.title}
            description={card.message}
          />
        ))}
        <section
          className="w-full gap-3 h-full flex items-center justify-center text-secondary hover:text-info cursor-pointer"
          onClick={() => setIsDialogOpen(true)}>
          <HiOutlinePlusCircle size={60} />
          <h1 className="text-2xl">Add course</h1>
        </section>
      </div>
      <Dialog open={isDialogOpen} onClose={setIsDialogOpen}>
        <DialogTitle>Refund payment</DialogTitle>
        <DialogDescription>
          The refund will be reflected in the customer’s bank account 2 to 3 business days
          after processing.
        </DialogDescription>
        <DialogBody>
          <Field>
            <Label>Amount</Label>
            <Input name="amount" placeholder="$0.00" />
          </Field>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default Dashboard;
