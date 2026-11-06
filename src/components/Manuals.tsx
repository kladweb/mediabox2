import { useEffect, useState, type ReactNode, Fragment } from "react";
import { type Params, useParams } from "react-router-dom";
import { Box, Card, CardContent, FormControlLabel, Radio, RadioGroup, } from "@mui/material";
import { useTranslation } from "react-i18next";
import { sxButtonLinkOperator, sxCardMain, sxHeadMain, sxManualText1, } from "../services/sxStyles.ts";
import { appColors } from "../services/appColors.ts";
import type { ITranslate } from "../types/typesBox.ts";
import ImageManual from "./ImageManual.tsx";
import { LoaderLinear } from "./LoaderLinear.tsx";

type ILink = {
  name: string;
  link: string;
};

type ManualOption = {
  id: string;
  name: string;
  actions: Instruction[];
};

type Instruction = {
  name?: string;
  img?: string;
  links?: ILink[];
  options?: Record<string, ManualOption>;
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

// -------------------------------------
// JSON loaders
// -------------------------------------

const loadInstructions = async (url: string): Promise<Manual[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const instructions: ManualEntry[] = await response.json();
  return Promise.all(
    instructions.map(async (item): Promise<Manual> => {
      if (!("source" in item)) return item;
      const sourceUrl = new URL(
        item.source,
        response.url || new URL(url, window.location.origin).href
      );
      const external = await fetch(sourceUrl);
      if (!external.ok) {
        throw new Error(`HTTP ${external.status}: ${sourceUrl}`);
      }
      return external.json();
    })
  );
};

const loadManual = (
  part: string,
  language: string
): Promise<Manual[]> => {
  return loadInstructions(
    `/manualsText/${language}/${part}.json`
  );
};

// -------------------------------------
// Component
// -------------------------------------

export const Manuals = () => {
  const {t}: ITranslate = useTranslation();
  const params: Readonly<Params<string>> = useParams();
  const {language, operator, device, player} = params;
  const [manuals, setManuals] = useState<Manuals | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [isOpenLoader, setIsOpenLoader] = useState<boolean>(true);

  // -------------------------------------
  // Handlers
  // -------------------------------------

  const handlerOperator = (link: string): void => {
    window.open(link);
  };

  const handleOptionChange = (
    optionKey: string,
    value: string
  ): void => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionKey]: value,
    }));
  };

  useEffect((): void => {
    setTimeout(() => {
      setIsOpenLoader(false);
    }, 1500);
  }, [isOpenLoader]);

  // -------------------------------------
  // Load manuals
  // -------------------------------------


  useEffect(() => {
    if (!language || (!operator && !device && !player)) return;

    let cancelled = false;

    (async () => {
      const requests: ManualRequest[] = [];

      if (operator) {
        requests.push({
          key: "operator",
          promise: loadManual(operator, language),
        });
      }

      if (device) {
        requests.push({
          key: "device",
          promise: loadManual(device, language),
        });
      }

      if (player) {
        requests.push({
          key: "player",
          promise: loadManual(player, language),
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
          console.error(
            `Failed to load ${key}:`,
            result.reason
          );
        }
      });

      setManuals(data);
    })();

    return () => {
      cancelled = true;
    };
  }, [language, operator, device, player]);

  // -------------------------------------
  // Loading state
  // -------------------------------------

  if (!manuals) {
    return <div>LOADING....</div>;
  }

  // -------------------------------------
  // Recursive actions renderer
  // -------------------------------------

  const createActions = (
    actions: Instruction[],
    manualKey: string,
    parentKey = ""
  ): ReactNode => {
    return actions.map((action, i) => {
      const actionKey = `${parentKey}${i}`;
      const optionKey = `${manualKey}:${actionKey}`;

      // Links
      const links = action.links?.map((link: ILink) => (
        <Box
          key={link.link}
          component="button"
          onClick={() => handlerOperator(link.link)}
          sx={sxButtonLinkOperator}
        >
          {link.name}
        </Box>
      ));

      // Text
      const manualName =
        (operator && action[`name${operator}`]) ??
        (device && action[`name${device}`]) ??
        (player && action[`name${player}`]) ??
        action.name ??
        null;

      // Image
      const manualImage =
        (operator && action[`img${operator}`]) ??
        (device && action[`img${device}`]) ??
        (player && action[`img${player}`]) ??
        action.img ??
        null;

      // Options
      const options = action.options ? Object.values(action.options) : [];

      const selectedOption = options.find(
        (option) => option.id === selectedOptions[optionKey]
      );

      return (
        <Fragment key={actionKey}>
          {manualName && (
            <CardContent sx={sxManualText1}>
              {manualName}
            </CardContent>
          )}

          {links ? <CardContent sx={sxManualText1}>{links}</CardContent> : null}

          {manualImage && (
            <ImageManual image={manualImage}/>
          )}

          {options.length > 0 && (
            <CardContent sx={sxManualText1}>
              <RadioGroup
                name={optionKey}
                value={selectedOptions[optionKey] ?? ""}
                onChange={(_event, value) =>
                  handleOptionChange(optionKey, value)
                }
                sx={{
                  alignItems: "center",
                  gap: 1
                }}
              >
                {options.map((option) => {
                  const selected = selectedOptions[optionKey] === option.id;

                  return (
                    <FormControlLabel
                      key={option.id}
                      value={option.id}
                      control={<Radio sx={{display: "none"}}/>}
                      label={option.name}
                      sx={{
                        m: 0,
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: selected ? appColors.mid2 : "divider",
                        backgroundColor: selected
                          ? "rgba(245, 158, 11, 0.12)"
                          : "transparent",
                        color: selected ? appColors.mid2 : appColors.light1,
                        fontWeight: selected ? 600 : 400,
                        transition: "all 0.2s ease",
                        cursor: "pointer",
                        "&:hover": {
                          borderColor: appColors.mid21,
                          backgroundColor: "rgba(245, 158, 11, 0.08)",
                        },
                      }}
                    />
                  );
                })}
              </RadioGroup>
            </CardContent>
          )}

          {selectedOption && (
            <Box>
              {createActions(
                selectedOption.actions,
                manualKey,
                `${actionKey}:${selectedOption.id}:`
              )}
            </Box>
          )}
        </Fragment>
      );
    });
  };

  // -------------------------------------
  // Manual renderer
  // -------------------------------------

  let actionNumber = 0;

  const createManual = (
    manualItem: Manual[],
    section: keyof Manuals
  ): ReactNode => {
    if (!manualItem || manualItem.length === 0) return null;

    return manualItem.map((manual: Manual) => {
      if (
        player === "ottplayer" &&
        manual.id === "prepareBox"
      ) {
        return null;
      }

      actionNumber++;

      const manualKey = `${language}:${section}:${manual.id}`;

      return (
        <Card
          className="TTT"
          component="div"
          sx={sxCardMain}
          key={manualKey}
        >
          <Box component="h4" sx={sxHeadMain}>
            {`${t("shared:step")}${actionNumber} - ${manual.name}`}
          </Box>

          {createActions(manual.actions, manualKey)}
        </Card>
      );
    });
  };

  // -------------------------------------
  // Render manuals
  // -------------------------------------

  const manualOperator = createManual(manuals.operator, "operator");

  const manualDevice = createManual(manuals.device, "device");

  const manualPlayer = createManual(manuals.player, "player");

  // -------------------------------------
  // JSX
  // -------------------------------------

  if (isOpenLoader) return <LoaderLinear isOpenLoader={isOpenLoader}/>

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
