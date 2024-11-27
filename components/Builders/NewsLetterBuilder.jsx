import NewsList from '../Newsletter/NewsList'
import NewsCard from '../Newsletter/NewsCard'

export default function NewsLetterBuilder() {
  return (
    <>
      <div className='flex'>
        <NewsList />
      </div>
      <div className='flex'>
      <NewsCard />
      </div>
    </>
  )
}
