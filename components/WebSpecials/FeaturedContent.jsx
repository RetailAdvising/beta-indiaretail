import ImageLoader from '../ImageLoader'
import Image from 'next/image'

const FeaturedContent = ({webinar_data,click_data,cols,article}) => {
    return (
        <>
            <div className={`grid ${cols ? cols : 'grid-cols-4 md:grid-cols-2'} gap-[15px] md:gap-[20px] py-3`}>
                {webinar_data.map(resp => {
                    return (
                        <div className='cursor-pointer' onClick={() => click_data(resp,article ? 'article' : 'featured_content_data')} key={resp.title}>
                            <p className='flex gap-2 line-clamp-1 items-center'><span className={`primary_text fnt_13 line-clamp-1 nunito`}>{resp.author_name}</span> {resp.tag && <span className='h-[10px] w-[1px] bg-[#6f6f6f]'></span>} <span className={`secondary_text line-clamp-1 nunito`}>{resp.tag}</span></p>
                            <div className='relative py-[5px]'>
                                <ImageLoader style={`rounded-[10px] h-[215px] md:h-[140px] w-full`} src={resp.image} title={resp.title} />
                                <div className='absolute bottom-[10px] left-0 p-[5px] '>
                                    <Image src={'/book.svg'} height={20} width={20} alt='pdf'></Image>
                                </div>
                            </div>
                            <h6 className={`text-[14px] line-clamp-2 font-semibold min-h-[40px] nunito`}>{resp.title}</h6>
                            <p className={`sub_title pt-1 line-clamp-2 md:line-clamp-1`}>{resp.short_description ? resp.short_description : ''}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default FeaturedContent