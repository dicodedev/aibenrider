import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";

const colors = ["#FFDAAD", "#CCD9F8", "#FFD0DA", "#E6F5E0"];

export function GlowBG() {
  const [color, setColor] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      setColor(color < (colors.length -1) ? color + 1 : 0);
    }, 5000);
  }, [color]);

  useEffect(() => {
    // console.log(colors[color]);
  }, [color]);
  return (
    <LinearGradient
      colors={[colors[color], "transparent"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{
        top: 0,
        left: 0,
        position: "absolute",
        height: 400,
        width: "100%",
        opacity: 0.6,
      }}
    />
  );
}
