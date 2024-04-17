import { Entity } from '@/core/entities/entity'
import { type UniqueEntityID } from '@/core/entities/unique-entity-id'
import { type Optional } from '@/core/types/optional'
import { AnswerAttachmentList } from '@/domain/forum/enterprise/entities/answer-attachment-list'

export interface AnswerProps {
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  attachments: AnswerAttachmentList
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
  get authorId (): UniqueEntityID {
    return this.props.authorId
  }

  get questionId (): UniqueEntityID {
    return this.props.questionId
  }

  get content (): string {
    return this.props.content
  }

  set content (content: string) {
    this.props.content = content
    this.touch()
  }

  get attachments (): AnswerAttachmentList {
    return this.props.attachments
  }

  set attachments (attachments: AnswerAttachmentList) {
    this.props.attachments = attachments
    this.touch()
  }

  get createdAt (): Date {
    return this.props.createdAt
  }

  get updatedAt (): Date | undefined {
    return this.props.updatedAt
  }

  get summary (): string {
    return this.content
      .substring(0, 120)
      .trimEnd()
      .concat('...')
  }

  private touch (): void {
    this.props.updatedAt = new Date()
  }

  static create (
    props: Optional<AnswerProps, 'createdAt' | 'attachments'>,
    id?: UniqueEntityID
  ): Answer {
    const answer = new Answer({
      ...props,
      attachments: props.attachments ?? new AnswerAttachmentList(),
      createdAt: props.createdAt ?? new Date()
    }, id)

    return answer
  }
}
