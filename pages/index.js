import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraCommos';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { BoxRepository } from '../src/components/BoxRepository';


function ProfileSidebar(props) {
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          {props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBoxFollowers(props) {
  const viewReduced = props.items.slice(0, 6);
  return (
    <ProfileRelationsBoxWrapper>

      <h2 className='smallTitle'>
        {props.title} ({props.items.length})
      </h2>
      <ul>
        {viewReduced.map((itemAtual) => {
          return (
            <li key={itemAtual.items}>
              <a href={itemAtual.html_url} target="_blank">
                <img src={itemAtual.avatar_url} />
                {<span>{itemAtual.login}</span>}
              </a>
            </li>
          )
        })}
      </ul>
      <hr />
      <a href={"/page_followers"} className="Link">
        Ver mais
      </a>
    </ProfileRelationsBoxWrapper>
  );
}

function ProfileRelationsBoxRepository(props) {
  const viewReduced = props.items.slice(0, 6);
  return (
    <BoxRepository>
      <h2 className='smallTitle'>
        {props.title} ({props.items.length})
      </h2>
      <ul>
        {viewReduced.map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={itemAtual.html_url} target="_blank">
                {<span className="smallTitle">{itemAtual.name}</span>}
              </a>
            </li>
          )
        })}
      </ul>
      <hr />
      <a href={"/page_repository"} className="Link">
        Ver mais
      </a>
    </BoxRepository>
  );
}

export default function Home() {
  const [comunidades, setComunidades] = React.useState([]);
  const [seguidores, setSeguidores] = React.useState([]);
  const githubUser = "ManoelEduardo";

  React.useEffect(() => {
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setSeguidores(res);
      })
    //Fetch do repositório 
    fetch(`https://api.github.com/users/${githubUser}/repos`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setComunidades(data);

      })

  }, [])


  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div>
          <Box className="profileArea" style={{ gridArea: 'profileArea' }}>
            <ProfileSidebar githubUser={githubUser} />
          </Box>
        </div>

        <div>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subtitle">O que você deseja fazer? </h2>
            <form onSubmit={function handleCreateComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);
              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
              }

              const updateComunidades = [...comunidades, comunidade]
              setComunidades(updateComunidades);
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da comunidade"
                  name="title"
                  aria-label="Qual vai ser o nome da comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div>
          <ProfileRelationsBoxFollowers title="Seguidores GitHub" items={seguidores} />
          <ProfileRelationsBoxRepository title="Repositórios" items={comunidades} />
        </div>

      </MainGrid>
    </>
  )
}
