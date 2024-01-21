import "./App.css";
import Bar from "./Bar.js"; // Assuming bar.js is in the same directory
import Calendar from "./Calendar.js"; // Assuming calendar.js is in the same directory
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
