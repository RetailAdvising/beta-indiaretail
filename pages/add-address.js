import MobileHeader from '@/components/Headers/MobileHeader'
import AddAddress from '@/components/Bookstore/AddAddress';

export default function addAddress() {
  return (
    <>
      <div className="flex flex-col h-full">
        <header className="sticky bg-white top-0 z-99">
          <MobileHeader Heading={'Address'}></MobileHeader>
        </header>

        <main className="overflow-auto h-full">
          <AddAddress />
        </main>

      </div>
    </>
  )
}
