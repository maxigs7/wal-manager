import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsString, IsOptional, IsMongoId } from 'class-validator';

export class CategoryDTO {
  public readonly id: string;
  public readonly name: string;
  public readonly isActive?: boolean;
  public readonly subcategories: CategoryDTO[];
}

export class CreateCategoryDTO {
  @IsString()
  @ApiProperty()
  public readonly name: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ default: true })
  public readonly isActive?: boolean = true;
}

export class UpdateCategoryDTO extends CreateCategoryDTO {
  @IsMongoId()
  @ApiProperty()
  public readonly id: string;
}
