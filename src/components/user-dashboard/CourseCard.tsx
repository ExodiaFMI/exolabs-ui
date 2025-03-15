import { FC } from 'react';

interface CourseCardProps {
  title: string;
  description?: string;
}

const CourseCard: FC<CourseCardProps> = ({ title, description }) => {
  return (
    <article className="flex flex-col gap-5 bg-secondary text-light p-4 rounded-lg shadow-lg">
      <img className="h-35 w-full bg-primary rounded-lg" />

      <div>
        <h2 className="text-xl font-bold mb-1">{title}</h2>
        <p className="text-sm">{description ?? ''}</p>
      </div>
    </article>
  );
};

export default CourseCard;
