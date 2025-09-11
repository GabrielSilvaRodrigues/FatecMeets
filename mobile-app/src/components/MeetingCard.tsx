import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';

type Meeting = {
  id: string;
  title: string;
  description?: string;
  date?: string;
  location?: string;
};

export default function MeetingCard({ meeting, onPress }: { meeting: Meeting; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{meeting.title}</Text>
        {meeting.date ? <Text style={styles.meta}>{new Date(meeting.date).toLocaleString()}</Text> : null}
        {meeting.location ? <Text style={styles.meta}>{meeting.location}</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, borderBottomWidth: 1, borderColor: '#eee', backgroundColor: '#fff' },
  title: { fontSize: 16, fontWeight: '600' },
  meta: { color: '#666', marginTop: 4 }
});
