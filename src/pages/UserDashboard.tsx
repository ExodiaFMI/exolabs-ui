import { FC } from 'react';
import CourseCard from '../components/user-dashboard/CourseCard';

const cards = [
  {
    id: 1,
    title: 'React Basics',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    progress: 50,
  },
  {
    id: 2,
    title: 'React Basics',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    progress: 70,
  },
  {
    id: 3,
    title: 'React Basics',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    progress: 30,
  },
  {
    id: 4,
    title: 'React Basics',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    progress: 90,
  },
  {
    id: 5,
    title: 'React Basics',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    progress: 10,
  },
];

const UserDashboard: FC = () => {
  return (
    <section className="text-dark p-6">
      <div className="grid grid-cols-3 gap-10">
        {cards.map(card => (
          <CourseCard
            key={card.id}
            progress={card.progress}
            title={card.title}
            description={card.message}
          />
        ))}
      </div>
    </section>
  );
};

export default UserDashboard;
