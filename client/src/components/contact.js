import React, { useState } from "react";
import validateForm from "../utils/validate_form";
import EmailForm from "../utils/email_form";

export default () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [response, setResponse] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [nameErrorBorder, setNameErrorBorder] = useState("");
  const [emailErrorBorder, setEmailErrorBorder] = useState("");
  const [messageErrorBorder, setMessageErrorBorder] = useState("");

  const sendMail = async ev => {
    ev.preventDefault();

    const frm = document.getElementById("email-form");

    const frmError = await validateForm(name, email, message);

    const ERROR_BORDER = "1px solid rgb(211, 0, 57)";

    if (frmError) {
      switch (frmError.type) {
        case "name":
          setNameErrorBorder(ERROR_BORDER);
          return setNameError(frmError.error);
        case "email":
          setEmailErrorBorder(ERROR_BORDER);
          return setEmailError(frmError.error);
        case "message":
          setMessageErrorBorder(ERROR_BORDER);
          return setMessageError(frmError.error);
        default:
          setNameErrorBorder("");
      }
    }

    const info = {
      name,
      email,
      message,
      captchaToken
    };

    fetch("/api/sendmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(info)
    })
      .then(res => res.json())
      .then(response => {
        setResponse(response);

        if (!response.error) {
          frm.reset();
          captcha.reset();

          setName("");
          setEmail("");
          setMessage("");
          setCaptcha("");
          setCaptchaToken("");
        }

        setTimeout(() => {
          setResponse("");
        }, 3000);
      })
      .catch(err => setResponse(err));
  };

  const showResponse = () => {
    if (response) {
      return response.error ? (
        <p className="error">{response.error}</p>
      ) : (
        <p className="success">{response.ok}</p>
      );
    }
  };

  const onLoadRecaptcha = () => {
    if (captcha) captcha.reset();
  };

  const verifyCallback = recaptchaToken => {
    setCaptchaToken(recaptchaToken);
  };

  const doSetCaptcha = ev => {
    setCaptcha(ev);
  };

  const clearError = () => {
    setNameError("");
    setEmailError("");
    setMessageError("");
    setNameErrorBorder("");
    setEmailErrorBorder("");
    setMessageErrorBorder("");
  };

  const handleChange = (ev, type) => {
    if (type === "name") setName(ev.target.value);
    else if (type === "email") setEmail(ev.target.value);
    else if (type === "message") setMessage(ev.target.value);

    clearError();
  };

  return (
    <EmailForm
      sendMail={sendMail}
      onChange={handleChange}
      errors={{
        nameError,
        emailError,
        messageError
      }}
      borders={{
        nameErrorBorder,
        emailErrorBorder,
        messageErrorBorder
      }}
      showResponse={showResponse}
      onLoadRecaptcha={onLoadRecaptcha}
      verifyCallback={verifyCallback}
      setCaptcha={doSetCaptcha}
    />
  );
};
