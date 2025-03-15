import { FC } from 'react';
import Progress from '../../shared/components/Progress';

interface CourseCardProps {
  title: string;
  description: string;
  progress: number;
}

const CourseCard: FC<CourseCardProps> = ({ title, description, progress }) => {
  return (
    <article className="flex flex-col gap-5 bg-secondary text-light p-4 rounded-lg shadow-lg">
      <img className="h-35 w-full bg-primary rounded-lg" />

      <div>
        <h2 className="text-xl font-bold mb-1">{title}</h2>
        <p className="text-sm">{description}</p>
      </div>

      <Progress progress={progress} />
    </article>
  );
};

export default CourseCard;
