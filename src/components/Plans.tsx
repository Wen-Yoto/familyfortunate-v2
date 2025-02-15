import { useState } from 'react'
import Button from '../components/Button'
import CheckIcon from './CheckIcon'
import { Card } from 'flowbite-react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid'

export default function Plans({ name, price, features, isPopular }: any) {
  const [showMore, setShowMore] = useState(false)

  return (
    <div className="text-left">
      <Card
        className={`flex flex-col justify-between overflow-hidden rounded-lg border-none bg-white shadow-lg dark:bg-white`}
      >
        <div className="relative grid grid-cols-1 items-center justify-between px-6 py-4 lg:grid-cols-2">
          {isPopular && (
            <span className="absolute top-0 left-4 mt-5 ml-2 inline-flex h-6 items-center justify-center rounded-full bg-eggshell px-2">
              <span className="text-xs font-bold text-lemon-curry ">Most Popular</span>
            </span>
          )}
          <h3 className="mt-10 text-left text-lg font-semibold lg:text-2xl">{name} Membership</h3>
          <div className="flex items-start sm:items-center">
            <p className="flex items-start text-4xl font-bold lg:text-5xl">
              <span className="text-2xl lg:text-3xl">$</span>
              {price}
            </p>
            <p className="ml-1 mt-2 text-lg text-secondary-600 lg:mt-5">
              per year <span className="text-xs uppercase">(usd)</span>
            </p>
          </div>
        </div>

        <hr className="w-full" />
        <div className="px-6 py-4">
          <p className="text-left text-sm font-bold text-gray-800">FEATURES</p>
          {isPopular && (
            <p className="mt-2 text-sm text-gray-600">
              Everything in our <span className="font-bold">classic membership</span> plus....
            </p>
          )}
          <ul className="my-8 flex flex-col gap-4">
            {features?.map((feature: { id: any; item: any }, index: any) => (
              <li
                className={`flex items-center gap-3 ${index > 4 && (!showMore ? 'hidden' : '')}`}
                key={feature.id}
              >
                <CheckIcon className="h-4 w-4 shrink-0 text-lemon-curry lg:h-8 lg:w-8" />
                <span className="lg:text-normal text-sm text-secondary-600">{feature.item}</span>
              </li>
            ))}
            {features?.length > 5 && (
              <li
                className="cursor-pointer text-lemon-curry"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? (
                  <>
                    <MinusIcon className="mr-3 inline-block h-4 w-4" />
                    <span>Show less</span>
                  </>
                ) : (
                  <>
                    <PlusIcon className="mr-3 inline-block h-4 w-4" />
                    <span>Show more</span>
                  </>
                )}
              </li>
            )}
          </ul>
          <hr className="w-full" />
          <Button
            type="link"
            color="yellow"
            href={`/get-started?plan=${name}`}
            className="mt-4 w-full"
          >
            Choose {name}
          </Button>
        </div>
      </Card>
    </div>
  )
}
