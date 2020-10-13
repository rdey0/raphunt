import React from "react";

function ContactForm(props) {
  return (
    <form
      className="gform"
      method="POST"
      /*action="https://script.google.com/macros/s/AKfycbwZZ_aoYUEkfPlC-venx67RqIuWc_8KAb-yH6_xHCUsGvQ3it8/exec"*/
    >
      <div>
        <h2>LET US KNOW</h2>
      </div>
      <div className="contact-fields">
        <fieldset>
          <label htmlFor="message">
            How'd we do? Anything else you'd like to see?
          </label>
          <textarea id="message" name="Message" required />
        </fieldset>
        <fieldset>
          <label htmlFor="contact">
            Would you be down for a few quick questions? Leave your
            IG/Twitter/whatever. (optional)
          </label>
          <input type="text" id="contact" name="Contact" />
        </fieldset>
        <button>Send</button>
      </div>
      <div className="contact-thanks">
        <p>Bet.</p>
      </div>
    </form>
  );
}

export default ContactForm;
