import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import StudyTheoryMode from '../../components/StudyMode/StudyTheoryMode';
import {
  TopicResponseDto,
  TopicsApi,
  SubtopicResponseDto,
  SubtopicsApi,
} from '../../codegen';
import { useApiClient } from '../../hooks/useApi';

const StudyTheoryModePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const topicsClient = useApiClient(TopicsApi);
  const subtopicsClient = useApiClient(SubtopicsApi);

  const { data: topics } = useSuspenseQuery<TopicResponseDto[]>({
    queryKey: ['topics', courseId],
    queryFn: () =>
      topicsClient.topicControllerGetTopicsByCourse({ courseId: Number(courseId) }),
  });

  const topic = topics?.[0]; // Assuming the first topic for simplicity

  const { data: subtopics } = useSuspenseQuery<SubtopicResponseDto[]>({
    queryKey: ['subtopics', topic?.id],
    queryFn: () =>
      subtopicsClient.subtopicControllerGetSubtopicsByTopicAndCourse({
        courseId: Number(courseId),
        topicId: topic?.id ?? 0,
      }),
    enabled: !!topic,
  });

  const isInteractive = true;
  const interactiveSrc =
    'https://human.biodigital.com/view?id=production/maleAdult/nerves_of_pharynx_guided&lang=en';

  if (!topic || !subtopics) {
    return <div>Loading...</div>;
  }

  const topicWithSubtopics: TopicResponseDto & { subtopics: SubtopicResponseDto[] } = {
    ...topic,
    subtopics: subtopics as SubtopicResponseDto[],
  };

  return (
    <StudyTheoryMode
      topic={topicWithSubtopics}
      interactiveSrc={interactiveSrc}
      isInteractive
    />
  );
};

export default StudyTheoryModePage;
