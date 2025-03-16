import React, { useState } from 'react';
import { useSuspenseQuery, useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router';
import {
  SubtopicResponseDto,
  SubtopicsApi,
  AgentApi,
  TopicResponseDto,
  TopicsApi,
} from '../../codegen';
import SubtopicOverview from '../../components/StudyMode/SubtopicOverview';
import { useApiClient } from '../../hooks/useApi';

const StudyTheoryModePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const topicsClient = useApiClient(TopicsApi);
  const subtopicsClient = useApiClient(SubtopicsApi);
  const agentClient = useApiClient(AgentApi);

  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);

  const { data: topics = [] } = useSuspenseQuery<TopicResponseDto[]>({
    queryKey: ['topics', courseId],
    queryFn: () =>
      topicsClient.topicControllerGetTopicsByCourse({ courseId: Number(courseId) }),
  });

  const selectedTopic = topics[currentTopicIndex];

  const { data: subtopics = [] } = useSuspenseQuery<SubtopicResponseDto[]>({
    queryKey: ['subtopics', selectedTopic?.id],
    queryFn: () =>
      subtopicsClient.subtopicControllerGetSubtopicsByTopicAndCourse({
        courseId: Number(courseId),
        topicId: selectedTopic?.id ?? 0,
      }),
  });

  const [chatSessionId, setChatSessionId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  const startChatMutation = useMutation({
    mutationFn: () =>
      agentClient.agentControllerStartChat({
        agentControllerStartChatRequest: {
          message: 'Describe the topic in just a few words.',
        },
      }),
    onSuccess: data => {
      const { sessionId, history } = data;
      if (sessionId && history) {
        setChatSessionId(sessionId);
        setChatMessages(history);
      }
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: (message: string) =>
      agentClient.agentControllerSendMessage({
        agentControllerSendMessageRequest: { sessionId: chatSessionId ?? '', message },
      }),
    onSuccess: data => {
      if (!data.history) return;
      setChatMessages(data.history);
    },
  });

  const topicWithSubtopics = selectedTopic ? { ...selectedTopic, subtopics } : null;

  const onSubtopicsEnd = () => {
    setCurrentTopicIndex(curr => (curr !== topics.length - 1 ? curr + 1 : curr));
  };

  const onSubtopicsStart = () => {
    setCurrentTopicIndex(curr => (curr !== 0 ? curr - 1 : curr));
  };

  return (
    <section className="flex justify-between gap-5 px-15">
      <aside className="bg-gray-200 w-120 h- text-secondary p-4 rounded-lg sticky top-4">
        <h2 className="text-2xl font-semibold mb-2 ">Topics</h2>
        <ul>
          {topics.map((topic, idx) => (
            <li
              onClick={() => setCurrentTopicIndex(idx)}
              key={topic.id}
              className={`mb-2 cursor-pointer ${
                topics[currentTopicIndex].id === topic.id
                  ? 'border-b-3 border-secondary'
                  : ''
              }`}>
              {topic.name}
            </li>
          ))}
        </ul>
      </aside>
      <SubtopicOverview
        topic={topicWithSubtopics}
        isInteractive
        startChat={() => startChatMutation.mutate()}
        sendMessage={sendMessageMutation.mutate}
        chatSessionId={chatSessionId}
        chatMessages={chatMessages}
        onSubtopicsNextEnd={() => onSubtopicsEnd()}
        onSubtopicsPrevStart={() => onSubtopicsStart()}
      />
    </section>
  );
};

export default StudyTheoryModePage;
