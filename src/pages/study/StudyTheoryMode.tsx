import React from 'react';

const StudyTheoryMode: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <aside className="bg-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Sources</h2>
          <p className="text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
            Praesent libero. Sed cursus ante dapibus diam.
          </p>
        </aside>
        <main className="col-span-3 p-4 text-black">
          <h1 className="text-3xl font-bold mb-4">
            Topic: Cell theory/definition of life
          </h1>
          <h2 className="text-2xl font-semibold mb-4">AI Explainer</h2>
          <section className="bg-gray-100 p-4 rounded-lg mb-4">
            {/* Markdown output display */}
          </section>
          <div className="flex justify-between mb-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">+</button>
            <button className="bg-red-500 text-white py-2 px-4 rounded-lg">-</button>
            <button className="bg-gray-500 text-white py-2 px-4 rounded-lg">.</button>
          </div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
            Generate Quiz
          </button>
        </main>
      </div>
    </div>
  );
};

export default StudyTheoryMode;
