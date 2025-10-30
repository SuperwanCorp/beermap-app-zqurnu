
import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { StyleSheet, View, Text, Platform, Pressable, Alert } from "react-native";
import { useTheme } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";
import { router } from "expo-router";

interface BeerSpot {
  id: string;
  name: string;
  type: string;
  rating: number;
  comment: string;
  latitude: number;
  longitude: number;
  photo?: string;
}

export default function HomeScreen() {
  const theme = useTheme();
  const [beerSpots, setBeerSpots] = useState<BeerSpot[]>([
    {
      id: "1",
      name: "IPA Delight",
      type: "IPA",
      rating: 4.5,
      comment: "Great hoppy flavor",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    {
      id: "2",
      name: "Smooth Lager",
      type: "Lager",
      rating: 4,
      comment: "Crisp and refreshing",
      latitude: 37.8044,
      longitude: -122.2712,
    },
  ]);

  const handleMapPress = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    router.push({
      pathname: "/(tabs)/add-beer",
      params: { latitude: latitude.toString(), longitude: longitude.toString() },
    });
  };

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => router.push("/(tabs)/add-beer")}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="plus" color={colors.secondary} size={24} />
    </Pressable>
  );

  if (Platform.OS === "web") {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen
          options={{
            title: "BeerMap",
            headerRight: renderHeaderRight,
          }}
        />
        <View style={styles.webPlaceholder}>
          <Text style={[styles.webPlaceholderText, { color: colors.text }]}>
            📍 Maps are not supported on web in Natively
          </Text>
          <Text style={[styles.webPlaceholderSubtext, { color: colors.textSecondary }]}>
            Please use the iOS or Android app to view the map
          </Text>
        </View>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "BeerMap",
          headerRight: renderHeaderRight,
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 37.7749,
            longitude: -122.4194,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={handleMapPress}
        >
          {beerSpots.map((spot) => (
            <Marker
              key={spot.id}
              coordinate={{
                latitude: spot.latitude,
                longitude: spot.longitude,
              }}
              title={spot.name}
              description={`${spot.type} - Rating: ${spot.rating}/5`}
              onPress={() => {
                Alert.alert(
                  spot.name,
                  `Type: ${spot.type}\nRating: ${spot.rating}/5\n${spot.comment}`
                );
              }}
            />
          ))}
        </MapView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  headerButtonContainer: {
    padding: 8,
    marginRight: 8,
  },
  webPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  webPlaceholderText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  webPlaceholderSubtext: {
    fontSize: 14,
    textAlign: "center",
  },
});
