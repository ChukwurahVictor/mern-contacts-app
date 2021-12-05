import React, { useEffect } from "react";
import ContactItems from "./ContactItems";
import { useHistory } from "react-router";


const Contact = () => {
   let history = useHistory();

   useEffect(() => {
    if (!localStorage.getItem("authToken")) {
        history.push("/login");
    }
  }, [history]);

   return (
      <>
         <ContactItems />
      </>
   )
}

export default Contact;