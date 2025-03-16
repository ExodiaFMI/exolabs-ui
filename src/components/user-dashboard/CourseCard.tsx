import { FC } from 'react';
import Progress from '../../shared/components/Progress';

interface CourseCardProps {
  title: string;
  description: string;
  progress: number;
  imageSrc: string;
}

const CourseCard: FC<CourseCardProps> = ({ title, description, progress, imageSrc }) => {
  return (
    <article className="flex flex-col justify-between h-full gap-5 bg-secondary text-light p-4 rounded-lg shadow-lg">
      <img className="h-35 w-full bg-primary rounded-lg object-cover " src={imageSrc} />

      <div>
        <h2 className="text-xl font-bold mb-1">{title}</h2>
        <p className="text-sm">{description}</p>
      </div>

      <Progress progress={progress} />
    </article>
  );
};

export default CourseCard;
