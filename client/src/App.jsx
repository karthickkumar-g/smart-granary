import  {BrowserRouter} from "react-router-dom"
import Routing from "./routes/Routing";


const App = () => {
  return (<>
    <BrowserRouter>
        <Routing/>
    </BrowserRouter>
  </>)
};

export default App;
