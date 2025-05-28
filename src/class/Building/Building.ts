export abstract class Building {
	protected id: string;
	protected name: string;
	protected level: number;
	protected baseCost: number;
	protected baseProduction: number;

	constructor(
		id: string,
		name: string,
		baseCost: number,
		baseProduction: number,
	) {
		this.id = id;
		this.name = name;
		this.level = 0;
		this.baseCost = baseCost;
		this.baseProduction = baseProduction;
	}

	public getName(): string {
		return this.name;
	}

	public getLevel(): number {
		return this.level;
	}

	public setLevel(level: number): void {
		if (level < 0) {
			throw new Error('Level cannot be negative');
		}
		this.level = level;
	}

	public getBaseCost(): number {
		return this.baseCost;
	}

	public getBaseProduction(): number {
		return this.baseProduction;
	}

	public getId(): string {
		return this.id;
	}

	public upgrade(amount: number = 1): void {
		if (amount < 1) {
			throw new Error('Upgrade amount must be at least 1');
		}
		this.level += amount;
	}
}
