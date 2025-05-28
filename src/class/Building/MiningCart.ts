import { Building } from './Building';

export class MiningCart extends Building {
	constructor() {
		super('miningCart', 'Mining Cart', 1000, 5);
	}
}

export const miningCart = new MiningCart();
