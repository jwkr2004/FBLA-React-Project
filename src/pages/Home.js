import '../css/Home.css';
import axios from "axios"

const Home = () => {
  function SubmitForm(e) {
    e.preventDefault();
    var data = {
      image: document.getElementById("image").value,
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      points: document.getElementById("points").value
    };
    axios
      .post('http://localhost:3001/newevent', data)
      .then((res) => console.log(data, res))
      .catch(err => {
        console.error(err);
      });
  }
  return (
    <div className="App">
      {/*<form onSubmit={e => SubmitForm(e)}>
        <label>Image:</label>
        <input id="image" name="image"/>
        <label>Event Name:</label>
        <input id="title" name="title"/>
        <label>Event Description:</label>
        <input id="description" name="description"/>
        <label>Points:</label>
        <input id="points" name="points"/>
        <button type="submit">Submit</button>
      </form>
      */}
    </div>
  );
}

export default Home;