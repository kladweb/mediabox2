import { useEffect, useState } from "react";
import { type Params, useParams } from "react-router-dom";

type Manuals = {
  operator: unknown;
  device: unknown;
  player: unknown;
} | null;

export const Manual = () => {
  const params: Readonly<Params<string>> = useParams();
  const {language, operator, device, player} = params;

  const [manuals, setManuals] = useState<Manuals>(null);

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

  return <div>MANUAL</div>;
};
