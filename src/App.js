import "./App.css";
import Bar from "./Bar.js"; 
import Calendar from "./Calendar.js"; 
import { MajorProvider } from "./MajorContext";

function App() {
  return (
    <MajorProvider>
      <div className="App">
        <div className="top-bar">
          <Bar />
        </div>
        <div>
          <Calendar />
        </div>
      </div>
    </MajorProvider>
  );
}

export default App;
