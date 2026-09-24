import { useEffect, useState } from "react";
import { type Params, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion, AccordionDetails, AccordionSummary, Box, Button,
  ButtonGroup, CircularProgress, Stack
} from "@mui/material";
import { operators } from "../data/dataIPTV";
import { appColors } from "../services/appColors";
import { ListChannel } from "./ListChannel";
import type { ITranslate } from "../types/typesBox";

export const CategoriesOperator = () => {
  const {t}: ITranslate = useTranslation();
  const params: Readonly<Params<string>> = useParams();
  const [channelsList, setChannelsList] = useState<object[]>([]);
  const [isListLoaded, setIsListLoaded] = useState<boolean>(false);
  const [categoriesList, setCategoriesList] = useState<string[]>([]);
  const [expandedAccordions, setExpandedAccordions] = useState<number[]>([]);
  const operator = params.operator;
  const links: string[] = operators[operator as keyof (typeof operators)]['links'];

  useEffect(() => {
    // Reset opened accordions when operator changes
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsListLoaded(false);
    setExpandedAccordions([]);
    if (!operator) return;
    fetch(`/channelsLists/${operator}List.json`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setChannelsList(data[operator]);
        setIsListLoaded(true);
        const catList: string[] = [];
        data[operator].forEach((_item: object, index: number) => {
          if (!catList.includes(data[operator][index]['group'])) {
            catList.push(data[operator][index]['group']);
          }
        });
        setCategoriesList(catList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [operator]);

  const handlerOperator = (link: string): void => {
    window.open(link);
  }

  const collapseAll = () => {
    setExpandedAccordions([]);
  };

  const expandAll = () => {
    if (categoriesList) {
      const newArray: number[] = [];
      categoriesList.forEach((_log: string, index: number) => newArray.push(index));
      setExpandedAccordions(newArray);
    }
  };

  const changeAccordion = (index: number) => {
    const newArray = [...expandedAccordions];
    if (expandedAccordions.includes(index)) {
      const number = newArray.indexOf(index);
      newArray.splice(number, 1);
      setExpandedAccordions(newArray);
    } else {
      newArray.push(index);
      setExpandedAccordions(newArray);
    }
  }

  const loader = (
    <Box component="div"
         sx={{
           width: '100%',
           textAlign: 'center',
           my: '2rem'
         }}>
      <Stack sx={{color: `${appColors.mid2}`, display: 'block'}}>
        <CircularProgress color="inherit" sx={{textAlign: 'center'}}/>
      </Stack>
    </Box>
  );

  return (
    <Box component="div" sx={{width: '100%', textAlign: 'center', mb: '3rem'}}>
      <Box
        component="img"
        src={`/img/operators/${operator ? operator.toLowerCase() : 'img'}.webp`}
        alt={operator}
        onClick={(): void => {
          handlerOperator(links[0]);
        }}
        sx={{
          margin: "1.5rem auto 0",
          width: {xs: '15rem', md: '20rem'},
          objectFit: "contain",
          backgroundColor: appColors.light1,
          borderRadius: {xs: '5px', md: '10px'},
          cursor: "pointer"
        }}
      />
      {
        (isListLoaded) ?
          <>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', '& > *': {m: 1,},}}>
              <ButtonGroup variant="outlined" color="warning" aria-label="Medium-sized button group">
                <Button key="one" onClick={expandAll}>{t('shared:menuExpand')}</Button>,
                <Button key="three" onClick={collapseAll}>{t('shared:menuCollapse')}</Button>
              </ButtonGroup>
            </Box>
            <Box component="div" sx={{display: 'block'}}>
              {categoriesList.map((element: string, index: number) => {
                return (
                  <Accordion
                    // defaultExpanded={false}
                    key={`accordion${index}`}
                    sx={{color: appColors.light1, backgroundColor: appColors.light11}}
                    expanded={expandedAccordions.includes(index)}
                    slotProps={{transition: {unmountOnExit: true}}}
                    onChange={() => changeAccordion(index)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon sx={{color: appColors.light1}}/>}
                      aria-controls={`${element}-content`}
                      id={`${element}-header`}
                      // sx={{width: {xs: '50%', md: '55%'}, fontSize: {xs: '1rem', md: '1.25rem'}}}
                      sx={{mx: 'auto', maxWidth: '25rem', fontSize: {xs: '1rem', md: '1.25rem'}}}
                    >
                      {element}
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}
                    >
                      {
                        channelsList.map((channelObj: object, i: number) => {
                          let srcImgChannel: string = channelObj['src' as keyof (typeof channelObj)];
                          const altImgChannel: string = channelObj['name' as keyof (typeof channelObj)];
                          const nameImgChannel: string = channelObj['name' as keyof (typeof channelObj)];
                          if (!srcImgChannel) {
                            srcImgChannel = '/img/channels/noimage.webp';
                          }
                          if (channelObj['group' as keyof (typeof channelObj)] === element) {
                            return (
                              <ListChannel
                                key={`${operator}${i}`}
                                index={i}
                                srcImgChannel={srcImgChannel}
                                altImgChannel={altImgChannel}
                                nameImgChannel={nameImgChannel}
                              />
                            );
                          }
                        })
                      }
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Box>
          </>
          :
          <>{loader}</>
      }
    </Box>
  )
}
