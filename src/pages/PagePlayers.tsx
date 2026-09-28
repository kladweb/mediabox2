import { useEffect } from "react";
import { type NavigateFunction, type Params, useNavigate, useParams } from "react-router-dom";
import { Container, Toolbar } from "@mui/material";
import { CardsPlayers } from "../components/CardsPlayers";
import { players } from "../data/dataIPTV";

export const PagePlayers = () => {
  const navigate: NavigateFunction = useNavigate();
  const params: Readonly<Params<string>> = useParams();
  const deviceNames: string[] = Object.keys(players);

  useEffect(() => {
    if (params.device && !deviceNames.includes(params.device)) {
      navigate('/');
    }
  }, []);

  return (
    <Container maxWidth="xl">
      <Toolbar disableGutters sx={{flexWrap: 'wrap'}}>
        <CardsPlayers/>
      </Toolbar>
    </Container>
  )
}
