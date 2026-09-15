import { Container, Toolbar } from "@mui/material";
import MainInfo from "../components/MainInfo";

export const PageMain = () => {
  return (
    <Container maxWidth="xl">
      <Toolbar disableGutters sx={{width: '100%'}}>
        <MainInfo/>
      </Toolbar>
    </Container>
  )
}
