import { type Question } from '@/domain/forum/enterprise/entities/question'
import { type QuestionsRepository } from '../repositories/question-repository'
import { type Either, right } from '@/core/either'

interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

type FetchRecentQuestionsUseCaseResponse = Either<null, { questions: Question[] }>

export class FetchRecentQuestionsUseCase {
  constructor (private readonly questionsRepository: QuestionsRepository) {}

  async execute ({
    page
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return right({ questions })
  }
}
