import type { Building } from '../Building/Building';
import { BuildingUtils } from '../BuildingUtils';
import { Upgrade } from './Upgrade';

export class IronPickaxe extends Upgrade {
	constructor() {
		super(
			'iron-pickaxe',
			'Iron Pickaxe',
			'Increases income from mining by 5%',
			1000,
		);
	}

	public override canBeBought(): boolean {
		const pickaxe = BuildingUtils.getBuildingById('pickaxe');

		if (!pickaxe) {
			return false;
		}

		return super.canBeBought() && pickaxe.getLevel() >= 10;
	}

	public applyProductionBonus(building: Building): number {
		if (building.getId() === 'pickaxe') {
			return 1.05; // 5% bonus for pickaxe
		}

		return 1; // No bonus for other buildings
	}
}

export const ironPickaxe = new IronPickaxe();
