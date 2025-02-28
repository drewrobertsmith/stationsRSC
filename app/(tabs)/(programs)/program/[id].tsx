import { renderClips } from "@/actions/render-clips";
import { BodyScrollView } from "@/components/ui/body-scroll-view";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import * as AC from "@bacons/apple-colors";
import { ScrollView, Text, View } from "react-native";

export default function ProgramDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const clips = useMemo(() => renderClips(id), [id]);

  return (
    <BodyScrollView>
      <React.Suspense fallback={<Loading />}>{clips}</React.Suspense>
    </BodyScrollView>
  );
}

function Loading() {
  return (
    <View>
      <SkeletonSection />
    </View>
  );
}

const SkeletonItem = () => (
  <View
    style={{
      flexDirection: "row",
      alignContent: "center",
      marginHorizontal: 4,
      justifyContent: "space-between",

      margin: 4,
      padding: 4,
      gap: 8,
    }}
  >
    <View style={{ padding: 8, gap: 4 }}>
      <View
        style={{
          backgroundColor: AC.systemGray5,
          width: 200,
          height: 20,
          borderRadius: 4,
        }}
      />
      <View
        style={{
          backgroundColor: AC.systemGray5,
          width: 100,
          height: 20,
          borderRadius: 4,
        }}
      />
    </View>
    <View
      style={{
        width: 40,
        height: 40,
        backgroundColor: AC.systemGray5,
        borderRadius: 32,
      }}
    />
  </View>
);

const SkeletonSection = () => (
  <View>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 8 }}
    >
      {[...Array(10)].map((_, i) => (
        <SkeletonItem key={i} />
      ))}
    </ScrollView>
  </View>
);
