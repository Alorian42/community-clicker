import { Building } from './Building';

export class Pickaxe extends Building {
	constructor() {
		super('pickaxe', 'Pickaxe', 10, 1);
	}
}

export const pickaxe = new Pickaxe();
