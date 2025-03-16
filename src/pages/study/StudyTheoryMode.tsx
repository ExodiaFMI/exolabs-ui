import React, { useState } from 'react';
import { useSuspenseQuery, useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router';
import StudyTheoryMode from '../../components/StudyMode/StudyTheoryMode';
import {
  TopicResponseDto,
  TopicsApi,
  SubtopicResponseDto,
  SubtopicsApi,
  AgentApi,
} from '../../codegen';
import { useApiClient } from '../../hooks/useApi';

const StudyTheoryModePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const topicsClient = useApiClient(TopicsApi);
  const subtopicsClient = useApiClient(SubtopicsApi);
  const agentClient = useApiClient(AgentApi);

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

  const [chatSessionId, setChatSessionId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  const startChatMutation = useMutation({
    mutationFn: () =>
      agentClient.agentControllerStartChat({
        agentControllerStartChatRequest: { message: 'Start' },
      }),
    onSuccess: data => {
      setChatSessionId(data.sessionId);
      setChatMessages(data.history);
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: (message: string) =>
      agentClient.agentControllerSendMessage({
        agentControllerSendMessageRequest: { sessionId: chatSessionId ?? '', message },
      }),
    onSuccess: data => {
      setChatMessages(data.history);
    },
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
      startChat={() => startChatMutation.mutate({ message: 'Start' })}
      sendMessage={sendMessageMutation.mutate}
      chatSessionId={chatSessionId}
      chatMessages={chatMessages}
    />
  );
};

export default StudyTheoryModePage;
