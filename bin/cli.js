#!/usr/bin/env node

async function typing(text, dots = '.') {
    const message = text + dots;
    process.stdout.write(`\r${message}`);
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            if(dots.length < 3) {
                await typing(text, `${dots}.`)
            }
            resolve()
        }, 1000);
    })
}

console.log('Arguments: ', process.argv);
typing('Hi! I\'m your the easy-react-lib CLI').then(result => process.stdout.write(`\n`))