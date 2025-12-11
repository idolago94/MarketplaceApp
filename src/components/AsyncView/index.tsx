import { PropsWithChildren } from "react";
import { ActivityIndicator, Text } from "react-native";

interface AsyncView {
  isLoading: boolean;
  error?: string;
}

export default function AsyncView({ isLoading, error, children }: PropsWithChildren<AsyncView>) {
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to get products</Text>;
  }

  return children
}
