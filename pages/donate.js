import Stripe from 'stripe'
import { parseCookies, setCookie } from 'nookies'
import DonationInfo from '../components/donation/donationInfo'
import DonorInfo from '../components/donation/donorInfo'
import PaymentInfo from '../components/donation/paymentInfo'
import CheckoutElement from '../components/donation/checkoutForm'
import { ContextConsumer } from './_context'
import { useContext } from 'react'
import { useRouter } from 'next/router'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27'
})

export default function DonationPage({ paymentIntent }) {
    const context = useContext(ContextConsumer)
    const { customerData, setCustomerData } = context
    const router = useRouter()

    const handlePaymentIntentUpdate = (event) => {
        event.preventDefault()

        setCustomerData(() => {
            return {
                ...customerData,
                donationAmount: 80
            }
        })

        let MONEY_AMOUNT = customerData.donationAmount

        router.push(
            {
                pathname: '/donate',
                query: { name: 'Ahmed', MONEY_AMOUNT: MONEY_AMOUNT }
            },
            undefined,
            { shallow: true }
        )
    }

    return (
        <div>
            <DonationInfo />
            <DonorInfo />
            <PaymentInfo />
            <CheckoutElement paymentIntent={paymentIntent} />
            <button onClick={handlePaymentIntentUpdate}>Change donationAmount</button>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    // let subscriptionIntent = await stripe.subscriptions.create({
    //     customer: 'sido@gmail.com',
    //     items: [{ donation: '100 USD donation', price: MONEY_AMOUNT * 100 }]
    // })

    const {
        query: { MONEY_AMOUNT }
    } = context

    let paymentIntent

    const { paymentIntentId, paymentIntentAmount } = parseCookies(context)

    if (paymentIntentId) {
        if (MONEY_AMOUNT && MONEY_AMOUNT !== paymentIntentAmount) {
            paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
                amount: MONEY_AMOUNT * 100,
                metadata: {
                    paymentIntentUpdate_date: Date.now(),
                    reason: 'who knows why'
                }
            })
            setCookie(context, 'paymentIntentAmount', MONEY_AMOUNT)
        } else {
            paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
        }

        return {
            props: {
                paymentIntent
            }
        }
    }

    paymentIntent = await stripe.paymentIntents.create({
        amount: 100,
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
