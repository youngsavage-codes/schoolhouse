import { router } from "expo-router";
import { Profile, Home, Building4, User, Wallet2, UserAdd, Archive } from "iconsax-react-native";

type Role = 'admin' | 'teacher' | 'parent';

export const dashboardItems = [
  {
    id: '1',
    title: 'Students',
    icon: <Profile size={28} variant="Bulk" />,
    color: 'rgba(76, 175, 80, 0.8)',
    roles: ['admin', 'teacher', 'parent'], // ✅ who can see this
    onPress: () => router.push('/(more)/students'),
  },
  {
    id: '1',
    title: 'Wards',
    icon: <Profile size={28} variant="Bulk" />,
    color: 'rgba(76, 175, 80, 0.8)',
    roles: ['parent'], // ✅ who can see this
    onPress: () => router.push('/(more)/students'),
  },
  {
    id: '2',
    title: 'Teachers',
    icon: <Home size={28} variant="Bulk" />,
    color: 'rgba(33, 150, 243, 0.8)',
    roles: ['admin'], // ✅ only admin
    onPress: () => router.push('/(more)/teachers'),
  },
  {
    id: '3',
    title: 'Classes',
    icon: <Building4 size={28} variant="Bulk" />,
    color: 'rgba(255, 152, 0, 0.8)',
    roles: ['admin', 'teacher'],
    onPress: () => router.push('/(more)/classes'),
  },
  {
    id: '4',
    title: 'Parents',
    icon: <User size={28} variant="Bulk" />,
    color: 'rgba(156, 39, 176, 0.8)',
    roles: ['admin'],
    onPress: () => router.push('/(more)/parents'),
  },
  {
    id: '5',
    title: 'Requests',
    icon: <Profile size={28} variant="Bulk" />,
    color: 'rgba(255, 87, 34, 0.8)',
    roles: ['admin'],
    onPress: () => router.push('/(more)/requests'),
  },
  {
    id: '6',
    title: 'Payments',
    icon: <Wallet2 size={28} variant="Bulk" />,
    color: 'rgba(0, 188, 212, 0.8)',
    roles: ['admin', 'parent'], // ✅ parents can see payments
    onPress: () => router.push('/(more)/payments'),
  },
];

export const quickActions = [
  {
    id: '1',
    title: 'Add Student',
    icon: <UserAdd size={28} variant="Bulk" />,
    color: 'rgba(76, 175, 80, 0.8)',
    roles: ['admin'],
    onPress: () => router.push('/(more)/students'),
  },
  {
    id: '2',
    title: 'Add Teacher',
    icon: <UserAdd size={28} variant="Bulk" />,
    color: 'rgba(33, 150, 243, 0.8)',
    roles: ['admin'],
    onPress: () => console.log('Add Teacher pressed'),
  },
  {
    id: '3',
    title: 'Archive Class',
    icon: <Archive size={28} variant="Bulk" />,
    color: 'rgba(255, 152, 0, 0.8)',
    roles: ['admin', 'teacher'],
    onPress: () => console.log('Archive Class pressed'),
  },
];