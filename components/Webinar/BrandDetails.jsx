import Dropdowns from "../common/Dropdowns";
import ImageLoader from "../ImageLoader";
import Image from "next/image";

const BrandDetails = ({ webinar_data, updateShare, icons, dateShow }) => {
  return (
    <>
      <div className="flex flex-row justify-between items-center md:gap-2 lg:gap-0">
        <div className="flex gap-3 items-center">
          <div className="border p-2 rounded-lg flex flex-[0_0_auto]">
            <ImageLoader
              src={webinar_data.brand_logo}
              style="rounded-[5px] h-[50px] w-[60px] lg:h-[65px] lg:w-[80px]"
            />
          </div>
          <div>
            <h1 className="text-[16px] lg:text-[28px] font-bold nunito">
              {webinar_data.brand_name}
            </h1>
            <p className="text-[14px]  lg:text-lg font-normal josefin-sans text-[#202121]">
              {webinar_data.title}
            </p>
            {dateShow && (
              <div className="flex gap-1 items-center">
                <Image src="/calendar-minus.png" width={14} height={14} />
                <span className="!text-xs lg:!text-sm contents">
                  {webinar_data.creation} 
                </span>
              </div>
            )}
          </div>
        </div>

        {typeof window !== "undefined" && (
          <div className="flex-[0_0_auto] md:mt-3 lg:mt-2">

            {icons && (
              <Dropdowns
                noBg={true}
                copy_link={true}
                updateShare={(data) => updateShare(data)}
                share={true}
                type={"articles"}
                width={"w-[170px]"}
                showLeft={true}
                data={icons}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default BrandDetails;
