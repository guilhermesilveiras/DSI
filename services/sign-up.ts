import { router } from "expo-router";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

type Props = {
    email: string
    password: string
    passwordConfirmation: string
    name: string
    errorMessage: string,
    setErrorMessage: (s: string)=> void
}

export const handleCreateUser = async ({email, password, passwordConfirmation, name, errorMessage, setErrorMessage}: Props) => {
        try {
            if (password !== passwordConfirmation){
                setErrorMessage('password-unmatch')
                return
            } else if (name === "") {
                setErrorMessage('name-required')
                console.log('name-required')
                return
            } 
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const docRef = doc(db, "travelers", email);
            await setDoc(docRef, { name: name }, { merge: true });
            setDoc(docRef, { name: name }, { merge: true })
            console.log("usuário criado com sucesso")
            router.replace("/home")
        } catch (error) {
            if (error instanceof FirebaseError) {
                setErrorMessage(error.code.toString().split('/')[1])
                console.log(errorMessage)
            }else {
                console.log("Erro desconhecido:", error);
            }
        }
    };