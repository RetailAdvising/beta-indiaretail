import { useEffect, useState } from "react";
import ImageLoader from "../ImageLoader";
import Image from "next/image";
import { YOUTUBE_API_KEY } from "@/libs/config/siteConfig";
import Title from "../common/Title";

const YouTubeVideo = ({ id, click_data }) => {
  const [videoDetails, setVideoDetails] = useState(null);

  const parseDuration = (isoDuration) => {
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = parseInt(match[1], 10) || 0;
    const minutes = parseInt(match[2], 10) || 0;
    const seconds = parseInt(match[3], 10) || 0;

    const formattedMinutes =
      hours > 0
        ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
            2,
            "0"
          )}`
        : String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return hours > 0
      ? `${formattedMinutes}:${formattedSeconds} Hours`
      : `${formattedMinutes}:${formattedSeconds} Minutes`;
  };

  useEffect(() => {
    const fetchVideoDetails = async () => {
      const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${YOUTUBE_API_KEY}&part=snippet,contentDetails`;
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (data.items) {
        const videoData = data.items[0];

        setVideoDetails({
          title: videoData.snippet.title,
          description: videoData.snippet.description,
          duration: parseDuration(videoData.contentDetails.duration),
          thumbnail: videoData.snippet.thumbnails.high.url,
          channelTitle: videoData.snippet.channelTitle,
        });
      }
    };

    if (id) {
      fetchVideoDetails();
    }
  }, [videoDetails, id]);

  return (
    <>
      {videoDetails && (
        <div className="py-5">
          <Title data={{ title: "Video" }} />
          <div className="pt-3 flex flex-col lg:flex-row gap-4">
            <ImageLoader
              src={videoDetails.thumbnail}
              style={"rounded-lg h-fit object-cover w-full lg:min-w-[564px]"}
            />
            <div>
              <h2 className="text-[20px] lg:text-[25px] w-fit font-medium nunito">
                <span className="text-[#929292] text-[20px] lg:text-[25px]">
                  {videoDetails.channelTitle} :{" "}
                </span>
                {videoDetails.title}
              </h2>
              <p className="mt-3 text-[#202121] text-[16px] line-clamp-4 lg:text-[18px] tinos">
                {videoDetails.description}
              </p>
              <div className="mt-5 flex items-center gap-1">
                <Image src="/webinar/time.png" width={18} height={22} />
                <span className="text-[#818181] tinos text-[16px] mb-1">
                  {videoDetails.duration}
                </span>
              </div>

              <button
                onClick={() => click_data(id, "video")}
                className="webinar-btn px-8 py-1 text-white text-[18px] mt-5 font-semibold rounded-md"
              >
                Watch
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default YouTubeVideo;
