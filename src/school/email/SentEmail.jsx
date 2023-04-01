import React, { useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../api/axiosClient";
const SentEmail = ({ job, sentEmailStatus }) => {
  const form = useRef();
  console.log(job);

  const sendEmail = (e) => {
    e.preventDefault();
    /*     emailjs
      .sendForm(
        "service_2phamrk",
        "template_7xpioma",
        form.current,
        "LOFR6vQG9zpxUvRSa"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      ); */
    console.log(form);
    e.target.reset();
  };
  return (
    <>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
    </>
  );
};

export default SentEmail;
