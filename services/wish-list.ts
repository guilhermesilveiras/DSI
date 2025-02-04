import { collection, deleteDoc, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

type fetchWishListProps = {
    userEmail: string
    setList: (a: WishListItem[]) => void
}

// função para atualizar a lista de desejos
export const fetchWishlist = async ({userEmail, setList}: fetchWishListProps) => {
    try {
        if (!userEmail) return;
            
        const wishlistRef = collection(db, `travelers/${userEmail}/wishlist`);
        const snapshot = await getDocs(query(wishlistRef));
        const fetchedList: WishListItem[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as WishListItem[];
            
        setList(fetchedList);
    } catch (error) {
        console.error("Erro ao buscar a lista de desejos:", error);
    }
};

type toggleDatePickerProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// função para mostrar o calendário
export const toggleDatePicker = ({setOpen}: toggleDatePickerProps) => {
    setOpen((prev) => !prev);
};
    
type handleAddProps = {
    wish: string,
    setWish: (s: string)=> void
    date: Date | null,
    setDate: (d: Date | null)=> void
    userEmail: string | null | undefined
    editingId: string | null
    setEditingId: (s: string | null)=> void
    setList: (a: WishListItem[]) => void
}

// função para adicionar um item na lista de desejos
export const handleAdd = async ({wish, setWish, date, setDate, userEmail, editingId, setEditingId, setList}: handleAddProps): Promise<void> => {
    if (!wish || !date || !userEmail) return;
        
    const newItem: WishListItem = {
        id: editingId || Date.now().toString(),
        wish,
        date: date.toISOString(),
    };
        
    try {
        const wishlistRef = editingId
        ? doc(db, `travelers/${userEmail}/wishlist`, editingId)
        : doc(collection(db, `travelers/${userEmail}/wishlist`));
        
        await setDoc(wishlistRef, {
            wish: newItem.wish,
            date: newItem.date,
        });
        
        setWish("");
        setDate(null);
        setEditingId(null);
        
        // Atualiza a lista local
        fetchWishlist({userEmail, setList});
    } catch (error) {
        console.error("Erro ao salvar item na lista de desejos:", error);
    }
};

type handleDeleteProps = {
    id: string
    userEmail: string | null | undefined
    list: WishListItem[]
    setList: (a: WishListItem[]) => void
}

// função para deletar um item na lista de desejos
export const handleDelete = async ({id, userEmail, setList}: handleDeleteProps): Promise<void> => {
    try {
        if (!userEmail) return;
        fetchWishlist({userEmail, setList});
        
        const wishlistRef = doc(db, `travelers/${userEmail}/wishlist`, id);
        await deleteDoc(wishlistRef);
        
    } catch (error) {
        console.error("Erro ao deletar item da lista de desejos:", error);
    }
};

type handleEditProps = {
    item: WishListItem
    setEditingId: (s: string)=> void
    setWish: (s: string)=> void
    setDate: (d: Date)=> void
}

// função para editar a lista de desejos
export const handleEdit = ({item, setEditingId, setWish, setDate}: handleEditProps): void => {
    setEditingId(item.id);
    setWish(item.wish);
    setDate(new Date());
};

type formattedDateProps = {
    date: Date | null;
};

// função para formatar a dara inserida nos parâmetros bresileiros
export const formattedDate = ({ date }: formattedDateProps): string => {
    if (date instanceof Date && !isNaN(date.getTime())) {
        return date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }
    return "";
};

type handleDateChangeProps = {
    selectedDate?: Date
    setOpen: (value: React.SetStateAction<boolean>)=> void
    setDate: (d: Date)=> void
}

// função para atualizar a data editada
export const handleDateChange = ({selectedDate, setOpen, setDate}: handleDateChangeProps): void => {
    setOpen(false);
    if (selectedDate) {
        setDate(selectedDate);
    }
};