import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReportService } from './report.service';
import { Report } from './report.entity';
import { CreateReportInput, UpdateReportInput } from './report.input';

@Resolver(() => Report)
export class ReportResolver {
  constructor(private readonly reportService: ReportService) {}

  @Mutation(() => Report)
  async createReport(@Args('createReportInput') createReportInput: CreateReportInput): Promise<Report> {
    return this.reportService.create(createReportInput);
  }

  @Query(()=> [Report])
  async findAllbyDeviceId(@Args('deviceid') deviceid: string) : Promise<Report[]> {
    return this.reportService.findAllbyDeviceId(deviceid);
  }

  @Query(() => [Report])
  async getReports(): Promise<Report[]> {
    return this.reportService.findAll();
  }

  @Query(() => Report, { nullable: true })
  async getReport(@Args('id') id: string): Promise<Report> {
    return this.reportService.findOne(id);
  }

  @Mutation(() => Report)
  async updateReport(@Args('updateReportInput') updateReportInput: UpdateReportInput): Promise<Report> {
    return this.reportService.update(updateReportInput);
  }

  @Mutation(() => Boolean)
  async deleteReport(@Args('id') id: string): Promise<boolean> {
    return this.reportService.remove(id);
  }
}
