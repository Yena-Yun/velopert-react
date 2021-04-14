import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';

const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    //반응형 (min-height의 기본값은 100px)
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

const NewsList = ({ category }) => {
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        //fetchData 함수 선언
        //(async를 사용하므로 따로 선언)
        const fetchData = async () => {
            //데이터 받아오기 전 (로딩중)
            setLoading(true);

            try {
                //주소창에서 category가 all(전체보기)이면 아무것도 붙이지 말고 그 외의 경우엔 해당 category를 붙임
                const query = category === 'all' ? '' : `&category=${category}`;
                const response = await axios.get(
                    `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=f63837176999449ab6c54c460ecbf813`
                );
                setArticles(response.data.articles);
            } catch (e) {
                console.log(e);
            }

            //데이터 다 받아오고 나서 (로딩완료)
            setLoading(false);
        };

        //선언한 fetchData 함수 실행
        fetchData();

    }, [category]);


    //대기 중일 때 (스피너 띄울 부분)
    if (loading) {
        return <NewsListBlock>대기 중...</NewsListBlock>
    }

    //데이터가 없을 경우를 대비한 null 예외처리 
    //(안 그러면 오류났을 경우 흰 페이지만 뜸)
    if (!articles) {
        return null;
    }

    //articles 값이 있을 때
    return (
        <NewsListBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NewsListBlock>
    );
};

export default NewsList;