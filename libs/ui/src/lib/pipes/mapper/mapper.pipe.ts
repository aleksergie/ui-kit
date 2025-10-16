import { Pipe, PipeTransform } from "@angular/core";

export type uiMapper<T extends unknown[], G> = (...args: T) => G;

@Pipe({
    standalone: true,
    name: 'uiMapper',
})
export class uiMapperPipe implements PipeTransform {
    /**
     * Maps object to an arbitrary result through a mapper function
     *
     * @param value an item to transform
     * @param mapper a mapping function
     * @param args arbitrary number of additional arguments
     */
    public transform<T extends unknown[], U, G>(
        value: U,
        mapper: uiMapper<[U, ...T], G>,
        ...args: T
    ): G {
        return mapper(value, ...args);
    }
}
