import { atom } from "recoil";
import { loadTodos } from './utilities/localStorage';


export interface ITodo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: ITodo[];
}


export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});

export const trashCanState = atom({ 
  key: "garbageState", 
  default: [] 
});

export const todoStorage = atom<IToDoState>({
  key: 'storedTodos',
  default: loadTodos() ?? toDoState,
});