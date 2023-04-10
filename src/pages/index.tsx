import { useEffect } from 'react'
import Image from 'next/image'
import Button from '../components/Button'
//import CheckIcon from '../components/CheckIcon'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Newsletter from '../components/Newsletter'
import Payin4 from '../components/Payin4'
import Testimonials from '../components/Testimonials'
import Title from '../components/Title'
import TwitchIcon from '../components/TwitchIcon'
import Swiper, { Navigation } from 'swiper'
import {
  ArrowLongDownIcon,
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  LockClosedIcon,
  ReceiptRefundIcon,
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'

export default function Home() {
  //const [productInfo, setProductInfo] = useState(classic)
  useEffect(() => {
    function Marquee(selector: string, speed: number) {
      const parentSelector = document.querySelector(selector) as HTMLElement
      console.log(parentSelector)
      const clone = parentSelector.innerHTML
      const firstElement = parentSelector.children[0] as HTMLElement
      let i = 0

      parentSelector.insertAdjacentHTML('beforeend', clone)
      parentSelector.insertAdjacentHTML('beforeend', clone)

      setInterval(() => {
        firstElement.style.marginLeft = `-${i}px`
        if (i > firstElement.clientWidth) {
          i = 0
        }
        i += speed
      }, 0)
    }

    const speed = 0.25

    Marquee('.gift', speed)
    Marquee('.how-it-works', speed)

    const presentation = new Swiper('.swiper.presentation', {
      modules: [Navigation],
      spaceBetween: 16,
      navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
      },
    })

    presentation.init()
  }, [])

  const scrollDown = () => {
    const howItWorks = document.getElementById('how-it-works')?.offsetTop
    const getStarted = document.getElementById('get-started')?.offsetTop

    window.scrollTo({
      top: howItWorks,
      behavior: 'smooth',
    })
    window.scrollTo({
      top: getStarted,
      behavior: 'smooth',
    })
  }

  return (
    <div>
      <Title>Family Fortunate</Title>

      <header className="bg-vanilla text-white">
        <Header />
        <div className="mx-auto max-w-screen-xl px-8 pt-16">
          <div className="relative">
            <Image
              className="absolute top-0 left-1/2 z-0 h-[264px] w-[184px] -translate-x-1/2 shadow-xl md:left-16 md:translate-x-0 lg:h-[524px] lg:w-[356px]"
              src="/images/hero/hero-image-1@4x.jpg"
              alt=""
              width="184"
              height="264"
            />
            <Image
              className="absolute top-48 left-0 z-10 h-[208px] w-[144px] shadow-xl lg:h-[340px] lg:w-[232px]"
              src="/images/hero/hero-image-2@4x.jpg"
              alt=""
              width="144"
              height="208"
            />
            <Image
              className="absolute top-[calc(12rem+6px)] right-0 z-10 h-[192px] w-[128px] shadow-xl md:left-28 lg:top-[calc(12rem+20px)] lg:left-48 lg:h-[284px] lg:w-[192px]"
              src="/images/hero/hero-image-3@4x.jpg"
              alt=""
              width="128"
              height="192"
            />

            <Image
              className="absolute top-0 right-8 z-10 hidden h-[264px] w-[184px] shadow-xl md:block lg:h-[456px] lg:w-[328px]"
              src="/images/hero/hero-image-4.jpg"
              alt=""
              width="328"
              height="456"
            />
            <Image
              className="absolute top-48 right-28 z-20 hidden h-[208px] w-[144px] shadow-xl md:block lg:right-56 lg:h-[284px] lg:w-[192px]"
              src="/images/hero/hero-image-5.jpg"
              alt=""
              width="192"
              height="284"
            />
            <Image
              className="absolute top-[calc(12rem+6px)] right-0 z-30 hidden h-[192px] w-[128px] shadow-xl md:block lg:h-[432px] lg:w-[296px]"
              src="/images/hero/hero-image-6.jpg"
              alt=""
              width="296"
              height="432"
            />

            <div className="relative z-50 mx-auto max-w-lg pt-80">
              <h1 className="text-center font-serif text-[3.25rem] leading-none md:text-left lg:text-6xl">
                <span className="font-bold">Capturing Life&apos;s Priceless</span>{' '}
                <span className="font-semibold italic">Moments</span>
              </h1>
              <p className="mt-5 text-center text-xl font-medium md:text-left">
                We all carry amazing life stories with us, many untold.
              </p>
            </div>
          </div>
        </div>

        <button
          className="mx-auto mt-20 flex animate-bounce flex-col items-center lg:mt-28"
          type="button"
          onClick={scrollDown}
        >
          <div className="text-sm uppercase tracking-wide">Learn more</div>
          <ArrowLongDownIcon className="h-6 w-6" />
        </button>

        <div className="mx-auto mt-12 max-w-3xl px-10 lg:mt-24">
          <p className="text-center font-serif text-[1.75rem] leading-8 md:text-5xl">
            Family Fortunate sends you a question each week &amp; your stories are compiled into
            your very own book of memories
          </p>
        </div>

        <div
          className="max-w-screen-full relative mx-auto overflow-hidden px-10 pt-32 pb-14"
          id="how-it-works"
        >
          <div className="marquee how-it-works absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap lg:flex">
            <div className="mx-8 mr-4 select-none text-center font-serif text-8xl font-bold">
              How it works...
            </div>
          </div>

          <div className="mx-8 mr-4 text-center font-serif text-[3.25rem] font-bold leading-none lg:hidden">
            How it works...
          </div>

          <div className="relative z-50 mx-auto mt-8 grid max-w-screen-lg grid-cols-1 gap-16 md:grid-cols-2 md:items-center md:gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <Image
                className="mx-auto h-[328px] w-[248px] shadow-xl md:h-auto md:w-full"
                src="/images/hero/hero-book-cover@4x.jpg"
                alt="A Happy Life by Alex Green"
                width="248"
                height="328"
              />
            </div>

            <ul className="space-y-4 lg:col-span-6 lg:col-start-7">
              <li className="flex items-start">
                <div className="flex h-10 items-center">
                  <TwitchIcon className="h-8 w-8 shrink-0 text-secondary-600" />
                </div>
                <p className="ml-4 grow text-lg">Each week we&apos;ll email a question to you</p>
              </li>

              <li className="flex">
                <div className="flex h-10 items-center">
                  <TwitchIcon className="h-8 w-8 shrink-0 text-secondary-600" />
                </div>
                <p className="ml-4 grow text-lg">
                  Your answers can be as long or short as you like
                </p>
              </li>

              <li className="flex">
                <div className="flex h-10 items-center">
                  <TwitchIcon className="h-8 w-8 shrink-0 text-secondary-600" />
                </div>
                <p className="ml-4 grow text-lg">Add photos if you&apos;d like</p>
              </li>
              <li className="flex">
                <div className="flex h-10 items-center">
                  <TwitchIcon className="h-8 w-8 shrink-0 text-secondary-600" />
                </div>
                <p className="ml-4 grow text-lg">
                  When you&apos;re ready, you can print a single book or as many copies as you want
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative h-80">
          <Image
            className="object-cover object-center"
            src="/images/hero/hero-video-placeholder@4x.jpg"
            alt=""
            fill
          />
        </div>
      </header>

      <section className="bg-black-pearl px-10 pt-14 pb-12 text-white md:pt-16 md:pb-14">
        <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
          <div className="md:order-1 md:col-span-2">
            <h2 className="font-serif text-[3rem] font-bold leading-none lg:text-6xl">
              <span className="block text-white/30">Start</span>{' '}
              <span className="-mt-2 ml-14 block">right away</span>
            </h2>
            <p className="mt-2 ml-8 text-sm uppercase tracking-wide text-white/70">
              Capture the stories of your lifetime
            </p>
          </div>

          <div className="md:order-3">
            <p className="text-lg text-white/70">
              Your stories are worth sharing. Get started in minutes & with an email each week,
              you&apos;ll preserve your meaningful moments into a keepsake book to pass on to future
              generations.
            </p>
            <p className="mt-2.5 text-lg text-white/70">
              Receive immediate access - your first question will arrive in minutes.
            </p>

            <div className="mt-6 md:mt-12">
              <Button className="w-40" type={'button'} color={'yellow'} onClick={scrollDown}>
                Get started
              </Button>
            </div>
          </div>

          <div className="relative -mx-10 h-48 md:order-4 md:mx-0 lg:mt-auto lg:h-64">
            <Image
              className="object-cover object-center"
              src="/images/get-started/the-perfect-gift@4x.jpg"
              alt="The Perfect Gift"
              fill
            />
          </div>

          <div className="md:order-2 md:row-span-2">
            <Image
              className="h-[416px] w-full object-cover object-center md:h-full"
              src="/images/get-started/get-started-image@4x.jpg"
              alt="Get Started"
              width="312"
              height="416"
              priority={false}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-lg px-10 py-8" id="get-started">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="md:order-2">
            <h2 className="font-serif text-4xl font-bold text-warning-600">
              Your story starts here
            </h2>
            <p className="mt-1.5 italic">Bringing families together</p>

            <div className="mt-10">
              <div className="flex items-end">
                <div className="flex items-center space-x-1">
                  {[...Array(5).keys()].map((x) => (
                    <StarIcon className="h-6 w-6 text-yellow-500" key={x} />
                  ))}
                </div>
                <span className="ml-2 text-sm">Reviews</span>
              </div>

              {/*    <ul className="mt-4 space-y-2">
                {[...Array(3).keys()].map((x) => (
                  <li className="flex" key={x}>
                    <div className="flex h-6 items-center">
                      <svg
                        className="h-6 w-6 shrink-0 text-red-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="m9.973 14.175 5.9-5.9a.948.948 0 0 1 .7-.275c.284 0 .517.092.7.275a.948.948 0 0 1 .275.7.948.948 0 0 1-.275.7l-6.6 6.6c-.2.2-.433.3-.7.3a.96.96 0 0 1-.7-.3l-2.6-2.6a.948.948 0 0 1-.275-.7.95.95 0 0 1 .275-.7.948.948 0 0 1 .7-.275c.284 0 .517.092.7.275l1.9 1.9Z"
                        />
                      </svg>
                    </div>

                    <p className="ml-2 font-medium">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </p>
                  </li>
                ))}
              </ul> */}

              <div className="my-8 space-y-4">
                <div className="relative flex">
                  <input
                    className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none focus:outline-none"
                    id="classic-plan"
                    name="plan"
                    type="radio"
                    value="classic"
                    /* onClick={() => {
                      setProductInfo(classic)
                    }} */
                  />
                  <label
                    className="flex flex-1 items-center justify-between rounded-lg border p-4 transition peer-checked:border-primary-400 peer-checked:bg-primary-400 peer-checked:text-white peer-focus:ring-4 peer-focus:ring-primary-400/50"
                    htmlFor="classic-plan"
                  >
                    <div>
                      <div className="text-lg font-bold">Classic</div>
                      <div className="text-sm">Classic plan</div>
                    </div>

                    <div className="">
                      <span className="text-3xl font-semibold">$97</span>{' '}
                      <span className="text-sm">per year</span>
                    </div>
                  </label>
                </div>

                <div className="relative flex">
                  <input
                    className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none focus:outline-none"
                    id="premium-plan"
                    name="plan"
                    type="radio"
                    value="premium"
                    /* onClick={() => {
                      setProductInfo(premium)
                    }} */
                  />
                  <label
                    className="flex flex-1 items-center justify-between rounded-lg border p-4 transition peer-checked:border-primary-400 peer-checked:bg-primary-400 peer-checked:text-white peer-focus:ring-4 peer-focus:ring-primary-400/50"
                    htmlFor="premium-plan"
                  >
                    <div>
                      <div className="text-lg font-bold">Premium</div>
                      <div className="text-sm">Most popular</div>
                    </div>

                    <div className="">
                      <span className="text-3xl font-semibold">$157</span>{' '}
                      <span className="text-sm">per year</span>
                    </div>
                  </label>
                </div>

                <div className="flex">
                  <Button
                    type="link"
                    color="dark"
                    href="/pricing"
                    className="mb-4 flex-1 rounded-md bg-secondary-600 p-3 text-sm uppercase tracking-wider text-white"
                  >
                    Membership Options
                  </Button>
                </div>

                <div className="flex items-start justify-center space-x-8">
                  {/* PLACE PAY IN 4 LOGO HERE */}
                  <div className="flex flex-col items-center text-primary-600">
                    <Payin4 className="mx-auto" />
                    <div className="mt-1 text-center text-sm">Pay in 4</div>
                  </div>
                  <div className="flex flex-col items-center text-primary-600">
                    <LockClosedIcon className="mx-auto h-6 w-6" />
                    <div className="mt-1 text-center text-sm">
                      Secure
                      <br />
                      Checkout
                    </div>
                  </div>

                  <div className="flex flex-col items-center text-primary-600">
                    <ReceiptRefundIcon className="mx-auto h-6 w-6" />
                    <div className="mt-1 text-center text-sm">
                      Money-Back
                      <br />
                      Guarantee
                    </div>
                  </div>
                </div>
              </div>
              {/*  <hr className="w-full py-2" />
              <dl className="order-3 space-y-4 divide-y divide-secondary-200 md:col-span-2 lg:mx-auto lg:w-full lg:max-w-prose">
                <details className="open-details cursor-pointer">
                  <summary>
                    <div className="flex items-center justify-between text-secondary-600">
                      <div className="text-xl font-medium">Product information</div>
                      <PlusIcon className="h-6 w-6 open-details:hidden" />
                      <MinusIcon className="hidden h-6 w-6 open-details:block" />
                    </div>
                  </summary>

                  <div className="hidden py-4 open-details:block">
                    <ul className="space-y-3">
                      {productInfo?.map(({ id, item }: any) => (
                        <li className="flex" key={id}>
                          <div className="flex h-6 items-center">
                            <CheckIcon className="text-primary-600" />
                          </div>
                          <p className="ml-2">{item}</p>
                        </li>
                      ))}
                    </ul>

                    <h3 className="my-4 font-medium text-primary-400">All memberships receive</h3>

                    <ul className="space-y-3">
                      {all_1?.map(({ id, item }: any) => (
                        <li className="flex" key={id}>
                          <div className="flex h-6 items-center">
                            <CheckIcon className="text-primary-600" />
                          </div>
                          <p className="ml-2">{item}</p>
                        </li>
                      ))}
                    </ul>

                    <h3 className="my-4 font-medium text-primary-400">
                      Full suite design options for book printing
                    </h3>

                    <ul className="space-y-3">
                      {all_2?.map(({ id, item }: any) => (
                        <li className="flex" key={id}>
                          <div className="flex h-6 items-center">
                            <CheckIcon className="text-primary-600" />
                          </div>
                          <p className="ml-2">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>

                <details className="open-details cursor-pointer pt-4">
                  <summary>
                    <div className="flex items-center justify-between text-secondary-600">
                      <div className="text-xl font-medium">Money-Back Guarantee</div>
                      <PlusIcon className="h-6 w-6 open-details:hidden" />
                      <MinusIcon className="hidden h-6 w-6 open-details:block" />
                    </div>
                  </summary>

                  <div className="hidden py-4 open-details:block">
                    <p>
                      The Family Fortunate experience is risk-free, with a 30 day money back
                      guarantee. If for any reason you or your relative are not satisfied by the
                      experience or the result, simply send us an email and we will give you a full
                      refund, no questions asked.
                    </p>
                  </div>
                </details>
              </dl> */}
            </div>
          </div>

          <div className="md:order-1">
            <Image
              className="w-full"
              src="/images/cover@4x.jpg"
              alt="Cover"
              width="548"
              height="636"
              priority={false}
            />
          </div>
        </div>
      </section>

      <section className="bg-black-pearl pt-20 pb-16 text-white">
        <div className="container">
          <div className="marquee gift flex overflow-hidden whitespace-nowrap">
            <h2 className="mr-4 bg-texture bg-clip-text pb-2 font-serif text-[8rem] font-bold text-transparent">
              The gift that lasts a lifetime.
            </h2>
          </div>

          <div className="swiper presentation">
            <div className="swiper-wrapper mt-8 pb-32">
              <div className="swiper-slide flex flex-col items-center">
                <h3 className="font-serif text-3xl font-bold leading-none md:order-2 md:mt-8 md:text-5xl lg:text-6xl">
                  <span className="block text-white/40">Preserve family memories to</span>
                  <span className="block sm:ml-4 md:ml-8">Pass on to future generations</span>
                </h3>

                <Image
                  className="mt-8 w-full md:order-1 md:mt-0 md:pr-24"
                  src="/images/slide-images/slide-image-1@1x.jpg"
                  alt=""
                  width="1060"
                  height="660"
                />
              </div>

              <div className="swiper-slide flex flex-col items-center">
                <h3 className="font-serif text-3xl font-bold leading-none md:order-2 md:mt-8 md:text-5xl lg:text-6xl">
                  <span className="block text-white/40">Give a gift to someone who&apos;s</span>
                  <span className="block sm:ml-4 md:ml-8">story you&apos;d like to hear</span>
                </h3>

                <Image
                  className="mt-8 w-full md:order-1 md:mt-0 md:pr-24"
                  src="/images/slide-images/slide-image-2@1x.jpg"
                  alt=""
                  width="1060"
                  height="660"
                />
              </div>

              <div className="swiper-slide flex flex-col items-center">
                <h3 className="font-serif text-3xl font-bold leading-none md:order-2 md:mt-8 md:text-5xl lg:text-6xl">
                  <span className="block text-white/40">Choose the date you&apos;d</span>
                  <span className="block sm:ml-4 md:ml-8">like your gift to commence</span>
                </h3>

                <Image
                  className="mt-8 w-full md:order-1 md:mt-0 md:pr-24"
                  src="/images/slide-images/slide-image-3@1x.jpg"
                  alt=""
                  width="1060"
                  height="660"
                />
              </div>
            </div>
            <button
              className="swiper-prev top-[40%] right-0 z-50 ml-auto flex h-8 w-8 items-center justify-center rounded-full border border-primary-100/30 disabled:opacity-50 md:absolute md:ml-0 md:h-16 md:w-16 md:-translate-y-1/2 lg:top-[42%]"
              type="button"
            >
              <ArrowLongLeftIcon className="h-4 w-4 md:h-8 md:w-8 " />
            </button>
            <button
              className="swiper-next top-1/2 right-0 z-50 ml-auto flex h-8 w-8 items-center justify-center rounded-full border border-primary-100/30 disabled:opacity-50 md:absolute md:ml-0 md:h-16 md:w-16 md:-translate-y-1/2"
              type="button"
            >
              <ArrowLongRightIcon className="h-4 w-4 md:h-8 md:w-8 " />
            </button>
          </div>
        </div>
      </section>

      <section className="overflow-hidden px-10 pt-14 pb-6" id="founder">
        <div className="relative mx-auto grid max-w-screen-md grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
          <div className="relative z-10">
            <h2 className="font-serif text-6xl font-bold">
              <span className="block text-[#ca8e22]/30">Preserving</span>{' '}
              <span className="ml-16 block italic text-[#ca8e22]">precious memories.</span>
            </h2>

            <p className="mt-8">
              As a funeral celebrant of 9 years, our founder Rachel Michael has heard many stories
              from families after their loved ones have passed away. Over time, she&apos;s realized
              there are many more stories that families never get to hear.
            </p>

            <p className="mt-4">
              Family Fortunate was inspired by her work and is designed to give families the
              opportunity to gather precious memories whilst the opportunity is there.
            </p>

            <p className="mt-4">
              Family Fortunate is dedicated to the thousands of people she has had the privilege to
              assist as they grieve the loss of the people they love.
            </p>
          </div>

          <div className="relative z-10">
            <div className="aspect-h-4 aspect-w-3">
              <Image
                className="object-cover object-center"
                src="/images/founder/rachel-michael-portrait@4x.jpg"
                alt="Rachel Michael"
                width="312"
                height="456"
                priority={false}
              />
            </div>

            <div className="mt-4">
              <div className="font-serif text-[2rem] font-bold leading-none">Rachel Michael</div>
              <div className="mt-1 text-lg font-medium">Founder</div>
            </div>
          </div>

          <Image
            className="pointer-events-none absolute top-0 -right-1/2 h-auto w-full select-none object-cover object-left"
            src="/images/founder/golden-sand-explosion.jpg"
            alt=""
            width="1124"
            height="736"
            priority={false}
          />
        </div>
      </section>

      <Testimonials />

      <Newsletter />

      <Footer />
    </div>
  )
}
