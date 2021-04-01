import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text } from "react-native";

// utils
import { spacing, fontSizes } from "../utils/sizes";
import { colors } from "../utils/colors";

// hellper func
const minToMillIs = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

const Countdown = ({ minutes = 20, isPaused }) => {
  const [millis, setMillis] = useState(minToMillIs(minutes));
  const interval = useRef(null);

  // countdown func
  const countdown = () => {
    setMillis((time) => {
      if (time === 0) {
        return time;
      }

      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    if (isPaused) {
      return;
    }
    interval.current = setInterval(countdown, 1000);

    return () => {
      clearInterval(interval.current);
    };
  }, [isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

export default Countdown;

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    padding: spacing.lg,
    color: colors.white,
    backgroundColor: colors.lightBlue,
  },
});
