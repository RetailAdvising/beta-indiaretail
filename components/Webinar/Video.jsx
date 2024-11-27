import ImageLoader from "../ImageLoader";
import styles from '@/styles/Cards.module.scss'

const Video = ({ data, click_data }) => {  
  return (
    <>
      <div className="md:flex lg:grid lg:grid-cols-4 mt-5 no_scroll gap-4">
        {data.map((res, i) => (
          <div key={i} className="min-w-[310px] md:min-w-[85%] cursor-pointer" onClick={()=> click_data(res)}>
            <div className={`${styles.img_div}`}>
            <ImageLoader src={res.image}  style={`h-[170px] w-full rounded-lg ${styles.card_img}`} alt="" />
            </div>
            <div className="">
            {res.title && <h4 className={`card-title nunito line-clamp-2 lg:min-h-[40px] pt-2`}>{res.title ? res.title : ''}</h4>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Video;
