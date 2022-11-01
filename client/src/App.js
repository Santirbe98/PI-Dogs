import "./App.css";
import { Route, Switch } from "react-router-dom";
import HomePage from "./page/HomePage";
import DogsDetailPage from "./page/DogsDetailPage";
import { DogsForm } from "./page/DogsForm";
import { Error404 } from "./page/Error404";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/dogs/:id" component={DogsDetailPage} />
        <Route exact path="/create-dog" component={DogsForm} />
        <Route exact path="*" component={Error404} />
      </Switch>
    </div>
  );
}

export default App;
