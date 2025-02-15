import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from '../../components/Button'
import Heading from '../../components/Heading'
import Logo from '../../components/Logo'
import Payin4 from '../../components/Payin4'
import { PaymentForm } from '../../components/PaymentForm'
import axios from 'axios'
import dateFormat from 'dateformat'
import { LockClosedIcon, ReceiptRefundIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/24/solid'

export default function Checkout(props: { ClientToken: any; ClientID: any }) {
  const [user, setUser] = useState({
    planType: '',
    firstname: '',
    lastname: '',
    email: '',
    giftDate: '',
    giftSender: '',
    giftMessage: '',
    giftOccasion: '',
    bookReceiver: '',
  })

  const [couponCode, setCouponCode] = useState('')
  const [price, setPrice] = useState(97)
  const [isValidCoupon, setValidCoupon] = useState(false)
  const [discountAmount, setDiscountAmount] = useState(0)
  const [originalPrice, setOriginalPrice] = useState(97)
  const [showDiscount, setShowDiscount] = useState(true)

  const { ClientToken, ClientID } = props
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${id}`)

        if (response.data.result === null || response.data.result.orderId) {
          // redirect to sign in if user already subscribed
          router.push('/sign-in')
        } else {
          setUser(response.data.result)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchUser()
  }, [router, id])

  useEffect(() => {
    setPrice(user?.planType === 'Premium' ? 159 : 97)
    setOriginalPrice(user?.planType === 'Premium' ? 159 : 97)
  }, [user])

  useEffect(() => {
    if (couponCode.length === 0) {
      setValidCoupon(false)
      setDiscountAmount(0)
      setValidCoupon(false)
    }
  }, [couponCode])
  return (
    <>
      <div className="relative grid max-w-full grid-cols-1 items-start bg-black-pearl lg:grid-cols-2">
        <div className="h-screen bg-white pr-10 pl-10 lg:pr-24 lg:pl-48">
          <div className="my-5 grid grid-cols-1 items-center justify-between gap-10 lg:grid-cols-2">
            <Link href="/" className="!block lg:inline-block">
              <span className="sr-only">Go home</span>
              <Logo className="mx-auto h-24 w-auto lg:mx-0" isWhite={false} />
            </Link>
            <div className="flex items-start justify-center space-x-8">
              <div className="flex items-center text-primary-600">
                <Payin4 className="mx-auto" />
                <div className="text-xs">PayPal Pay in 4</div>
              </div>
              <div className="flex items-center text-primary-600">
                <LockClosedIcon className="mx-auto h-6 w-6" />
                <div className="text-xs">Secure Checkout</div>
              </div>

              <div className="flex items-center text-primary-600">
                <ReceiptRefundIcon className="mx-auto h-6 w-6" />
                <div className="text-xs">Money-Back Guarantee</div>
              </div>
            </div>
          </div>

          {ClientToken && (
            <PaymentForm clientToken={ClientToken} clientID={ClientID} user={user} price={price} />
          )}
          <hr className="mt-16 w-full lg:mt-20" />
          <ul className="my-5 flex space-x-3">
            <li className="block text-xs text-black-pearl hover:text-black-pearl/75">
              <Link href={'/refund-policy'}>Refund Policy</Link>
            </li>
            <li className="block text-xs text-black-pearl hover:text-black-pearl/75">
              <Link href={'/privacy-policy'}>Privacy Policy</Link>
            </li>
            <li className="block text-xs text-black-pearl hover:text-black-pearl/75">
              <Link href={'/terms-of-service'}>Terms of Service</Link>
            </li>
          </ul>
        </div>
        <div className="order-first py-10 pl-10 pr-10 lg:order-last lg:py-16 lg:pl-24 lg:pr-48">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <Image
                className="w-20 rounded-lg"
                src="/images/cover@4x.jpg"
                alt="Cover"
                width="50"
                height="50"
                priority={false}
              />
              <div>
                <Heading size={6} className="text-white">
                  {user?.planType} Family Fortunate Membership
                </Heading>
                {user?.bookReceiver === 'gift' && (
                  <div className="mt-2 flex flex-col text-xs text-white/80">
                    <p>First name: {user?.firstname}</p>
                    <p>Last name: {user?.lastname}</p>
                    <p>Email Address: {user?.email}</p>
                    <p>Gift Date: {dateFormat(user?.giftDate, 'longDate')} </p>
                    <p>Occasion: {user?.giftOccasion}</p>
                    <p>From: {user?.giftSender}</p>
                    <p>Message: {user?.giftMessage}</p>
                  </div>
                )}
              </div>
            </div>

            <Heading size={4} className="text-white">
              ${price}
            </Heading>
          </div>
          {showDiscount && (
            <>
              <hr className="mt-5 w-full border-white/80" />
              <div className="m-5 flex items-start gap-4 lg:m-8">
                <div>
                  <input
                    className={`w-full rounded-lg border-2 bg-transparent px-3 py-3 text-white shadow-sm transition focus:outline-none ${
                      couponCode && !isValidCoupon
                        ? 'border-red-300 focus:border-red-400'
                        : 'border-gray-300 focus:border-lemon-curry'
                    }`}
                    type="text"
                    placeholder="Discount Code"
                    value={couponCode}
                    onChange={(event) => setCouponCode(event.target.value)}
                  />
                  {couponCode && !isValidCoupon && (
                    <p className="mt-2 text-xs text-red-400">Enter a valid discount code</p>
                  )}
                </div>

                <Button
                  className="w-20 shrink-0"
                  type={'button'}
                  color={'secondary'}
                  onClick={async () => {
                    const validate = await axios.post('/api/coupon/validate', {
                      coupon: couponCode,
                    })
                    if (validate.status === 201) {
                      if (validate.data.result) {
                        const { amount, type } = validate.data.result

                        const discounted =
                          type === 'percentage' ? price - (price * amount) / 100 : price - amount
                        // setPrice()
                        setDiscountAmount(type === 'percentage' ? (price * amount) / 100 : amount) //amount to be discounted
                        setValidCoupon(true) //set valid coupon to true
                        setPrice(discounted) //set price with discount
                        setShowDiscount(false)
                      } else {
                        //reset
                        setValidCoupon(false)
                        setDiscountAmount(0)
                        setValidCoupon(false)
                      }
                    }
                  }}
                >
                  Apply
                </Button>
              </div>
            </>
          )}

          <hr className="mt-5 w-full border-white/80" />
          {couponCode && isValidCoupon && (
            <>
              <div className="mt-5 flex justify-between">
                <p className="text-sm text-white">Subtotal</p>
                <div className="inline-flex items-end">
                  <p className="text-sm text-white">${originalPrice}</p>
                </div>
              </div>
              <div className="mt-3 flex justify-between">
                <p className="flex items-center gap-2 text-sm text-white">
                  Discount{' '}
                  <span className="flex items-center rounded bg-lemon-curry p-1 text-white">
                    {couponCode}{' '}
                    <XMarkIcon
                      className="h-6 w-6 cursor-pointer text-white"
                      onClick={() => {
                        setShowDiscount(true)
                        setCouponCode('')
                        setPrice(originalPrice)
                      }}
                    />{' '}
                  </span>
                </p>
                <div className="inline-flex items-end">
                  <p className="text-sm text-white">-${discountAmount}</p>
                </div>
              </div>
            </>
          )}
          <div className="mt-3 flex justify-between">
            <p className="text-bold text-xl text-white">Total</p>
            <div className="inline-flex items-end">
              <p className="mr-2 text-xs text-secondary-100/70">USD</p>
              <p className="text-bold text-xl text-white">${price}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
const dev = process.env.NODE_ENV !== 'production'
export const server = dev ? 'http://localhost:3000' : 'https://www.familyfortunate.us'
export async function getServerSideProps({ query }: any) {
  const response = await fetch(`${server}/api/paypal/tokens`)
  const data = await response.json()
  const { client_token } = data
  const { NEXT_PUBLIC_PAYPAL_CLIENT_ID } = process.env
  if (!query.id) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      ClientToken: client_token,
      ClientID: NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    },
  }
}
