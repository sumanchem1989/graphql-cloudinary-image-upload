import React from "react";
import "./App.css";
import Axios from "axios";

class App extends React.Component {
  state = {
    files: [],
    isloading: false,
    imgUrl: []
  };

  handleChange = e => {
    this.setState(
      {
        files: [...e.target.files]
      },
      () => console.log(this.state.files)
    );
  };
  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ isloading: true });
    this.state.files.forEach(async file => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "d9rbdh3h");
      const res = await Axios.post(
        "https://api.cloudinary.com/v1_1/sumankalyandas/image/upload",
        formData
      );
      console.log(res);
      this.setState(state => ({
        imgUrl: [...state.imgUrl, res.data.secure_url],
        isloading: false
      }));
    });
  };
  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input type="file" multiple onChange={this.handleChange} />
          <button>Upload</button>
        </form>
        {this.state.isloading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <img src={this.state.imgUrl[0]} alt="" />
            <img src={this.state.imgUrl[1]} alt="" />
          </div>
        )}
      </div>
    );
  }
}

export default App;
