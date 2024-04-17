import { type Either, left, right } from '@/core/either'
import { type Answer } from '../../enterprise/entities/answer'
import { type AnswersRepository } from '../repositories/answer-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { type AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
  attachmentsIds: string[]
}

type EditAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { answer: Answer }>

export class EditAnswerUseCase {
  constructor (
    private readonly answerRepository: AnswersRepository,
    private readonly answerAttachmentsRepository: AnswerAttachmentsRepository
  ) {}

  async execute ({ authorId, answerId, content, attachmentsIds }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (answer === undefined) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId)

    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments
    )

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id
      })
    })

    answerAttachmentList.update(answerAttachments)

    answer.attachments = answerAttachmentList
    answer.content = content

    await this.answerRepository.save(answer)

    return right({ answer })
  }
}
