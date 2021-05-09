import styles from '../../styles/donation/donationInfo.module.scss'
import commonStyles from '../../styles/donation/common.module.scss'
import Image from 'next/image'
import { useState } from 'react'

export default function DonationInfo() {
    // you can set this values on the context or else where when
    // you can access then in the stripe paymentInten and customer creation
    const [donationAmount, setDonationAmount] = useState(undefined)
    const [donationMethod, setDonationMethod] = useState(undefined)
    const [otherAmount, setOtherAmount] = useState(false)

    const [donationAmountbuttons, setDonationAmountButtons] = useState([
        { amount: 25 },
        { amount: 50 },
        { amount: 100 },
        { amount: 1000 },
        { amount: 'other' }
    ])

    const [donationMethodButtons, setDonationMethodButtons] = useState([
        {
            text: 'One-time Donation',
            donationMethod: 'one-time',
            dotStyle: styles.dot,
            optionStyle: styles.option
        },
        {
            text: 'Monthly Donation',
            donationMethod: 'monthly',
            dotStyle: styles.dot,
            optionStyle: styles.option
        }
    ])

    const handleOtherPaymentAmount = (event) => {
        setOtherAmount('')
        setDonationAmount(() => '')
        handleFocusedAmountStyle(event)
    }

    const hideOtherAmount = (event) => {
        setOtherAmount(false)
        const selectedAmount = event.target.innerText.split('.')[0]
        setDonationAmount(() => selectedAmount)
        handleFocusedAmountStyle(event)
    }

    const handleFocusedAmountStyle = (event) => {
        const innerText = event.target.innerText
        const updatedButtons = []
        donationAmountbuttons.map((btn) => {
            btn.style = ''
            if (btn.amount + '.00' === innerText) {
                btn.style = 'focused_amount'
            } else if (btn.amount === innerText) {
                btn.style = 'focused_amount'
            }

            updatedButtons.push(btn)
        })
        setDonationAmountButtons(() => updatedButtons)
    }

    const selectDonationAmount = (event) => {
        let selectedAmount = event.target.value
        if (selectedAmount !== false) {
            setOtherAmount(() => selectedAmount)
            setDonationAmount(() => selectedAmount)
        }
    }

    const handleDonationMethod = (selectedMethod) => {
        setDonationMethod(() => selectedMethod)
        handleDonationMethodStyle(selectedMethod)
    }

    const handleDonationMethodStyle = (selectedMethod) => {
        let updatedButtons = []
        donationMethodButtons.map((btn) => {
            if (btn.donationMethod == selectedMethod) {
                btn.optionStyle = `${styles.option} ${styles.focused_method}`
            } else {
                btn.optionStyle = styles.option
            }
            updatedButtons.push(btn)
        })
        setDonationMethodButtons(() => updatedButtons)
    }

    return (
        <div className={commonStyles.donation_container}>
            <h2 className={styles.header}>
                Giving is not just about making a donation. It is about making a difference
            </h2>
            <h3>1. donation information</h3>
            <hr />
            <div className={commonStyles.checkout_steps}>
                <Image
                    src="/images/donation-1.png"
                    alt="donation-1"
                    width={400}
                    height={40}
                    quality={25}
                />
            </div>
            <div className={styles.amounts_container}>
                <div className={styles.amount_btn}>
                    {donationAmountbuttons.map((btn, index) =>
                        btn.amount === 'other' ? (
                            <button
                                key={index}
                                className={styles[btn.style]}
                                onClick={handleOtherPaymentAmount}>
                                {btn.amount}
                            </button>
                        ) : (
                            <button
                                key={index}
                                className={styles[btn.style]}
                                onClick={hideOtherAmount}>
                                {btn.amount}.00
                            </button>
                        )
                    )}
                </div>
                {otherAmount !== false ? (
                    <div className={styles.input_amount}>
                        <label>donation Amount</label>
                        <input
                            name="amount"
                            type="number"
                            min="1"
                            value={otherAmount}
                            onChange={selectDonationAmount}
                        />
                    </div>
                ) : (
                    ''
                )}
            </div>
            <div className={styles.wrapper}>
                {donationMethodButtons.map((btn) => (
                    <div
                        key={btn.donationMethod}
                        className={btn.optionStyle}
                        onClick={() => handleDonationMethod(btn.donationMethod)}>
                        <div className={btn.dotStyle}></div>
                        <span>{btn.text}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
