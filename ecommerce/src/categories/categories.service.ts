import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { User } from 'src/users/entities/user.entity';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  create(
    createCategoryDto: CreateCategoryDto,
    currentUser: User,
  ): Promise<Category> {
    const category = this.categoriesRepository.create(createCategoryDto);
    category.addedBy = currentUser;
    return this.categoriesRepository.save(category);
  }

  findAll() {
    return this.categoriesRepository.find();
  }

  findOne(id: number) {
    return this.categoriesRepository.findOne({
      where: { id },
      relations: { addedBy: true },
      select: {
        addedBy: {
          id: true,
          name: true,
          email: true,
        },
      },
    });
  }

  async update(id: number, fields: Partial<UpdateCategoryDto>) {
    const category = await this.findOne(id);
    if (!category) throw new NotFoundException('Category not found.');
    Object.assign(category, fields);

    return this.categoriesRepository.save(category);
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
