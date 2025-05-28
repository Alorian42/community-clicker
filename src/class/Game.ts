import { useGameStore } from '../stores/game';

export class Game {
	private running: boolean = false;
	private lastUpdate: number = 0;
	private updateInterval: number = 1000; // 1 second per tick

	constructor() {
		const gameStore = useGameStore();
		gameStore.init(this);
	}

	get isRunning(): boolean {
		return this.running;
	}

	public start(): void {
		if (!this.running) {
			this.running = true;
			this.lastUpdate = performance.now();

			console.log('Game started');

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
		// Update game logic here
	}
}
