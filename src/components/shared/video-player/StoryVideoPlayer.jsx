'use client';
import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { PlayCircleOutlined,PlayCircleFilled } from '@ant-design/icons';
import Img from '../Img';


const StoryVideoPlayer = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [playingIndex, setPlayingIndex] = useState(null);
    const playerRefs = useRef([]);

    const stories = [
        {
            type: 'video',
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D', // Replace with actual thumbnail URL
            caption: 'This is best thing i found in Cart24.com',
        },
        {
            type: 'video',
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            thumbnail: 'https://cdn.shopify.com/s/files/1/0070/7032/files/product-label-design.jpg?v=1680902906', // Replace with actual thumbnail URL
            caption: 'This is best thing i found in Cart24.com',
        },
        {
            type: 'video',
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            thumbnail: 'https://cdn.4imprint.com/qtz/homepage/categories/images21/drinkware0222.jpg', // Replace with actual thumbnail URL
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
        <div className="flex space-x-4 bg-gray-100 p-4">
            {stories.map((story, index) => (
                <div
                    key={index}
                    className="relative w-64 cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 hover:scale-105"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(index)}
                >
                    <div className="relative h-80">
                        {(hoveredIndex !== index && playingIndex !== index) ? (
                            <>
                                <Img
                                    src={story.thumbnail}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <PlayCircleFilled  style={{color:"#FFFFFF"}} className="text-5xl" />
                                </div>
                            </>
                        ) : (
                            <ReactPlayer
                                ref={el => playerRefs.current[index] = el}
                                url={story.url}
                                width="100%"
                                height="100%"
                                style={{backgroundColor:"black"}}
                                playing={hoveredIndex === index || playingIndex === index}
                                onEnded={() => handleVideoEnd(index)}
                                muted={hoveredIndex === index && playingIndex !== index}
                                controls={true}
                            />
                            
                        )}
                    </div>
                    <div className={hoveredIndex === index ?"absolute p-4 top-0": "absolute p-4 bottom-0 bg-opacity-50 bg-black"}>
                        <p className={hoveredIndex === index ? 'text-sm text-white' : 'text-sm text-white' }>{story.caption}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StoryVideoPlayer;