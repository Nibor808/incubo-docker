import React, { useState } from "react";
import Header from "./components/header";
import Modal from "react-modal";
import About from "./components/about";
import Contact from "./components/contact";
import PortfolioList from "./components/portfolio_list";
import { list2016, list2017 } from "./utils/portfolio_item_info";
import modalStyle from "./utils/modal_style";
import { loadReCaptcha } from "react-recaptcha-google";

export default () => {
  const [isOpen, setIsOpen] = useState(false);
  const [event, setEvent] = useState();
  const portfolioRef = React.createRef();
  const contactRef = React.createRef();

  window.onscroll = () => {
    if (
      document.body.scrollTop > 30 ||
      document.documentElement.scrollTop > 30
    ) {
      document.getElementById("logo-img").style.height = "60px";
      document.getElementById("logo-img").style.transition = "0.4s";
    } else document.getElementById("logo-img").style.height = "110px";
  };

  const toPortfolio = ev => {
    ev.preventDefault();

    setTimeout(() => {
      portfolioRef.current.scrollIntoView({
        behavior: "smooth"
      });
    }, 75);
  };

  const toContact = ev => {
    ev.preventDefault();

    setTimeout(() => {
      contactRef.current.scrollIntoView({
        behavior: "smooth"
      });
    }, 75);
  };

  const handleClick = ev => {
    setIsOpen(true);
    ev.persist();
    setEvent(ev);
  };

  const showModal = () => {
    if (isOpen) {
      return (
        <Modal
          appElement={document.getElementById("root")}
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          style={modalStyle}
          contentLabel="Nothing"
        >
          <h4>{event.target.alt}</h4>

          <img
            src={event.target.dataset.text}
            alt={event.target.alt}
            width="100%"
            style={{
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
            }}
          />
        </Modal>
      );
    }
  };

  return [
    <span key="l1">{showModal()}</span>,
    <span key="l2">{loadReCaptcha()}</span>,

    <Header key="l3" toContact={toContact} toPortfolio={toPortfolio} />,

    <section key="l4" className="landing container">
      <article className="about">
        <div className="about-container">
          <About toContact={toContact} />
        </div>
      </article>

      <article className="portfolio" ref={portfolioRef}>
        <div className="header-container">
          <div className="row">
            <div className="col-12">
              <h1>Portfolio</h1>
              <a
                href="https://github.com/Nibor808"
                target="_blank"
                rel="noopener noreferrer"
              >
                github
              </a>
            </div>
          </div>
        </div>

        <div className="portfolio-container">
          <PortfolioList
            year="2017"
            list={list2017}
            listClass="sidebar2017"
            handleClick={handleClick}
          />

          <PortfolioList
            year="2016"
            list={list2016}
            listClass="sidebar2016"
            handleClick={handleClick}
          />
        </div>
      </article>

      <article className="contact" ref={contactRef}>
        <div className="header-container">
          <div className="row">
            <div className="col-12">
              <h1>Contact</h1>
              <p>Want to work together? Get in touch!</p>
            </div>
          </div>
        </div>

        <div className="contact-container">
          <Contact />
        </div>
      </article>
    </section>
  ];
};
