import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { type NavigateFunction, type Params, useNavigate, useParams } from "react-router-dom";
import { Box } from '@mui/material';
import { CardDevice } from "./CardDevice";
import { appColors } from "../services/appColors";
import { devices, manualsTree } from "../data/dataIPTV";
import { useCurrentSection } from "../utilits/utilits.ts";
import type { ITranslate } from "../types/typesBox";
import './cards.css';

export const CardsDevices = () => {
  const {t}: ITranslate = useTranslation();
  const navigate: NavigateFunction = useNavigate();
  const devicesNames: string[] = Object.keys(devices);
  const params: Readonly<Params<string>> = useParams();
  const devicesPage: string | undefined = params.devices;
  const {section} = useCurrentSection();
  // console.log(devicesPage);

  useEffect(() => {
    if (devicesPage && !devicesNames.includes(devicesPage)) {
      navigate('/');
    }
  }, [devicesPage]);

  if (!section) return null;

  return (
    <>
      <Box
        component='h1'
        sx={{
          mt: 12,
          mx: 'auto',
          width: '100%',
          fontSize: {xs: '1.25rem', md: '1.5rem'},
          fontWeight: '400',
          color: appColors.mid2,
          textAlign: 'center',
        }}
      >
        {t('shared:headDevice')}
      </Box>
      <Box component='div' sx={{
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}
      >
        {
          devicesPage ?
            (Object.keys(manualsTree[section][devicesPage as keyof typeof manualsTree[typeof section]]))
              .map((device: string, i: number) => <CardDevice key={i} device={device}/>)
            :
            (Object.keys(manualsTree[section]))
              .map((device: string, i: number) => <CardDevice key={i} device={device}/>)
        }
        {/*{*/}
        {/*  (!devicesPage) ?*/}
        {/*    <>*/}
        {/*      {Object.keys(devices).map((device: string, i: number) => <CardDevice key={i} device={device}/>)}*/}
        {/*    </>*/}
        {/*    :*/}
        {/*    <>*/}
        {/*      {(devicesPage && devicesNames.includes(devicesPage)) &&*/}
        {/*        <>*/}
        {/*          {devices[devicesPage as keyof (typeof devices)].map((device: string, i: number) => {*/}
        {/*            device = device.replace(/[\s]/g, '').toLowerCase();*/}
        {/*            console.log(device);*/}
        {/*            return (<CardDevice key={i} device={device}/>);*/}
        {/*          })}*/}
        {/*        </>*/}
        {/*      }*/}
        {/*    </>*/}
        {/*}*/}
      </Box>
    </>
  )
}
