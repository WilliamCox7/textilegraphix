import { React } from '../../../packages';
import { contactHeader } from '../../../assets';

export function template(Contact) {
  return (
    <div className="Contact">
      <div className="content-wrapper">
        <div className="center-image">
          <img src={contactHeader} />
        </div>
        <div className="form">
          <div className="inputs">
            <input type="text" placeholder="Your name: (required)"
              value={Contact.state.email.name} onChange={Contact.updName} />
            <input type="text" placeholder="Your email: (required)"
              value={Contact.state.email.from} onChange={Contact.updFrom} />
            <textarea placeholder="Your message: (required)"
              value={Contact.state.email.message} onChange={Contact.updMessage}></textarea>
          </div>
          <div className="info">
            <h2>Textile Graphix, LLC</h2>
            <h2>1154 Stocks Ave.<br />Rexburg, ID 83440</h2>
            <h2>Phone: 1(888) 440-2515<br />Email: Design@textilegraphix.com</h2>
            <button onClick={Contact.sendEmail}>submit</button>
            {Contact.state.error ? (<div className="error-message">{Contact.state.error}</div>) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
