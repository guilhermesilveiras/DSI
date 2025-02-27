import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { router } from "expo-router";
import { FirebaseError } from "firebase/app";

type Props = {
    email: string
    password: string
    errorMessage: string,
    setErrorMessage: (s: string)=> void
}

export const handleSignIn = async ({email, password, errorMessage, setErrorMessage}: Props) => {
        try{
            await signInWithEmailAndPassword(auth, email, password);
            setErrorMessage('')
            router.replace("/home");
            } catch (error) {
                if (error instanceof FirebaseError) {
                    setErrorMessage(error.code.toString().split('/')[1])
                    console.log(errorMessage)
                }else {
                    console.log("Erro desconhecido:", error);
                }
            }
    };