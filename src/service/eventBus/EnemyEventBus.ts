import AbstractEventBus from './AbstractEventBus';

export default class EnemyEventBus extends AbstractEventBus {
    static EVENTS = {
        ENEMY_GOT_SHIP: 'enemy:got-ship',
    } as const;

    private static instance: EnemyEventBus

    static getInstance() {
        if (!this.instance) {
            this.instance = new EnemyEventBus()
        }
        return this.instance
    }

    private constructor() {
        super();
    }
}
