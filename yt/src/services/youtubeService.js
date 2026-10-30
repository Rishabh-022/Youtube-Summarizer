//export function extractYouTubeId(url) {
  //if (!url) return null;
  ///const cleaned = url.trim();
  //const watchMatch = cleaned.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  ///if (watchMatch && watchMatch[1]) return watchMatch[1];
  ///const shortsMatch = cleaned.match(/youtube\.com\/shorts\/([^"&?\/\s]{11})/i);
  ///if (shortsMatch && shortsMatch[1]) return shortsMatch[1];
  ///return /^[a-zA-Z0-9_-]{11}$/.test(cleaned) ? cleaned : "aircAruvnKk";
///}
export function extractYouTubeId(url) {
  if (!url) return null;
  const cleaned = url.trim();
  
  // This new regex specifically supports /live/ and /shorts/ URLs too!
  const match = cleaned.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|live\/|shorts\/))([^"&?\/\s]{11})/i);
  
  if (match && match[1]) {
    return match[1];
  }
  
  // Return the raw ID if they just pasted 11 characters
  return /^[a-zA-Z0-9_-]{11}$/.test(cleaned) ? cleaned : null;
}
export function getMockVideoMetadata(videoId) {
  return {
    id: videoId,
    title: videoId === 'dQw4w9WgXcQ' ? "Never Gonna Give You Up" : "Understanding Modern AI & Systems",
    channel: "Tech Pioneer Academy",
    duration: "18:42"
  };
}