import commonStyles from '../../styles/donation/common.module.scss'
import Image from 'next/image'
import { useState } from 'react'

export default function DonorInfo() {
    // set the person info and pass them to the stripe create customer
    const [donorInfo, setDonorInfo] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: ''
    })

    return (
        <div className={commonStyles.donation_container}>
            <h3>2. donor information</h3>
            <hr />
            <div className={commonStyles.checkout_steps}>
                <Image
                    src="/images/donation-2.png"
                    alt="donation-2"
                    width={400}
                    height={40}
                    quality={25}
                />
            </div>
            <div className={`${commonStyles.form_wrapper} ${commonStyles.donor_wrapper}`}>
                <div>
                    <label>First name</label>
                    <input type="text" name="f_name" />
                </div>
                <div>
                    <label>Last name</label>
                    <input type="text" name="l_name" />
                </div>

                <div>
                    <label>Email</label>
                    <input type="text" name="email" />
                </div>
                <div>
                    <label>Phone number</label>
                    <input type="text" name="phone-number" />
                </div>
            </div>
        </div>
    )
}
