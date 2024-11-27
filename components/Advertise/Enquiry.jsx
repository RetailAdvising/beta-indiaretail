import { check_Image } from '@/libs/api'
const Enquiry = ({ data }) => {
    return (
        <>
            <div className='topSection' style={{ backgroundImage: `url(${check_Image(data.bg_image)})` }}>
                <div class=" topFirst">
                    <div class="container-1 row pside150 align-items-center">
                        <div class="w-[40%] md:w-full">
                            <h1 class="topHeading">{data.heading}
                            </h1>
                        </div>
                        <div class="w-[60%] md:w-full">
                            <p class="topDescription">{data.description}</p>
                        </div>
                    </div>

                    {data.enquiry_now && JSON.parse(data.enquiry_now) && Object.keys(JSON.parse(data.enquiry_now)).length > 0 &&
                        <div>
                            <p class="pdf-download-advertise topButton inquiriesLinks">{JSON.parse(data.enquiry_now).btn_text}</p>
                        </div>}
                </div>
                <div class="topSecond ">
                    <div class="pside100">
                        <h2 class="topSubHeading">{data.impact_influence_heading}</h2>
                        <div class="customHR hr-1 style14"></div>
                        {(data.impact_influence && data.impact_influence.length > 0) && <div class="grid grid-cols-3 md:grid-cols-1">
                            {data.impact_influence.map(res => {
                                return (
                                    <div class="">
                                        <div class="topSecondHead">
                                            {res.counter}
                                        </div>
                                        <div class="topSecondSubHead">
                                            {res.counter_type}
                                        </div>
                                    </div>
                                )
                            })}

                        </div>}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Enquiry