import { trending } from "@/libs/api";
import { useRouter } from "next/router";

function Tags({ tags, count = 2,tagClass }) {

    const router = useRouter();

    return (
        <>
            {(tags && tags.length != 0) && <p className={` ${tagClass ? tagClass : 'pt-[10px]'} light_text overflow-hidden flex gap-[5px]`}>{tags.map((tag, index_no) => {
                if (index_no < count) {
                    return (
                        // max-w-[100px] line-clamp-1
                        <span onClick={($event) => trending($event, tag, router)} key={index_no} className={`text-[12px] leading-[15px] flex-[0_0_auto] !font-[500] nunito`}>#{tag.tag}</span>
                    )
                }
            })
            }
            </p>}
        </>
    )
}

export default Tags;