import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Button } from 'react-native';
import { api } from '../services/api';

export default function MeetingDetailsScreen({ route }: any) {
  const [meeting, setMeeting] = useState(route.params?.meeting);
  const [loading, setLoading] = useState(!route.params?.meeting);

  useEffect(() => {
    const id = route.params?.meeting?.id || route.params?.id;
    if (!meeting && id) {
      (async () => {
        try {
          const res = await api.get(`/meetings/${id}`);
          setMeeting(res.data?.meeting || res.data);
        } catch (e: any) {
          Alert.alert('Erro', e?.response?.data?.message || 'Falha ao carregar detalhes');
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [meeting, route.params]);

  if (loading) return <View style={styles.center}><ActivityIndicator /></View>;
  if (!meeting) return <View style={styles.center}><Text>Reunião não encontrada.</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{meeting.title}</Text>
      {meeting.date ? <Text style={styles.meta}>Data: {new Date(meeting.date).toLocaleString()}</Text> : null}
      {meeting.location ? <Text style={styles.meta}>Local: {meeting.location}</Text> : null}
      {meeting.description ? <Text style={styles.desc}>{meeting.description}</Text> : null}
      <Button title="Participar" onPress={() => Alert.alert('Inscrição', 'Funcionalidade a implementar.')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700' },
  meta: { color: '#444' },
  desc: { marginTop: 8, fontSize: 16 }
});
