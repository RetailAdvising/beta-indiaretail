import { check_Image } from '@/libs/api'

const MultipleRoutes = ({ data }) => {
    return (
        <>
            <section class="mrobv ">
                <div class="container md:px-[10px]">
                    <h2>
                        {data.heading}
                    </h2>
                    <div class="customHR2"></div>

                    <div class="customSpace35"></div>

                    <div class="grid grid-cols-4 md:grid-cols-2 md:gap-[0_15px]">
                        {data.content_list.map(res => {
                            return (
                                <div key={res.title} class="mrobvBox">
                                    <img src={check_Image(res.logo)} alt="" class="mrobvImg" />
                                    <h4>
                                       {res.title}
                                    </h4>
                                </div>
                            )})
                        }
                    </div>

                </div>

            </section>
        </>
    )
}

export default MultipleRoutes