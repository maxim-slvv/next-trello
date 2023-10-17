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
      {todo.image && (
        <NextImage
          src={(todo.image as unknown as { url: string }).url}
          width={255}
          height={80}
          quality={100}
          style={{
            objectFit: 'cover',
          }}
          alt={`${todo.title} image`}
          priority
        />
      )}
      <h1>{todo.title}</h1>
      {/* <p>статус {todo.status}</p> */}
      <p>создано {todo.$createdAt}</p>
      {/* <p>id {todo.$id}</p> */}
    </div>
  );
};

export default TodoCard;
