import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportResolver } from './report.resolver';
import { ReportSchema } from './report.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:  [MongooseModule.forFeature([{ name: 'Report', schema: ReportSchema }])],
  providers: [ReportService, ReportResolver],
})
export class ReportModule {}
