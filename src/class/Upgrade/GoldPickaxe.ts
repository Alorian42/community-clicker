import { BuildingUtils } from '../BuildingUtils';
import { Upgrade } from './Upgrade';
import { ironPickaxe } from './IronPickaxe';
import type { Building } from '../Building/Building';

export class GoldPickaxe extends Upgrade {
	constructor() {
		super(
			'gold-pickaxe',
			'Gold Pickaxe',
			'Increases income from mining by 10%',
			5000,
		);
	}

	public canBeBought(): boolean {
		const pickaxe = BuildingUtils.getBuildingById('pickaxe');

		if (!pickaxe) {
			return false;
		}

		return (
			super.canBeBought() && pickaxe.getLevel() >= 20 && ironPickaxe.isOwned()
		);
	}

	public applyProductionBonus(building: Building): number {
		if (building.getId() === 'pickaxe') {
			return 1.1; // 10% bonus for pickaxe
		}

		return 1; // No bonus for other buildings
	}
}

export const goldPickaxe = new GoldPickaxe();
