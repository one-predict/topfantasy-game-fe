import { Injectable } from '@nestjs/common';
import { FantasyProjectEntity } from '@projects/entities';
import { FantasyProjectDto } from '@projects/dto';

export interface FantasyProjectEntityMapper {
  mapOne(entity: FantasyProjectEntity): FantasyProjectDto;
  mapMany(entities: FantasyProjectEntity[]): FantasyProjectDto[];
}

@Injectable()
export class DefaultFantasyProjectEntityMapper implements FantasyProjectEntityMapper {
  public mapOne(entity: FantasyProjectEntity): FantasyProjectDto {
    return {
      id: entity.getId(),
      imageUrl: entity.getImageUrl(),
      name: entity.getName(),
      stars: entity.getStars(),
      socialLink: entity.getSocialLink(),
      socialName: entity.getSocialName(),
    };
  }

  public mapMany(entities: FantasyProjectEntity[]): FantasyProjectDto[] {
    return entities.map((entity) => this.mapOne(entity));
  }
}
