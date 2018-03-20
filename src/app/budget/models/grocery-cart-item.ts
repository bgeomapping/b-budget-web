export class GroceryCartItem {
    constructor(
        public date: string,
        public store: string,
        public name: string,
        public weight: number,
        public quantity: number,
        public cost: number,
        public organic: number,
        public seasonal: number
    ) { }
}
