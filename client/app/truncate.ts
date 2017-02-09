import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'truncate' })

//this pipe used to cut video description if greated than 100 chars 
export class TruncatePipe implements PipeTransform {
    transform(value: string, amount: number, truncateChar: string) : string {
        let limit = amount ? amount : 10;
        let trail = truncateChar ? truncateChar : '...';
        return value.length > limit ? value.substring(0, limit) + trail : value;
    }
}