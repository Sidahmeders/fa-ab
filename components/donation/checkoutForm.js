import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { destroyCookie } from 'nookies'
import styles from '../../styles/donation/checkoutForm.module.scss'

const CheckoutForm = ({ paymentIntent }) => {
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

    const stripe = useStripe()
    const elements = useElements()
    const [checkoutError, setCheckoutError] = useState()
    const [checkoutSuccess, setCheckoutSuccess] = useState()

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return
        }

        try {
            const {
                error,
                paymentIntent: { status }
            } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            })

            if (error) {
                throw new Error(error.message)
            }

            if (status === 'succeeded') {
                setCheckoutSuccess(true)
                destroyCookie(null, 'paymentIntentId')
            }
        } catch (err) {
            alert(err.message)
            setCheckoutError(err.message)
        }
    }

    if (checkoutSuccess) {
        return <p>Payment successful! means money gone</p>
    }

    return (
        <div className={styles.cardsection}>
            <form onSubmit={handleSubmit}>
                <label>
                    Card Details
                    <CardElement options={createOptions()} className={styles.StripeElement} />
                </label>
                <button className={styles.button} type="submit" disabled={!stripe}>
                    Donate now
                </button>
                {checkoutError && <span style={{ color: 'red' }}>{checkoutError}</span>}
            </form>
        </div>
    )
}

export default CheckoutForm
