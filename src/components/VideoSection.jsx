import React from 'react'

const VideoSection = ({ videoKey, title }) => {
    if (!videoKey) {
        return null;
    }

    return (
        <div className="w-10/12 md:w-3/5 mx-auto mt-3">
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${videoKey}`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    frameBorder="0"
                />
            </div>
        </div>
    )
}

export default VideoSection
