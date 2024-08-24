#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';


let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Oye, que hay? \n ');
await sleep();

rainbowTitle.stop();

console.log(`
    ${chalk.bgBlue('manual de instruciones')}
    Soy un proceso en tu computadora.
    Si se equivoca en una pregunta, este programa ${chalk.bgRed('terminará')}. 
    Así que acierta todas las preguntas...
    
    `);

    }



async function preguntaPorNombre() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player';
        },
    });

    playerName = answers.player_name;
}



// await preguntaPorNombre();

async function pregunta1() {
    const answer = await inquirer.prompt({
        name: 'pregunta_1',
        type: 'list',
        message: 'Nohelymar nació en el año\n',
        choices: [
            '2000',
            '1998',
            '1993',
            '1999',
        ],
    });
return handleAnswer(answer.pregunta_1 == 1998)
}



async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Chequiando la respuesta...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Wepa, ${playerName}! Has respondido correctamente`});
    } else {
        spinner.error({ text: `perrrroooo perdiste ${playerName}`});
        process.exit(1);
    }
}

function winner() {
    console.clear();
    const msg = `WEPAAAA!! Ganastes, ${playerName}!! \n $5`;

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    })
}

await welcome();
await preguntaPorNombre();
await pregunta1();
await winner();