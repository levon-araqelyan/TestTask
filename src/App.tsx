import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, SecureRoute, Security } from "@okta/okta-react";

import styles from "./App.module.scss";

import MusicSearch from "./components/MusicSearch";
import SingleMusic from "./components/SingleMusic";
import { oktaConfig } from "./lib/oktaConfig";
import { musicWorksSelector } from "./store/musicWorks/selectors";

const oktaAuth = new OktaAuth(oktaConfig);

const App = () => {
  const history = useHistory();
  const { musicWorks } = useSelector(musicWorksSelector);
  const restoreOriginalUri = async (_oktaAuth: any, originalUri: string) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };
  const logout = async () => oktaAuth.signOut();

  useEffect(() => {
    if (musicWorks.error) {
      toast.error(musicWorks.error);
    }
  }, [musicWorks.error]);

  return (
    <div className={styles.container}>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <Route exact path="/">
          <Redirect to="/musics" />
        </Route>
        <button onClick={logout}>Logout</button>
        <SecureRoute path="/musics" component={MusicSearch} exact />
        <SecureRoute path="/musics/:id" component={SingleMusic} />
        <Route path="/login/callback" component={LoginCallback} />
      </Security>
      <ToastContainer position={"bottom-right"} />
    </div>
  );
};

export default App;
