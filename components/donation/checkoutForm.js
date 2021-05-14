import React, { useState } from 'react'
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js'
import { destroyCookie } from 'nookies'
import styles from '../../styles/donation/checkoutForm.module.scss'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_CMCXgPpoZEsrGyGpR7XdKnLL00eUaQ4SFc')
const createOptions = () => {
    return {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#9e2146'
            }
        }
    }
}

const CheckoutForm = ({ paymentIntent }) => {
    const stripe = useStripe()
    const elements = useElements()

    const [checkoutError, setCheckoutError] = useState()
    const [checkoutSuccess, setCheckoutSuccess] = useState()

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return <div>loading..</div>
        }

        try {
            const payment = await stripe.confirmCardPayment(paymentIntent.client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            })

            if (payment.error) {
                throw new Error(payment.error.message)
            }

            if (payment.paymentIntent.status === 'succeeded') {
                setCheckoutSuccess(true)
                destroyCookie(null, 'paymentIntentId')
            }
        } catch (err) {
            setCheckoutError(err.message)
        }
    }

    if (checkoutSuccess) {
        return (
            <div className={styles.success_container}>
                <span>Payment successful! thanks for donation</span>{' '}
            </div>
        )
    }

    return (
        <div className={styles.cardsection}>
            <form onSubmit={handleSubmit}>
                <div className={checkoutError ? styles.error_container : ''}>
                    {checkoutError && <span>{checkoutError}</span>}
                </div>
                <label>
                    Card Details
                    <CardElement options={createOptions()} className={styles.StripeElement} />
                </label>
                <button className={styles.button} type="submit" disabled={!stripe}>
                    Confirm Donation
                </button>
            </form>
        </div>
    )
}

const CheckoutElement = ({ paymentIntent }) => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm paymentIntent={paymentIntent} />
        </Elements>
    )
}

export default CheckoutElement
