import { usePlayerStore } from '../stores/player';
import { useGameStore } from '../stores/game';
import { Save } from './Save';
import { BuildingUtils } from './BuildingUtils';
import { UpgradeUtils } from './UpgradeUtils';

export const LOCAL_STORAGE_KEY = 'gameData';

export class Game {
	private running: boolean = false;
	private lastUpdate: number = 0;
	private updateInterval: number = 1000; // 1 second per tick

	private static save: Save = Save.getInstance();
	private sinceLastSave: number = 0;
	private saveInterval: number = 60000; // 60 seconds

	private gameStore = useGameStore();
	private playerStore = usePlayerStore();

	constructor() {
		this.gameStore.init(this);
		const loadedData = this.loadGame();

		if (loadedData) {
			if (loadedData.currency !== undefined) {
				this.gameStore.currency = loadedData.currency;
			}

			if (loadedData.playerName !== undefined) {
				this.playerStore.setName(loadedData.playerName);
			}

			if (loadedData.buildings) {
				loadedData.buildings.forEach((buildingData: any) => {
					const building = BuildingUtils.getAllBuildings().find(
						(b) => b.getId() === buildingData.id,
					);
					if (building) {
						building.setLevel(buildingData.level);
					}
				});
			}

			if (loadedData.upgrades) {
				loadedData.upgrades.forEach((upgradeData: any) => {
					const upgrade = UpgradeUtils.getUpgradeById(upgradeData.id);
					if (upgrade) {
						upgrade.setOwned(true);
					}
				});
			}
		}
	}

	get isRunning(): boolean {
		return this.running;
	}

	public init(): void {
		this.saveVisibleIncome();
	}

	public start(): void {
		if (!this.running) {
			this.running = true;
			this.lastUpdate = performance.now();

			console.log('Game started');

			this.init();
			this.gameLoop();
		}
	}

	public stop(): void {
		this.running = false;

		console.log('Game stopped');
	}

	private gameLoop = (): void => {
		if (!this.running) return;

		const now = performance.now();
		const delta = now - this.lastUpdate;

		if (delta >= this.updateInterval) {
			this.update(delta);
			this.lastUpdate = now;
		}

		requestAnimationFrame(this.gameLoop);
	};

	private update(delta: number): void {
		this.autoSave(delta);
		this.buildingsStep(delta);
		this.saveVisibleIncome();
	}

	private autoSave(delta: number): void {
		// Auto save logic
		this.sinceLastSave += delta;
		if (this.sinceLastSave >= this.saveInterval) {
			this.saveGame();
		}
	}

	private buildingsStep(delta: number): void {
		// Iterate through all buildings and apply their production scaled by delta time
		const totalProduction = BuildingUtils.getActiveBuildings().reduce(
			(sum, building) => {
				const productionPerSecond =
					BuildingUtils.getCurrentProduction(building);
				const production = productionPerSecond * (delta / 1000);
				return sum + production;
			},
			0,
		);

		this.gameStore.incrementCurrency(totalProduction);
	}

	private saveVisibleIncome(): void {
		const totalProduction = BuildingUtils.getActiveBuildings().reduce(
			(sum, building) => {
				return sum + BuildingUtils.getCurrentProduction(building);
			},
			0,
		);

		this.gameStore.setIncome(totalProduction);
	}

	public saveGame(): void {
		const buildings = BuildingUtils.getActiveBuildings().map((building) => ({
			id: building.getId(),
			level: building.getLevel(),
		}));
		const upgrades = UpgradeUtils.getOwnedUpgrades().map((upgrade) => ({
			id: upgrade.getId(),
		}));

		const toSave = {
			buildings: buildings,
			upgrades: upgrades,
			currency: this.gameStore.currency,
			playerName: this.playerStore.name,
		};

		Game.save.save(LOCAL_STORAGE_KEY, toSave);
		console.log('Game saved:', toSave);
		this.sinceLastSave = 0;
	}

	private loadGame(): Record<string, any> | null {
		const savedData = Game.save.load(LOCAL_STORAGE_KEY);
		if (savedData) {
			console.log('Game loaded:', savedData);
			return savedData;
		}
		console.warn('No saved game data found');
		return null;
	}
}
