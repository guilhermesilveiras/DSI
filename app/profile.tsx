import { Image, Pressable, SafeAreaView, ScrollView, Text, View, TouchableOpacity, Switch } from 'react-native';
import { Header } from '../components/main/header';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';
import { NavButton } from '../components/main/navButton';
import React, { useState } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface FormState {
  pushNotifications: boolean;
}

export default function Profile() {
  const [form, setForm] = useState<FormState>({
    pushNotifications: false,
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
    <Header/>
      <View className="p-6 bg-white items-center justify-center">
        <TouchableOpacity onPress={() => {}}>
          <View className="relative">
            <Image
              className="w-18 h-18 rounded-full"
              source={{ uri: 'https://i.pravatar.cc/300',}}/>
            <TouchableOpacity onPress={() => {}}>
              <View className="absolute -right-1 -bottom-2.5 w-7 h-7 rounded-full bg-primary items-center justify-center">
                <FeatherIcon name="edit-3" size={15} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <View className="items-center">
          <Text className="mt-5 text-[19px] font-semibold text-gray-500">
            Teste
          </Text>
          <Text className="mt-1 text-base text-gray-500">
            teste@gmail.com
          </Text>
        </View>
      </View>

      <ScrollView>
        <View className="px-6">
          <Text className="py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Preferências
          </Text>

          <TouchableOpacity className="flex-row items-center h-[50px] bg-gray-200 rounded-lg mb-3 px-3">
            <View className="w-8 h-8 rounded-full bg-primary items-center justify-center mr-3">
              <FeatherIcon name="globe" size={20} color="white" />
            </View>
            <Text className="text-[17px] text-black">Idioma</Text>
            <View className="flex-1" />
            <FeatherIcon name="chevron-right" size={20} color="#C6C6C6" />
          </TouchableOpacity>

          <View className="flex-row items-center h-[50px] bg-gray-200 rounded-lg mb-3 px-3">
            <View className="w-8 h-8 rounded-full bg-primary items-center justify-center mr-3">
              <FeatherIcon name="moon" size={20} color="white" />
            </View>
            <Text className="text-[17px] text-black">Modo Escuro</Text>
            <View className="flex-1" />
            <Switch
              trackColor={{ false: '#d1d1d6', true: '#34c759' }}
              thumbColor={form.darkMode ? '#fff' : '#f4f3f4'}
              onValueChange={(darkMode) => setForm({ ...form, darkMode })}
              value={form.darkMode}
            />
          </View>

          <TouchableOpacity className="flex-row items-center h-[50px] bg-gray-200 rounded-lg mb-3 px-3">
            <View className="w-8 h-8 rounded-full bg-primary items-center justify-center mr-3">
              <FeatherIcon name="navigation" size={20} color="white" />
            </View>
            <Text className="text-[17px] text-black">Localização</Text>
            <View className="flex-1" />
            <FeatherIcon name="chevron-right" size={20} color="#C6C6C6" />
          </TouchableOpacity>

          <View className="flex-row items-center h-[50px] bg-gray-200 rounded-lg mb-3 px-3">
            <View className="w-8 h-8 rounded-full bg-primary items-center justify-center mr-3">
              <FeatherIcon name="bell" size={20} color="white" />
            </View>
            <Text className="text-[17px] text-black">Ativar Notificações</Text>
            <View className="flex-1" />
            <Switch
              trackColor={{ false: '#d1d1d6', true: '#34c759' }}
              thumbColor={form.pushNotifications ? '#fff' : '#f4f3f4'}
              onValueChange={(pushNotifications) => setForm({ ...form, pushNotifications })}
              value={form.pushNotifications}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}