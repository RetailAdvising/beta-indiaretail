import { check_Image } from '@/libs/api'

const Foster = ({ data }) => {
    return (
        <>
            <section class="fybg fybg2">
                <div class="fybgHeading container md:px-[10px]">
                    <h2>
                        {data.Heading}
                    </h2>

                    <div class="customHR2"></div>
                    {(data["content _list"] && data["content _list"].length > 0) && <div class="row1">
                        {data["content _list"].map(res => {
                            return (
                                <div key={res.heading} className="fybgContainer">
                                    <img src={check_Image(res.Logo)} alt="" class="fybgImg" />
                                    <div class="fybgHead">
                                        {res.heading}
                                    </div>
                                    <div class="fybgSubHead">
                                        {res.description}
                                    </div>
                                </div>
                            )
                        })}


                    </div>}
                </div>
            </section>


        </>
    )
}

export default Foster