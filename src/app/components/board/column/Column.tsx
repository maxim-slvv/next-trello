import { NextPage } from 'next';
import { Draggable, Droppable } from '@hello-pangea/dnd';

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
                  className={styles.itemTodo}
                  style={
                    snapshot.isDraggingOver ? { background: 'green' } : { background: 'blue' }
                  }>
                  <h2>{idToColumnText[id]}</h2>
                  <span>{todos.length}</span>
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
