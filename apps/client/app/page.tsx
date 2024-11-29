// import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
   <main className="min-h-screen max-w-screen bg-zinc-50 flex flex-col justify-center items-center md:justify-start md:h-screen pt-3">
      <Navbar />
      <Hero />
      {/* <Footer /> */}
   </main>
  );
}
