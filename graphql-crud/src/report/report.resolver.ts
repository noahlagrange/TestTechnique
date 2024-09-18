import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Report } from './report.entity';
import { CreateReportInput, UpdateReportInput } from './report.input';
import { ReportService } from './report.service';


@Resolver(() => Report)
export class ReportResolver {
  constructor(private readonly reportService: ReportService) {}

  @Query(() => [Report])
  async latestReportsByDeviceIds(
    @Args('deviceIds', { type: () => [String] }) deviceIds: string[]
  ): Promise<Report[]> {
    return this.reportService.findLatestReportsByDeviceIds(deviceIds);
  }

  @Mutation(() => Report)
  async createReport(@Args('createReportInput') createReportInput: CreateReportInput): Promise<Report> {
    return this.reportService.create(createReportInput);
  }

  @Query(() => [Report])
  async reports(): Promise<Report[]> {
    return this.reportService.findAll();
  }

  @Query(() => Report, { nullable: true })
  async report(@Args('id', { type: () => String }) id: string): Promise<Report | null> {
    return this.reportService.findOne(id);
  }

  @Query(() => [Report])
  async FindAllbyDeviceId(@Args('deviceId', { type: () => String }) deviceId: string): Promise<Report[]> {
    return this.reportService.findAllbyDeviceId(deviceId);
  }

  @Mutation(() => Report, { nullable: true })
  async updateReport(@Args('updateReportInput') updateReportInput: UpdateReportInput): Promise<Report | null> {
    return this.reportService.update(updateReportInput);
  }

  @Mutation(() => Boolean)
  async removeReport(@Args('id', { type: () => String }) id: string): Promise<boolean> {
    return this.reportService.remove(id);
  }

  @Query(() => Report, { nullable: true })
  async latestReportByDeviceId(@Args('deviceId', { type: () => String }) deviceId: string): Promise<Report | null> {
    return this.reportService.findLatestByDeviceId(deviceId);
  }
}
