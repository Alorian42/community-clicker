import { goldPickaxe } from './Upgrade/GoldPickaxe';
import { ironPickaxe } from './Upgrade/IronPickaxe';
import type { Upgrade } from './Upgrade/Upgrade';

export interface UpgradeDetails {
	name: string;
	description: string;
	cost: number;
	upgrade: Upgrade;
}

export class UpgradeUtils {
	static getAllUpgrades(): Upgrade[] {
		return [ironPickaxe, goldPickaxe];
	}

	static getUpgradeById(id: string): Upgrade | undefined {
		return this.getAllUpgrades().find((upgrade) => upgrade.getId() === id);
	}

	static getOwnedUpgrades(): Upgrade[] {
		return this.getAllUpgrades().filter((upgrade) => upgrade.isOwned());
	}

	static getCanBeBoughtUpgrades(): Upgrade[] {
		return this.getAllUpgrades().filter(
			(upgrade) => !upgrade.isOwned() && upgrade.canBeBought(),
		);
	}
}
