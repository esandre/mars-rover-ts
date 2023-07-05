<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'

import {Rover} from './rover/rover'
import {Point} from './geometrie/point'
import {Position} from './geometrie/position'
import {Entier} from "./math/Entier.ts"
import {Orientations} from './topologie/orientations'
import {PlanèteAvecObstacles} from './topologie/planeteAvecObstacles.ts'
import {PlanèteToroïdaleVide} from './topologie/planeteToroïdale.ts'
import {InterpréteurRover} from './rover/interpréteurRover.js'
import {CommandeSimple} from './rover/commande/CommandeSimple.ts'

const planet = new PlanèteToroïdaleVide(new Entier(8))
const planeteAvecObstacles = new PlanèteAvecObstacles(planet)
planeteAvecObstacles.AjouterObstacle(1, 1)
planeteAvecObstacles.AjouterObstacle(2, 2)
planeteAvecObstacles.AjouterObstacle(7, 1)
const positionAtterrissage = new Position(new Point(new Entier(5), new Entier(2)), planeteAvecObstacles)

const rover = ref(new Rover(Orientations.Sud, positionAtterrissage))
const intepreteurRover = ref(new InterpréteurRover(rover.value))

const interprete = (cmd: string) => {
    const data = intepreteurRover.value.Interpréter(new CommandeSimple(cmd))
    rover.value = data._rover
    intepreteurRover.value = data
}

onMounted(() => {
    document.addEventListener('keydown', (ev: KeyboardEvent) => {
        switch (ev.key) {
            case "z":
                interprete("A")
                break;
            case "q":
                interprete("G")
                break;
            case "s":
                interprete("R")
                break;
            case "d":
                interprete("D")
                break;
            default:
                break;
        }
    })
})

const isObstacle = (i: number, j: number): boolean => !planeteAvecObstacles.EstAccessible(new Point(new Entier(i), new Entier(j)))

const latitudes = Array.from(Array(planeteAvecObstacles._decorated._pointMax._latitude._valeur), (_, index) => index).slice().reverse()
const longitudes = Array.from(Array(planeteAvecObstacles._decorated._pointMax._longitude._valeur), (_, index) => index)

const roverLatitude = computed(() => rover.value.Position._point._latitude._valeur)
const roverLongitude = computed(() => rover.value.Position._point._longitude._valeur)
</script>

<template>
    <div>
        <button @click="interprete('G')">Gauche</button>
        <button @click="interprete('A')">Avancer</button>
        <button @click="interprete('R')">Reculer</button>
        <button @click="interprete('D')">Droite</button>
        <table id="planet-table">
            <tbody>
            <tr v-for="i in latitudes">
                <td v-for="j in longitudes">
                    <template
                        v-if="rover && (i === roverLatitude && j === roverLongitude)">
                        <div id="robot">🤖</div>
                    </template>
                    <template v-else-if="isObstacle(i, j)">
                        <div class="obstacle">🪨</div>
                    </template>
                    <template v-else>
                        <div class="ground">&nbsp;</div>
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
