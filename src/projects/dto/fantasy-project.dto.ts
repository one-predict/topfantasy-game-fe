import { IsArray, IsString } from 'class-validator';

export class ListFantasyProjectsByIdsDto {
  @IsArray()
  @IsString({ each: true })
  ids: string[];
}

export interface FantasyProjectDto {
  id: string;
  name: string;
  imageUrl: string;
  stars: number;
  socialLink: string;
  socialName: string;
}
