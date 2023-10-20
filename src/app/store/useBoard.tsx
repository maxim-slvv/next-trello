import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IUseBoard {
  serverData: Todo[];
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
      board: {
        columns: new Map<TypedColumn, Column>(),
      },
      searchString: '',
      setSearchString: (searchString) => {
        set({ searchString: searchString });
      },
      serverData: [
        {
          $id: '1',
          $createdAt: '2023-11-01',
          title: 'Личные цели',
          status: 'todo',
          image: '{"url": "/bg/2.jpg"}',
        },
        {
          $id: '2',
          $createdAt: '2023-11-01',
          title: 'Профессиональные цели',
          status: 'inprogress',
          image: '{"url": "/bg/3.jpg"}',
        },
        {
          $id: '3',
          $createdAt: '2023-11-01',
          title: 'Учебные цели',
          status: 'done',
          image: '{"url": "/bg/1.jpg"}',
        },
        {
          $id: '4',
          $createdAt: '2023-11-01',
          title: 'Семейные цели',
          status: 'todo',
          image: '{"url": "/bg/1.jpg"}',
        },
        {
          $id: '5',
          $createdAt: '2023-11-01',
          title: 'Спортивные цели',
          status: 'inprogress',
          image: '{"url": "/bg/2.jpg"}',
        },
        {
          $id: '6',
          $createdAt: '2023-11-01',
          title: 'Творческие цели',
          status: 'done',
          image: '{"url": "/bg/3.jpg"}',
        },
        {
          $id: '7',
          $createdAt: '2023-11-01',
          title: 'Здоровье и фитнес',
          status: 'inprogress',
          image: '{"url": "/bg/1.jpg"}',
        },
        {
          $id: '8',
          $createdAt: '2023-11-01',
          title: 'Финансовые цели',
          status: 'todo',
          image: '{"url": "/bg/2.jpg"}',
        },
      ],
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
        for (const todo of get().serverData) {
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
        // console.log(board);
        set({ board: board });
      },
      setBoardState: (board) => set({ board }),
      updateBoard: (todo, columnId) => {
        const newData = get().serverData.map((todoInArr) => {
          if (todo.$id === todoInArr.$id) {
            return {
              ...todoInArr,
              status: columnId,
            };
          }
          return todoInArr;
        });
        set({ serverData: newData });
      },
    }),
    {
      name: 'BoardStorage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
