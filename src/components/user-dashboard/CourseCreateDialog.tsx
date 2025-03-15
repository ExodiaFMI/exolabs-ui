import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CreateCourseDto, LanguagesEnum, SubjectResponseDto } from '../../codegen';
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
import { Select } from '../../lib/catalyst/select';
import { Textarea } from '../../lib/catalyst/textarea';
import fileToBase64 from '../../shared/helpers/file-to-base-64';

const formResolver = z.object({
  subject: z.string().nonempty(),
  description: z.string().nonempty(),
  language: z.enum(['Bulgarian', 'English', 'German', 'French', 'Spanish']),
  name: z.string().nonempty(),
  testInfo: z.instanceof(FileList),
});
type FormValues = z.infer<typeof formResolver>;

interface CourseCreateDialogProps {
  subjects: SubjectResponseDto[];
  isOpen: boolean;
  onClose: () => void;
  onCreate: (courseDto: CreateCourseDto) => void;
}

const CourseCreateDialog: FC<CourseCreateDialogProps> = ({
  subjects,
  isOpen,
  onClose,
  onCreate,
}) => {
  const { handleSubmit, register, getValues } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: zodResolver(formResolver),
  });

  const { user } = useJWT();

  const processFormData = () => {
    fileToBase64(getValues().testInfo[0])
      .then(base64 => {
        const formValues = getValues();
        const courseDto: CreateCourseDto = {
          ownerId: user?.id ?? 0,
          description: formValues.description,
          subjectId: +formValues.subject,
          language: formValues.language,
          name: formValues.name,
          testInfo: base64,
        };
        onCreate(courseDto);
        onClose();
      })
      .catch(console.error);
  };

  return (
    <Dialog open={isOpen} onClose={() => onClose()}>
      <DialogTitle>Upload course material</DialogTitle>
      <form onSubmit={handleSubmit(processFormData)}>
        <DialogBody>
          <Field className="mt-4">
            <Label htmlFor="file">Course name*</Label>
            <Input
              {...register('name')}
              type="text"
              id="file"
              placeholder="Enter course name"
            />
          </Field>

          <Field className="mt-4">
            <Label htmlFor="description">Description*</Label>
            <Textarea
              {...register('description')}
              id="description"
              placeholder="Enter course description"
            />
          </Field>

          <Field className="mt-4">
            <Label htmlFor="status">Subject*</Label>
            <Select {...register('subject')}>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </Select>
          </Field>

          <Field className="mt-4">
            <Label htmlFor="status">Language*</Label>
            <Select {...register('language')}>
              {Object.values(LanguagesEnum).map(language => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </Select>
          </Field>

          <Field className="mt-4">
            <Label htmlFor="file">Course file*</Label>
            <Input
              {...register('testInfo')}
              accept=".pdf"
              type="file"
              id="file"
              placeholder="Upload course file"
            />
          </Field>
        </DialogBody>
        <DialogActions>
          <Button type="button" plain onClick={() => onClose()}>
            Cancel
          </Button>
          <Button
            type="submit"
            outline
            className="border-2"
            // onClick={() => console.log(formState.isValid)}
          >
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CourseCreateDialog;
