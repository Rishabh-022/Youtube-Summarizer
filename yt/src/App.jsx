import React, { useState } from 'react';
import { Scene } from './components/3d/Scene';
import { HeaderBar } from './components/ui/HeaderBar';
import { InputSection } from './components/ui/InputSection';
import { ResultsModal } from './components/ui/ResultsModal';
import { extractYouTubeId, getMockVideoMetadata } from './services/youtubeService';
import { generateStudyPackage } from './services/aiSummarizerService';

export default function App() {
  const [videoData, setVideoData] = useState(null);
  const [studyPackage, setStudyPackage] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcessUrl = async (url) => {
    setIsProcessing(true);
    const videoId = extractYouTubeId(url);
    const metadata = getMockVideoMetadata(videoId);
    setVideoData(metadata);

    try {
      const generated = await generateStudyPackage(metadata);
      setStudyPackage(generated);
      setActiveTab('summary');
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#030612]">
      <Scene videoData={videoData} activeTab={activeTab} onSelectTab={setActiveTab} />
      <div className="relative z-20 flex flex-col items-center pointer-events-none">
        <HeaderBar />
        <InputSection onProcessUrl={handleProcessUrl} isProcessing={isProcessing} />
      </div>
      <ResultsModal
        studyPackage={studyPackage}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onClose={() => setActiveTab(null)}
      />
    </main>
  );
}