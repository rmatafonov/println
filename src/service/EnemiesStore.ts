import { mathUtil } from '@/util'

const text = 'Он говорил на том изысканном французском языке, на котором не только говорили, но и думали наши деды, и с теми, тихими, покровительственными интонациями, которые свойственны состаревшемуся в свете и при дворе значительному человеку. Он подошел к Анне Павловне, поцеловал ее руку, подставив ей свою надушенную и сияющую лысину, и покойно уселся на диване.'

export type EnemyModel = {
    word: string
    point: Point
}

export default class EnemiesStore {
    private static instance: EnemiesStore

    static getInstance() {
        if (!this.instance) {
            this.instance = new EnemiesStore()
        }
        return this.instance
    }

    private words: Array<string>
    private currentIndex = 0

    private constructor() {
        this.words = text.replace(/[^0-9a-zA-Zа-яА-Я ]/g, '').split(' ')
    }

    getNextEnemies(count: number, xMax: number, yMax: number): Array<EnemyModel> {
        const result: Array<EnemyModel> = []
        for (let i = 0; i < count; i++) {
            result.push({
                word: this.words[this.currentIndex++],
                point: {
                    x: mathUtil.getRandomInt(xMax),
                    y: mathUtil.getRandomInt(yMax),
                }
            })
        }
        return result
    }
}
