import Stripe from 'stripe'
import { parseCookies, setCookie } from 'nookies'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import DonationInfo from '../components/donation/donationInfo'
import DonorInfo from '../components/donation/donorInfo'
import PaymentInfo from '../components/donation/paymentInfo'

import CheckoutForm from '../components/donation/checkoutForm'
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
const MONEY_AMOUNT = 25

export default function DonationPage({ paymentIntent }) {
    return (
        <div>
            <DonationInfo />
            <DonorInfo />
            <PaymentInfo />
            <Elements stripe={stripePromise}>
                <CheckoutForm paymentIntent={paymentIntent} />
            </Elements>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2020-08-27'
    })

    // let subscriptionIntent = await stripe.subscriptions.create({
    //     customer: 'sido@gmail.com',
    //     items: [{ donation: '100 USD donation', price: MONEY_AMOUNT * 100 }]
    // })

    let paymentIntent

    const { paymentIntentId } = parseCookies(context)
    if (paymentIntentId) {
        paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

        return {
            props: {
                paymentIntent
            }
        }
    }

    paymentIntent = await stripe.paymentIntents.create({
        amount: MONEY_AMOUNT * 100,
        currency: 'usd',
        description: 'one time donation',
        payment_method_types: ['card']
    })
    setCookie(context, 'paymentIntentId', paymentIntent.id)

    return {
        props: {
            paymentIntent
        }
    }
}
