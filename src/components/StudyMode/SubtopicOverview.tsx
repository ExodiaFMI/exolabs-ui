import { useMutation } from '@tanstack/react-query';
import 'katex/dist/katex.min.css';
import React, { useEffect, useRef, useState } from 'react';
import { HiArrowLeft, HiArrowRight, HiQuestionMarkCircle } from 'react-icons/hi';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import {
  AgentApi,
  BiolinksApi,
  SubtopicResponseDto,
  TopicResponseDto,
} from '../../codegen';
import { useApiClient } from '../../hooks/useApi';
import { Button } from '../../lib/catalyst/button';
import Progress from '../../shared/components/Progress';
import ChatBox from '../ChatBox/ChatBox';
import Interactive from '../Interactive/Interactive';
import { set } from 'react-hook-form';

type GenerationTool = 'visualization' | 'video' | 'image';
interface SubtopicOverviewProps {
  topic: (TopicResponseDto & { subtopics: SubtopicResponseDto[] }) | null;
  isInteractive: boolean;
  startChat: () => void;
  sendMessage: (message: string) => void;
  chatSessionId: string | null;
  chatMessages: string[];
  onSubtopicsNextEnd?: () => void;
  onSubtopicsPrevStart?: () => void;
  isLoading: boolean;
}

const SubtopicOverview: React.FC<SubtopicOverviewProps> = ({
  topic,
  isInteractive,
  startChat,
  sendMessage,
  chatSessionId,
  chatMessages,
  onSubtopicsNextEnd,
  onSubtopicsPrevStart,
  isLoading,
}) => {
  const [currentSubtopicIndex, setCurrentSubtopicIndex] = useState(0);
  const [showChatBox, setShowChatBox] = useState(false);

  const [biolink, setBiolink] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string>('');

  useEffect(() => {
    setCurrentSubtopicIndex(0);
  }, [topic]);

  const [showInteractive, setShowInteractive] = useState(false);
  const [interactiveType, setInteractiveType] = useState<
    'visualization' | 'video' | 'image'
  >('visualization');
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const topicHeadingRef = useRef<HTMLDivElement>(null);
  const interactiveRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setShowChatBox(false);
    setImageUrl('');
    setVideoUrl('');
    setBiolink('');
    scrollToTop();
    if (currentSubtopicIndex < (topic?.subtopics.length ?? 0) - 1) {
      setCurrentSubtopicIndex(currentSubtopicIndex + 1);
    } else {
      onSubtopicsNextEnd?.();
    }
  };

  const handlePrevious = () => {
    setShowChatBox(false);
    setImageUrl('');
    setVideoUrl('');
    setBiolink('');
    scrollToTop();
    if (currentSubtopicIndex > 0) {
      setCurrentSubtopicIndex(currentSubtopicIndex - 1);
    } else {
      onSubtopicsPrevStart?.();
    }
  };

  const handleDidntUnderstand = () => {
    setShowChatBox(true);
    if (!chatSessionId) {
      startChat();
    }
  };

  const biolinksClient = useApiClient(BiolinksApi);
  const biolinkMutation = useMutation({
    mutationFn: (subtopic: string) =>
      biolinksClient.biolinksControllerSearchBiolinks({
        biolinksControllerSearchBiolinksRequest: { queryText: subtopic },
      }),
    onSuccess: data => {
      if (!data.results) return;
      const result = data.results[0];
      setBiolink(result?.href ?? '');
    },
  });

  const agenstClient = useApiClient(AgentApi);
  const agentImgeMutation = useMutation({
    mutationFn: (message: string) => {
      const subtopic = topic?.subtopics[currentSubtopicIndex];
      return agenstClient.agentControllerGenerateImage({
        agentControllerGenerateImageRequest: {
          subtopicId: subtopic?.id ?? 0,
          prompt: subtopic?.text ?? '',
        },
      });
    },
    onSuccess: data => setImageUrl(data?.imageUrl ?? ''),
  });
  const agentVideoMutation = useMutation({
    mutationFn: (message: string) => {
      const subtopic = topic?.subtopics[currentSubtopicIndex];
      return agenstClient.agentControllerGenerateVideo({
        agentControllerGenerateVideoRequest: {
          subtopicId: subtopic?.id ?? 0,
          prompt: subtopic?.text ?? '',
        },
      });
    },
    onSuccess: data => setImageUrl(data?.videoUrl ?? ''),
  });

  const handleShowInteractive = (type: GenerationTool) => {
    setInteractiveType(type);
    const subtopic = topic?.subtopics[currentSubtopicIndex];
    switch (type) {
      case 'visualization':
        biolinkMutation.mutate(subtopic?.name ?? '');
        break;
      case 'image':
        agentImgeMutation.mutate(subtopic?.name ?? '');
        break;
      case 'video':
        agentVideoMutation.mutate(subtopic?.name ?? '');
        break;
      default:
        break;
    }
    setShowInteractive(true);
    if (interactiveRef.current) {
      interactiveRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    if (topicHeadingRef.current) {
      topicHeadingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (showChatBox && chatBoxRef.current) {
      chatBoxRef.current.scrollIntoView({ behavior: 'smooth' });
      chatBoxRef.current.focus();
    }
  }, [showChatBox]);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <main className="col-span-3 p-4 text-black">
          <div className="mb-4 sticky top-0 bg-light py-4 z-1000">
            <div className="flex justify-between mb-2 items-center">
              <Button
                onClick={() => handlePrevious()}
                className="cursor-pointer text-white py-2 px-6 rounded-lg flex items-center">
                <HiArrowLeft />
              </Button>
              <div className="flex-grow mx-5">
                <div className="flex justify-between items-center mb-2">
                  <span>
                    {currentSubtopicIndex > 0
                      ? topic?.subtopics[currentSubtopicIndex - 1]?.name
                      : 'Start'}
                  </span>
                  <span>
                    {currentSubtopicIndex < (topic?.subtopics.length ?? 0) - 1
                      ? topic?.subtopics[currentSubtopicIndex + 1]?.name
                      : 'End'}
                  </span>
                </div>
                <Progress
                  progress={
                    (topic ? (currentSubtopicIndex + 1) / topic.subtopics.length : 0) *
                    100
                  }
                />
              </div>
              <Button
                onClick={() => handleNext()}
                className="cursor-pointer text-white py-2 px-6 rounded-lg flex items-center">
                <HiArrowRight />
              </Button>
            </div>
          </div>
          <h1 ref={topicHeadingRef} className="text-3xl font-bold mb-4">
            Topic: {topic?.name}
          </h1>
          <section className="bg-gray-100 p-4 rounded-lg mb-4">
            <div className="mb-4">
              <h3 className="text-xl font-semibold">
                {topic?.subtopics[currentSubtopicIndex]?.name}
              </h3>
              <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                {topic?.subtopics[currentSubtopicIndex]?.text}
              </ReactMarkdown>
            </div>
          </section>
          {isInteractive && (
            <div className="flex space-x-4 mb-4">
              <Button
                onClick={() => handleShowInteractive('visualization')}
                className="text-white py-2 px-6 rounded-lg">
                Show Visualization
              </Button>
              <Button
                onClick={() => handleShowInteractive('video')}
                className="text-white py-2 px-6 rounded-lg">
                Generate Video
              </Button>
              <Button
                onClick={() => handleShowInteractive('image')}
                className="text-white py-2 px-6 rounded-lg">
                Generate Image
              </Button>
            </div>
          )}
          {isInteractive && showInteractive && (
            <>
              {biolinkMutation.isSuccess && (
                <div ref={interactiveRef}>
                  <Interactive src={biolink} type="visualization" />
                </div>
              )}
              {biolinkMutation.isPending && <div>Loading visualization...</div>}
              {agentImgeMutation.isSuccess && (
                <div ref={interactiveRef}>
                  <Interactive src={imageUrl} type="image" />
                </div>
              )}
              {agentImgeMutation.isPending && <div>Loading image...</div>}
              {agentVideoMutation.isSuccess && (
                <div ref={interactiveRef}>
                  <Interactive src={videoUrl} type="video" />
                </div>
              )}
              {agentVideoMutation.isPending && <div>Loading video...</div>}
            </>
          )}
          <div className="flex justify-end mb-4 space-x-4">
            <Button
              onClick={() => handleDidntUnderstand()}
              className="cursor-pointer text-white py-2 px-6 rounded-lg">
              <HiQuestionMarkCircle className="my-auto text-lg" /> Didn't Understand
            </Button>
            <Button
              onClick={() => handleNext()}
              className="cursor-pointer text-white py-2 px-6 rounded-lg my-auto">
              OK, next <HiArrowRight className="max-width-100" />
            </Button>
          </div>
          <Button className="cursor-pointer text-white py-2 px-4 rounded-lg mt-4">
            Generate Quiz
          </Button>
          {showChatBox && (
            <div ref={chatBoxRef}>
              <ChatBox
                sendMessage={sendMessage}
                chatMessages={chatMessages}
                isLoading={isLoading}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SubtopicOverview;
