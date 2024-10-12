import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@common/guards';
import { FantasyProjectService } from '@projects/services';
import { InjectFantasyProjectService } from '@projects/decorators';
import { ListFantasyProjectsByIdsDto } from '@projects/dto';

@Controller()
export default class FantasyProjectController {
  constructor(@InjectFantasyProjectService() private readonly fantasyProjectService: FantasyProjectService) {}

  @Post('/fantasy-projects/by-ids-list')
  @UseGuards(AuthGuard)
  public async listProjectsByIds(@Body() body: ListFantasyProjectsByIdsDto) {
    return this.fantasyProjectService.listForIds(body.ids);
  }
}
