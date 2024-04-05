import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly productService: ProductsService,
  ) {}

  async create(createReviewDto: CreateReviewDto, currentUser: User): Promise<Review> {
    const product = await this.productService.findOne(
      +createReviewDto.productId,
    );
    if (!product) throw new NotFoundException('Product not found');
    let review = await this.findOneByUserAndProduct(
      currentUser.id,
      createReviewDto.productId,
    );

    if (!review) {
      // new review by this user
      review = await this.reviewRepository.create(createReviewDto);
      review.user = currentUser;
      review.product = product;
    } else {
      // update review
      review.comment = createReviewDto.comment;
      review.ratings = createReviewDto.ratings;
    }

    return await this.reviewRepository.save(review);
  }

  async findOneByUserAndProduct(userId: number, productId: number) {
    return await this.reviewRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        product: {
          id: productId,
        },
      },
      relations: {
        user: true,
        product: {
          category: true,
        },
      },
    });
  }

  findAll() {
    return `This action returns all reviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
