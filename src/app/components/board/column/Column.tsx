import { NextPage } from 'next';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { useBoard } from '@/app/store/useBoard';
import TodoCard from '../todoCard/TodoCard';

import styles from './Column.module.scss';

interface Props {
  id: TypedColumn;
  todos: Todo[];
  index: number;
}

//для того что бы отобразить нормальные названия столбцов
const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  todo: 'Запланировано',
  inprogress: 'В процессе',
  done: 'Завершено',
};

const Column: NextPage<Props> = ({ id, todos, index }: Props) => {
  const { searchString } = useBoard((state) => ({
    searchString: state.searchString,
  }));

  return (
    <div className={styles.columnBox}>
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            <Droppable droppableId={index.toString()} type="card">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={styles.items}
                  style={
                    snapshot.isDraggingOver ? { background: 'green' } : { background: 'blue' }
                  }>
                  <h2>
                    {idToColumnText[id]}
                    <span>
                      {!searchString
                        ? todos.length
                        : todos.filter((todo) =>
                            todo.title.toLowerCase().includes(searchString.toLowerCase()),
                          ).length}
                    </span>
                  </h2>
                  <div className={styles.items}>
                    {todos.map((todo, index) => {
                      if (
                        //если есть поисковая строка
                        //и если название тудушки не совпадает с тем что в поиске
                        //то мы не включаем такую тудушку в колонки
                        searchString &&
                        !todo.title.toLowerCase().includes(searchString.toLowerCase())
                      )
                        return null;
                      return (
                        <Draggable key={todo.$id} draggableId={todo.$id} index={index}>
                          {(provided) => (
                            <TodoCard
                              todo={todo}
                              index={index}
                              id={id}
                              innerRef={provided.innerRef}
                              draggableProps={provided.draggableProps}
                              dragHandleProps={provided.dragHandleProps}
                            />
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                    <div>
                      <button>Иконка Plus</button>
                    </div>
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default Column;
