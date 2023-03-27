import styled from "styled-components/macro";
import { JokeItem, JokeList } from "./components/JokeList";
import React, { useEffect, useContext, useState } from "react";
import { AddJokesForm } from "./components/AddJokesFrom";
import { Modal } from "../../components/Modal";
import { EditJokesForm } from "./components/EditJokesFrom ";

export type Jokes = {
    id: string;
    name: string;
    active: boolean;
    description: string;
    count: number;
    created_at: Date;
    updated_at: Date;
}

const CurrentJoke = styled.div`
    front-size: 14px;
    color: ${(props) => props.theme.colors.secondaryFontColor};
`;

const AddButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const StyleButton = styled.button`
     width: 78px;
     border: 0px;
     height: 78px;
     display: flex;
     justify-content: center;
     align-items: center;
     border-radius: 50%;
     background-color: ${(props) => props.theme.colors.primary};
     `;
    return (
        <StyleButton {...props}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            focusable="false"
            style={{ fill: "#fff", height: "24px", width: "24px" }}
          >
            <path d="M14.5 2a1.5 1.5 0 0 1 3 0v28a1.5 1.5 0 0 1-3 0V2z"></path>
            <path d="M30 14.5a1.5 1.5 0 0 1 0 3H2a1.5 1.5 0 0 1 0-3h28z"></path>
          </svg>
        </StyleButton>
      );
    
};

const DownloadButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const DownloadButton = styled.button`
    width: 78px;
    border: 0px;
    height: 78px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.primary};
    `;
    return (
       <DownloadButton {...props}>
        <svg>
          <a href ="http://localhost:4000/api/download/externJoke" download="downloadJoke">
            <text x="0" y="80" fill="white">Download</text>
          </a>
        </svg>
       </DownloadButton>
    )
}


export const DashboardPage = () => {

    const [addJokesVisible, setAddJokeVisible] = React.useState<boolean>(false);

    const [jokes, setJokes] = useState<Jokes[]>([]);

    const [editJoke, setEditJoke] = useState<Jokes | null>(
      null
    );
  

    const fetchJokes = async function () {
      const jokeRequest = await fetch("/api/joke", {
        headers: { "content-type": "application/json" },
      });
      if (jokeRequest.status === 200) {
        const transactionJSON = await jokeRequest.json();
        setJokes(transactionJSON.data);
        //console.log(transactionJSON);
      }
      
    };
  

    useEffect(() => {
      fetchJokes();
      }, []);

    return (
        <div>
            <div
            css={`
                display: flex;
                flex-direction: row;
                width: 100%;
            `}
            >
            <div> 
                <h2> Jokes Wall</h2>
                <p
                css={`
                    front-size: 36px;
                    margin: 0;
                `}
                >
                </p>
                <CurrentJoke></CurrentJoke>
            </div>
            <div
            css={`
                flex: 1;
                justify-content: flex-end;
                display: flex;
                align-items: top;
            `}
            >
            <AddButton 
                onClick={() => {
                  if (!editJoke) {
                    setAddJokeVisible(true);
                  }
                }}
            />
            </div>
            <div>
              <DownloadButton>
               <a href="http://localhost:4000/api/download/all"download="exportTest">CSV</a>
              </DownloadButton>
            </div>

        </div>

      {addJokesVisible && (
        <Modal
        title="Add Joke"
        onCancel={() => {
          setAddJokeVisible(false);
        }}
        >
        <AddJokesForm
          afterSubmit={() => {
            setAddJokeVisible(false);
            fetchJokes();
          }}
        />
        </Modal>
      )}

      {editJoke && (
        <Modal
          title="Edit Joke"
          onCancel={() => {
            setEditJoke(null);
          }}
        >
          <EditJokesForm
            afterSubmit={() => {
              setEditJoke(null);
              fetchJokes();
            }}
            joke={editJoke}
          />
        </Modal>
      )}

        <JokeList>
        {jokes.map((joke) => (
          <JokeItem 
          onClick={() => {
            if (!addJokesVisible) {
              setEditJoke(joke);
            }
          }}
          jokes={joke}
          ></JokeItem>
        ))}
        </JokeList>
        </div>
    );
};
