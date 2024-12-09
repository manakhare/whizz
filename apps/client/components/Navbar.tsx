"use client"
import { useRouter } from 'next/navigation'
import PrimaryButton from './button/PrimaryButton'
import LinkButton from './button/LinkButton';
import { showToast } from '@/helper';
import Link from 'next/link';

export default function Navbar() {
    const router = useRouter();

    const logout = () => {
        try {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            showToast("success", "Logged out");
            router.push("/");
        } catch (error) {
            showToast("error", "Error! Please try again.");
        }
    }


    return (
        <>
            {
                localStorage.getItem("user") === null ?
                    (
                        <div className='pb-3 z-10 px-6 md:px-10 flex justify-between text-center items-center border border-t-transparent w-full'>
                            <div className='text-3xl font-extrabold tracking-wider'>💨 Whizz...</div>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <LinkButton onClick={() => { router.push('/login') }}>Login</LinkButton>
                                </div>
                                <div className='ml-5 text-md'>
                                    <PrimaryButton onClick={() => { router.push('/signup') }} classFeatures='w-fit px-4 py-1 text-md'>Sign up</PrimaryButton>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='pb-3 z-10 px-6 md:px-10 flex justify-between text-center items-center border border-t-transparent w-full'>
                            <div className='text-3xl font-extrabold tracking-wider'>
                                <Link href="/dashboard">
                                    💨 Whizz...
                                </Link>
                            </div>
                            <div className='flex justify-between items-center'>

                                <div className='ml-5 text-md px-4'>
                                    <PrimaryButton onClick={logout} classFeatures='w-fit px-5 py-1 text-md'>Log out</PrimaryButton>
                                </div>
                            </div>
                        </div>
                    )
            }
        </>

    )
}
