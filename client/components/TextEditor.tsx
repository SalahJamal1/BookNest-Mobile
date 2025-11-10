import React, { useState } from "react";
import { Text } from "react-native";

type Props = {
  description: string;
};

export default function TextEditor({ description }: Props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const displayText: any = isExpanded
    ? description
    : description?.split(" ").slice(0, 40).join(" ") + "...";
  return (
    <Text
      style={{
        fontSize: 15,
        color: "#fff",
        fontWeight: "300",
        marginBottom: 20,
      }}
    >
      {displayText}{" "}
      <Text
        onPress={() => setIsExpanded(!isExpanded)}
        style={{
          fontSize: 15,
          color: "#fff",
          fontWeight: "500",
          textTransform: "capitalize",
        }}
      >
        {isExpanded ? "show less" : "show more"}{" "}
      </Text>
    </Text>
  );
}
