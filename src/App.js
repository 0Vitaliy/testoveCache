import React, { useState, useContext} from 'react';
import { observer } from "mobx-react"

import {cacheStoreCtx} from './store/cacha'

import {Input} from "./components/input";

import './App.css';


export const App = observer(() => {

        const [key, setKey] = useState('');
        const [value, setValue] = useState('');

        const {set, get, store} = useContext(cacheStoreCtx);

        return (
            <div className="App">
                <Input
                    label="Key"
                    value={key}
                    onChange={e => {
                        setKey(e.target.value)
                    }}/>
                <Input
                    label="Value"
                    value={value}
                    onChange={e => {
                        setValue(e.target.value)
                    }}/>

                <button
                    className="btn"
                    onClick={() => set(key, value)}
                    disabled={!key || !value}
                >Save
                </button>


                <div className="table">

                    {Object.keys(store).map(function (key, index) {
                        return (<div
                            className="tableBlock"
                            key={key}
                            onClick={() => {
                                setKey(key);
                                setValue(get(key))
                            }}>
                            <span> {key} </span> <span> : {store[key]} </span>
                        </div>)
                    })}
                </div>
                <div>
                    {store && <span>{JSON.stringify(store)}</span>}
                </div>
            </div>
        );
    }
);
