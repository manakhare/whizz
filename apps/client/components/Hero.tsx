import Link from "next/link"
import PrimaryButton from "./button/PrimaryButton"
import Image from "next/image"

export default function Hero() {
  return (
    <div className='px-5 overflow-x-hidden py-8 md:w-[80%] flex flex-col items-center gap-10 md:flex md:flex-row md:h-full'>

      <div className="w-full flex flex-col gap-5 md:justify-start md:w-[50%]">
        <div className="flex flex-col items-center">
            <div className="w-[70%] text-4xl font-bold tracking-wide md:text-7xl">Automate without limits</div>
            <div className="text-lg w-[70%] mt-5 font-semibold text-gray-600 md:w-full md:text-xl">Turn chaos into smooth operations by automating workflows yourself - no developers, no IT tickets, no delays. The only limit is your imagination.</div>
        </div>

        <div className="text-lg flex justify-center md:justify-start items-center md:mt-5">
            <Link href='/signup'>
              <PrimaryButton classFeatures="px-10 py-2 rounded-3xl md:text-xl">Start free with email</PrimaryButton>
            </Link>
        </div>
      </div>

      <div className="md:w-[50%]">
        <Image 
            src="https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1726210651/Homepage%20%E2%80%94%20Sept%202024/homepage-hero_vvpkmi.png"
            alt="workflow"
            width={700}
            height={400}
            className="overflow-hidden"
        />
      </div>

    </div>
  )
}
