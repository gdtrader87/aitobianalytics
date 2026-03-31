import Footer from "../components/Footer/Footer"
import SectionHeading from "../components/SectionHeading/SectionHeading"
import SubscribeForm from "../components/SubscribeForm/SubscribeForm"
import data from "../data.json";

const Newsletter = () => {
    return (
        <main className="wrapper" id="newsletter">
            <div className="container">
                <div className="newsletter-content">
                    <div>
                        <div className="profile-container">
                            <div className="profile">
                                <img src="/images/newsletter.png" alt="Profile" />
                            </div>
                        </div>
                        <div className="section-title pb-200">
                            <SectionHeading title="AI to BI Analytics Insider" subTitle="" className="text-center mb-3 m-0" />
                            <p
                                className="text-center"
                                style={{ maxWidth: '600px', margin: '0 auto' }}
                                data-aos="fade-up" data-aos-duration="800" data-aos-delay="300"
                            >
                                Free Weekly AI to BI Analytics Newsletter. Join 23k Analytics professionals, like-minded individuals and entrepreneurs. 
                                Lightweight, easy-read - directly to your inbox every week. 
                               </p>
                        </div>
                    </div>
                    <SubscribeForm />
                </div>
            </div>
            <Footer data={data.footerData} />
        </main>
    )
}

export default Newsletter