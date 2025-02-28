"use server";
import "server-only";
import * as AC from "@bacons/apple-colors";
import { ScrollView, Text, View } from "react-native";
import { Clip } from "@/types/interfaces";
import AntDesign from "@expo/vector-icons/AntDesign";
import { formatDate, formatDuration } from "@/utils/formatters";
import TouchableBounce from "@/components/ui/touchable-bounce.native";
import { Link } from "expo-router";

export async function renderClips(programId: string) {
  return (
    <View>
      <ClipsList programId={programId} />
    </View>
  );
}

const ClipItem = ({ item }: { item: Clip }) => (
  <Link href={`/program/episode/${item.Id}`} asChild>
    <TouchableBounce>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 4,
          paddingVertical: 4,
        }}
      >
        <View
          style={{
            maxWidth: "85%",
          }}
        >
          <Text
            style={{
              color: AC.label,
              fontWeight: "400",
              fontSize: 12,
            }}
          >
            {formatDate(item.PublishedUtc)}
          </Text>
          <Text
            style={{
              color: AC.label,
              fontWeight: "600",
              fontSize: 14,
            }}
          >
            {item.Title}
          </Text>
          <Text
            style={{
              color: AC.label,
              fontWeight: "400",
              fontSize: 12,
            }}
          >
            {formatDuration(item.DurationSeconds)}
          </Text>
        </View>
        <AntDesign name="playcircleo" size={32} color={AC.label} />
      </View>
    </TouchableBounce>
  </Link>
);

async function ClipsList({ programId }: { programId: string }) {
  const clips: Clip[] = await getClips(programId);
  if (!clips.length) return null;

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
      >
        {clips.map((item: Clip) => (
          <ClipItem item={item} key={item.Id} />
        ))}
      </ScrollView>
    </View>
  );
}

async function getClips(programId: string) {
  const baseUrl = process.env.BASE_URL;
  const orgId = process.env.ORG_ID;
  if (!orgId || !baseUrl) {
    throw new Error("org id or url is undefined");
  }
  try {
    const response = await fetch(
      `${baseUrl}/orgs/${orgId}/programs/${programId}/clips`,
    );
    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} | ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data.Clips;
  } catch (error) {
    console.error("Error fetching programs: ", error);
    return [];
  }
}
