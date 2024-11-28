import React, { useState, useEffect } from "react";
import { Button, Group } from "@mantine/core";
import { useCurrentRates } from "./hooks/useCurrentRates";
import { useHistoricalRates } from "./hooks/useHistoricalRates";
import { notifications } from "@mantine/notifications";
import classes from "./App.module.css";
import { ref } from "./services";
import { useCurrencyStore } from "./store/store";
import { CurrencyTable, SelectForm } from "./components";

const App: React.FC = () => {
  const { rateCode, codes, lang, time } = useCurrencyStore();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const { refetch: refetchCurrentRates, isFetching: isCurrentRatesLoading } =
    useCurrentRates(ref, rateCode, codes, lang);

  const {
    refetch: refetchHistoricalRates,
    isFetching: isHistoricalRatesLoading,
  } = useHistoricalRates(
    rateCode,
    time ? Math.floor(time.getTime() / 1000) : 0,
    codes,
    lang
  );

  useEffect(() => {
    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setIsButtonDisabled(false);
    }
  }, [countdown]);

  const handleConvert = async () => {
    if (!rateCode || !time || !codes.length) {
      notifications.show({
        color: "red",
        title: "Error",
        message: "Please fill all fields",
      });
      return;
    }
    await refetchCurrentRates();
    await refetchHistoricalRates();

    setCountdown(30);
    setIsButtonDisabled(true);
  };

  return (
    <div className={classes.wrap}>
      <div className={classes.logoWrap}>
        <img className={classes.logo} src="./logo.svg" alt="logo" />
      </div>
      <SelectForm />

      <Group mt="md" justify="center">
        <Button
          onClick={handleConvert}
          loading={isCurrentRatesLoading || isHistoricalRatesLoading}
          disabled={isButtonDisabled}
        >
          {isButtonDisabled ? `Wait ${countdown}s` : "Convert"}
        </Button>
      </Group>

      <CurrencyTable />
    </div>
  );
};

export default App;
