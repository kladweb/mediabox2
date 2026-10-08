import { useEffect, useState } from "react";
import { type Params, useParams } from "react-router-dom";
import { Box, Card } from "@mui/material";
import { useTranslation } from "react-i18next";
import { sxCardMain, sxHeadMain } from "../services/sxStyles.ts";
import { appColors } from "../services/appColors.ts";
import type { ITranslate } from "../types/typesBox.ts";

type Instruction = {
  name: string;
  img?: string;
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

  const [manuals, setManuals] = useState<Manuals | null>(null);

  const loadManual = async (part: string) => {
    const response = await fetch(`/manualsText/${language}/${part}.json`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  };

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
            operator: operatorData.status === "fulfilled" ? operatorData.value : null,
            device: deviceData.status === "fulfilled" ? deviceData.value : null,
            player: playerData.status === "fulfilled" ? playerData.value : null,
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

  console.log(manuals);

  if (!manuals) return (
    <div>LOADING....</div>
  );

  const manualOperator = manuals.operator.map((manual: Manual, i: number) => {
    console.log(manual);
    return (
      <Card component='div' sx={sxCardMain} key={manual.id}>
        <Box component='h4' sx={sxHeadMain}>
          {`${t('shared:step')}${i + 1} - ${manual.name}`}
        </Box>
      </Card>
    )
  })

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
  </Box>;
};
