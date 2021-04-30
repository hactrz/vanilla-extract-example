import React from 'react'
import {exampleStyle} from './App.css'

import camelCase from 'camelcase'
const css = require('css')

function App() {

    const testCss = `
    .root {
        box-sizing: content-box;
        display: flex;
        flex-direction: column;
        flex: 0 0 60px;
        background: var(--color-valhalla);
    }

    .top,
    .bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
        flex-grow: 1;
    }
    
    .top {
        justify-content: flex-start;
    }
    .bottom {
        justify-content: flex-end;
    }
    `

    const obj = css.parse(testCss)
    console.warn(obj.stylesheet.rules, 'rules');

    const rules = obj.stylesheet.rules

    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i]
        const firstSelector = rule.selectors[0]
        const cssProps: Record<string, string | number> = {}
        for (const dec of rule.declarations) {
            cssProps[camelCase(dec.property)] = parseInt(dec.value) ? parseInt(dec.value) : dec.value
        }
        console.log(
            `export const ${firstSelector.slice(1)} = style(${ JSON.stringify(cssProps) })`
        )
    }

    return (
        <div className={exampleStyle}>
            test
        </div>
    );
}

export default App;
