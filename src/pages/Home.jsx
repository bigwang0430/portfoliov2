import HomeNav from '../components/HomeNav'

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center">
      <h1 className="font-mono text-4xl text-white font-bold sm:text-lg">
        ANDY WANG
      </h1>
      <HomeNav />
    </div>
  )
}
