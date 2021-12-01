import classes from './newsletter-registration.module.css';
import { useRef, useContext } from 'react';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
  const inputRef = useRef('');
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();
    const input = inputRef.current.value;

    notificationCtx.showNotification({
      title: 'Signing Up',
      message: 'Registering for newsletter',
      status: 'pending'
    });
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
      /// Error checking
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((data) => {
          throw new Error(data.message || 'Something went wrong');
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: 'Success',
          message: 'Registered for newsletter!',
          status: 'success'
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error',
          message: error.message || 'There has been an error registering.',
          status: 'error'
        });
      });
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
