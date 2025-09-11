import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, Button, Alert, ListRenderItem } from 'react-native';
import { api } from '../services/api';
import MeetingCard from '../components/MeetingCard';
import { useNavigation } from '@react-navigation/native';

type Meeting = {
  id: string;
  title: string;
  description?: string;
  date?: string;
  location?: string;
};

export default function MeetingsListScreen() {
  const [items, setItems] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const nav = useNavigation<any>();

  const load = useCallback(async () => {
    try {
      const res = await api.get('/meetings');
      setItems(res.data?.meetings || res.data || []);
    } catch (e: any) {
      Alert.alert('Erro', e?.response?.data?.message || 'Falha ao carregar reuniões');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const renderItem: ListRenderItem<Meeting> = ({ item }: { item: Meeting }) => (
    <MeetingCard meeting={item} onPress={() => nav.navigate('MeetingDetails', { meeting: item })} />
  );

  if (loading) return <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}><ActivityIndicator /></View>;

  return (
    <View style={{ flex: 1 }}>
      <FlatList<Meeting>
        data={items}
        keyExtractor={(item: Meeting) => String(item.id)}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(); }} />}
        ListHeaderComponent={<View style={{ padding: 12 }}><Button title="Perfil" onPress={() => nav.navigate('Profile')} /></View>}
      />
    </View>
  );
}
