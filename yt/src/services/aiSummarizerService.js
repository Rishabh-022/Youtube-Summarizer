export async function generateStudyPackage(videoData) {
  const response = await fetch('http://localhost:5000/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: videoData.id })
  });

  if (!response.ok) {
    throw new Error("Failed to analyze video");
  }

  const data = await response.json();
  
  // Sometimes AI nests the response in an "output" or "result" key. This finds it safely.
  const aiSummary = data.summary || data.result?.summary || data.output?.summary || {};
  const aiNotes = data.notes || data.result?.notes || data.output?.notes || {};
  const aiQuestions = data.questions || data.result?.questions || data.output?.questions || [];

  return {
    videoId: videoData?.id,
    videoTitle: videoData?.title || data.videoTitle || "Analyzed Video",
    channelName: videoData?.channel || data.channelName || "YouTube",
    generatedAt: data.generatedAt || new Date().toLocaleDateString(),
    
    // SAFE FALLBACKS: Guarantees the UI never crashes looking for undefined data
    summary: {
      tl_dr: aiSummary.tl_dr || "The AI generated notes, but the summary section was missing or cut off.",
      keyTakeaways: Array.isArray(aiSummary.keyTakeaways) ? aiSummary.keyTakeaways : []
    },
    notes: {
      sections: Array.isArray(aiNotes.sections) ? aiNotes.sections : []
    },
    questions: Array.isArray(aiQuestions) ? aiQuestions : []
  };
}