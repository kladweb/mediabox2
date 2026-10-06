import { Container, Toolbar } from "@mui/material";
import { Manuals } from "../components/Manuals.tsx";

export const PageManual = () => {
  return (
    <Container maxWidth="xl">
      <Toolbar disableGutters sx={{flexWrap: 'wrap'}}>
        <Manuals/>
      </Toolbar>
    </Container>
  )
}
