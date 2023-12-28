import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { SeleniumService } from './selenium.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('scrape')
export class SeleniumController {
  constructor(private readonly seleniumService: SeleniumService) {}

  @UseGuards(JwtGuard)
  @Post()
  async scrapeWebsite(
    @Body('ProfileLink') profileLink: string,
  ): Promise<string | { profileImg: string | null; jobTitle: string | null }> {
    try {
      const data = await this.seleniumService.getDataFromWebsite(profileLink);
      return { profileImg: data.profileImg, jobTitle: data.jobTitle };
    } catch (error) {
      throw new InternalServerErrorException('Error occurred during scraping');
    }
  }
}
