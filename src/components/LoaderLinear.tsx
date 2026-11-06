import { useTranslation } from "react-i18next";
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import type { ITranslate, PropsLoader } from "../types/typesBox";
import './loaderLinear.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs: '70%', md: 400},
  maxWidth: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  backdropFilter: 'blur(5px)'
};

export const LoaderLinear = ({isOpenLoader}: PropsLoader) => {
  const {t}: ITranslate = useTranslation();

  return (
    <div>
      <Modal
        open={isOpenLoader}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{zIndex: 2000}}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2"
                      sx={{mb: '1em', textAlign: 'center', fontSize: {xs: '1rem', md: '1.25rem'}}}
          >
            {t('shared:loadManual')}
          </Typography>
          <Stack sx={{width: '100%', color: 'grey.500'}} spacing={2}>
            <LinearProgress color="secondary"/>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
