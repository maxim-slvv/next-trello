'use client';

import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { useBoard } from '@/app/store/useBoard';
import HeaderSmall from '../headerSmall/page';
import Column from './column/Column';

import styles from './Board.module.scss';

const Board: NextPage = () => {
  const { board, fetchBoard, serverData, setBoardState, updateBoard } = useBoard((state) => ({
    board: state.board,
    fetchBoard: state.fetchBoard,
    serverData: state.serverData,
    setBoardState: state.setBoardState,
    updateBoard: state.updateBoard,
  }));

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchBoard();
  }, []);

  const getOnClick = () => {
    setIsOpen(true);
  };

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    //проверка если карта отпущена вне колонок
    if (!destination) return;
    //оббработчик перетаскивания колонок
    if (type === 'column') {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      setBoardState({ ...board, columns: rearrangedColumns });
    }
    // этот шаг необходим, поскольку индексы хранятся как числа 0, 1,2 и т. д. Вместо идентификаторов в библиотеке DND
    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    const finishColIndex = columns[Number(destination.droppableId)];

    const startCol: Column = {
      id: startColIndex[0],
      todos: startColIndex[1].todos,
    };
    const finishCol: Column = {
      id: finishColIndex[0],
      todos: finishColIndex[1].todos,
    };

    if (!startCol || !finishCol) return;
    if (source.index === destination.index && startCol === finishCol) return;

    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);

    if (startCol.id === finishCol.id) {
      //перетаскивание задачи того же столбца
      newTodos.splice(destination.index, 0, todoMoved);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);
      setBoardState({ ...board, columns: newColumns });
    } else {
      //перетаскивание задачи других столбцов
      const finishTodos = Array.from(finishCol.todos);
      finishTodos.splice(destination.index, 0, todoMoved);
      const newColumns = new Map(board.columns);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };

      newColumns.set(startCol.id, newCol);
      newColumns.set(finishCol.id, {
        id: finishCol.id,
        todos: finishTodos,
      });

      updateBoard(todoMoved, finishCol.id);
      setBoardState({ ...board, columns: newColumns });
    }
  };

  return (
    <section className={styles.board} onClick={() => getOnClick()}>
      <HeaderSmall />
      <div className={styles.container}>
        <div className={styles.box}>
          {isOpen ? (
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="board" direction="horizontal" type="column">
                {(provided) => (
                  <div
                    className={styles.provider}
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    {Array.from(board.columns.entries()).map(([id, column], index) => (
                      <Column key={id} id={id} todos={column.todos} index={index} />
                    ))}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
};

export default Board;
