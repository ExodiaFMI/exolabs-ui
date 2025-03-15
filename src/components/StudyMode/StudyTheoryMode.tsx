import React, { useState, useRef, useEffect } from 'react';
import {
  HiThumbDown,
  HiThumbUp,
  HiArrowLeft,
  HiArrowRight,
  HiQuestionMarkCircle,
} from 'react-icons/hi';
import { Button } from '../../lib/catalyst/button';
import Interactive from '../Interactive/Interactive';
import ChatBox from '../ChatBox/ChatBox';
import { TopicResponseDto, SubtopicResponseDto } from '../../codegen';
import { useParams } from 'react-router';
import ReactMarkdown from 'react-markdown';

interface StudyTheoryModeProps {
  topic: TopicResponseDto & { subtopics: SubtopicResponseDto[] };
  isInteractive: boolean;
  interactiveSrc: string;
}

const StudyTheoryMode: React.FC<StudyTheoryModeProps> = ({
  topic,
  interactiveSrc,
  isInteractive,
}) => {
  const [currentSubtopicIndex, setCurrentSubtopicIndex] = useState(0);
  const [showChatBox, setShowChatBox] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const topicHeadingRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (currentSubtopicIndex < topic.subtopics.length - 1) {
      setCurrentSubtopicIndex(currentSubtopicIndex + 1);
      setShowChatBox(false); // Hide ChatBox when moving to the next subtopic
      scrollToTop();
    }
  };

  const handlePrevious = () => {
    if (currentSubtopicIndex > 0) {
      setCurrentSubtopicIndex(currentSubtopicIndex - 1);
      setShowChatBox(false); // Hide ChatBox when moving to the previous subtopic
      scrollToTop();
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

  const handleReset = () => {
    setCurrentSubtopicIndex(0);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <aside className="bg-gray-200 text-secondary p-4 rounded-lg sticky top-4">
          <h2 className="text-xl font-semibold mb-2">Sources</h2>
          <p className="text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
            Praesent libero. Sed cursus ante dapibus diam.
          </p>
        </aside>
        <main className="col-span-3 p-4 text-black">
          <div className="mb-4 sticky top-0 bg-light p-4 z-1000">
            <div className="flex justify-between items-center mb-2">
              <span>
                {currentSubtopicIndex > 0
                  ? topic.subtopics[currentSubtopicIndex - 1].name
                  : 'Start'}
              </span>
              <span>
                {currentSubtopicIndex < topic.subtopics.length - 1
                  ? topic.subtopics[currentSubtopicIndex + 1].name
                  : 'End'}
              </span>
            </div>
            <div className="relative w-full h-2 bg-gray-300 rounded">
              <div
                className="absolute top-0 h-2 bg-secondary rounded"
                style={{
                  width: `${((currentSubtopicIndex + 1) / topic.subtopics.length) * 100}%`,
                }}></div>
            </div>
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
                {topic.subtopics[currentSubtopicIndex].name}
              </h3>
              <ReactMarkdown>{topic.subtopics[currentSubtopicIndex].text}</ReactMarkdown>
            </div>
          </section>
          {isInteractive && <Interactive src={interactiveSrc} />}
          <div className="flex justify-end mb-4 space-x-4">
            <Button
              onClick={handleDidntUnderstand}
              className="text-white py-2 px-6 rounded-lg">
              <HiQuestionMarkCircle className="my-auto text-lg" /> Didn't Understand
            </Button>
            <Button onClick={handleNext} className="text-white py-2 px-6 rounded-lg">
              Ok, next <HiArrowRight className="my-auto" />
            </Button>
          </div>
          <div className="text-center">
            {currentSubtopicIndex + 1} / {topic.subtopics.length}
          </div>
          <Button className="text-white py-2 px-4 rounded-lg mt-4">Generate Quiz</Button>
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

export default StudyTheoryMode;
