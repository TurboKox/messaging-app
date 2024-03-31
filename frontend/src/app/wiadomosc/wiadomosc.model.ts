export interface Wiadomosc {
    _id: string;
    _rev: string;
    
    tresc_wiadomosci: string;
    data_wyslania_wiadomosci: string;
    status_wiadomosci: string;
    status_dostepnosci: string;
    nazwa_uzytkownika: "user1" | "user2";
}