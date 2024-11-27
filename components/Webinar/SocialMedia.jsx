import ImageLoader from "../ImageLoader";

const SocialMedia = ({ data }) => {
  return (
    <div>
      <div className="flex flex-row gap-3 items-center justify-center py-5 mt-3">
        {data.map((res, i) => (
          <a key={i} href={`${res.route}`} className="rounded-full" target="_blank">
              <ImageLoader
                src={res.icon}  
                alt={res.name}
                height={25}
                width={20}
              />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialMedia;
