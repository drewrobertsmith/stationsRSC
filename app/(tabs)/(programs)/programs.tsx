/// <reference types="react/canary" />

import { ScrollView, View } from "react-native";
import * as AC from "@bacons/apple-colors";
import { BodyScrollView } from "@/components/ui/body-scroll-view";
import React, { useMemo } from "react";
import { renderPrograms } from "@/actions/render-programs";

const ARTWORK_WIDTH = 56;

export default function Index() {
  const programs = useMemo(() => renderPrograms(), []);

  return (
    <BodyScrollView
      contentContainerStyle={{
        paddingVertical: 16,
        gap: 2,
      }}
    >
      <React.Suspense fallback={<Loading />}>{programs}</React.Suspense>
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

      margin: 4,
      padding: 4,
      gap: 8,
    }}
  >
    <View
      style={{
        width: ARTWORK_WIDTH,
        height: ARTWORK_WIDTH,
        borderRadius: 12,
        backgroundColor: AC.systemGray5,
      }}
    />
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
  </View>
);

const SkeletonSection = () => (
  <View>
    <View
      style={{
        width: 100,
        height: 20,
        backgroundColor: AC.systemGray5,
        borderRadius: 4,
        marginBottom: 8,
        marginLeft: 16,
      }}
    />
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
