import Image from 'next/image'
import styles from '../../styles/Home/Hero.module.scss'

const Hero = () => {
    return (
        <div className={styles.container}>
            <Image
                className={styles.heroImg}
                src="/images/bert.jpg"
                alt="Bert"
                layout="fill"
                quality={25}
            />
        </div>
    )
}

export default Hero
