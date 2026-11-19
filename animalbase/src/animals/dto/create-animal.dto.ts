import { IsBoolean , IsNumber, IsNotEmpty, IsString, IsInt, Min } from "class-validator"

export class CreateAnimalDto {
    @IsString()
    @IsNotEmpty()
    "name": string;
    @IsString()
    @IsNotEmpty()
    "type": string;
    @IsString()
    @IsNotEmpty()
    "desc": string;
    @IsInt()
    @Min(0)
    "age": number;
    @IsBoolean()
    "star": boolean;
    @IsBoolean()
    "winner": boolean;

}