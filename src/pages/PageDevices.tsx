import { useEffect } from "react";
import { type NavigateFunction, type Params, useNavigate, useParams } from "react-router-dom";
import { Container, Toolbar } from "@mui/material";
import { CardsDevices } from "../components/CardsDevices";
import { operators } from "../data/dataIPTV";

export const PageDevices = () => {
  const navigate: NavigateFunction = useNavigate();
  const params: Readonly<Params<string>> = useParams();
  const operatorNames: string[] = Object.keys(operators);

  useEffect(() => {
    if (params.operator && !operatorNames.includes(params.operator)) {
      navigate('/');
    }
  }, []);

  return (
    <Container maxWidth="xl">
      <Toolbar disableGutters sx={{flexWrap: 'wrap'}}>
        <CardsDevices/>
      </Toolbar>
    </Container>
  )
}
