import { Stack } from "expo-router";

export default function RootLayout() {

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="message" />
      <Stack.Screen name="createPost" />
      <Stack.Screen name="forumDetails" />
      <Stack.Screen name="announcementDetails" />
      <Stack.Screen name="students" />
      <Stack.Screen name="studentDetails" />
      <Stack.Screen name="teachers" />
      <Stack.Screen name="teacherDetails" />
      <Stack.Screen name="classes" />
      <Stack.Screen name="parents" />
      <Stack.Screen name="parentDetails" />
      <Stack.Screen name="requests" />
      <Stack.Screen name="requestDetails" />
      <Stack.Screen name="createAnnouncement" />
      <Stack.Screen name="notification" />
      <Stack.Screen name="payment" />
    </Stack>
  );
}
