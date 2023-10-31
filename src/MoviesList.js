import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Layout, Card, Row, Col, Input, Select, Pagination } from "antd";

const { Content } = Layout;
const { Option } = Select;
const { Search } = Input;
const apiKey = "745d45699926c1c07c8f733c35b8fe34";

const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function MoviesList() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const urlGenre = query.get('genre');
  const urlYear = query.get('year');

  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [genre, setGenre] = useState(urlGenre || "28");
  const [releaseYear, setReleaseYear] = useState(urlYear || "");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=${sortBy}&page=${currentPage}${
        genre ? `&with_genres=${genre}` : ""
      }${releaseYear ? `&primary_release_year=${releaseYear}` : ""}`;
      const response = await axios.get(url);
      setMovies(response.data.results);
    };

    fetchMovies();
  }, [sortBy, genre, releaseYear, currentPage]);

  useEffect(() => {
    let url = "?";
    if (genre) url += `genre=${genreMap[genre]}&`;
    if (releaseYear) url += `year=${releaseYear}&`;
    navigate(url.slice(0, -1));
  }, [genre, releaseYear, navigate]);

  const handleSearch = async (value) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${value}&page=${currentPage}`;
    const response = await axios.get(url);
    setMovies(response.data.results);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <Content style={{ padding: "0 50px" }}>
        <div style={{ marginBottom: "20px" }}>
          <Search
            placeholder="Search for a movie"
            onSearch={handleSearch}
            style={{ width: 400, marginRight: 15 }}
          />
          <Select
            defaultValue={sortBy}
            style={{ width: 150, marginRight: 15 }}
            onChange={(value) => setSortBy(value)}
          >
            <Option value="popularity.desc">Popularity</Option>
            <Option value="vote_average.desc">Rating</Option>
            <Option value="release_date.desc">Newest</Option>
          </Select>
          <Select
            value={genre} style={{ width: 150, marginRight: 15 }} onChange={(value) => setGenre(value)}
          >
            <Option value="28">Action</Option>
            <Option value="35">Comedy</Option>
            <Option value="16">Animation</Option>
            <Option value="12">Adventure</Option>
            <Option value="80">Crime</Option>
            <Option value="18">Drama</Option>
            <Option value="10751">Family</Option>
            <Option value="14">Fantasy</Option>
            <Option value="36">History</Option>
            <Option value="27">Horror</Option>
            <Option value="10402">Music</Option>
            <Option value="9648">Mystery</Option>
            <Option value="10749">Romance</Option>
            <Option value="878">Science Fiction</Option>
            <Option value="10770">TV Movie</Option>
            <Option value="53">Thriller</Option>
            <Option value="10752">War</Option>
            <Option value="37">Western</Option>
          </Select>
          <Select
            style={{ width: 100, marginRight: 15 }}
            placeholder="Year"
            onChange={(value) => setReleaseYear(value)}
          >
            {Array.from({ length: 34 }, (_, index) => 2023 - index).map(
              (year) => (
                <Option key={year} value={String(year)}>
                  {year}
                </Option>
              )
            )}
          </Select>
        </div>
        <Row gutter={16}>
          {movies.map((movie) => (
            <Col key={movie.id} style={{ marginBottom: "20px" }} span={6}>
              <Link to={`/movie/${genreMap[genre]}/${movie.release_date.split('-')[0]}/${movie.title.replace(/\s+/g, "-")}`}>
              
                <Card
                  hoverable
                  cover={
                    <img
                      alt={movie.title}
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    />
                  }
                >
                  <Card.Meta
                    title={movie.title}
                    description={movie.release_date}
                  />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
        <Pagination
          current={currentPage}
          onChange={handlePageChange}
          total={500}
        />
      </Content>
    </Layout>
  );
}

export default MoviesList;
