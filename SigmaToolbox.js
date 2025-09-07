// Name: Sigma Toolbox
// ID: sigmaToolboxExt
// Description: Custom variable system with eval, math expressions, types, and advanced variable manipulation. Great for scripting inside TurboWarp.
// By: Cherrystack
// License: MIT
// Version: 1.0.0

(function(Scratch) {
    'use strict';

    class SigmaToolboxExtension {
        constructor() {
            this._vars = {};
            this._blockIcon = `data:image/png;base64,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`;
            this._menuIcon = `data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyOS44MzUzNCIgaGVpZ2h0PSIzMy40Nzc2NCIgdmlld0JveD0iMCwwLDI5LjgzNTM0LDMzLjQ3NzY0Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjI1LjA4MjMzLC0xNjAuODkyMzIpIj48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0iTTIyNS4wODIzMywxNzkuMTU5NTdjMCwtOC4yMzg4IDYuNjc4ODcsLTE0LjkxNzY3IDE0LjkxNzY3LC0xNC45MTc2N2M4LjIzODgsMCAxNC45MTc2Nyw2LjY3ODg3IDE0LjkxNzY3LDE0LjkxNzY3YzAsOC4yMzg4IC02LjY3ODg3LDE0LjkxNzY3IC0xNC45MTc2NywxNC45MTc2N2MtOC4yMzg4LDAgLTE0LjkxNzY3LC02LjY3ODg3IC0xNC45MTc2NywtMTQuOTE3Njd6IiBmaWxsPSIjNmE1YWNkIiBzdHJva2Utd2lkdGg9IjAiLz48dGV4dCB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMzMuMTAxMjQsMTg2Ljg5NzI4KSBzY2FsZSgwLjU5NzgyLDAuNTk3ODIpIiBmb250LXNpemU9IjQwIiB4bWw6c3BhY2U9InByZXNlcnZlIiBmaWxsPSIjM2MyZjhmIiBzdHJva2Utd2lkdGg9IjEiIGZvbnQtZmFtaWx5PSJTYW5zIFNlcmlmIiBmb250LXdlaWdodD0ibm9ybWFsIiB0ZXh0LWFuY2hvcj0ic3RhcnQiPjx0c3BhbiB4PSIwIiBkeT0iMCI+zqM8L3RzcGFuPjwvdGV4dD48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoxNC45MTc2Njk5OTk5OTk5ODc6MTkuMTA3Njc3NDk5OTk5OTk0LS0+`;
        }

        _detectType(value) {
            if (typeof value === 'boolean') return 'bool';
            if (typeof value === 'number') return Number.isInteger(value) ? 'int' : 'float';
            return 'string';
        }

        _toNumberIfPossible(val) {
            if (typeof val === 'number') return val;
            if (typeof val === 'boolean') return val ? 1 : 0;
            if (typeof val === 'string') {
                const n = Number(val);
                return Number.isFinite(n) ? n : val;
            }
            return val;
        }

        _ensureVariable(name, value = 0) {
            if (!Object.prototype.hasOwnProperty.call(this._vars, name)) {
                const coerced = this._toNumberIfPossible(value);
                this._vars[name] = { value: coerced, type: this._detectType(coerced) };
            }
            return this._vars[name];
        }

        getInfo() {
            return {
                id: 'sigmaToolboxExt',
                name: 'Σ Toolbox',
                color1: '#6a5acd',
                color2: '#5245b9',
                color3: '#3c2f8f',
                menuIconURI: this._menuIcon,
                blocks: [
                    {
                        opcode: 'evalExpression',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'eval [EXPR]',
                        arguments: {
                            EXPR: { type: Scratch.ArgumentType.STRING, defaultValue: '(sin(5)+2)*5' }
                        },
                        blockIconURI: this._blockIcon
                    },
                    {
                        opcode: 'resetVariables',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'reset variables',
                        blockIconURI: this._blockIcon
                    },
                    {
                        opcode: 'getVariableValue',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'variable [VAR]',
                        arguments: { VAR: { type: Scratch.ArgumentType.STRING, defaultValue: 'x' } },
                        blockIconURI: this._blockIcon
                    },
                    {
                        opcode: 'getVariableType',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'variable type [VAR]',
                        arguments: { VAR: { type: Scratch.ArgumentType.STRING, defaultValue: 'x' } },
                        blockIconURI: this._blockIcon
                    },
                    {
                        opcode: 'setVariableTo',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set variable [VAR] to [VALUE]',
                        arguments: {
                            VAR: { type: Scratch.ArgumentType.STRING, defaultValue: 'x' },
                            VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: '0' }
                        },
                        blockIconURI: this._blockIcon
                    },
                    {
                        opcode: 'changeVariableBy',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'change variable [VAR] by [VALUE]',
                        arguments: {
                            VAR: { type: Scratch.ArgumentType.STRING, defaultValue: 'x' },
                            VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: '1' }
                        },
                        blockIconURI: this._blockIcon
                    },
                    {
                        opcode: 'variableExists',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'does variable [VAR] exist?',
                        arguments: {
                            VAR: { type: Scratch.ArgumentType.STRING, defaultValue: 'x' }
                        },
                        blockIconURI: this._blockIcon
                    }                    
                ]
            };
        }

        resetVariables() {
            this._vars = {};
        }

        variableExists(args) {
            const name = String(args.VAR).trim();
            return Object.prototype.hasOwnProperty.call(this._vars, name);
        }

        setVariableTo(args) {
            const name = String(args.VAR).trim();
            let value = args.VALUE ?? 0;
            
            // try to evaluate if it's a string that looks like an expression
            if (typeof value === 'string') {
                const evalResult = this.evalExpression({ EXPR: value });
                if (typeof evalResult === 'number') value = evalResult;
            }
            
            value = this._toNumberIfPossible(value);
            this._vars[name] = { value, type: this._detectType(value) };
        }

        changeVariableBy(args) {
            const name = String(args.VAR).trim();
            let delta = args.VALUE ?? 0;

            if (typeof delta === 'string') {
                const evalResult = this.evalExpression({ EXPR: delta });
                if (typeof evalResult === 'number') delta = evalResult;
            }

            const varObj = this._ensureVariable(name, 0);
            if (typeof varObj.value === 'number' && typeof delta === 'number') {
                varObj.value += delta;
                varObj.type = this._detectType(varObj.value);
            } else {
                varObj.value = String(varObj.value) + String(delta);
                varObj.type = this._detectType(varObj.value);
            }
        }


        getVariableValue(args) {
            const name = String(args.VAR).trim();
            return this._vars[name]?.value ?? 0;
        }

        getVariableType(args) {
            const name = String(args.VAR).trim();
            return this._vars[name]?.type ?? 'undefined';
        }

        evalExpression(args) {
            const expr = String(args.EXPR || '').trim();
            if (!expr) return 0;

            const mathContext = {
                abs: Math.abs,
                sin: Math.sin,
                cos: Math.cos,
                tan: Math.tan,
                asin: Math.asin,
                acos: Math.acos,
                atan: Math.atan,
                atan2: Math.atan2,
                sqrt: Math.sqrt,
                pow: Math.pow,
                floor: Math.floor,
                ceil: Math.ceil,
                round: Math.round,  
                trunc: Math.trunc,  
                sign: Math.sign,      
                random: Math.random,
                PI: Math.PI,
                E: Math.E,
                randi: (a,b) => Math.floor(Math.random()*(b-a+1))+a,
                randf: (a,b) => Math.random()*(b-a)+a,
                deg: (x) => x * 180 / Math.PI,      
                rad: (x) => x * Math.PI / 180, 
                clamp: (x, min, max) => Math.max(min, Math.min(max, x)),
                lerp: (a, b, t) => a + (b - a) * t              
            };


            const names = Object.keys(this._vars).concat(Object.keys(mathContext));
            const values = Object.values(this._vars).map(v => v.value).concat(Object.values(mathContext));

            try {
                const fn = new Function(...names, `'use strict'; return (${expr});`);
                const result = fn(...values);
                if (typeof result === 'string') {
                    const n = Number(result);
                    if (Number.isFinite(n)) return n;
                }
                return result;
            } catch (e) {
                return 0;
            }
        }
    }

    Scratch.extensions.register(new SigmaToolboxExtension());
})(Scratch);