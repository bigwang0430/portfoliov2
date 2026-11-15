import BackArrow from '../components/BackArrow'

export default function About() {
  return (
    <div className="relative h-full w-full">
      <BackArrow />
      <div className="flex h-full w-full flex-col items-center justify-center px-6">
        <div className="flex w-full max-w-2xl flex-col gap-0 text-left">
          <h1 className="font-mono text-[150px] -my-4 font-medium text-white">Hi,</h1>
          <p className="font-mono text-[13px] leading-relaxed text-white">
            I'm Andy from Vancouver Canada. I'm a freshman in the Computer Science program at the
            university of illinois urbana champaign. I love to learn new things and code fun
            projects. I'm working on product and web development, as well as AI and machine
            learning. My hobbies include working out and cooking. Feel free to reach out and
            connect!
          </p>
        </div>
      </div>
    </div>
  )
}
