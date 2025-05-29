import type { Building } from '../Building/Building';

export abstract class Upgrade {
	private id: string;
	private name: string;
	private description: string;
	private cost: number;
	private owned: boolean = false;

	constructor(id: string, name: string, description: string, cost: number) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.cost = cost;
	}

	public getId(): string {
		return this.id;
	}

	public getName(): string {
		return this.name;
	}

	public getDescription(): string {
		return this.description;
	}

	public getCost(): number {
		return this.cost;
	}

	public isOwned(): boolean {
		return this.owned;
	}

	public setOwned(owned: boolean): void {
		this.owned = owned;
	}

	public canBeBought(): boolean {
		return !this.owned;
	}

	public abstract applyProductionBonus(building: Building): number;

	public buy(): void {
		if (!this.canBeBought()) {
			throw new Error(`Cannot buy upgrade: ${this.name}`);
		}

		this.owned = true;
	}
}
