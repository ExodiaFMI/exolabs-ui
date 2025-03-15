import { FC, Suspense, use, useEffect } from 'react';
import CourseCardList from '../components/user-dashboard/CourseCardList';
import BreadcrumbContext from '../layout/breadcrumbContext';

const Dashboard: FC = () => {
  const { setBreadcrumb } = use(BreadcrumbContext);
  useEffect(() => {
    setBreadcrumb('Dashboard');
  }, [setBreadcrumb]);

  return (
    <section className="text-dark p-6">
      <Suspense fallback={<div>Loading...</div>}>
        <CourseCardList />
      </Suspense>
    </section>
  );
};

export default Dashboard;
