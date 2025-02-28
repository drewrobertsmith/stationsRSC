"use server";
import { Image, ScrollView, Text, View } from "react-native";
import * as AC from "@bacons/apple-colors";
import "server-only";
import { Program } from "@/types/interfaces";
import TouchableBounce from "@/components/ui/touchable-bounce.native";
import { Link } from "expo-router";

export async function renderPrograms() {
  return (
    <View>
      <ProgramsSection />
    </View>
  );
}

//program list item
const ProgramItem = ({ item }: { item: Program }) => (
  <Link href={`/program/${item.Id}`} asChild>
    <TouchableBounce>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          margin: 4,
          padding: 4,
          gap: 8,
        }}
      >
        <Image
          source={{ uri: item.ArtworkUrl }}
          style={{
            height: 56,
            width: 56,
            resizeMode: "contain",
            borderRadius: 4,
          }}
        />
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: AC.label,
            }}
          >
            {item.Name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "300",
              color: AC.label,
            }}
          >
            {item.Author}
          </Text>
        </View>
      </View>
    </TouchableBounce>
  </Link>
);

//program section container
async function ProgramsSection() {
  const programs: Program[] = await getPrograms();
  if (!programs.length) return null;

  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          color: AC.label,
          marginBottom: 8,
          paddingHorizontal: 16,
        }}
      >
        Programs
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {programs.map((item: Program) => (
          <ProgramItem item={item} key={item.Id} />
        ))}
      </ScrollView>
    </View>
  );
}

//omny api request
async function getPrograms(network: string = "Moody Radio") {
  const baseUrl = process.env.BASE_URL;
  const orgId = process.env.ORG_ID;
  if (!orgId || !baseUrl) {
    throw new Error("Org Id or url is undefined");
  }
  try {
    const response = await fetch(`${baseUrl}/orgs/${orgId}/programs`);
    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} | ${response.statusText}`,
      );
    }
    const data = await response.json();
    const filteredData = data.Programs.filter(
      (key: Program) => key.Network === network,
    );
    return filteredData;
  } catch (error) {
    console.error("Error fetching programs: ", error);
    return [];
  }
}
