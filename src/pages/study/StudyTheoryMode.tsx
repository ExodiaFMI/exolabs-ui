import React from 'react';
import topicData from './topic.json';
import StudyTheoryMode from '../../components/StudyMode/StudyTheoryMode';

const StudyTheoryModePage: React.FC = () => {
  const topic = topicData.data[0];

  return <StudyTheoryMode topic={topic} />;
};

export default StudyTheoryModePage;
