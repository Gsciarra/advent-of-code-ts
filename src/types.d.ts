type GetInput = <Result>(year: number, day: number, dataParser: DataParser<Result>) => Promise<Result>;
type DataParser<Result> = (input: string) => Result;
