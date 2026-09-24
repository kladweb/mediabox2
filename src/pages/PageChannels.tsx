import { Container, Toolbar } from "@mui/material";
import { ListsChannels } from "../components/ListsChannels";
import { ScrollUp } from "../components/ScrollUp";

export const PageChannels = () => {

  return (
    <>
      <ScrollUp/>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{flexWrap: 'wrap'}}>
          <ListsChannels/>
        </Toolbar>
      </Container>
    </>
  )
}

export default PageChannels;
