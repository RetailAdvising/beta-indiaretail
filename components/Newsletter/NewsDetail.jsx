import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

const NewsDetail = ({ visible, hide, data }) => {
    return (
        <div className={`news_detail`}>
            <Rodal visible={visible} onClose={hide}>
                <div className='container p-[30px_0px] md:p-[15px] h-screen overflow-auto'>
                    {data && data.message && <div dangerouslySetInnerHTML={{ __html: data.message.message }} className={`contents sub_title py-3 `} />}
                </div>
            </Rodal>

        </div>
    )
}

export default NewsDetail