
import dynamic from 'next/dynamic'
const List = dynamic(()=> import('../Bookstore/List'))
const Advertisement = dynamic(()=> import('../Baners/Advertisement'))
const Lists = dynamic(()=> import('../Category/Lists'))
const Title = dynamic(()=> import('./Title'))
export default function Placeholders({ placeholder, tagbasedAd, productNavigation, ads_data,ad_payload }) {
    console.log("placeholder", placeholder)
    return (
        <>
            {(placeholder && placeholder.length != 0) ?
                placeholder.map((resp, index) => {
                    return (
                        <div key={index} className={`my-[10px]`}>
                            {(tagbasedAd && Object.keys(tagbasedAd).length != 0 && index == 0) ? <Advertisement ad_payload={ad_payload} position={"small"} adPos={'300'} insStyle={"display:inline-block;width:300px;height:250px;"} data={tagbasedAd} /> : (resp.placeholder_type == 'Banner Ad' && resp.data && resp.data.length != 0 && resp.data[0].web_image && index == 0) ? <Advertisement insStyle={"display:inline-block;width:300px;height:250px;"} divClass={`h-[250px] w-[300px] m-auto`} position={"small"} adPos={'300'} data={resp.data[0]} height={'h-[250px]'} width={'w-[300px]'} /> :
                                (ads_data && ads_data.right_first && index == 0) ? <Advertisement ad_payload={ad_payload} data={ads_data.right_first} adPos={'300'} position={"small"} insStyle={"display:inline-block;width:300px;height:250px;"} divClass={`h-[250px] w-[300px] m-auto`} /> : <></>}
                            {/* {(resp.placeholder_type == 'google_ad' && resp.data && resp.data.length != 0) && <GoogleAds data={(resp.data[0] && resp.data[0].script) ? resp.data[0].script: null} height={'260px'} width={'300px'} />} */}
                            {(resp.placeholder_type == 'google_ad') && <Advertisement ad_payload={ad_payload} position={"small"} adPos={'300'} data={((resp.data && resp.data.length != 0) && (resp.data[0] && resp.data[0].script)) ? resp.data[0].script : null} insStyle={"display:inline-block;width:300px;height:250px;"} divClass={`h-[250px] w-[300px] m-auto`} />}
                            {(resp.placeholder_type == 'list' && resp.data && resp.data.length != 0) &&
                                <div className='border rounded-[5px] p-[10px_15px_15px]'>
                                    <Title data={resp} />
                                    {resp.title == 'Product' ?
                                        <List line_clamp={'3'} flex={'mb-[10px]'} check={true} boxShadow={true} imgWidth={'flex-[0_0_calc(30%_-_10px)] md:flex-[0_0_calc(35%_-_10px)]'} height={'h-[85px] object-contain'} width={'w-full'} data={resp.data} />
                                        :
                                        <Lists flex={'mb-[10px]'} productNavigation={productNavigation} titleClamp={'line-clamp-2'} borderRadius={'rounded-[5px]'} imgFlex={'flex-[0_0_calc(35%_-_10px)]'} tittleOnly={true} check={true} isBB={true} data={resp.data} imgHeight={'h-[85px]'} imgWidth={'w-full'} />}
                                </div>
                            }
                        </div>
                    )
                })
                : <>
                </>}
        </>
    )
}