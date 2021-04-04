import React, { useState } from "react";
import { StyleSheet, Text, View, Vibration, Platform } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useKeepAwake } from "expo-keep-awake";

// components
import Countdown from "../../components/Countdown";
import RoundedButton from "../../components/RoundedButton";

// features
import Timing from "./Timing";

// utils
import { colors } from "../../utils/colors";
import { spacing } from "../../utils/sizes";

const DEFAULT_MINUTE = 0.1;

const Timer = ({ focusSubject }) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(DEFAULT_MINUTE);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgressHandler = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === "ios") {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 5000);
    } else {
      Vibration.vibrate(5000);
    }
  };

  const onEndHandler = () => {
    vibrate();
    setMinutes(DEFAULT_MINUTE);
    setProgress(1);
    setIsStarted(false);
  };

  const changeTimeHandler = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgressHandler}
          onEnd={onEndHandler}
        />
      </View>
      <View style={styles.taskContainer}>
        <Text style={styles.title}>Focusing On:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <ProgressBar
          progress={progress}
          style={styles.progressBar}
          color="#5E84E2"
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing changeTime={changeTimeHandler} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
      </View>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  taskContainer: {
    paddingTop: spacing.xxl,
  },
  title: {
    color: colors.white,
    textAlign: "center",
  },
  task: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  progressBarContainer: {
    paddingTop: spacing.sm,
  },
  progressBar: {
    height: spacing.sm,
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    padding: spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
});
