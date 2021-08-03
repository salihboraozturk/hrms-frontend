import "semantic-ui-css/semantic.min.css";
import "../src";
import "./App.css";
import Dashboard from "./layouts/Dashboard";
import Footer from "./layouts/Footer";
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
