
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams } from "expo-router";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";

const BEER_TYPES = ["IPA", "Lager", "Stout", "Porter", "Pilsner", "Wheat", "Sour", "Other"];

export default function AddBeerScreen() {
  const params = useLocalSearchParams();
  const latitude = params.latitude ? parseFloat(params.latitude as string) : 37.7749;
  const longitude = params.longitude ? parseFloat(params.longitude as string) : -122.4194;

  const [beerName, setBeerName] = useState("");
  const [beerType, setBeerType] = useState("IPA");
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");
  const [showTypeMenu, setShowTypeMenu] = useState(false);

  const handleSubmit = () => {
    if (!beerName.trim()) {
      Alert.alert("Error", "Please enter a beer name");
      return;
    }

    Alert.alert(
      "Success",
      `Added ${beerName} (${beerType}) with rating ${rating}/5 at coordinates ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
    );

    setBeerName("");
    setBeerType("IPA");
    setRating(3);
    setComment("");
  };

  const renderStars = () => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Pressable
            key={star}
            onPress={() => setRating(star)}
            style={styles.starButton}
          >
            <Text style={styles.starText}>
              {star <= rating ? "⭐" : "☆"}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <Stack.Screen
        options={{
          title: "Add Beer",
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
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.accent },
          ]}
        >
          <Text style={[styles.label, { color: colors.text }]}>Beer Name *</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.highlight,
                color: colors.text,
                borderColor: colors.primary,
              },
            ]}
            placeholder="Enter beer name"
            placeholderTextColor={colors.textSecondary}
            value={beerName}
            onChangeText={setBeerName}
          />
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.accent },
          ]}
        >
          <Text style={[styles.label, { color: colors.text }]}>Beer Type</Text>
          <Pressable
            style={[
              styles.typeButton,
              {
                backgroundColor: colors.highlight,
                borderColor: colors.primary,
              },
            ]}
            onPress={() => setShowTypeMenu(!showTypeMenu)}
          >
            <Text style={[styles.typeButtonText, { color: colors.text }]}>
              {beerType}
            </Text>
            <IconSymbol
              name={showTypeMenu ? "chevron.up" : "chevron.down"}
              color={colors.primary}
              size={20}
            />
          </Pressable>

          {showTypeMenu && (
            <View style={styles.typeMenu}>
              {BEER_TYPES.map((type) => (
                <Pressable
                  key={type}
                  style={[
                    styles.typeMenuItem,
                    {
                      backgroundColor:
                        type === beerType ? colors.primary : colors.highlight,
                    },
                  ]}
                  onPress={() => {
                    setBeerType(type);
                    setShowTypeMenu(false);
                  }}
                >
                  <Text
                    style={[
                      styles.typeMenuItemText,
                      {
                        color:
                          type === beerType ? colors.card : colors.text,
                      },
                    ]}
                  >
                    {type}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.accent },
          ]}
        >
          <Text style={[styles.label, { color: colors.text }]}>Rating</Text>
          {renderStars()}
          <Text style={[styles.ratingText, { color: colors.primary }]}>
            {rating}/5 Stars
          </Text>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.accent },
          ]}
        >
          <Text style={[styles.label, { color: colors.text }]}>
            Comment (Optional)
          </Text>
          <TextInput
            style={[
              styles.textArea,
              {
                backgroundColor: colors.highlight,
                color: colors.text,
                borderColor: colors.primary,
              },
            ]}
            placeholder="Add your tasting notes..."
            placeholderTextColor={colors.textSecondary}
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
          />
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.accent },
          ]}
        >
          <Text style={[styles.label, { color: colors.text }]}>Location</Text>
          <View style={styles.locationInfo}>
            <IconSymbol name="location.fill" color={colors.primary} size={20} />
            <Text style={[styles.locationText, { color: colors.textSecondary }]}>
              {latitude.toFixed(4)}, {longitude.toFixed(4)}
            </Text>
          </View>
        </View>

        <Pressable
          style={[
            styles.submitButton,
            { backgroundColor: colors.primary },
          ]}
          onPress={handleSubmit}
        >
          <Text style={[styles.submitButtonText, { color: colors.card }]}>
            Save Beer Spot
          </Text>
        </Pressable>
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
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    fontSize: 16,
  },
  typeButton: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  typeMenu: {
    marginTop: 8,
    borderRadius: 8,
    overflow: "hidden",
    gap: 4,
  },
  typeMenuItem: {
    padding: 12,
    borderRadius: 6,
  },
  typeMenuItemText: {
    fontSize: 14,
    fontWeight: "500",
  },
  starsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  starButton: {
    padding: 8,
  },
  starText: {
    fontSize: 32,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  textArea: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    fontSize: 16,
    textAlignVertical: "top",
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  locationText: {
    fontSize: 14,
  },
  submitButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    elevation: 4,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
