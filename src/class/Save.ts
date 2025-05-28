export class Save {
	private static instance: Save | null = null;
	private saveData: Record<string, any> = {};

	private constructor() {
		// Private constructor to prevent instantiation
	}

	public static getInstance(): Save {
		if (!Save.instance) {
			Save.instance = new Save();
		}
		return Save.instance;
	}

	public save(key: string, value: any): void {
		this.saveData[key] = value;
		localStorage.setItem('saveData', JSON.stringify(this.saveData));
	}

	public load(key: string): any {
		if (this.saveData[key] === undefined) {
			const savedData = localStorage.getItem('saveData');
			if (savedData) {
				this.saveData = JSON.parse(savedData);
			}
		}
		return this.saveData[key];
	}

	public clear(): void {
		this.saveData = {};
		localStorage.removeItem('saveData');
	}
}
