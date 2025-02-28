"use client";

import { Program } from "@/types/interfaces";
import { FlatList, Text } from "react-native";

export default function ProgramList({ programs }: { programs: Program[] }) {
  return (
    <FlatList
      data={programs}
      keyExtractor={(item) => item.Id}
      renderItem={({ item }) => <Text>{item.Name}</Text>}
    />
  );
}
