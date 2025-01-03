export function formatTime(epochTimestamp) {
  const now = new Date();
  
  // Detect if the timestamp is in seconds or milliseconds
  const timestampInMs = epochTimestamp.toString().length === 13
    ? epochTimestamp // Milliseconds
    : epochTimestamp * 1000; // Seconds
  
  const date = new Date(timestampInMs); // Convert to date object
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return minutes === 1 ? "1 min ago" : `${minutes} mins ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return days === 1 ? "yesterday" : `${days} days ago`;
  } else if (diffInSeconds < 2592000) {
    const weeks = Math.floor(diffInSeconds / 604800);
    return weeks === 1 ? "last week" : `${weeks} weeks ago`;
  } else if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return months === 1 ? "last month" : `${months} months ago`;
  } else {
    const years = Math.floor(diffInSeconds / 31536000);
    if (years === 1) {
      return "last year";
    } else if (years > 5) {
      // Return month and year for older dates
      return date.toLocaleString("default", { month: "long", year: "numeric" });
    } else {
      return `${years} years ago`;
    }
  }
}


export function formatTimeGeneric(epochTimestamp){
  return new Date(epochTimestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}