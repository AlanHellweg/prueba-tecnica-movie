import { gets } from '@logic/gets';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailsResponse, VideoResponse } from 'src/interfaces/getsInterfaces';
import styled from 'styled-components';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import { Skeleton } from '@mui/material';

const Main = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    height: 100%;
    position: relative;
    background: var(--palette1);
    overflow-y: auto;
`;

const ContVideo = styled.div`
    width: 100%;
    height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 30%;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
        pointer-events: none;
    }
`;

const VideoIframe = styled.iframe`
    width: 100%;
    height: 100%;
    border: none;
    aspect-ratio: 16 / 9;
    object-fit: cover;
`;
const BrokenIframe = styled.div`
    width: 100%;
    height: 100%;
    border: none;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        font-size: 5rem;    
        color: var(--palette3);
    }
`;

const BackButton = styled.button`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background: var(--palette3);
    border: 2px solid transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 1rem;
    left: 1rem;
    cursor: pointer;
    transition: background 0.3s ease, border 0.3s ease;

    &:hover {
        border: 2px solid var(--palette3);
        background: rgba(255, 255, 255, 0.2);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
    }
`;

const Title = styled.div`
    width: 100%;
    position: absolute;
    top: 97%;
    z-index: 4;
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--palette3);
    text-align: center;
`;

const TagsContainer = styled.div`
    width: 100%;
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
    padding: 0px 1rem;
`;

const Tag = styled.div`
    padding: 0.2rem 0.8rem;
    font-size: 0.8rem;
    background: var(--palette3);
    color: #ffe6e6;
    border-radius: 2rem;
`;

const Overview = styled.div`
    width: 100%;
    height: 100%;
    color: #ffe6e6;
    font-size: 0.8rem;
    padding: 0.5rem;
`;

function PageMovie() {
    const { movieId } = useParams<{ movieId: string }>();
    const navigate = useNavigate();

    const retroceder = () => {
        navigate(-1);
    };

    const { data, isLoading, error } = useQuery<DetailsResponse>(['detalle', movieId], () => {
        return gets.getDetails({ language: 'es' }, movieId);
    }, {
        enabled: !!movieId
    });

    const { data: dataVideo, isLoading: isLoadingVideo, error: errorVideo } = useQuery<VideoResponse>(['videos', movieId], () => {
        return gets.getVideos(movieId);
    }, {
        enabled: !!movieId
    });

    useEffect(() => {
        if (dataVideo) {
            console.log(dataVideo);
        }
        if (errorVideo) {
            console.log(errorVideo);
        }
    }, [dataVideo, errorVideo]);

    return (
        <Main>
            {data && !isLoading ? (
                <>
                    {dataVideo && dataVideo.results && !isLoadingVideo ? (
                        <ContVideo>
                            {dataVideo.results[0] ? (
                                <VideoIframe
                                    key={dataVideo.results[0].id}
                                    src={`${dataVideo.results[0].site === 'YouTube' ? `https://www.youtube.com/embed/${dataVideo.results[0].key}` : `https://vimeo.com/${dataVideo.results[0].key}`}`}
                                    title={dataVideo.results[0].name}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></VideoIframe>
                            ) : (
                                <BrokenIframe>
                                    <BrokenImageIcon />
                                </BrokenIframe>
                            )}
                            <Title>
                                {data.title}
                            </Title>
                        </ContVideo>
                    ) : (
                        <BrokenIframe>
                            <Skeleton variant="rounded" width='100%' height="100%" />
                        </BrokenIframe>
                    )}
                    <BackButton onClick={retroceder}>
                        <ArrowBackIosIcon style={{ color: '#fff', fontSize: '1rem' }} />
                    </BackButton>
                    <TagsContainer>
                        {data.genres.map(element => (
                            <Tag key={element.id}>
                                {element.name}
                            </Tag>
                        ))}
                    </TagsContainer>
                    <Overview>
                        {data.overview ? data.overview : 'No cuenta con una Descripcion'}
                    </Overview>
                </>
            ) : ''}
        </Main>
    );
}

export default PageMovie;
