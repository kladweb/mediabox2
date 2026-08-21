import { Box } from "@mui/material";

export default function Counter() {
  return (
    <Box sx={{
      position: 'absolute',
      clip: 'rect(0 0 0 0)',
      width: '1px',
      height: '1px',
      margin: '-1px'
    }}>
      <a href="https://www.24log.de" target="_blank">
        <img src="https://counter.24log.ru/buttons/cl4/45-0.gif" alt="html counter"/>
      </a>
      <a href="https://www.24log.ru" target="_blank">
        <img src="https://counter.24log.ru/count4_282048_45_1_5.pcx" alt="counter" title="counter"/>
      </a>
    </Box>
  );
}
