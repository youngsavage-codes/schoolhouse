'use client';

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import AppHeader from '@/components/AppHeader';
import CustomTextInput from '@/components/inputField';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

import * as yup from 'yup';

export const announcementSchema = yup.object({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required'),
  attachment: yup.string().url().optional(),
});

interface FormData {
  title: string;
  content: string;
  attachment?: string;
}

const CreateAnnouncement = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(announcementSchema as any),
    defaultValues: {
      title: '',
      content: '',
      attachment: '',
    },
  });

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleTimeChange = (_: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const updated = new Date(date);
      updated.setHours(selectedTime.getHours());
      updated.setMinutes(selectedTime.getMinutes());
      setDate(updated);
    }
  };

  const onSubmit = (data: FormData) => {
    const payload = {
      schoolId: 'uuid', // 🔥 replace with real ID
      title: data.title,
      content: data.content,
      attachment: data.attachment || null,
      scheduledAt: date.toISOString(),
    };

    console.log('Announcement Created', payload);

    alert('Announcement Created Successfully');
    router.back();
  };

  return (
    <View style={styles.safe}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerWrap}>
          <AppHeader
            title="Create Announcement"
            showBackButton
            onBackPress={() => router.back()}
          />
        </View>

        <View style={styles.container}>

          {/* Title */}
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <CustomTextInput
                label="Heading"
                value={field.value}
                onChangeText={field.onChange}
                placeholder="Announcement title"
                error={errors.title?.message}
              />
            )}
          />

          {/* Content */}
          <Controller
            control={control}
            name="content"
            render={({ field }) => (
              <CustomTextInput
                label="Description"
                value={field.value}
                onChangeText={field.onChange}
                placeholder="Write announcement details..."
                multiline
                numberOfLines={4}
                style={styles.textArea}
                error={errors.content?.message}
              />
            )}
          />

          {/* Attachment (optional) */}
          <Controller
            control={control}
            name="attachment"
            render={({ field }) => (
              <CustomTextInput
                label="Attachment URL (optional)"
                value={field.value as any}
                onChangeText={field.onChange}
                placeholder="https://example.com/file.pdf"
                error={errors.attachment?.message}
              />
            )}
          />

          {/* Date */}
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={styles.selector}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.selectorText}>
              {date.toDateString()}
            </Text>
          </TouchableOpacity>

          {/* Time */}
          <Text style={styles.label}>Time</Text>
          <TouchableOpacity
            style={styles.selector}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={styles.selectorText}>
              {date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </TouchableOpacity>

          {/* Submit */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>
              Create Announcement
            </Text>
          </TouchableOpacity>

        </View>

        {/* Pickers */}
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleTimeChange}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default CreateAnnouncement;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerWrap: {
    paddingHorizontal: spacing[4],
  },
  container: {
    padding: spacing[4],
    marginTop: spacing[2],
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
    color: colors.text,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  selector: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#fff',
    padding: spacing[4],
    borderRadius: spacing[3],
    marginBottom: spacing[4],
  },
  selectorText: {
    fontSize: 14,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing[4],
    borderRadius: spacing[3],
    marginTop: spacing[2],
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
