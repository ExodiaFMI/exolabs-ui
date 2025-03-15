import React, { useEffect, useRef, useState } from 'react';
import { HiArrowLeft, HiArrowRight, HiQuestionMarkCircle } from 'react-icons/hi';
import ReactMarkdown from 'react-markdown';
import { SubtopicResponseDto, TopicResponseDto } from '../../codegen';
import { Button } from '../../lib/catalyst/button';
import Progress from '../../shared/components/Progress';
import ChatBox from '../ChatBox/ChatBox';
import Interactive from '../Interactive/Interactive';

interface SubtopicOverviewProps {
  topic: TopicResponseDto & { subtopics: SubtopicResponseDto[] };
  isInteractive: boolean;
  interactiveSrc: string;
  onSubtopicsNextEnd?: () => void;
  onSubtopicsPrevStart?: () => void;
}

const SubtopicOverview: React.FC<SubtopicOverviewProps> = ({
  topic,
  interactiveSrc,
  isInteractive,
  onSubtopicsNextEnd,
  onSubtopicsPrevStart,
}) => {
  const [currentSubtopicIndex, setCurrentSubtopicIndex] = useState(0);
  const [showChatBox, setShowChatBox] = useState(false);

  useEffect(() => {
    setCurrentSubtopicIndex(0);
  }, [topic]);

  const chatBoxRef = useRef<HTMLDivElement>(null);
  const topicHeadingRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setShowChatBox(false);
    scrollToTop();
    if (currentSubtopicIndex < topic.subtopics.length - 1) {
      setCurrentSubtopicIndex(currentSubtopicIndex + 1);
    } else {
      onSubtopicsNextEnd?.();
    }
  };

  const handlePrevious = () => {
    setShowChatBox(false);
    scrollToTop();
    if (currentSubtopicIndex > 0) {
      setCurrentSubtopicIndex(currentSubtopicIndex - 1);
    } else {
      onSubtopicsPrevStart?.();
    }
  };

  const handleDidntUnderstand = () => {
    setShowChatBox(true);
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
          <div className="mb-4 sticky top-0 bg-light p-4 z-1000">
            <div className="flex justify-between items-center mb-2">
              <span>
                {currentSubtopicIndex > 0
                  ? topic.subtopics[currentSubtopicIndex - 1]?.name
                  : 'Start'}
              </span>
              <span>
                {currentSubtopicIndex < topic.subtopics.length - 1
                  ? topic.subtopics[currentSubtopicIndex + 1]?.name
                  : 'End'}
              </span>
            </div>
            <Progress
              progress={((currentSubtopicIndex + 1) / topic.subtopics.length) * 100}
            />
          </div>
          <Button
            onClick={handlePrevious}
            className="text-white py-2 px-6 rounded-lg mb-4">
            <HiArrowLeft />
          </Button>
          <h1 ref={topicHeadingRef} className="text-3xl font-bold mb-4">
            Topic: {topic.name}
          </h1>
          <section className="bg-gray-100 p-4 rounded-lg mb-4">
            <div className="mb-4">
              <h3 className="text-xl font-semibold">
                {topic.subtopics[currentSubtopicIndex]?.name}
              </h3>
              <ReactMarkdown>{topic.subtopics[currentSubtopicIndex]?.text}</ReactMarkdown>
            </div>
          </section>
          {isInteractive && <Interactive src={interactiveSrc} />}
          <div className="flex justify-end mb-4 space-x-4">
            <Button
              onClick={handleDidntUnderstand}
              className="cursor-pointer text-white py-2 px-6 rounded-lg">
              <HiQuestionMarkCircle className="my-auto text-lg" /> Didn't Understand
            </Button>
            <Button
              onClick={handleNext}
              className="cursor-pointer text-white py-2 px-6 rounded-lg">
              Ok, next <HiArrowRight className="my-auto" />
            </Button>
          </div>
          {topic.subtopics.length > 0 && (
            <div className="text-center">
              {currentSubtopicIndex + 1} / {topic.subtopics.length}
            </div>
          )}
          <Button className="cursor-pointer text-white py-2 px-4 rounded-lg mt-4">
            Generate Quiz
          </Button>
          {showChatBox && (
            <div ref={chatBoxRef}>
              <ChatBox />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SubtopicOverview;
