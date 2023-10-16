import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IUseBoard {
  serverData: Todo[];
  board: Board;
  fetchBoard: () => void;
}

export const useBoard = create<IUseBoard>()(
  persist(
    (set, get) => ({
      board: {
        columns: new Map<TypedColumn, Column>(),
      },
      serverData: [
        {
          $id: '1',
          $createdAt: '2023-10-16',
          title: 'Задача 1',
          status: 'todo',
          image: '{"url": "http://example.com/image1.jpg"}',
        },
        {
          $id: '2',
          $createdAt: '2023-10-16',
          title: 'Задача 2',
          status: 'inprogress',
        },
        {
          $id: '3',
          $createdAt: '2023-10-16',
          title: 'Задача 3',
          status: 'done',
          image: '{"url": "http://example.com/image.jpg"}',
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
        // //*получаем заполненные колонки или просто пустые
        // console.log(columns);
        //*Сортировка колонок по columnTypes - что бы по порядку были
        const sortedColumns = new Map(
          Array.from(columns.entries()).sort(
            (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0]),
          ),
        );

        const board: Board = {
          columns: sortedColumns,
        };
        console.log(board);
        set({ board: board });
      },
    }),
    {
      name: 'BoardStorage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
