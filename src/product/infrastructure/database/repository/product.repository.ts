import { ProductEntity } from '@/product/model/product.entity'
import { PrismaService } from '@/shared/database/database.service'
import {
  SearchParams,
  SearchResult,
} from '@/shared/database/repositories/searchable.repository-contracts'
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

@Injectable()
export class ProductRepository {
  sortableFields: string[] = ['name', 'price', 'created_at']
  filterfield: string[] = ['name', 'category']

  constructor(private prismaService: PrismaService) {}

  async search(
    props: SearchParams,
  ): Promise<SearchResult<ProductEntity, string>> {
    const sortable = this.sortableFields?.includes(props.sort) || false
    const orderByField = sortable ? props.sort : 'created_at'
    const orderByDir = sortable ? props.sortDir : 'desc'
    const filterField = this.filterfield?.includes(props.filterField) || false
    const filterFieldDefault = filterField ? props.filterField : 'name'

    const count = await this.prismaService.product.count({
      ...(props.filter && {
        where: {
          [filterFieldDefault]: {
            contains: props.filter,
            mode: 'insensitive',
          },
        },
      }),
    })

    const models = await this.prismaService.product.findMany({
      ...(props.filter && {
        where: {
          [filterFieldDefault]: {
            contains: props.filter,
            mode: 'insensitive',
          },
        },
      }),
      orderBy: {
        [orderByField]: orderByDir,
      },
      skip: props.page && props.page > 0 ? (props.page - 1) * props.perPage : 1,
      take: props.perPage && props.perPage > 0 ? props.perPage : 15,
    })

    return new SearchResult<ProductEntity, string>({
      items: models.map(
        (model, index) =>
          (model[index] = {
            ...model,
            price: Number(model.price.toString()),
            oldPrice: Number(model.price.toString()),
          }),
      ),
      total: count,
      currentPage: props.page,
      perPage: props.perPage,
      sort: orderByField,
      sortDir: orderByDir,
      filter: props.filter,
    })
  }

  async insert(entity: ProductEntity): Promise<ProductEntity> {
    const create = await this.prismaService.product.create({
      data: entity,
    })

    return {
      ...create,
      price: Number(create.price.toString()),
      oldPrice: Number(create.price.toString()),
    }
  }

  async findById(productId: string, adminId?: string): Promise<ProductEntity> {
    if (adminId) {
      return this._get(productId, adminId)
    }
    return this._get(productId)
  }

  async findAll(adminId: string): Promise<ProductEntity[]> {
    const models = await this.prismaService.product.findMany({
      where: {
        adminId,
      },
    })

    return models.map(
      (model, index) =>
        (model[index] = {
          ...model,
          price: Number(model.price.toString()),
          oldPrice: Number(model.price.toString()),
        }),
    )
  }

  async update(entity: ProductEntity): Promise<ProductEntity> {
    await this._get(entity.productId, entity.adminId)

    const update = await this.prismaService.product.update({
      data: entity,
      where: {
        productId: entity.productId,
      },
    })

    return {
      ...update,
      price: Number(update.price.toString()),
      oldPrice: Number(update.price.toString()),
    }
  }

  async delete(productId: string, adminId: string): Promise<void> {
    await this._get(productId, adminId)
    await this.prismaService.product.delete({
      where: { productId },
    })
  }

  protected async _get(
    productId: string,
    adminId?: string,
  ): Promise<ProductEntity> {
    const whereClause = { productId }

    if (adminId) {
      await this.userIsAdmin(adminId)
      whereClause['adminId'] = adminId
    }

    try {
      const product = await this.prismaService.product.findUnique({
        where: whereClause,
      })
      return {
        ...product,
        price: Number(product.price.toString()),
        oldPrice: Number(product.price.toString()),
      }
    } catch {
      throw new NotFoundException('Produto não encontrado')
    }
  }

  protected async userIsAdmin(adminId: string): Promise<boolean> {
    const admin = await this.prismaService.admin.findUnique({
      where: {
        adminId: adminId,
      },
    })

    if (!admin) {
      new ForbiddenException(`Você não tem permissão para realizar esta ação`)
    }

    return true
  }
}
