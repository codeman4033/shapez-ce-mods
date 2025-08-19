import { Mod } from "shapez/mods/mod";
import { HUDBuildingPlacer } from "shapez/game/hud/parts/building_placer";
import { THEME } from "shapez/game/theme";
import { globalConfig } from "shapez/core/config";
import { clamp } from "shapez/core/utils";
import { Vector } from "shapez/core/vector";
import { KEYMAPPINGS } from "shapez/game/key_action_mapper";
import { STOP_PROPAGATION } from "shapez/core/signal";
import { keyToKeyCode } from "shapez/core/keycodes";

export default class extends Mod {
  init() {
    this.modInterface.extendClass(HUDBuildingPlacer, ({}) => ({
      drawDirectionLock(
        parameters: import("shapez/core/draw_parameters").DrawParameters,
      ) {
        const mousePosition = this.root.app.mousePosition;
        if (!mousePosition) {
          // Not on screen
          return;
        }
        // I would put these in an overrided constructor,
        // but someone decided that we can't override those :(.
        if (this.pins === undefined) {
          this.pins = [];
        }
        if (this.pinDirs === undefined) {
          this.pinDirs = [];
        }

        const applyStyles = (look: string) => {
          parameters.context.fillStyle =
            // @ts-expect-error My typings are bad
            THEME.map.directionLock[look].color;
          parameters.context.strokeStyle =
            // @ts-expect-error My typings are bad
            THEME.map.directionLock[look].background;
          parameters.context.lineWidth = 10;
        };

        if (!this.lastDragTile) {
          // Not dragging yet
          applyStyles(parameters.root.currentLayer);
          const mouseWorld = this.root.camera.screenToWorld(mousePosition);
          parameters.context.beginCircle(mouseWorld.x, mouseWorld.y, 4);
          parameters.context.fill();
          return;
        }

        const path = this.computeDirectionLockPath();

        const mouseWorld = this.root.camera.screenToWorld(mousePosition);
        const mouseTile = mouseWorld.toTileSpace();
        const startTile = this.lastDragTile;
        const endTile = mouseTile.toWorldSpaceCenterOfTile();
        let anyObstacle = false;
        let prevTile = startTile;

        for (let i = 0; i < path.length; i += 1) {
          const { tile } = path[i];

          if (this.checkForObstales(prevTile, tile, [startTile, endTile])) {
            anyObstacle = true;
            break;
          }
          prevTile = tile.copy();
        }

        if (anyObstacle) {
          applyStyles("error");
        } else {
          applyStyles(parameters.root.currentLayer);
        }

        for (let i = 0; i < this.pins.length; i += 1) {
          const tile = this.pins[i];
          const worldPos = tile.toWorldSpaceCenterOfTile();
          parameters.context.beginCircle(worldPos.x, worldPos.y, 3);
          parameters.context.fill();
        }

        parameters.context.beginCircle(mouseWorld.x, mouseWorld.y, 4);
        parameters.context.fill();
        parameters.context.beginCircle(
          startTile.toWorldSpaceCenterOfTile().x,
          startTile.toWorldSpaceCenterOfTile().y,
          8,
        );
        parameters.context.fill();

        parameters.context.beginPath();
        parameters.context.moveTo(startTile.x, startTile.x.y);

        for (let i = 0; i < path.length; i += 1) {
          const { tile } = path[i];
          const worldPos = tile.toWorldSpaceCenterOfTile();
          parameters.context.lineTo(worldPos.x, worldPos.y);
        }

        parameters.context.stroke();

        parameters.context.beginCircle(endTile.x, endTile.y, 5);
        parameters.context.fill();

        // Draw arrow
        const arrowSprite =
          this.lockIndicatorSprites[
            anyObstacle ? "error" : parameters.root.currentLayer
          ];
        for (let i = 0; i < path.length - 1; i += 1) {
          const { rotation, tile } = path[i];
          const worldPos = tile.toWorldSpaceCenterOfTile();
          const angle = Math.radians(rotation);
          const next = path.at(i + 1);
          if ("tile" in next && tile.equals(next.tile)) {
            continue;
          }
          parameters.context.translate(worldPos.x, worldPos.y);
          parameters.context.rotate(angle);
          parameters.context.drawImage(
            arrowSprite,
            -6,
            -globalConfig.halfTileSize -
              clamp((this.root.time.realtimeNow() * 1.5) % 1.0, 0, 1) *
                globalConfig.tileSize +
              globalConfig.halfTileSize -
              6,
            12,
            12,
          );
          parameters.context.rotate(-angle);
          parameters.context.translate(-worldPos.x, -worldPos.y);
        }
      },
      abortDragging() {
        this.currentlyDragging = true;
        this.currentlyDeleting = false;
        this.initialPlacementVector = null;
        this.lastDragTile = null;
        this.pins = [];
        this.pinDirs = [];
      },
      directionLockCorner(start: Vector, end: Vector, hasPin: boolean) {
        // Figure initial direction
        const dx = Math.abs(start.x - end.x);
        const dy = Math.abs(start.y - end.y);
        if (dx === 0 && dy === 0) {
          // Back at the start. Try a new direction.
          this.currentDirectionLockSideIndeterminate = true;
        } else if (this.currentDirectionLockSideIndeterminate) {
          this.currentDirectionLockSideIndeterminate = false;
          this.currentDirectionLockSide = dx <= dy ? 0 : 1;
          this.pinDirs[this.pins.length] = this.currentDirectionLockSide;
        }

        if (hasPin) {
          if (
            this.pinDirs[this.pins.length] === undefined ||
            this.currentDirectionLockSideIndeterminate ||
            this.pinDirs.length < 1
          ) {
            this.pinDirs[this.pins.length] = this.currentDirectionLockSide;
          }
        }

        if (this.currentDirectionLockSide === 0) {
          return new Vector(start.x, end.y);
        } else {
          return new Vector(end.x, start.y);
        }
      },
      directionLockCornerPin(start: Vector, end: Vector, dirIdx: number) {
        if (this.pinDirs[dirIdx] === 0) {
          return new Vector(start.x, end.y);
        } else {
          return new Vector(end.x, start.y);
        }
      },
      computeDirectionLockPathSegment(
        startTile: Vector,
        endTile: Vector,
        pinDirIdx: number,
        hasPin: boolean,
      ) {
        let result: {
          tile: Vector;
          rotation: number;
        }[] = [];
        // if the alt key is pressed, reverse belt planner direction by switching start and end tile
        if (
          this.root.keyMapper.getBinding(
            KEYMAPPINGS.placementModifiers.placeInverse,
          ).pressed
        ) {
          let tmp = startTile;
          startTile = endTile;
          endTile = tmp;
        }

        let corner;
        if (pinDirIdx !== null) {
          corner = this.directionLockCornerPin(startTile, endTile, pinDirIdx);
        } else {
          corner = this.directionLockCorner(startTile, endTile, hasPin);
        }

        // Place from start to corner
        const pathToCorner = corner.sub(startTile);
        const deltaToCorner = pathToCorner.normalize().round();
        const lengthToCorner = Math.round(pathToCorner.length());
        let currentPos = startTile.copy();

        let rotation =
          (Math.round(Math.degrees(deltaToCorner.angle()) / 90) * 90 + 360) %
          360;

        if (lengthToCorner > 0) {
          for (let i = 0; i < lengthToCorner; ++i) {
            result.push({
              tile: currentPos.copy(),
              rotation,
            });
            currentPos.addInplace(deltaToCorner);
          }
        }

        // Place from corner to end
        const pathFromCorner = endTile.sub(corner);
        const deltaFromCorner = pathFromCorner.normalize().round();
        const lengthFromCorner = Math.round(pathFromCorner.length());

        if (lengthFromCorner > 0) {
          rotation =
            (Math.round(Math.degrees(deltaFromCorner.angle()) / 90) * 90 +
              360) %
            360;
          for (let i = 0; i < lengthFromCorner + 1; i++) {
            result.push({
              tile: currentPos.copy(),
              rotation,
            });
            currentPos.addInplace(deltaFromCorner);
          }
        } else {
          // Finish last one
          result.push({
            tile: currentPos.copy(),
            rotation,
          });
        }
        return result;
      },
      /**
       * @this {HUDBuildingPlacer}
       */
      computeDirectionLockPath() {
        const mousePosition = this.root.app.mousePosition;
        if (!mousePosition) {
          // Not on screen
          return [];
        }

        if (this.pins.length === 0) {
          const worldPos = this.root.camera.screenToWorld(mousePosition);
          return this.computeDirectionLockPathSegment(
            this.lastDragTile,
            worldPos.toTileSpace(),
            null,
            true,
          );
        }
        let result: {
          tile: Vector;
          rotation: number;
        }[] = [];

        let prevTile = this.lastDragTile.copy();
        for (let i = 0; i < this.pins.length; i++) {
          let startTile = prevTile.copy();
          let endTile = this.pins[i];
          result.push(
            ...this.computeDirectionLockPathSegment(
              startTile,
              endTile,
              i,
              false,
            ),
          );
          prevTile = endTile.copy();
        }
        const worldPos = this.root.camera.screenToWorld(mousePosition);
        result.push(
          ...this.computeDirectionLockPathSegment(
            prevTile,
            worldPos.toTileSpace(),
            null,
            true,
          ),
        );
        result.reverse();
        result.splice(0, 1);
        console.log(result.map((val) => val.tile));
        return result;
      },
    }));
    this.modInterface.registerIngameKeybinding({
      id: "place-belt-anchor",
      keyCode: keyToKeyCode("c"),
      translation: "Place down belt anchor",
      handler: this.placeAnchor,
    });
  }
  placeAnchor(root: import("shapez/game/root").GameRoot) {
    const placer = root.hud.parts.buildingPlacer;
    if (placer.isDirectionLockActive && placer.lastDragTile) {
      let mousePosition = root.camera
        // @ts-expect-error
        .screenToWorld(root.app.mousePosition)
        .toTileSpace();
      // @ts-expect-error bad typings
      let last = placer.pins.at(-1);
      if (last !== undefined && last.equals(mousePosition)) {
        // @ts-expect-error bad typings
        placer.pins.splice(-1, 1);
        // @ts-expect-error bad typings
        placer.pinDirs.splice(-1, 1);
        placer.currentDirectionLockSideIndeterminate = false;
      } else {
        // @ts-expect-error bad typings
        placer.pins.push(mousePosition.copy());
      }
      return STOP_PROPAGATION;
    }
  }
}
