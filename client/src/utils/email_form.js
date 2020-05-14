import React from "react";
import { ReCaptcha } from "react-recaptcha-google";

export default props => {
  const {
    sendMail,
    onChange,
    errors,
    borders,
    showResponse,
    onLoadRecaptcha,
    verifyCallback,
    setCaptcha
  } = props;

  return (
    <div className="row">
      <div className="col-1 col-md-1 sidebar" />

      <div className="col-sm-8 col-lg-6">
        <form onSubmit={sendMail} method="post" id="email-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <span className="error">{errors.nameError}</span>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={ev => onChange(ev, "name")}
              style={{ border: borders.nameErrorBorder }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <span className="error">{errors.emailError}</span>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={ev => onChange(ev, "email")}
              style={{ border: borders.emailErrorBorder }}
            />
            <small>Your information will never be shared. Full stop.</small>
          </div>

          <div className="form-group">
            <label htmlFor="description">Message</label>
            <span className="error">{errors.messageError}</span>
            <textarea
              rows={3}
              className="form-control"
              id="message"
              name="message"
              onChange={ev => onChange(ev, "message")}
              style={{ border: borders.messageErrorBorder }}
            />
          </div>

          <div className="send-div">
            <button type="submit">Send</button>

            {showResponse()}
          </div>

          <ReCaptcha
            ref={ev => setCaptcha(ev)}
            size="normal"
            data-theme="light"
            render="explicit"
            sitekey={`${process.env.RECAPTCHA_KEY}`}
            onloadCallback={onLoadRecaptcha}
            verifyCallback={verifyCallback}
          />
        </form>
      </div>
    </div>
  );
};
