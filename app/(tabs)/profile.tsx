import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import { Stack } from "expo-router";

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

export default function ProfileScreen() {
  const [username, setUsername] = useState("Beer Enthusiast");
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

  const totalBeers = beerSpots.length;
  const averageRating =
    totalBeers > 0
      ? (beerSpots.reduce((sum, spot) => sum + spot.rating, 0) / totalBeers).toFixed(1)
      : 0;

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <Stack.Screen
        options={{
          title: "Profile",
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          Platform.OS !== "ios" && styles.contentContainerWithTabBar,
        ]}
      >
        <View
          style={[
            styles.profileHeader,
            { backgroundColor: colors.card, borderColor: colors.primary },
          ]}
        >
          <View
            style={[
              styles.avatarCircle,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text style={styles.avatarText}>🍺</Text>
          </View>
          <Text style={[styles.name, { color: colors.text }]}>{username}</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Beer Collector
          </Text>
        </View>

        <View
          style={[
            styles.statsContainer,
            { backgroundColor: colors.card, borderColor: colors.accent },
          ]}
        >
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>
              {totalBeers}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Beers Added
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>
              {averageRating}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Avg Rating
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Recent Beers
          </Text>
          {beerSpots.map((spot) => (
            <View
              key={spot.id}
              style={[
                styles.beerCard,
                { backgroundColor: colors.card, borderColor: colors.accent },
              ]}
            >
              <View style={styles.beerCardContent}>
                <Text style={[styles.beerName, { color: colors.text }]}>
                  {spot.name}
                </Text>
                <Text style={[styles.beerType, { color: colors.textSecondary }]}>
                  {spot.type}
                </Text>
                <Text style={[styles.beerComment, { color: colors.textSecondary }]}>
                  {spot.comment}
                </Text>
              </View>
              <View style={styles.ratingContainer}>
                <Text style={[styles.rating, { color: colors.primary }]}>
                  {spot.rating}
                </Text>
                <Text style={[styles.ratingLabel, { color: colors.textSecondary }]}>
                  ⭐
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  contentContainerWithTabBar: {
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: "center",
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 2,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    elevation: 3,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 40,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    elevation: 2,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  divider: {
    width: 1,
    backgroundColor: "#E0E0E0",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  beerCard: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    elevation: 2,
  },
  beerCardContent: {
    flex: 1,
  },
  beerName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  beerType: {
    fontSize: 12,
    marginBottom: 4,
  },
  beerComment: {
    fontSize: 12,
  },
  ratingContainer: {
    alignItems: "center",
    marginLeft: 12,
  },
  rating: {
    fontSize: 18,
    fontWeight: "700",
  },
  ratingLabel: {
    fontSize: 12,
  },
});
