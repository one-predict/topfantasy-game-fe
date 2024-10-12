import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type FantasyProjectDocument = HydratedDocument<FantasyProject>;

@Schema({ collection: 'fantasy_projects', _id: false })
export class FantasyProject {
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  _id: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  name: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  imageUrl: string;

  @Prop({ required: true, type: mongoose.Schema.Types.Number })
  stars: number;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  socialName: string;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  socialLink: string;
}

export const FantasyProjectSchema = SchemaFactory.createForClass(FantasyProject);
