import TopBar from "./components/TopBar";
import Movies from "./components/Movies";
import MoviesWithRedux from "./components/MoviesWithRedux";
import { Card } from "@mui/material";

function App() {
  return (
    <>
      <TopBar />
      <Card
        style={{
          backgroundColor: "lightGrey",
          padding: 25,
          height:'80vh',
          marginLeft: "10%",
          marginRight: "10%",
          marginBottom: 25,
          marginTop: 25,
          overflow:'auto'
        }}
        className="App"
      >
        {/* <Movies/> */}
        <MoviesWithRedux />
      </Card>
    </>
  );
}

export default App;
