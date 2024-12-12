import Navbar from '@/components/Navbar'
import Link from 'next/link';
import Table from '@/components/Table';

export default function Dashboard() {

    return (
        <div className='flex flex-col justify-start min-h-full w-screen items-center pt-3'>
            <Navbar />

            <div className='h-full w-full p-10 md:w-[70%]'>

                <div className='flex flex-row justify-between items-center'>
                    <div className='px-2 text-2xl font-semibold'>Whizzes</div>
                    <div>
                        <Link href='/whizz/create'>
                            <button className='bg-indigo-500 px-3 py-1 rounded-md text-gray-100 flex justify-between items-center gap-1 font-semibold'><span className='text-xl items-center'>+</span> Create</button>
                        </Link>
                    </div>
                </div>

                <div className='w-full'>
                    <div className='pt-5 flex justify-end relative'>


                        <input
                            className='px-7 py-1 border w-[40%] rounded-md text-gray-700 focus:ring-0 focus:outline-indigo-400'
                            type='text'
                            placeholder='Search...'
                        >
                            {/* <span className='absolute pt-1.5 pl-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </span> */}
                        </input>
                    </div>
                </div>

                {/* TABLE */}
                <Table />
                
            </div>
        </div>
    )
}
