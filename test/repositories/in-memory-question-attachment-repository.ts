import { type QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { type QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentRepository implements QuestionAttachmentsRepository {
  public items: QuestionAttachment[] = []

  async findManyByQuestionId (questionId: string): Promise<QuestionAttachment[]> {
    const questionAttachments = this.items.filter((item) => item.id.toString() === questionId)

    return questionAttachments
  }
}
