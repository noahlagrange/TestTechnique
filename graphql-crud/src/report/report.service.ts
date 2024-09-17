import { Injectable } from '@nestjs/common';
import { Report } from './report.entity';
import { CreateReportInput, UpdateReportInput } from './report.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReportService {
    constructor(@InjectModel('Report') private readonly reportModel: Model<Report>) {}

  async create(createReportInput: CreateReportInput): Promise<Report> {
    const newReport = new this.reportModel(createReportInput);
    return newReport.save(); 
  }

  async findAll(): Promise<Report[]> {
    return this.reportModel.find().exec();
  }

  async findOne(id: string): Promise<Report> {
    return this.reportModel.findById(id).exec();
  }

  async findAllbyDeviceId(deviceid: string): Promise<Report[]> {
    return this.reportModel.find({ deviceId : deviceid }).exec();
  }

  async update(updateReportInput: UpdateReportInput): Promise<Report> {
    return this.reportModel.findByIdAndUpdate(updateReportInput.id, updateReportInput, { new: true }).exec()
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.reportModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
}
