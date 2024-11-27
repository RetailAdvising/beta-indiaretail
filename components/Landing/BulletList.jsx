import styles from '@/styles/Components.module.scss'
import Link from 'next/link'


export default function BulletList({data,isBorder}) {
  return (
    <>
      {data && data.map((res,index)=>{
        return (
          <Link key={index} href={'/'+res.route}>
            <div  className={`${styles.bulletList} ${index != data.length - 1 ? 'border_bottom' : ''} ${isBorder && `${styles.bullet_none} border_right pl-[10px] border-b-0`}`}>
                <div className={`${styles.bullet}`}></div>
                <p className={`text-[14px]	line-clamp-1 nunito`}>{res.title}</p>
            </div>
          </Link>
        )
      })}
    </>
  )
}
