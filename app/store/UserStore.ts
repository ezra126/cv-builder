import { create } from "zustand";

type State = {
  id: String;
  first_name: String;
  last_name: String;
  email: String;
  phone: String;
  date_of_birth: String;
  nationality: String;
};

type Action = {
  updateFirstName: (firstName: State["first_name"]) => void;
  updateLastName: (lastName: State["last_name"]) => void;
  updateEmail: (email: State["email"]) => void;
  updatePhone: (phone: State["phone"]) => void;
  updateDateOfBirth: (dateOfBirth: State["date_of_birth"]) => void;
  updateNationality: (Nationality: State["nationality"]) => void;
};

const useUserStore = create<State & Action>((set) => ({
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  date_of_birth: "",
  nationality: "",
  updateFirstName: (firstName) => set(() => ({ first_name: firstName })),
  updateLastName: (lastName) => set(() => ({ last_name: lastName })),
  updateEmail: (email) => set(() => ({ email: email })),
  updatePhone: (phone) => set(() => ({ phone: phone })),
  updateDateOfBirth: (dateOfBirth) =>
    set(() => ({ date_of_birth: dateOfBirth })),
  updateNationality: (nationality) => set(() => ({ nationality: nationality })),
}));

export { useUserStore };
