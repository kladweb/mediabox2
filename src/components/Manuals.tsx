import { useEffect, useState } from "react";
import { type Params, useParams } from "react-router-dom";
import { Box, Card, CardContent } from "@mui/material";
import { useTranslation } from "react-i18next";
import { sxButtonLinkOperator, sxCardMain, sxHeadMain, sxManualText1 } from "../services/sxStyles.ts";
import { appColors } from "../services/appColors.ts";
import type { ITranslate } from "../types/typesBox.ts";
import ImageManual from "./ImageManual.tsx";

type ILink = {
  name: string;
  link: string;
}

type Instruction = {
  name?: string;
  img?: string;
  links?: ILink[];
}

type Manual = {
  id: string;
  name: string;
  actions: Instruction[];
}

interface Manuals {
  operator: Manual[];
  device: Manual[];
  player: Manual[];
};

export const Manuals = () => {
  const {t}: ITranslate = useTranslation();
  const params: Readonly<Params<string>> = useParams();
  const {language, operator, device, player} = params;
  let actionNumber = 0;

  const [manuals, setManuals] = useState<Manuals | null>(null);

  const loadManual = async (part: string) => {
    const response = await fetch(`/manualsText/${language}/${part}.json`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  };

  const handlerOperator = (link: string): void => {
    window.open(link);
  }

  useEffect(() => {
    if (!language || !operator || !device || !player) return;
    let cancelled = false;
    (async () => {
      try {
        const [operatorData, deviceData, playerData] = await Promise.allSettled([
          loadManual(operator),
          loadManual(device),
          loadManual(player),
        ]);
        if (!cancelled) {
          setManuals({
            operator: operatorData.status === "fulfilled" ? operatorData.value : [],
            device: deviceData.status === "fulfilled" ? deviceData.value : [],
            player: playerData.status === "fulfilled" ? playerData.value : [],
          });
        }
      } catch (err) {
        if (!cancelled) console.error(err);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, operator, device, player]);

  if (!manuals) return (
    <div>LOADING....</div>
  );

  const createManual = (manualItem: Manual[]) => {
    if (!manualItem || manualItem.length === 0) return null;

    return manualItem.map((manual: Manual) => {
      actionNumber++;
      return (
        <Card component='div' sx={sxCardMain} key={manual.id}>
          <Box component='h4' sx={sxHeadMain}>
            {`${t('shared:step')}${actionNumber} - ${manual.name}`}
          </Box>
          {
            manual.actions.map((action: Instruction, i: number) => {
              const links = action?.links ?
                action.links.map((link: ILink) => {
                  return (
                    <Box
                      key={link.name}
                      component='button'
                      onClick={() => {
                        handlerOperator(link.link);
                      }}
                      sx={sxButtonLinkOperator}
                    >
                      {link.name}
                    </Box>
                  )
                }) : null;

              const manualImage = action?.img ? <ImageManual image={action.img}/> : null;

              return (
                <div key={manual.id + i}>
                  {action?.name ? <CardContent sx={sxManualText1}>{action.name}</CardContent> : null}
                  {links}
                  {manualImage}
                </div>
              );
            })
          }
        </Card>
      )
    })
  }

  const manualOperator = createManual(manuals.operator);
  const manualDevice = createManual(manuals.device);
  const manualPlayer = createManual(manuals.player);

  return <Box
    component='div'
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
    {manualOperator}
    {manualDevice}
    {manualPlayer}
  </Box>;
};
