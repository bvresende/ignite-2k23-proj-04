import { type UniqueEntityID } from '@/core/entities/unique-entity-id'
import { type Optional } from '@/core/types/optional'
import { Comment, type CommentProps } from './comment'

export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityID
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionId (): UniqueEntityID {
    return this.props.questionId
  }

  static create (
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityID
  ): QuestionComment {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date()
      },
      id
    )

    return questionComment
  }
}