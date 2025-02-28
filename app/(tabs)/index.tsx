import RenderStations from "@/actions/render-stations";
import { BodyScrollView } from "@/components/ui/body-scroll-view";
import React, { useMemo } from "react";
import { SafeAreaView, Text, View } from "react-native";

export default function Stations() {
  const stations = useMemo(() => RenderStations(), []);

  return (
    <BodyScrollView>
      <React.Suspense fallback={<Loading />}>{stations}</React.Suspense>
    </BodyScrollView>
  );
}

function Loading() {
  return <Text>Loading Stations....</Text>;
}
