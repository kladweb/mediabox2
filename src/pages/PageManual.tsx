import { Container, Toolbar } from "@mui/material";
import { Manual } from "../components/Manual";

export const PageManual = () => {
  return (
    <Container maxWidth="xl">
      <Toolbar disableGutters sx={{flexWrap: 'wrap'}}>
        <Manual/>
      </Toolbar>
    </Container>
  )
}
