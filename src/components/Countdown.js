import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text } from "react-native";

// utils
import { spacing, fontSizes } from "../utils/sizes";
import { colors } from "../utils/colors";

// hellper func
const minToMillIs = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

const Countdown = ({ minutes = 20, isPaused, onProgress, onEnd }) => {
  const [millis, setMillis] = useState(null);
  const interval = useRef(null);

  // countdown func
  const countdown = () => {
    let timeLeft;
    setMillis((time) => {
      if (time === 0) {
        timeLeft = time;
        return time;
      }

      timeLeft = time - 1000;

      return timeLeft;
    });
    if (timeLeft === 0) {
      clearInterval(interval.current);
      onEnd();
    }
    onProgress(timeLeft / minToMillIs(minutes));
  };

  useEffect(() => {
    setMillis(minToMillIs(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) {
        clearInterval(interval.current);
      }
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
