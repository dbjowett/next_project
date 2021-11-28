import classes from './newsletter-registration.module.css';
import { useRef } from 'react';

function NewsletterRegistration() {
  const inputRef = useRef('');

  function registrationHandler(event) {
    event.preventDefault();
    const input = inputRef.current.value;

    // JS object
    const reqBody = { input };

    const config = {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch('/api/signup', config)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input type='email' id='email' placeholder='Your email' aria-label='Your email' ref={inputRef} />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
