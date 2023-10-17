import { NextPage } from 'next';
import NextImage from 'next/image';
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from '@hello-pangea/dnd';

import styles from './TodoCard.module.scss';

interface Props {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const TodoCard: NextPage<Props> = ({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}) => {
  return (
    <div className={styles.item} {...draggableProps} {...dragHandleProps} ref={innerRef}>
      TODO CARD
      <h1>название {todo.title}</h1>
      <p>статус {todo.status}</p>
      <p>создано {todo.$createdAt}</p>
      <p>id {todo.$id}</p>
      {todo.image && (
        <NextImage
          src={(todo.image as unknown as { url: string }).url}
          width={180}
          height={80}
          quality={100}
          style={{
            objectFit: 'cover',
          }}
          alt={`${todo.title} image`}
          priority
        />
      )}
    </div>
  );
};

export default TodoCard;
