import { useEffect, useState } from "react";
import { type Params, useParams } from "react-router-dom";
import { Box, Card, CardContent } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  sxButtonLinkOperator,
  sxCardMain,
  sxHeadMain,
  sxManualText1,
} from "../services/sxStyles.ts";
import { appColors } from "../services/appColors.ts";
import type { ITranslate } from "../types/typesBox.ts";
import ImageManual from "./ImageManual.tsx";

type ILink = {
  name: string;
  link: string;
};

type Instruction = {
  name?: string;
  img?: string;
  links?: ILink[];
  [key: `name${string}`]: string | undefined;
  [key: `img${string}`]: string | undefined;
};

type Manual = {
  id: string;
  name: string;
  actions: Instruction[];
};

interface Manuals {
  operator: Manual[];
  device: Manual[];
  player: Manual[];
}

type ManualRequest = {
  key: keyof Manuals;
  promise: Promise<Manual[]>;
};

type ManualReference = {
  source: string;
};

type ManualEntry = Manual | ManualReference;

export const Manuals = () => {
  const {t}: ITranslate = useTranslation();
  const params: Readonly<Params<string>> = useParams();
  const {language, operator, device, player} = params;
  let actionNumber = 0;
  const [manuals, setManuals] = useState<Manuals | null>(null);

  const handlerOperator = (link: string): void => {
    window.open(link);
  };

  const loadInstructions = async (url: string): Promise<Manual[]> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const instructions: ManualEntry[] = await response.json();
    return Promise.all(
      instructions.map(async (item): Promise<Manual> => {
        if (!("source" in item)) return item;
        const sourceUrl = new URL(item.source, response.url || url);
        const external = await fetch(sourceUrl);
        if (!external.ok) {
          throw new Error(`HTTP ${external.status}: ${sourceUrl}`);
        }
        return external.json();
      })
    );
  };

  const loadManual = (part: string): Promise<Manual[]> => {
    return loadInstructions(`/manualsText/${language}/${part}.json`);
  };

  useEffect(() => {
    if (!language || (!operator && !device && !player)) return;
    let cancelled = false;
    (async () => {
      const requests: ManualRequest[] = [];
      if (operator) {
        requests.push({
          key: "operator",
          promise: loadManual(operator),
        });
      }
      if (device) {
        requests.push({
          key: "device",
          promise: loadManual(device),
        });
      }
      if (player) {
        requests.push({
          key: "player",
          promise: loadManual(player),
        });
      }
      const results = await Promise.allSettled(
        requests.map(({promise}) => promise)
      );

      if (cancelled) return;

      const data: Manuals = {
        operator: [],
        device: [],
        player: [],
      };
      results.forEach((result, index) => {
        const key = requests[index].key;

        if (result.status === "fulfilled") {
          data[key] = result.value;
        } else {
          console.error(`Failed to load ${key}:`, result.reason);
        }
      });
      setManuals(data);
    })();
    return () => {
      cancelled = true;
    };
  }, [language, operator, device, player]);

  if (!manuals) {
    return <div>LOADING....</div>;
  }

  const createManual = (manualItem: Manual[]) => {
    if (!manualItem || manualItem.length === 0) return null;

    return manualItem.map((manual: Manual) => {
      if (player === "ottplayer" && manual.id === "prepareBox") {
        return null;
      }

      actionNumber++;

      return (
        <Card component="div" sx={sxCardMain} key={manual.id}>
          <Box component="h4" sx={sxHeadMain}>
            {`${t("shared:step")}${actionNumber} - ${manual.name}`}
          </Box>

          {manual.actions.map((action: Instruction, i: number) => {
            const links = action?.links
              ? action.links.map((link: ILink) => (
                <Box
                  key={link.name}
                  component="button"
                  onClick={() => {
                    handlerOperator(link.link);
                  }}
                  sx={sxButtonLinkOperator}
                >
                  {link.name}
                </Box>
              ))
              : null;

            const manualName =
              (operator && action[`name${operator}`]) ??
              (device && action[`name${device}`]) ??
              (player && action[`name${player}`]) ??
              action.name ??
              null;

            const manualImage =
              (operator && action[`img${operator}`]) ??
              (device && action[`img${device}`]) ??
              (player && action[`img${player}`]) ??
              action.img ??
              null;

            return (
              <div key={manual.id + i}>
                {manualName ? (
                  <CardContent sx={sxManualText1}>
                    {manualName}
                  </CardContent>
                ) : null}

                {links}

                {manualImage ? (
                  <ImageManual image={manualImage}/>
                ) : null}
              </div>
            );
          })}
        </Card>
      );
    });
  };

  const manualOperator = createManual(manuals.operator);
  const manualDevice = createManual(manuals.device);
  const manualPlayer = createManual(manuals.player);

  return (
    <Box
      component="div"
      sx={{
        mt: 12,
        mx: "auto",
        width: "100%",
        fontSize: {xs: "1.25rem", md: "1.5rem"},
        fontWeight: "400",
        color: appColors.mid2,
        textAlign: "center",
      }}
    >
      {manualOperator}
      {manualDevice}
      {manualPlayer}
    </Box>
  );
};
