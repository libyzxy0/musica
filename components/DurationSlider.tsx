import Slider from "@react-native-community/slider";
import { Text, View, useThemeColor } from "@/components/Themed";
import { useAudio } from "@/hooks/useAudio";
import { useState } from "react";
import { colors } from '@/utils/getColors'

export function DurationSlider() {
  const [holdValue, setHoldValue] = useState(false);
  const { currentAudioPlaying, setPosition } = useAudio();
  const onSlide = m => {
    setPosition(m);
    setHoldValue(false);
  };
  return (
    <View
      style={{
        marginTop: 15,
        backgroundColor: 'transparent'
      }}
    >
      <Slider
        style={{
          width: "100%",
          height: 10,
          marginTop: 10
        }}
        value={!holdValue && currentAudioPlaying?.currentDuration}
        onSlidingComplete={onSlide}
        onSlidingStart={() => setHoldValue(true)}
        minimumValue={0}
        maximumValue={currentAudioPlaying?.endDuration}
        minimumTrackTintColor={useThemeColor({}, "primary")}
        thumbTintColor={useThemeColor({}, "primary")}
        maximumTrackTintColor={useThemeColor({}, "secondary")}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginTop: 5,
          backgroundColor: 'transparent'
        }}
      >
        <Text
          style={{
            color: useThemeColor({}, "secondary")
          }}
        >
          {`${Math.floor(
            currentAudioPlaying?.currentDuration / 60000
          )}:${String(
            Math.floor((currentAudioPlaying?.currentDuration % 60000) / 1000)
          ).padStart(2, "0")}`}
        </Text>
        <Text
          style={{
            color: useThemeColor({}, "secondary")
          }}
        >
          {`${Math.floor(
            currentAudioPlaying?.endDuration / 60000
          )}:${String(
            Math.floor((currentAudioPlaying?.endDuration % 60000) / 1000)
          ).padStart(2, "0")}`}
        </Text>
      </View>
    </View>
  );
}
