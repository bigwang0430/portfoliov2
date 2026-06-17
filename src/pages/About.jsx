import BackArrow from '../components/BackArrow'

export default function About() {
  return (
    <div className="relative h-full w-full">
      <BackArrow />
      <div className="flex h-full w-full flex-col items-center justify-center px-6">
        <div className="flex w-full max-w-md flex-col gap-5 text-left">
          <h1 className="font-mono text-9xl font-medium text-white">Hi,</h1>
          <p className="font-mono text-[11px] leading-relaxed text-white">
            I'm Andy from Vancouver Canada. I like to code new and fun things that help
            others. I'm working on product and web development, as well as AI and machine
            learning. My hobbies include BJJ and cooking. Feel free to 
            reach out and connect! More coming soon!
          </p>
        </div>
      </div>
    </div>
  )
}
