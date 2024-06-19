import {v4 as uuidV4} from 'uuid'

export class Uuid {
    static get32Id(): string{
        const newId = uuidV4().replaceAll("-", "");
        return newId;
    }
}