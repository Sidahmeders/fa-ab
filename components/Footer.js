import footerStyles from '../styles/Footer.module.scss'

const Footer = () => {
    return (
        <div>
            <footer className={footerStyles.footer}>
                <section className={footerStyles.foot}>
                    <h3>Community Foundation</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
                        officiis.
                        <br />
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio in deserunt
                        fuga rerum sapiente. sVoluptas sint mollitia asperiores velit cum, quod amet
                        voluptates fuga quos culpa provident sequi maxime quas.
                        <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam iure
                        accusamus, ducimus nobis eos voluptate, in mollitia itaque laudantium natus
                        placeat nulla commodi, facilis.
                    </p>
                </section>

                <section className={footerStyles.foot}>
                    <h3>Join The Community</h3>
                    <ul className={footerStyles.ul}>
                        <li className={footerStyles.li}>
                            <a href="#">Community1</a>
                        </li>
                        <li className={footerStyles.li}>
                            <a href="#">Community2</a>
                        </li>
                        <li className={footerStyles.li}>
                            <a href="#">Community3</a>
                        </li>
                        <li className={footerStyles.li}>
                            <a href="#">Community4</a>
                        </li>
                        <li className={footerStyles.li}>
                            <a href="#">Other Communities</a>
                        </li>
                        <li className={footerStyles.li}>
                            <a href="#">Community6</a>
                        </li>
                        <li className={footerStyles.li}>
                            <a href="#">Other Communities</a>
                        </li>
                    </ul>
                </section>

                <section className={footerStyles.foot}>
                    <h3>Follow Us On</h3>
                    <span>
                        <a href="#">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="#">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#">
                            {' '}
                            <i className="fab fa-instagram"></i>
                        </a>
                    </span>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet vel, quasi
                        praesentium repellat dolores iste necessitatibus, fugit aliquid quia dolore
                        dignissimos, voluptas magnam ipsum? Maiores, debitis voluptate. Deleniti,
                        molestiae libero.
                    </p>
                </section>
            </footer>
        </div>
    )
}

export default Footer
