import ImageLoader from "../ImageLoader";
import styles from '@/styles/Cards.module.scss'


const WhitePaper = ({ data, click_data }) => {  
  return (
    <>
      <div className="md:flex lg:grid lg:grid-cols-4 mt-5 no_scroll lg:gap-4">
        {data.map((res, i) => (
           <div key={i} className="lg:min-w-[310px] md:min-w-[80%] rounded-lg border p-3 cursor-pointer" onClick={()=> click_data(res, "white-paper")}>
           <div className={`${styles.img_div}`}>
           <ImageLoader src={res.image}  style={`h-[187px] object-cover w-full rounded-lg ${styles.card_img}`} alt="" />
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

export default WhitePaper;
