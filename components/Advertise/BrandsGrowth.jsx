import { check_Image } from '@/libs/api'

const BrandsGrowth = ({ data }) => {
    return (
        <>
            <section class="ailb ">
                <div class="container md:px-[10px]">
                    <h2>
                        {data.heading}
                    </h2>
                    <div class="customHR2"></div>

                    <div class="customSpace35"></div>

                    <div class="grid grid-cols-3 md:grid-cols-1 gap-[20px]">
                        {data.content_list.map(res => {
                            return (
                                <div class="card text-bg-dark">
                                    <img src={check_Image(res.image)} class="card-img" alt="..." />
                                    <div class="card-img-overlay">
                                        <h5 class="card-title" style={{ color: "#fff" }}>{res.title}</h5>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                    
                    {data.button && JSON.parse(data.button) && Object.keys(JSON.parse(data.button)).length > 0 &&<div class="digital-flex">
                        <p class="downloadMediaKit inquiriesLinks2">
                            {JSON.parse(data.button).btn_text}
                        </p>
                    </div>}

                </div>

            </section>
        </>
    )
}

export default BrandsGrowth