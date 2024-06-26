import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
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

  async create(
    createReviewDto: CreateReviewDto,
    currentUser: User,
  ): Promise<Review> {
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

  async findAllByProduct(id: number): Promise<Review[]> {
    return await this.reviewRepository.find({
      where: { product: { id } },
      relations: {
        user: true,
        product: {
          category: true,
        },
      },
    });
  }

  findOne(id: number): Promise<Review> {
    return this.reviewRepository.findOne({
      where: { id },
      relations: {
        user: true,
        product: {
          category: true,
        },
      },
    });
  }

  async remove(id: number) {
    const review = await this.findOne(id);

    return this.reviewRepository.remove(review);
  }
}
