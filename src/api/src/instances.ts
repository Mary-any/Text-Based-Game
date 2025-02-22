import { GameObject } from "./base/gameObjects/GameObject";
import { Room } from "./base/gameObjects/Room";
import { getPlayerSessionFromContext, resetPlayerSessionInContext } from "./base/playerSessionMiddleware"; // Import resetGame function
import { ExampleCharacter, ExampleCharacterAlias } from "./characters/ExampleCharacter";
import { SkeletonCharacter, SkeletonCharacterAlias } from "./characters/SkeletonCharacter";
import { ExampleItem, ExampleItemAlias } from "./items/ExampleItem";
import { GemstoneItem, GemstoneItemAlias } from "./items/GemstoneItem";
import { StartupRoom, StartupRoomAlias } from "./rooms/StartupRoom";
import { PlayerSession } from "./types";
import { StoneCharacter, StoneCharacterAlias } from "./characters/StoneCharacter";
import { MapItemAlias, Mapitem } from "./items/MapItem";
import { theMazeRoom, theMazeRoomAlias } from "./rooms/theMazeRoom";
import { KabouterCharacter, KabouterCharacterAlias } from "./characters/KabouterCharacter";
import {BigslideRoom, BigslideRoomAlias} from "./rooms/BigslideRoom";
import {CaveEntrance, CaveEntranceAlias} from "./rooms/CaveEntrance";
import {BigRoom, BigRoomAlias} from "./rooms/BigRoom";
import {EdsPush, EdsPushAlias} from "./rooms/EdsPush";
import {DeurklinkItem, DeurklinkItemAlias} from "./items/DeurklinkItem";
import {BoomCharacter, BoomCharacterAlias} from "./characters/BoomCharacter";
import {FlashLightItem, FlashLightItemAlias} from "./items/FlashLightItem";
import {RopeItem, RopeItemAlias} from "./items/RopeItem";
import {JohnCharacter, JohnCharacterAlias} from "./characters/JohnCharacter";

/**
 * Create a new player session object
 *
 * @returns New player session object
 */
export function createNewPlayerSession(): PlayerSession {
    return {
        currentRoom: "startup",
        inventory: [],
        pickedUpGemstone: true,
        pickedUpDeurklink: false,
        talkedToBoom: false,
        examineCave: false,
        pickedUpFlashLight: true,
        pickedUpRope: true,
        talkedToJohn: false,
        examineStone: false,
        giveDoorknob: false,
        pickedUpMapItem: false,
        talkedToKabouter: false,
        raadselGekregen: false,
        geheimGedrukt: false,
        mapGepakt: false,
    };
}

/**
 * Get the player session from the current request
 *
 * @returns Player session from the current request
 */
export function getPlayerSession(): PlayerSession {
    return getPlayerSessionFromContext<PlayerSession>();
}

/**
 * Reset the player session
 */
export function resetPlayerSession(): void {
    resetPlayerSessionInContext(createNewPlayerSession);
}

/**
 * Get the instance of a room by its alias
 *
 * @param alias Alias of the room
 *
 * @returns Instance of the room
 */
export function getRoomByAlias(alias: string): Room | undefined {
    switch (alias) {
        case StartupRoomAlias:
            return new StartupRoom();

        case BigslideRoomAlias:
            return new BigslideRoom();

        case CaveEntranceAlias:
            return new CaveEntrance();

        case BigRoomAlias:
            return new BigRoom();

        case EdsPushAlias:
            return new EdsPush();

        case theMazeRoomAlias:
            return new theMazeRoom();
    }

    return undefined;
}

/**
 * Get the instance of a game object by its alias
 *
 * @param alias Alias of the game object
 *
 * @returns Instance of the game object
 */
export function getGameObjectByAlias(alias: string): GameObject | undefined {
    switch (alias) {
        case ExampleItemAlias:
            return new ExampleItem();

        case ExampleCharacterAlias:
            return new ExampleCharacter();

        case DeurklinkItemAlias:
            return new DeurklinkItem();

        case BoomCharacterAlias:
            return new BoomCharacter();

        case StoneCharacterAlias:
            return new StoneCharacter();

        case FlashLightItemAlias:
            return new FlashLightItem();

        case RopeItemAlias:
            return new RopeItem();

        case JohnCharacterAlias:
            return new JohnCharacter();

        case GemstoneItemAlias: // Add case for GemstoneItemAlias
            return new GemstoneItem();

        case SkeletonCharacterAlias:
            return new SkeletonCharacter();

        case MapItemAlias:
            return new Mapitem();

        case KabouterCharacterAlias:
            return new KabouterCharacter();


        //NOTE: Fall back to rooms, since those are game objects too.
        default:
            return getRoomByAlias(alias);
    }
}

/**
 * Get a list of game objects instances by their alias
 *
 * @param alias List of game object aliases
 *
 * @returns List of game object instances
 */
export function getGameObjectsByAliases(objectAliases?: string[]): GameObject[] {
    return objectAliases?.map((e) => getGameObjectByAlias(e)!).filter((e) => e) || [];
}

/**
 * Get a list of game object instances based on the inventory of the current player session
 *
 * @returns List of game object instances
 */
export function getGameObjectsFromInventory(): GameObject[] {
    return getGameObjectsByAliases(getPlayerSession().inventory);
}