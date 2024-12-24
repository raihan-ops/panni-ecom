'use client';
import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { PlayCircleOutlined, PlayCircleFilled } from '@ant-design/icons';
import Img from '../Img';
import assets from '@/assets/asset';

const SingleVideoPlayer = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const playerRefs = useRef([]);

  const stories = [
    {
      type: 'video',
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: assets.SingleVideo, // Replace with actual thumbnail URL
      caption: 'This is best thing i found in Cart24.com',
    },
  ];

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    if (playerRefs.current[index]) {
      playerRefs.current[index].seekTo(0);
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setPlayingIndex(null);
  };

  const handleClick = (index) => {
    setPlayingIndex(index);
  };

  const handleVideoEnd = (index) => {
    if (index === playingIndex) {
      setPlayingIndex(null);
    }
  };

  return (
    <div className="flex space-x-4 bg-gray-100 py-4 page-container">
      {stories.map((story, index) => (
        <div
          key={index}
          className="relative w-[90%] lg:w-full cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 hover:scale-100"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
        >
          <div className="relative h-[200px]  w-full md:h-[640px]">
            {hoveredIndex !== index && playingIndex !== index ? (
              <>
                <Img
                  src={story.thumbnail}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <PlayCircleFilled style={{ color: '#FFFFFF' }} className="text-5xl" />
                </div>
              </>
            ) : (
              <ReactPlayer
                ref={(el) => (playerRefs.current[index] = el)}
                url={story.url}
                width="w-full"
                height="h-full"
                style={{ backgroundColor: 'black' }}
                playing={hoveredIndex === index || playingIndex === index}
                onEnded={() => handleVideoEnd(index)}
                muted={hoveredIndex === index && playingIndex !== index}
                controls={false}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SingleVideoPlayer;
