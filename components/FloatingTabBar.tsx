
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import React from 'react';
import { useRouter, usePathname } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

export interface TabBarItem {
  name: string;
  route: string;
  icon: string;
  label: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
  containerWidth?: number;
  borderRadius?: number;
  bottomMargin?: number;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16,
  },
  tabBar: {
    flexDirection: 'row',
    borderRadius: 50,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    minWidth: 60,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function FloatingTabBar({
  tabs,
  containerWidth = Dimensions.get('window').width - 32,
  borderRadius = 50,
  bottomMargin = 16,
}: FloatingTabBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();

  const handleTabPress = (route: string) => {
    router.push(route);
  };

  return (
    <SafeAreaView
      style={[styles.container, { paddingBottom: bottomMargin }]}
      edges={['bottom']}
      pointerEvents="box-none"
    >
      <BlurView intensity={90} style={{ borderRadius }}>
        <View
          style={[
            styles.tabBar,
            {
              width: containerWidth,
              backgroundColor: `rgba(255, 255, 255, 0.9)`,
              borderRadius,
            },
          ]}
        >
          {tabs.map((tab) => {
            const isActive = pathname.includes(tab.name);
            return (
              <TouchableOpacity
                key={tab.name}
                style={[
                  styles.tab,
                  {
                    backgroundColor: isActive ? colors.primary : 'transparent',
                  },
                ]}
                onPress={() => handleTabPress(tab.route)}
                activeOpacity={0.7}
              >
                <View style={styles.tabContent}>
                  <IconSymbol
                    name={tab.icon}
                    size={24}
                    color={isActive ? colors.card : colors.text}
                  />
                  <Text
                    style={[
                      styles.tabLabel,
                      {
                        color: isActive ? colors.card : colors.text,
                      },
                    ]}
                  >
                    {tab.label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </SafeAreaView>
  );
}
