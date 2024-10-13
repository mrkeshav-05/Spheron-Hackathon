// components/VideoCardList.tsx
import VideoCard from "./VideoCard";
import React from "react";
interface Video {
  title: string;
  imageUrl: string;
  description: string;
}

interface VideoCardListProps {
  heading: string;
  videos: Video[];
}

const VideoCardList: React.FC<VideoCardListProps> = ({ heading, videos }) => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-24">
      <h2 className="text-2xl font-bold mb-6 text-center">{heading}</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            title={video.title}
            imageUrl={video.imageUrl}
            description={video.description}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoCardList;
