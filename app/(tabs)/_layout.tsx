import React from 'react';
import { Platform } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'map.fill',
      label: 'Map',
    },
    {
      name: 'community',
      route: '/(tabs)/community',
      icon: 'bubble.right.fill',
      label: 'Community',
    },
    {
      name: 'discover',
      route: '/(tabs)/discover',
      icon: 'sparkles',
      label: 'Discover',
    },
    {
      name: 'add-beer',
      route: '/(tabs)/add-beer',
      icon: 'plus.circle.fill',
      label: 'Add Beer',
    },
    {
      name: 'profile',
      route: '/(tabs)/profile',
      icon: 'person.fill',
      label: 'Profile',
    },
  ];

  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="(home)">
          <Icon sf="map.fill" drawable="ic_map" />
          <Label>Map</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="community">
          <Icon sf="bubble.right.fill" drawable="ic_chat" />
          <Label>Community</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="discover">
          <Icon sf="sparkles" drawable="ic_star" />
          <Label>Discover</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="add-beer">
          <Icon sf="plus.circle.fill" drawable="ic_add" />
          <Label>Add Beer</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          <Icon sf="person.fill" drawable="ic_profile" />
          <Label>Profile</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen name="(home)" />
        <Stack.Screen name="community" />
        <Stack.Screen name="discover" />
        <Stack.Screen name="add-beer" />
        <Stack.Screen name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
