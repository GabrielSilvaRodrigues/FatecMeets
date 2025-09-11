import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text>Nome: {user?.name}</Text>
      <Text>Email: {user?.email}</Text>
      <View style={{ height: 12 }} />
      <Button title="Sair" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, gap:8 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 }
});
