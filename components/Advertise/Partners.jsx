import { check_Image } from '@/libs/api'
import React from 'react'

const Partners = ({ data }) => {
    return (
        <>
            <div class="customSpace75"></div>
            <div className='fybg md:px-[10px]'>

                <h4 className='partner_head'>
                    {data.heading}
                </h4>
                <div class="customHR2"></div>

                {(data.logo_list && data.logo_list.length > 0) && <div class="displayFlex dispaly-justify-content-between">
                    {data.logo_list.slice(0, 15).map(res => {
                        return (
                            <div class="d-width18 m-width75 partnerContainer">
                                <img src={check_Image(res.logo)} alt="" class="partnerLogo" />
                            </div>
                        )
                    })}
                </div>}
                {(data.logo_list && data.logo_list.length > 0) && <div class="displayFlex">
                    <div class="displayFlexNew2">
                        {data.logo_list.slice(16, 20).map(res => {
                            return (
                                <div class="d-width18 m-width75 partnerContainer">
                                    <img src={check_Image(res.logo)} alt="" class="partnerLogo" />
                                </div>
                            )
                        })}
                    </div>
                </div>}

                {(data.logo_list && data.logo_list.length > 0) && <div class="displayFlex">
                    <div class="displayFlexNew2 displayFlexNewAfter">
                        {data.logo_list.slice(20, 22).map(res => {
                            return (
                                <div class="d-width18 m-width75 partnerContainer">
                                    <img src={check_Image(res.logo)} alt="" class="partnerLogo" />
                                </div>
                            )
                        })}
                    </div>
                </div>}
            </div>

        </>
    )
}

export default Partners