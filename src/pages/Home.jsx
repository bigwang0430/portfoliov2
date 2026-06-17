import HomeNav from '../components/HomeNav'

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-mono text-4xl text-white font-bold sm:text-2xl">
        ANDY WANG
      </h1>
      <HomeNav />
    </div>
  )
}
