import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

export default function ScalingDots({
  dotCount = 3,
  dotSize = 10,
  dotColor = '#007AFF',
  dotSpacing = 8,
  speed = 400, // ms for one pulse
  scaleRange = [1, 1.5], // [minScale, maxScale]
  style,
}) {
  const anims = useRef(
    Array.from({ length: dotCount }, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const animations = anims.map((anim, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * (speed / 2)), // stagger effect
          Animated.timing(anim, {
            toValue: 1,
            duration: speed,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: speed,
            useNativeDriver: true,
          }),
        ])
      )
    );

    animations.forEach((a) => a.start());
    return () => animations.forEach((a) => a.stop());
  }, [anims, speed]);

  return (
    <View style={[styles.container, style]}>
      {anims.map((anim, idx) => {
        const scale = anim.interpolate({
          inputRange: [0, 1],
          outputRange: scaleRange, // e.g. [1, 1.5]
        });

        const opacity = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.6, 1],
        });

        return (
          <Animated.View
            key={idx}
            style={[
              styles.dot,
              {
                width: dotSize,
                height: dotSize,
                borderRadius: dotSize / 2,
                marginHorizontal: dotSpacing / 2,
                backgroundColor: dotColor,
                transform: [{ scale }],
                opacity,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {},
});
