import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('findAll', () => {
    it('성공시 user array를 반환한다', async () => {
      // given
      const mockUser: User = new User();
      mockUser.firstName = 'asd';
      mockUser.isActive = true;
      mockUser.lastName = 'asd';
      mockRepository.find.mockReturnValueOnce([mockUser]);

      // when
      const users = await service.findAll();

      // then
      expect(mockRepository.find).toBeCalled();
      expect(users[0]).toBeInstanceOf(User);
      expect(users).toBeInstanceOf(Array);
      expect(users).toContain(mockUser);
    });
  });

  describe('findByid', () => {
    it('찾는 유저가 없을시 NotFoundError를 발생시킨다', async () => {
      // given
      mockRepository.findOne.mockReturnValueOnce(undefined);
      try {
        // when
        await service.findById('1');
      } catch (e) {
        // then
        expect(mockRepository.findOne).toBeCalled();
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toMatch(`User with id ${1} does not exist.`);
      }
    });
  });

  describe('deleteById', () => {
    it('삭제할 유저가 없을시 NotFoundError를 발생시킨다', async () => {
      // given
      mockRepository.findOne.mockReturnValueOnce(undefined);
      expect.assertions(2);
      try {
        // when
        await service.deleteById('1');
      } catch (e) {
        // then
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toMatch(`User with id ${1} does not exist.`);
      }
    });
  });
});
