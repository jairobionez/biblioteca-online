export class DateConvert{

    public static convert(data: any): string{
        if(data!=null) return data.date + '/' + data.month + '/' + data.year
    }
}