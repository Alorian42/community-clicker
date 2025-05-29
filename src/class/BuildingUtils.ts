import type { Building } from './Building/Building';
import { miningCart } from './Building/MiningCart';
import { pickaxe } from './Building/Pickaxe';
import { UpgradeUtils } from './UpgradeUtils';

export interface BuildingsDetails {
	name: string;
	level: number;
	cost: number;
	production: number;
	building: Building;
}

export class BuildingUtils {
	public static getAllBuildings(): Building[] {
		return [pickaxe, miningCart];
	}

	public static getActiveBuildings(): Building[] {
		return BuildingUtils.getAllBuildings().filter(
			(building) => building.getLevel() > 0,
		);
	}

	public static getBuildingById(id: string): Building | undefined {
		return BuildingUtils.getAllBuildings().find(
			(building) => building.getId() === id,
		);
	}

	public static getNextBuildingCost(building: Building): number {
		const level = building.getLevel();
		const baseCost = building.getBaseCost();
		const costMultiplier = 1.15; // Example multiplier for cost increase per level
		return Math.floor(baseCost * Math.pow(costMultiplier, level - 1));
	}

	public static getCurrentProduction(building: Building): number {
		const level = building.getLevel();
		const baseProduction = building.getBaseProduction();
		let bonus = 1;

		// Applying production bonus from upgrades
		UpgradeUtils.getOwnedUpgrades().forEach((upgrade) => {
			const upgradeBonus = upgrade.applyProductionBonus(building);
			bonus += upgradeBonus - 1; // Adjust bonus to be additive
		});

		// @TODO apply modifiers from other sources (e.g., upgrades, bonuses)

		return level * baseProduction * bonus;
	}
}

// @ts-ignore
window.BuildingUtils = BuildingUtils; // Expose for global access if needed
