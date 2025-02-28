"use server";

import TouchableBounce from "@/components/ui/touchable-bounce.native";
import { ScrollView, Text, View } from "react-native";
import * as AC from "@bacons/apple-colors";
import "server-only";
import { MUSIC_STATION_DATA } from "@/db/music-stations";
import { Station } from "@/types/interfaces";

export default async function RenderStations() {
  return (
    <View>
      <StationsList />
    </View>
  );
}

const StationItem = ({ item }: { item: Station }) => (
  <TouchableBounce>
    <View
      style={{
        paddingVertical: 8,
      }}
    >
      <Text
        style={{
          color: AC.label,
          fontSize: 40,
          fontWeight: "600",
        }}
      >
        {item.name}
      </Text>
    </View>
  </TouchableBounce>
);

async function StationsList() {
  const stations: Station[] = await getStations();
  if (!stations.length) return null;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {stations.map((item: Station) => (
        <StationItem item={item} key={item.tritonId} />
      ))}
    </ScrollView>
  );
}

async function getStations() {
  try {
    const data = MUSIC_STATION_DATA;
    return data;
  } catch (error) {
    console.error("Error fetching stations: ", error);
    return [];
  }
}
