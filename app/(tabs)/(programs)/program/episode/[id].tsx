import { renderClipDetails } from "@/actions/render-clip-detail";
import { BodyScrollView } from "@/components/ui/body-scroll-view";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { Text, View } from "react-native";

export default function EpisodeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const clipDetails = useMemo(() => renderClipDetails(id), [id]);

  return (
    <BodyScrollView>
      <React.Suspense fallback={<Loading />}>{clipDetails}</React.Suspense>
    </BodyScrollView>
  );
}

function Loading() {
  return (
    <View>
      <Text>Loading Clip Detail...</Text>
    </View>
  );
}
