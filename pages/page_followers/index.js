import React from 'react';
import MainGrid from '../../src/components/MainGrid';
import Box from '../../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault } from '../../src/lib/AluraCommos';
import { ProfileRelationsBoxWrapper } from '../../src/components/ProfileRelations';


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
  return (
    <ProfileRelationsBoxWrapper>

      <h2 className='smallTitle'>
        {props.title}
      </h2>
      <hr />
      <ul>
        {props.items.map((itemAtual) => {
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
    </ProfileRelationsBoxWrapper>
  );
}

export default function FollowersPage() {
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
          <ProfileRelationsBoxFollowers title="Seguidores GitHub" items={seguidores} />
        </div>

      </MainGrid>
    </>
  )
}
