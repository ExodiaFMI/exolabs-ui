import React from 'react';
import topicData from './topic.json';
import StudyTheoryMode from '../../components/StudyMode/StudyTheoryMode';

const StudyTheoryModePage: React.FC = () => {
  const topic = topicData.data[0];
  const isInteractive = true;
  const interactiveSrc =
    'https://human.biodigital.com/view?id=production/maleAdult/nerves_of_pharynx_guided&lang=en';
  return <StudyTheoryMode topic={topic} interactiveSrc={interactiveSrc} isInteractive />;
};

export default StudyTheoryModePage;
