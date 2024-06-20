import ContactImg from "../../assets/img/pages/contact.jpg";
import "./Contact.css"
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import PageLayout from "../../layouts/PageLayout";

const Contact = () => {
    return (
        <PageLayout>
            <SectionTitle title="Contacteer ons" />
            <div className="form__container">
                <img src={ContactImg} alt="KSA Oosterzele contact" className="round-image" width="320" height="320" />
                <div className="contact-items">
                    <p>U kan ons het best contacteren via mail of telefonisch</p>
                    <p><strong>ksaoosterzele9860@gmail.com</strong></p>
                    <p><strong>0491 36 52 60</strong> (Gilles Dujardin - bondsleider)</p>
                    <p><strong>0479 09 91 56</strong> (Robin Impe - bondsleider)</p>
                    <br />
                    <p>Voor kleren of andere accessoires te kopen:</p>
                    <a className="cursive" href="https://www.ksa.be/webshop/ksa-nationaal" target="_blank" rel="noreferrer">KSA Nationaal Webshop</a>
                </div>
            </div>
        </PageLayout>
    );
}

export default Contact;