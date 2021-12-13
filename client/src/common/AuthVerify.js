import React from 'react';
import { withRouter } from 'react-router-dom';

const parseJwt = (token) => {
   try {
      return JSON.parse(atob(token.split(".")[1]));

   } catch (error) {
      return null;
   }
}

const AuthVerify = (props) => {

   props.history.listen(() => {
      const authToken = localStorage.getItem("authToken");
      console.log(authToken);
      const decodedJwt = parseJwt(authToken);
      console.log(decodedJwt);
      if(decodedJwt.exp * 1000 < Date.now()) {
         props.logOut();
      } 
   })
   return (
      <div> </div>
   )
}

export default withRouter(AuthVerify);
