import { Container, Toolbar } from "@mui/material";
import { CardsCinemas}  from "../components/CardsCinemas";

export const PageCinemas = () => {

  return (
    <Container maxWidth="xl">
      <Toolbar disableGutters sx={{flexWrap: 'wrap'}}>
        <CardsCinemas/>
      </Toolbar>
    </Container>
  )
}
