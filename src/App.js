import "./App.css";
import { Button, Row, Col } from "antd";
import { useEffect, useState } from "react";
const api_meme = "https://api.imgflip.com/get_memes";
function ImageMeme(props) {
  const { src, alt, key } = props;
  return <img key={key} src={src} className="meme_image" alt={alt} />;
}
function App() {
  const [memeArray, setMemeArray] = useState([]);
  const getImage = () => {
    fetch(api_meme)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMemeArray(data.data.memes);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className="App">
      <h3 className="App-header">Meme List</h3>
      <p className="desc">Build and website that has a button and a gallery.</p>
      <Button type="primary" onClick={(event) => getImage(event)}>
        Load images
      </Button>
      <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]}>
        {memeArray.length !== 0 &&
          memeArray.map((item, index) => {
            return (
              <Col span={12} className="gutter-row image-item" key={`${index}`}>
                <ImageMeme src={item.url} alt={item.name} />
              </Col>
            );
          })}
      </Row>
    </div>
  );
}

export default App;
