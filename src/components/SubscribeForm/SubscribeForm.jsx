import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMailChimp, Status } from '../../hooks/useMailchimp';

const SubscribeForm = () => {
    const [form, setForm] = React.useState({ email: '' });
    const { subscribe, status, error, value } = useMailChimp("https://alphadatacapital.us13.list-manage.com/subscribe/post?u=657068329fd2eddbde51ee68b&amp;id=9936fe46d2&amp;f_id=00f361e1f0");
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.email === '') return;
        subscribe({
            EMAIL: form.email,
        });
    };

    useEffect(() => {
        let timer;
        if (status === Status.success) {
            timer = setTimeout(() => {
                navigate('/', { state: { scrollTo: 'home' } });
            }, 3000); // Redirect after 3 seconds
        }
        return () => clearTimeout(timer);
    }, [status, navigate]);

    return (
        <section
            className='container'
            data-aos="fade-up" data-aos-duration="800" data-aos-delay="400"
        >
            <div className="newsletter-container">
                <h2 className="newsletter-title">Subscribe to our Newsletter</h2>
                <p className="newsletter-text">
                Subscribe now and receive a free eBook: "Future of coaching: AI Analytics in goal tracking "
                </p>
                <form onSubmit={handleSubmit} className="newsletter-form">
                    <input
                        type="email"
                        name='email'
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        className="newsletter-input"
                        required
                    />
                    <button type="submit" className="newsletter-button">
                        {status === Status.loading ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </form>
                {status === Status.error && (
                    <p className="mt-3 text-danger">Error: {error}</p>
                )}
                {status === Status.success && (
                    <p className="mt-3" style={{ color: '#50E3C2' }}>
                        {value && value.includes('Already subscribed')
                            ? "You're already subscribed!"
                            : 'Successfully subscribed! Redirecting to home page...'}
                    </p>
                )}
            </div>
        </section>
    );
};

export default SubscribeForm;


// import React from 'react';
// import { useMailChimp, Status } from '../../hooks/useMailchimp';

// const SubscribeForm = () => {
//     const [form, setForm] = React.useState({ email: '' });
//     const { subscribe, status, error, value } = useMailChimp('https://alphadatacapital.us12.list-manage.com/subscribe/post?u=8cff13e9224262e25f76a2f2d&amp;id=d3f90576f8&amp;f_id=0001e6e0f0');

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setForm((prevForm) => ({
//             ...prevForm,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (form.email === '') return;
//         subscribe({
//             EMAIL: form.email,
//         });
//     };

//     return (
//         <section className='container'>
//             <div className="newsletter-container">
//                 <h2 className="newsletter-title">Subscribe to our Newsletter</h2>
//                 <p className="newsletter-text">
//                     Want to keep up to date with all our latest news and information?
//                 </p>
//                 <form onSubmit={handleSubmit} className="newsletter-form">
//                     <input
//                         type="email"
//                         name='email'
//                         value={form.email}
//                         onChange={handleInputChange}
//                         placeholder="Enter your email address"
//                         className="newsletter-input"
//                         required
//                     />
//                     <button type="submit" className="newsletter-button">
//                         {status === Status.loading ? 'Subscribing...' : 'Subscribe'}
//                     </button>
//                 </form>
//                 {status === Status.error && (
//                     <p className="mt-3 text-danger">Error: {error}</p>
//                 )}
//                 {status === Status.success && (
//                     <p className="mt-3" style={{ color: '#50E3C2' }}>
//                         {value && value.includes('Already subscribed')
//                             ? "You're already subscribed!"
//                             : 'Successfully subscribed!'}
//                     </p>
//                 )}
//             </div>
//         </section>
//     );
// };

// export default SubscribeForm;