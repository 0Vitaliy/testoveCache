import {action, decorate, observable} from "mobx";
import {createContext} from "react";

import { SIZECACHE } from '../utils/constants'


class Cache {

    track = new Array(SIZECACHE);
    store = {};
    idx = 0;

    get = (key) => {

        const {track, store} = this;
        track.push(track.splice(track.indexOf(key), 1)[0])

        return store[key];
    }

    set = (key, value) => {

        const {store, track} = this;

        if (!(key in store)) {
            store[key] = value;

            if (track[SIZECACHE - 1]) {
                delete store[this.track[0]];
                track.shift()
            }
            track[this.idx] = key;

            ++this.idx;

            if (this.idx === SIZECACHE) {
                this.idx = SIZECACHE - 1;
            }

        } else {
            store[key] = value;

        }
    }
}

decorate(Cache, {
    store: observable,
    set: action,
    get: action

});

export const cacheStore = new Cache();
export const cacheStoreCtx = createContext(cacheStore);