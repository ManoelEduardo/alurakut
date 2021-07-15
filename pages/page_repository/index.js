import React from 'react';
import MainGrid from '../../src/components/MainGrid';
import Box from '../../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault } from '../../src/lib/AluraCommos';
import { BoxRepository } from '../../src/components/BoxRepository';
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

function ProfileRelationsBoxRepository(props) {
    return (
      <BoxRepository>
        <h2 className='smallTitle'>
          {props.title}
        </h2>
        <hr />
        <ul>
          {props.items.map((itemAtual) => {
            return (
              <li key={itemAtual.id}>
                <a href={itemAtual.html_url} target="_blank">
                  {<span className="smallTitle">{itemAtual.name}</span>}
                </a>
              </li>
            )
          })}
        </ul>
      </BoxRepository>
    );
  }

export default function RepositoryPage() {
  const [repository, setRepository] = React.useState([]);
  const githubUser = "ManoelEduardo";

  React.useEffect(() => {
    fetch(`https://api.github.com/users/${githubUser}/repos`)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setRepository(res);
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
          <ProfileRelationsBoxRepository title="Repositórios" items={repository} />
        </div>

      </MainGrid>
    </>
  )
}
