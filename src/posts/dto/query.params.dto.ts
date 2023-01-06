import { IsString, IsDate, IsBoolean } from 'class-validator'

export class QueryParamsDto {
  search?: string
  dateFilter?: Date

  @IsBoolean()
  owner: boolean
}