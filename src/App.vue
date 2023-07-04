<script setup lang="ts">
import {computed, ref} from 'vue'

import {Rover} from './rover/rover'
import {Point} from './geometrie/point'
import {Position} from './geometrie/position'
import {Entier} from "./math/Entier.ts"
import {Orientations} from './topologie/orientations'
import {PlanèteToroïdaleVide} from './topologie/planeteToroïdale.ts'
import {InterpréteurRover} from './rover/interpréteurRover.js'
import {CommandeSimple} from './rover/commande/CommandeSimple.ts'

const point = new Point(new Entier(5), new Entier(2))
const planet = new PlanèteToroïdaleVide(new Entier(8))
const position = new Position(point, planet)

const rover = ref(new Rover(Orientations.Sud, position))
const intepreteurRover = ref(new InterpréteurRover(rover.value))

const interprete = (cmd: string) => {
    const data = intepreteurRover.value.Interpréter(new CommandeSimple(cmd))
    rover.value = data._rover
    intepreteurRover.value = data
}

const latitudes = Array.from(Array(planet._pointMax._latitude._valeur), (_, index) => index + 1).slice().reverse()
const longitudes = Array.from(Array(planet._pointMax._longitude._valeur), (_, index) => index + 1)

const roverLatitude = computed(() => rover.value.Position._point._latitude._valeur + 1)
const roverLongitude = computed(() => rover.value.Position._point._longitude._valeur + 1)
</script>

<template>
    <div>
        <button @click="interprete('G')">Gauche</button>
        <button @click="interprete('A')">Avancer</button>
        <button @click="interprete('R')">Reculer</button>
        <button @click="interprete('D')">Droite</button>
        <table id="planet-table">
            <tbody>
            <tr v-for="j in latitudes">
                <td v-for="i in longitudes">
                    <template
                        v-if="j === roverLatitude && i === roverLongitude">
                        <div id="robot">🤖</div>
                    </template>
                    <template v-else>
                        <span>_</span>
                    </template>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
#robot {
    transform: rotate(v-bind(rover.Orientation.toDegree() + "deg"));
}
</style>
