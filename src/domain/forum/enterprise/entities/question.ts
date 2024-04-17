import dayjs from 'dayjs'
import { Slug } from './value-objects/slug'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { type UniqueEntityID } from '@/core/entities/unique-entity-id'
import { type Optional } from '@/core/types/optional'
import { QuestionAttachmentList } from './question-attachment-list'

export interface QuestionProps {
  authorId: UniqueEntityID
  bestAnswerId?: UniqueEntityID
  title: string
  content: string
  slug: Slug
  attachments: QuestionAttachmentList
  createdAt: Date
  updatedAt?: Date
}

export class Question extends AggregateRoot<QuestionProps> {
  get authorId (): UniqueEntityID {
    return this.props.authorId
  }

  get bestAnswerId (): UniqueEntityID | undefined {
    return this.props.bestAnswerId
  }

  set bestAnswerId (bestAnswerId: UniqueEntityID | undefined) {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  get title (): string {
    return this.props.title
  }

  set title (title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)

    this.touch()
  }

  get content (): string {
    return this.props.content
  }

  set content (content: string) {
    this.props.content = content
    this.touch()
  }

  get slug (): Slug {
    return this.props.slug
  }

  get attachments (): QuestionAttachmentList {
    return this.props.attachments
  }

  set attachments (attachments: QuestionAttachmentList) {
    this.props.attachments = attachments
    this.touch()
  }

  get createdAt (): Date {
    return this.props.createdAt
  }

  get updatedAt (): Date | undefined {
    return this.props.updatedAt
  }

  get isNew (): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
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
    props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>,
    id?: UniqueEntityID
  ): Question {
    const question = new Question({
      ...props,
      slug: props.slug ?? Slug.createFromText(props.title),
      attachments: props.attachments ?? new QuestionAttachmentList(),
      createdAt: props.createdAt ?? new Date()
    }, id)

    return question
  }
}
