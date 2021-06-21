import "./App.css";
import "../src";
import Footer from "./layouts/Footer";
import Dashboard from "./layouts/Dashboard";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import Navi from "./layouts/Navi";

function App() {
  return (
    <div style={{backgroundColor: ""}} className="App">
   
   
      <Navi></Navi>
      <Dashboard></Dashboard>
      <Footer></Footer>
  
  </div>
  );
}


export default App;
