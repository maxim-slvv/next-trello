import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserBoard = {
  id: number;
  name: string;
  column: Todo[];
  picture: string;
  isFavorite: boolean;
};

export type UserBoards = UserBoard[];

interface UserData {
  boards: UserBoards;
}

interface IUseBoard {
  selectedBoard: number;
  setSelectedBoard: (number: number) => void;
  serverData: UserData;
  boardName: string;
  setBoardName: (string: string) => void;
  board: Board;
  searchString: string;
  setSearchString: (searchString: string) => void;
  fetchBoard: () => void;
  setBoardState: (board: Board) => void;
  updateBoard: (todo: Todo, columnId: TypedColumn) => void;
}

export const useBoard = create<IUseBoard>()(
  persist(
    (set, get) => ({
      selectedBoard: 0,
      setSelectedBoard: (number) => {
        set({ selectedBoard: number });
      },
      boardName: '',
      setBoardName: (string) => {
        set({ boardName: string });
      },
      board: {
        columns: new Map<TypedColumn, Column>(),
      },
      searchString: '',
      setSearchString: (searchString) => {
        set({ searchString: searchString });
      },
      serverData: {
        boards: [
          {
            id: 0,
            name: 'Задачи',
            picture: '/bg/1.jpg',
            isFavorite: true,
            column: [
              {
                $id: '0',
                $createdAt: '2023-11-01',
                title: 'Выполнить задачи',
                status: 'todo',
                image: '{"url": "/bg/3.jpg"}',
              },
              {
                $id: '1',
                $createdAt: '2023-11-01',
                title: 'Придумать задачи',
                status: 'inprogress',
                image: '{"url": "/bg/2.jpg"}',
              },
            ],
          },
          {
            id: 1,
            name: 'Цели',
            picture: '/bg/2.jpg',
            isFavorite: false,
            column: [
              {
                $id: '0',
                $createdAt: '2023-11-01',
                title: 'Че там по целям?',
                status: 'todo',
                image: '{"url": "/bg/1.jpg"}',
              },
              {
                $id: '1',
                $createdAt: '2023-11-01',
                title: 'Сложно придумать?',
                status: 'todo',
                image: '{"url": "/bg/1.jpg"}',
              },
              {
                $id: '2',
                $createdAt: '2023-11-01',
                title: 'Последние цели',
                status: 'inprogress',
                image: '{"url": "/bg/3.jpg"}',
              },
              {
                $id: '3',
                $createdAt: '2023-11-01',
                title: 'Отдых',
                status: 'done',
                image: '{"url": "/bg/2.jpg"}',
              },
            ],
          },
        ],
      },
      fetchBoard: async () => {
        //TODO потом вынесу эту функцию отсюда что бы не засорять код, тут она зависит от persist
        //TODO будет на подобии actionCreator
        //*можно запросить с сервака, я буду брать из localStorage - из serverData[]
        //!------------- потом в 'initialState' - 'serverData' удалю данные - сделаю пустой массив []
        //!------------- сделаю возможность его наполнять новыми задачами
        //!------------- уберу persist
        //!------------- и буду этой функцией дергать данные из localStorage
        //*Создаем пустые колонки
        const columns: Map<TypedColumn, Column> = new Map();
        //*наполняем их типами для Канбан
        const columnTypes: TypedColumn[] = ['todo', 'inprogress', 'done'];
        for (const columnType of columnTypes) {
          columns.set(columnType, {
            id: columnType,
            todos: [],
          });
        }
        //*Заполняем колонки данными
        //!------------- тут вместо вместо serverData будут данные из localStorage браться

        if (get().serverData.boards.length !== 0) {
          const data = get().serverData.boards[get().selectedBoard].column;

          for (const todo of data) {
            const columnType = todo.status as TypedColumn;
            columns.get(columnType)!.todos.push({
              $id: todo.$id,
              $createdAt: todo.$createdAt,
              title: todo.title,
              status: todo.status,
              ...(todo.image && { image: JSON.parse(todo.image) }),
            });
          }
          //*Сортировка колонок по columnTypes - что бы по порядку были
          const sortedColumns = new Map(
            Array.from(columns.entries()).sort(
              (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0]),
            ),
          );
          const board: Board = {
            columns: sortedColumns,
          };
          set({ board: board });
        }
      },
      setBoardState: (board) => set({ board }),
      updateBoard: (todo, columnId) => {
        if (get().serverData.boards.length !== 0) {
          const data = get().serverData.boards[get().selectedBoard].column;
          const newData = data.map((todoInArr) => {
            if (todo.$id === todoInArr.$id) {
              return {
                ...todoInArr,
                status: columnId,
              };
            }
            return todoInArr;
          });
          //*-----------------такое обновление тоже работает :)
          get().serverData.boards[get().selectedBoard].column = newData;
        }
      },
    }),
    {
      name: 'BoardStorage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
