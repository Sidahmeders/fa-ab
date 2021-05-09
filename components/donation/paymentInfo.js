import commonStyles from '../../styles/donation/common.module.scss'
import Image from 'next/image'
import { useState } from 'react'

export default function PaymentInfo() {
    const [paymentInfo, setPaymentInfo] = useState({
        street_address: '',
        address_line2: '',
        city: '',
        state: ''
    })

    // pass the payment info to the stripe payment intent and customer
    console.log(paymentInfo)

    return (
        <div className={commonStyles.donation_container}>
            <h3>3. payment information</h3>
            <hr />
            <div className={commonStyles.checkout_steps}>
                <Image
                    src="/images/donation-3.png"
                    alt="donation-3"
                    width={400}
                    height={40}
                    quality={25}
                />
            </div>
            <div className={`${commonStyles.form_wrapper} ${commonStyles.payment_wrapper}`}>
                <div>
                    <label>Street Address</label>
                    <input type="text" name="street-address" />
                </div>
                <div>
                    <label>Address Line 2</label>
                    <input type="text" name="address" />
                </div>
                <div>
                    <label>City</label>
                    <input type="text" name="city" />
                </div>
                <div>
                    <label>State</label>
                    <input type="text" name="state" />
                </div>
            </div>
        </div>
    )
}
