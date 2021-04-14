import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const categories = [
    {
        name: 'all',
        text: '전체보기'
    },
    {
        name: 'business',
        text: '비즈니스'
    },
    {
        name: 'entertainment',
        text: '연예'
    },
    {
        name: 'health',
        text: '건강'
    },
    {
        name: 'science',
        text: '과학'
    },
    {
        name: 'sport',
        text: '스포츠'
    },
    {
        name: 'technology',
        text: '기술'
    },
];

const CategoriesBlock = styled.div`
    display: flex;
    padding: 1rem;
    width: 768px;
    margin: 0 auto;
    @media screen and (max-width: 768px) {
        width: 100%;
        overflow-x: auto;
    }
`;

const Category = styled(NavLink)`
  font-size: 1.125rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  /* 부모태그의 color를 물려받음 */
  color: inherit;
  padding-bottom: 0.25rem;

//css 라이브러리로 props(Category) 사용 (styled-components 안에 있음)
    &.active {
        font-weight: 600;
        border-bottom: 2px solid #22b8cf;
        color: #22b8cf;
        &:hover {
            color: #3bc9db;
        }
    }

  & + & {
    margin-left: 1rem;
  }
`;

const Categories = () => {
    return (
      <CategoriesBlock>
        {categories.map(c => (
            <Category
                key={c.name}
                activeClassName="active"
                exact={c.name === 'all'}
                to={c.name === 'all' ? '/' : `/${c.name}`}
            >
                {c.text}
            </Category>
        ))}
      </CategoriesBlock>
    );
};

export default Categories;