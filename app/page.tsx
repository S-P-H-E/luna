import { BiLoader } from 'react-icons/bi';

export default function Home(){
  return (
    <div className="h-[100dvh] flex flex-col justify-center items-center">
      <h1 className="text-4xl font-semibold">Please wait</h1>
      <div className='text-lg flex gap-2 items-center justify-center text-[#79797d]'>
        <p>Returning to page</p>
        <BiLoader className="animate-spin"/>
      </div>
    </div>
  )
}