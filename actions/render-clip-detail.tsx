"use server";
import "server-only";
import * as AC from "@bacons/apple-colors";
import { Image, ScrollView, Text, View } from "react-native";
import { Clip } from "@/types/interfaces";

export async function renderClipDetails(clipId: string) {
  <View>
    <ClipDetailSection clipId={clipId} />
  </View>;
}

const ClipDetailItem = ({ item }: { item: Clip }) => (
  <View>
    <Text>{item.Title}</Text>
  </View>
);

async function ClipDetailSection({ clipId }: { clipId: string }) {
  const clip: Clip = await getClipById(clipId);
  if (!clip) return null;

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ClipDetailItem item={clip} />
      </ScrollView>
    </View>
  );
}

async function getClipById(clipId: string) {
  const baseUrl = process.env.BASE_URL;
  const orgId = process.env.ORG_ID;
  if (!orgId || !baseUrl) {
    throw new Error("org id or url is undefined");
  }
  try {
    const response = await fetch(`${baseUrl}/orgs/${orgId}/clips/${clipId}`);
    console.log(response);
    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} | ${response.statusText}`,
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Clip Details: ", error);
    return [];
  }
}
