'use client';

import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { useBoard } from '@/app/store/useBoard';
import HeaderSmall from '../headerSmall/page';
import Column from './column/Column';

import styles from './Board.module.scss';

const Board: NextPage = () => {
  const { board, fetchBoard, serverData } = useBoard((state) => ({
    board: state.board,
    fetchBoard: state.fetchBoard,
    serverData: state.serverData,
  }));

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchBoard();
  }, []);

  const getOnClick = () => {
    console.log(board);
    console.log(board.columns.size);
    setIsOpen(true);
  };

  const handleOnDragEnd = (result: DropResult) => {};

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
