import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { MinimalPatient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientDisplayPage from "./PatientDisplayPage";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<MinimalPatient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id" render={({ match }) => (
              <PatientDisplayPage id={match.params.id} />
            )}
            />
            <Route path="/patients">
              <PatientListPage />
            </Route>
            <Route path="/">
              <Redirect to="/patients" />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div >
  );
};

export default App;
