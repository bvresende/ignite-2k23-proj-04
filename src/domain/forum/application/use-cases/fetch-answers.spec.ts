import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-answers'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchAnswersUseCase

describe('Fetch Answers Question', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)
    sut = new FetchAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch answers to a question', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1')
      })
    )

    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1')
      })
    )

    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1')
      })
    )

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1
    })

    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch paginated answers question', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID('question-1')
        })
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2
    })

    expect(result.value?.answers).toHaveLength(2)
  })
})
