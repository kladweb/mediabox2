import { Container, Toolbar } from "@mui/material";
import { CardsOperators } from "../components/CardsOperators";

export const PageOperators = () => {
  return (
    <Container maxWidth="xl">
      <Toolbar disableGutters sx={{flexWrap: 'wrap'}}>
        <CardsOperators/>
      </Toolbar>
    </Container>
  )
}
