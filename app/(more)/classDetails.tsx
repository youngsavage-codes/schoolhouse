import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fontFamily, fontSize, fontWeight } from '@/constants/fonts';
import { colors } from '@/constants/colors';
import AppHeader from '@/components/AppHeader';
import { router } from 'expo-router';

// Dummy class data
const dummyClass = {
  id: '1',
  name: 'JSS 2A',
  teacher: { id: 't1', name: 'Mr. Musa Ibrahim', subject: 'Mathematics', image: 'https://api.dicebear.com/7.x/initials/png?seed=Musa%20Ibrahim&radius=50' },
  students: [
    { id: 's1', name: 'Musa Ibrahim', gender: 'Male', image: 'https://api.dicebear.com/7.x/initials/png?seed=Musa%20Ibrahim&radius=50' },
    { id: 's2', name: 'Sarah Daniel', gender: 'Female', image: 'https://api.dicebear.com/7.x/initials/png?seed=Sarah%20Daniel&radius=50' },
    { id: 's3', name: 'John Okafor', gender: 'Male', image: 'https://api.dicebear.com/7.x/initials/png?seed=John%20Okafor&radius=50' },
  ],
};

// Dummy teachers list
const teachersList = [
  { id: 't1', name: 'Mr. Musa Ibrahim', subject: 'Mathematics', image: 'https://api.dicebear.com/7.x/initials/png?seed=Musa%20Ibrahim&radius=50' },
  { id: 't2', name: 'Mrs. Fatima Bello', subject: 'English', image: 'https://api.dicebear.com/7.x/initials/png?seed=Fatima%20Bello&radius=50' },
  { id: 't3', name: 'Mr. John Okoro', subject: 'Physics', image: 'https://api.dicebear.com/7.x/initials/png?seed=John%20Okoro&radius=50' },
];

const ClassDetails = ({ route }: any) => {
  const cls = route?.params?.class || dummyClass;
  const [teacher, setTeacher] = useState(cls.teacher);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAssignTeacher = (newTeacher: any) => {
    setTeacher(newTeacher);
    setModalVisible(false);
  };

  const handleSelectStudent = (student: any) => {
    router.push({
      pathname: '/(more)/studentDetails',
      params: { student },
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ paddingHorizontal: 10 }}>
        <AppHeader
          title="Class Details"
          showBackButton
          onBackPress={() => router.back()}
        />
      </View>

      <View style={styles.container}>
        {/* Class Info */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Class Information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Class Name:</Text>
            <Text style={styles.infoValue}>{cls.name}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Class Teacher:</Text>
            <Text style={styles.infoValue}>{teacher?.name || 'Not assigned'}</Text>
          </View>

          <Pressable
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Assign / Change Teacher</Text>
          </Pressable>
        </View>

        {/* Students */}
        <View style={[styles.infoCard, { marginTop: 20 }]}>
          <Text style={styles.sectionTitle}>Students</Text>

          <FlatList
            data={cls.students}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable
                style={styles.studentRow}
                onPress={() => handleSelectStudent(item)}
              >
                <Image source={{ uri: item.image }} style={styles.studentAvatar} />
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.studentName}>{item.name}</Text>
                  <Text style={styles.studentGender}>{item.gender}</Text>
                </View>
              </Pressable>
            )}
          />
        </View>
      </View>

      {/* Teacher Selection Bottom Sheet */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        />
        <View style={styles.bottomSheet}>
          <Text style={styles.modalTitle}>Select a Teacher</Text>
          {teachersList.map((t) => (
            <Pressable
              key={t.id}
              style={styles.teacherRow}
              onPress={() => handleAssignTeacher(t)}
            >
              <Image source={{ uri: t.image }} style={styles.teacherAvatar} />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.teacherName}>{t.name}</Text>
                <Text style={styles.teacherSubject}>{t.subject}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ClassDetails;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { paddingHorizontal: 20, paddingTop: 10 },
  infoCard: {
    backgroundColor: '#FAFAFA',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.heading,
    marginBottom: 15,
    color: colors.primary,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.body,
    color: '#555',
  },
  infoValue: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.body,
    color: '#222',
  },
  button: {
    marginTop: 10,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: fontSize.sm,
    fontFamily: fontFamily.body,
    fontWeight: 'bold',
  },
  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.grayLight,
  },
  studentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  studentName: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.heading,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  studentGender: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.body,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.heading,
    marginBottom: 15,
    color: colors.primary,
  },
  teacherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.grayLight,
  },
  teacherAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  teacherName: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.heading,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  teacherSubject: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.body,
    color: colors.grayDark,
  },
});
