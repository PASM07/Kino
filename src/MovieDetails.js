import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Layout, Card, Row, Col, Button, Typography } from "antd";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;
const apiKey = "745d45699926c1c07c8f733c35b8fe34";

function MovieDetails() {
  const { title, genre} = useParams();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const searchResponse = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title.replace(
            /-/g,
            " "
          )}`
        );
        const foundMovie = searchResponse.data.results[0];
        if (foundMovie) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${foundMovie.id}?api_key=${apiKey}`
          );
          setMovie(response.data);
        }
      } catch (error) {
        console.error("Ошибка при получении данных", error);
      }
    };
    fetchMovieDetails();
  }, [title]);

  if (!movie) return null;

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="logo" style={{ color: "white" }}>
          Movie App
        </div>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          <Link to="/">
            <Button type="primary" style={{ marginBottom: "20px" }}>
              Go Back
            </Button>
          </Link>

          <Row gutter={16}>
            <Col span={8}>
              <Card
                hoverable
                cover={
                  <img
                    alt={movie.title}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  />
                }
              />
            </Col>
            <Col span={16}>
              <Title>
                {movie.title} ({new Date(movie.release_date).getFullYear()})
              </Title>
              <Paragraph>
                <strong>Genre/Year:</strong>{" "}
                {genre || new Date(movie.release_date).getFullYear()}
              </Paragraph>
              <Paragraph>
                <strong>Overview:</strong> {movie.overview}
              </Paragraph>
              <Paragraph>
                <strong>Rating:</strong> {movie.vote_average}
              </Paragraph>
              <Paragraph>
                <strong>Release Date:</strong> {movie.release_date}
              </Paragraph>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
}

export default MovieDetails;
