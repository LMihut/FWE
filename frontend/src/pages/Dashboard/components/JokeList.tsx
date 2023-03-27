import React from "react";
import styled from "styled-components";


export type Jokes = {
    id: string;
    name: string;
    active: boolean;
    description: string;
    count: number;
    created_at: Date;
    updated_at: Date;
}

const TagList = styled.ul`
  list-style: none;
  flex-grow: 1;
  font-size: 0.8rem;

  align-self: flex-end;
  display: flex;
  & > li {
    margin-right: 0.5rem;
    padding: 0.125rem;
    border-radius: 0.25rem;
    background-color: ${(props) => props.theme.colors.primary}
    display: block;
    color: #333;
  }
`;

const JokeFlex = styled.div`
  display: flex;
  align-items: center;
`;

export const JokeHighlight = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: none;
  width: 4px;
  background-color: ${(props) => props.theme.colors.primary};
`;

export const JokeItemStyle = styled.div`
  margin: 0;
  min-height: 3rem;
  position: relative;
  padding: 0.7rem 2rem;
  &:hover {
    ${JokeHighlight} {
      display: block;
    }
  }
`;
export const JokeList = styled.ul`
  list-style: none;
  box-shadow: 0 0.125em 0.25em 0 ${(props) => props.theme.colors.shadowColor};
  width: 100%;
  padding: 0;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.listBackgroundColor};
  ${JokeItemStyle} {
    border-bottom: 1px ${(props) => props.theme.colors.shadowColor} solid;
    &:last-of-type {
      border-bottom: 0;
    }
  }
`;

export const JokeTitle = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
`;

export const JokeDescription = styled.p`
  font-size: 0.8rem;
  margin: 0;
`;
export const JokeDate = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.secondaryFontColor};
`;
export const JokeValue = styled.span`
  white-space: nowrap;
`;
export type JokeItemProps = {
  jokes: Jokes;
  onClick?: (joke:Jokes) => void;
};

export const JokeItem: React.FC<JokeItemProps> = ({
  jokes,
  onClick = () => {},
}) => {
  const { name, description, created_at, updated_at, count, active }=jokes;
  return (
    <JokeItemStyle
    onClick={() => {
      console.log("clicked transaction");
      onClick(jokes);
    }}

    >
      <JokeHighlight />
      <JokeFlex>
        <div>
          <JokeTitle>{name}</JokeTitle>
          <JokeDescription>{description}</JokeDescription>
          <JokeDate>
            {created_at && created_at.toLocaleString()}
          </JokeDate>
        </div>
        <TagList>
        </TagList>

        <JokeValue>
            {count} Stars
        </JokeValue>
      </JokeFlex>
    </JokeItemStyle>
  );
};
