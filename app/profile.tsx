import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Header } from '../components/main/header';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';
import { NavButton } from '../components/main/navButton';

export default function Profile() {
    const handleSignOut = async ()=> {
        try {
            await signOut(auth)
            router.replace('/login')
        } catch (error) {
            console.log("erro ao sair:", error);
        }
    };

    return (
        <ScrollView>
            <SafeAreaView className='pb-10 bg-background'>
                <Header/>
                <View className='items-center p-8'>
                    <Image
                        className='w-16 h-16 rounded-full'/>
                    <Text className="text-3xl font-semibold mt-4">
                            Nome de Usuário
                    </Text>
                    <Text className='text-lg text-zinc-500 mt-2'>
                            email@exemplo.com
                    </Text>
                    <NavButton label='Editar Perfil' route='/edit-profile' active={true}/>
                    <Pressable onPress={handleSignOut} className='bg-primary rounded-full px-4 py-2 mt-4'>
                        <Text style={{ color: 'red' }}>Sair</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}