import { forwardRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Movie } from 'src/interfaces/getsInterfaces';
import { urlImg } from '@logic/const';
import { useNavigate } from 'react-router-dom';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';

const Card = styled.div`
  width: 30%;
  border-radius: 0.5rem;
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    background: #ede8e6;
    padding: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transform: scale(1.1);
    z-index: 2;
  }
`;

const CardHeader = styled.div`
  width: 100%;
  border-radius: 0.5rem;
  height: 100%;
  background: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 375px;

  img {
    width: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
    aspect-ratio: 1/1;
  }
`;

const CardBody = styled.div`
  display: none;
  width: 100%;

  ${Card}:hover & {
    display: block;
    position: absolute;
    z-index: 2;
    left: 0;
    padding: 0.5rem;
    background: #ede8e6;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: var(--palette3);
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;

  &:hover {
    text-decoration: underline;
  }

  span {
    color: var(--palette1);
    font-size: 0.8rem;
  }
`;

const Overview = styled.div`
  font-size: 0.8rem;
  color: var(--palette1);
`;

const GlobalStyle = createGlobalStyle`
  @media screen and (max-width: 575px) {
    ${Card} {
      width: 95%;
      background: #ede8e6;
      padding: 0.5rem;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      z-index: 2;

      &:hover ${CardBody}{
        position:relative;
      }

      & ${CardHeader}{
        min-height: 200px;
      }

      & ${CardBody} {
        display: block !important;
        position: relative;
        z-index: 2;
        left: 0;
        padding: 0.5rem;
        background: #ede8e6;
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
      }
    }
  }

  @media screen and (min-width: 576px) and (max-width: 767px) {
    ${Card} {
      width: 45%;
      background: #ede8e6;
      padding: 0.5rem;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      z-index: 2;

      &:hover ${CardBody}{
        position:relative;
      }

      & ${CardHeader}{
        min-height: 300px;
      }

      & ${CardBody} {
        display: block !important;
        position: relative;
        z-index: 2;
        left: 0;
        padding: 0.5rem;
        background: #ede8e6;
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
      }
    }
  }

  @media screen and (min-width: 768px) and (max-width: 991px) {
    ${Card} {
      width: 45%;
      background: #ede8e6;
      padding: 0.5rem;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      z-index: 2;

      &:hover {
        transform: none;
      }
      &:hover ${CardBody}{
        position:relative;
      }

      & ${CardBody} {
        display: block !important;
        position: relative;
        z-index: 2;
        left: 0;
        padding: 0.5rem;
        background: #ede8e6;
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
      }
    }
  }
`;

const MovieCard = forwardRef<HTMLDivElement, { movie: Movie }>(({ movie }, ref) => {
  const navigate = useNavigate();

  return (
    <>
      <GlobalStyle />
      <Card ref={ref}>
        <CardHeader>
          {movie.poster_path ? (
            <img src={`${urlImg}${movie.poster_path}`} alt={movie.title} />) : (
            <BrokenImageIcon />
          )}
        </CardHeader>
        <CardBody>
          <Title onClick={() => { navigate(`/app/movie/${movie.id}`); }}>
            {movie.title ? movie.title : 'No cuenta con titulo'}<span>{movie.release_date ? movie.release_date : 'Sin Fecha'}</span>
          </Title>
          <Overview>{movie.overview ? movie.overview : 'No cuenta con una Descripcion'}</Overview>
        </CardBody>
      </Card>
    </>
  );
});

export default MovieCard;
