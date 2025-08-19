declare module "shapez/jsx-runtime" {
  /**
   * JSX factory.
   */
  function jsx<T extends keyof JSX.IntrinsicElements>(
    tag: T,
    props: JSX.IntrinsicElements[T],
  ): HTMLElement;
  function jsx<U extends JSX.Props>(tag: JSX.Component<U>, props: U): Element;
  /**
   * Groups elements without introducing a parent element.
   */
  const Fragment: (props: JSX.Props) => JSX.Element;
  export { Fragment, jsx, jsx as jsxs };
}
declare module "shapez/core/signal" {
  export const STOP_PROPAGATION: "stop_propagation";
  export type STOP_PROPAGATION = typeof STOP_PROPAGATION;
  export type SignalReceiver<T extends unknown[]> = (
    ...args: T
  ) => STOP_PROPAGATION | void;
  export class Signal<T extends unknown[] = []> {
    receivers: {
      receiver: SignalReceiver<T>;
      scope: object;
    }[];
    modifyCount: number;
    /**
     * Adds a new signal listener
     */
    add(receiver: SignalReceiver<T>, scope?: object): void;
    /**
     * Adds a new signal listener
     */
    addToTop(receiver: SignalReceiver<T>, scope?: object): void;
    /**
     * Dispatches the signal
     */
    dispatch(...payload: T): void | STOP_PROPAGATION;
    /**
     * Removes a receiver
     */
    remove(receiver: SignalReceiver<T>): void;
    /**
     * Removes all receivers
     */
    removeAll(): void;
  }
}
declare module "shapez/core/logging" {
  export class Logger {
    /**
     * A simple {@link console} wrapper that retains the location of log calls.
     * @param context Label to be displayed in each log message
     * @param color Optional label color override
     * @param debug Whether to log {@link Logger.debug} messages
     */
    constructor(context: string, color?: string, debug?: boolean);
    debug(...args: unknown[]): void;
    log(...args: unknown[]): void;
    warn(...args: unknown[]): void;
    error(...args: unknown[]): void;
  }
  /**
   * @deprecated Use the {@link Logger} constructor instead
   * @param handle Object to be used as the logger label
   * @returns A {@link Logger} instance
   */
  export function createLogger(handle: unknown): Logger;
  export function logSection(name: any, color: any): void;
}
declare module "shapez/core/animation_frame" {
  export class AnimationFrame {
    /** @type {Signal<[number]>} */
    frameEmitted: Signal<[number]>;
    /** @type {Signal<[number]>} */
    bgFrameEmitted: Signal<[number]>;
    lastTime: number;
    bgLastTime: number;
    boundMethod: (time: any) => void;
    backgroundWorker: Worker;
    handleBackgroundTick(): void;
    start(): void;
    handleAnimationFrame(time: any): void;
  }
  import { Signal } from "shapez/core/signal";
}
declare module "shapez/core/rng" {
  class Alea {
    private n;
    private c;
    private s0;
    private s1;
    private s2;
    constructor(seed: string);
    protected next(): number;
    private mash;
  }
  export class RandomNumberGenerator extends Alea {
    constructor(seed?: string | number);
    /**
     * Random choice of an array
     */
    choice<T>(array: T[]): T;
    /**
     * @returns Integer in range [min, max]
     */
    nextIntRange(min: number, max: number): number;
    /**
     * @returns Number in range [min, max]
     */
    nextRange(min: number, max: number): number;
  }
}
declare module "shapez/core/config.local" {
  const _default: {};
  export default _default;
}
declare module "shapez/core/config" {
  export const THIRDPARTY_URLS: {
    discord: string;
    github: string;
    reddit: string;
    shapeViewer: string;
    patreon: string;
    privacyPolicy: string;
    levelTutorialVideos: {
      21: string;
      25: string;
      26: string;
    };
  };
  export const globalConfig: {
    tileSize: number;
    halfTileSize: number;
    assetsDpi: number;
    assetsSharpness: number;
    shapesSharpness: number;
    statisticsGraphDpi: number;
    statisticsGraphSlices: number;
    analyticsSliceDurationSeconds: number;
    mapChunkSize: number;
    chunkAggregateSize: number;
    mapChunkOverviewMinZoom: number;
    mapChunkWorldSize: any;
    maxBeltShapeBundleSize: number;
    beltSpeedItemsPerSecond: number;
    minerSpeedItemsPerSecond: number;
    defaultItemDiameter: number;
    itemSpacingOnBelts: number;
    undergroundBeltMaxTilesByTier: number[];
    readerAnalyzeIntervalSeconds: number;
    goalAcceptorItemsRequired: number;
    goalAcceptorsPerProducer: number;
    puzzleModeSpeed: number;
    puzzleMinBoundsSize: number;
    puzzleMaxBoundsSize: number;
    puzzleValidationDurationSeconds: number;
    buildingSpeeds: {
      cutter: number;
      cutterQuad: number;
      rotator: number;
      rotatorCCW: number;
      rotator180: number;
      painter: number;
      painterDouble: number;
      painterQuad: number;
      mixer: number;
      stacker: number;
    };
    warmupTimeSecondsFast: number;
    warmupTimeSecondsRegular: number;
    smoothing: {
      smoothMainCanvas: boolean;
      quality: ImageSmoothingQuality;
    };
    debug: {};
  };
  export const IS_MOBILE: any;
  export const SUPPORT_TOUCH: any;
}
declare module "shapez/languages" {
  export interface Language {
    name: string;
    code: string;
    region: string;
    overrides?: object;
  }
  export const LANGUAGES: Record<string, Language>;
}
declare module "shapez/translations" {
  /**
   * Tries to auto-detect a language
   * @returns {string}
   */
  export function autoDetectLanguageId(): string;
  /**
   * Loads translation data for the specified language
   * @param {string} code
   * @param {string | ""} region
   */
  export function loadTranslationData(
    code: string,
    region: string | "",
  ): Promise<any>;
  export function matchDataRecursive(
    dest: any,
    src: any,
    addNewKeys?: boolean,
  ): void;
  export function updateApplicationLanguage(id: any): Promise<void>;
  export const T: {
    global: {
      loading: string;
      error: string;
      loggingIn: string;
      loadingResources: string;
      thousandsDivider: string;
      decimalSeparator: string;
      suffix: {
        thousands: string;
        millions: string;
        billions: string;
        trillions: string;
      };
      infinite: string;
      time: {
        oneSecondAgo: string;
        xSecondsAgo: string;
        oneMinuteAgo: string;
        xMinutesAgo: string;
        oneHourAgo: string;
        xHoursAgo: string;
        oneDayAgo: string;
        xDaysAgo: string;
        secondsShort: string;
        minutesAndSecondsShort: string;
        hoursAndMinutesShort: string;
        xMinutes: string;
      };
      keys: {
        tab: string;
        control: string;
        alt: string;
        escape: string;
        shift: string;
        space: string;
      };
    };
    mainMenu: {
      play: string;
      continue: string;
      newGame: string;
      importSavegame: string;
      helpTranslate: string;
      noActiveSavegames: string;
      savegameLevel: string;
      savegameLevelUnknown: string;
      savegameUnnamed: string;
      mods: {
        warningPuzzleDLC: string;
      };
    };
    puzzleMenu: {
      play: string;
      edit: string;
      title: string;
      createPuzzle: string;
      loadPuzzle: string;
      reviewPuzzle: string;
      validatingPuzzle: string;
      submittingPuzzle: string;
      noPuzzles: string;
      dlcHint: string;
      categories: {
        levels: string;
        new: string;
        "top-rated": string;
        mine: string;
        easy: string;
        medium: string;
        hard: string;
        completed: string;
        official: string;
        trending: string;
        "trending-weekly": string;
        categories: string;
        difficulties: string;
        account: string;
        search: string;
      };
      search: {
        action: string;
        placeholder: string;
        includeCompleted: string;
        difficulties: {
          any: string;
          easy: string;
          medium: string;
          hard: string;
        };
        durations: {
          any: string;
          short: string;
          medium: string;
          long: string;
        };
      };
      difficulties: {
        easy: string;
        medium: string;
        hard: string;
        unknown: string;
      };
      validation: {
        title: string;
        noProducers: string;
        noGoalAcceptors: string;
        goalAcceptorNoItem: string;
        goalAcceptorRateNotMet: string;
        buildingOutOfBounds: string;
        autoComplete: string;
      };
    };
    dialogs: {
      buttons: {
        ok: string;
        delete: string;
        cancel: string;
        later: string;
        restart: string;
        reset: string;
        deleteGame: string;
        viewUpdate: string;
        showUpgrades: string;
        showKeybindings: string;
        retry: string;
        continue: string;
        playOffline: string;
      };
      importSavegameError: {
        title: string;
        text: string;
      };
      importSavegameSuccess: {
        title: string;
        text: string;
      };
      gameLoadFailure: {
        title: string;
        text: string;
      };
      confirmSavegameDelete: {
        title: string;
        text: string;
      };
      savegameDeletionError: {
        title: string;
        text: string;
      };
      restartRequired: {
        title: string;
        text: string;
      };
      editKeybinding: {
        title: string;
        desc: string;
      };
      resetKeybindingsConfirmation: {
        title: string;
        desc: string;
      };
      keybindingsResetOk: {
        title: string;
        desc: string;
      };
      updateSummary: {
        title: string;
        desc: string;
      };
      upgradesIntroduction: {
        title: string;
        desc: string;
      };
      massDeleteConfirm: {
        title: string;
        desc: string;
      };
      massCutConfirm: {
        title: string;
        desc: string;
      };
      massCutInsufficientConfirm: {
        title: string;
        desc: string;
      };
      blueprintsNotUnlocked: {
        title: string;
        desc: string;
      };
      keybindingsIntroduction: {
        title: string;
        desc: string;
      };
      createMarker: {
        title: string;
        titleEdit: string;
        desc: string;
      };
      editSignal: {
        title: string;
        descItems: string;
        descShortKey: string;
      };
      editConstantProducer: {
        title: string;
      };
      exportScreenshotWarning: {
        title: string;
        desc: string;
      };
      renameSavegame: {
        title: string;
        desc: string;
      };
      tutorialVideoAvailable: {
        title: string;
        desc: string;
      };
      tutorialVideoAvailableForeignLanguage: {
        title: string;
        desc: string;
      };
      puzzleLoadFailed: {
        title: string;
        desc: string;
      };
      submitPuzzle: {
        title: string;
        descName: string;
        descIcon: string;
        placeholderName: string;
      };
      puzzleResizeBadBuildings: {
        title: string;
        desc: string;
      };
      puzzleLoadError: {
        title: string;
        desc: string;
      };
      offlineMode: {
        title: string;
        desc: string;
      };
      puzzleDownloadError: {
        title: string;
        desc: string;
      };
      puzzleSubmitError: {
        title: string;
        desc: string;
      };
      puzzleSubmitOk: {
        title: string;
        desc: string;
      };
      puzzleCreateOffline: {
        title: string;
        desc: string;
      };
      puzzlePlayRegularRecommendation: {
        title: string;
        desc: string;
      };
      puzzleShare: {
        title: string;
        desc: string;
      };
      puzzleReport: {
        title: string;
        options: {
          profane: string;
          unsolvable: string;
          trolling: string;
        };
      };
      puzzleReportComplete: {
        title: string;
        desc: string;
      };
      puzzleReportError: {
        title: string;
        desc: string;
      };
      puzzleLoadShortKey: {
        title: string;
        desc: string;
      };
      puzzleDelete: {
        title: string;
        desc: string;
      };
      modsDifference: {
        title: string;
        desc: string;
        missingMods: string;
        newMods: string;
      };
      resourceLoadFailed: {
        title: string;
        descSteamDemo: string;
      };
    };
    ingame: {
      keybindingsOverlay: {
        moveMap: string;
        selectBuildings: string;
        stopPlacement: string;
        rotateBuilding: string;
        placeMultiple: string;
        reverseOrientation: string;
        disableAutoOrientation: string;
        toggleHud: string;
        placeBuilding: string;
        createMarker: string;
        delete: string;
        pasteLastBlueprint: string;
        lockBeltDirection: string;
        plannerSwitchSide: string;
        cutSelection: string;
        copySelection: string;
        clearBelts: string;
        clearSelection: string;
        pipette: string;
        switchLayers: string;
      };
      colors: {
        red: string;
        green: string;
        blue: string;
        yellow: string;
        purple: string;
        cyan: string;
        white: string;
        black: string;
        uncolored: string;
      };
      buildingPlacement: {
        cycleBuildingVariants: string;
        hotkeyLabel: string;
        infoTexts: {
          speed: string;
          range: string;
          storage: string;
          oneItemPerSecond: string;
          itemsPerSecond: string;
          itemsPerSecondDouble: string;
          tiles: string;
        };
      };
      levelCompleteNotification: {
        levelTitle: string;
        completed: string;
        unlockText: string;
        buttonNextLevel: string;
      };
      notifications: {
        newUpgrade: string;
        gameSaved: string;
        freeplayLevelComplete: string;
      };
      shop: {
        title: string;
        buttonUnlock: string;
        tier: string;
        maximumLevel: string;
      };
      statistics: {
        title: string;
        dataSources: {
          stored: {
            title: string;
            description: string;
          };
          produced: {
            title: string;
            description: string;
          };
          delivered: {
            title: string;
            description: string;
          };
        };
        noShapesProduced: string;
        shapesDisplayUnits: {
          second: string;
          minute: string;
          hour: string;
        };
      };
      settingsMenu: {
        playtime: string;
        buildingsPlaced: string;
        beltsPlaced: string;
      };
      tutorialHints: {
        title: string;
        showHint: string;
        hideHint: string;
      };
      blueprintPlacer: {
        cost: string;
      };
      waypoints: {
        waypoints: string;
        hub: string;
        description: string;
        creationSuccessNotification: string;
      };
      shapeViewer: {
        title: string;
        empty: string;
        copyKey: string;
      };
      interactiveTutorial: {
        title: string;
        hints: {
          "1_1_extractor": string;
          "1_2_conveyor": string;
          "1_3_expand": string;
          "2_1_place_cutter": string;
          "2_2_place_trash": string;
          "2_3_more_cutters": string;
          "3_1_rectangles": string;
          "21_1_place_quad_painter": string;
          "21_2_switch_to_wires": string;
          "21_3_place_button": string;
          "21_4_press_button": string;
          "1_2_hold_and_drag": string;
        };
      };
      connectedMiners: {
        one_miner: string;
        n_miners: string;
        limited_items: string;
      };
      puzzleEditorSettings: {
        zoneTitle: string;
        zoneWidth: string;
        zoneHeight: string;
        trimZone: string;
        clearItems: string;
        clearBuildings: string;
        resetPuzzle: string;
        share: string;
        report: string;
      };
      puzzleEditorControls: {
        title: string;
        instructions: string[];
      };
      puzzleCompletion: {
        title: string;
        titleLike: string;
        titleRating: string;
        titleRatingDesc: string;
        continueBtn: string;
        menuBtn: string;
        nextPuzzle: string;
      };
      puzzleMetadata: {
        author: string;
        shortKey: string;
        rating: string;
        averageDuration: string;
        completionRate: string;
      };
    };
    shopUpgrades: {
      belt: {
        name: string;
        description: string;
      };
      miner: {
        name: string;
        description: string;
      };
      processors: {
        name: string;
        description: string;
      };
      painting: {
        name: string;
        description: string;
      };
    };
    buildings: {
      hub: {
        deliver: string;
        toUnlock: string;
        levelShortcut: string;
        endOfDemo: string;
      };
      belt: {
        default: {
          name: string;
          description: string;
        };
      };
      miner: {
        default: {
          name: string;
          description: string;
        };
        chainable: {
          name: string;
          description: string;
        };
      };
      underground_belt: {
        default: {
          name: string;
          description: string;
        };
        tier2: {
          name: string;
          description: string;
        };
      };
      balancer: {
        default: {
          name: string;
          description: string;
        };
        merger: {
          name: string;
          description: string;
        };
        "merger-inverse": {
          name: string;
          description: string;
        };
        splitter: {
          name: string;
          description: string;
        };
        "splitter-inverse": {
          name: string;
          description: string;
        };
      };
      cutter: {
        default: {
          name: string;
          description: string;
        };
        quad: {
          name: string;
          description: string;
        };
      };
      rotator: {
        default: {
          name: string;
          description: string;
        };
        ccw: {
          name: string;
          description: string;
        };
        rotate180: {
          name: string;
          description: string;
        };
      };
      stacker: {
        default: {
          name: string;
          description: string;
        };
      };
      mixer: {
        default: {
          name: string;
          description: string;
        };
      };
      painter: {
        default: {
          name: string;
          description: string;
        };
        mirrored: {
          name: string;
          description: string;
        };
        double: {
          name: string;
          description: string;
        };
        quad: {
          name: string;
          description: string;
        };
      };
      trash: {
        default: {
          name: string;
          description: string;
        };
      };
      storage: {
        default: {
          name: string;
          description: string;
        };
      };
      wire: {
        default: {
          name: string;
          description: string;
        };
        second: {
          name: string;
          description: string;
        };
      };
      wire_tunnel: {
        default: {
          name: string;
          description: string;
        };
      };
      constant_signal: {
        default: {
          name: string;
          description: string;
        };
      };
      lever: {
        default: {
          name: string;
          description: string;
        };
      };
      logic_gate: {
        default: {
          name: string;
          description: string;
        };
        not: {
          name: string;
          description: string;
        };
        xor: {
          name: string;
          description: string;
        };
        or: {
          name: string;
          description: string;
        };
      };
      transistor: {
        default: {
          name: string;
          description: string;
        };
        mirrored: {
          name: string;
          description: string;
        };
      };
      filter: {
        default: {
          name: string;
          description: string;
        };
      };
      display: {
        default: {
          name: string;
          description: string;
        };
      };
      reader: {
        default: {
          name: string;
          description: string;
        };
      };
      analyzer: {
        default: {
          name: string;
          description: string;
        };
      };
      comparator: {
        default: {
          name: string;
          description: string;
        };
      };
      virtual_processor: {
        default: {
          name: string;
          description: string;
        };
        rotator: {
          name: string;
          description: string;
        };
        unstacker: {
          name: string;
          description: string;
        };
        stacker: {
          name: string;
          description: string;
        };
        painter: {
          name: string;
          description: string;
        };
      };
      item_producer: {
        default: {
          name: string;
          description: string;
        };
      };
      constant_producer: {
        default: {
          name: string;
          description: string;
        };
      };
      goal_acceptor: {
        default: {
          name: string;
          description: string;
        };
      };
      block: {
        default: {
          name: string;
          description: string;
        };
      };
    };
    storyRewards: {
      reward_cutter_and_trash: {
        title: string;
        desc: string;
      };
      reward_rotator: {
        title: string;
        desc: string;
      };
      reward_painter: {
        title: string;
        desc: string;
      };
      reward_mixer: {
        title: string;
        desc: string;
      };
      reward_stacker: {
        title: string;
        desc: string;
      };
      reward_balancer: {
        title: string;
        desc: string;
      };
      reward_tunnel: {
        title: string;
        desc: string;
      };
      reward_rotator_ccw: {
        title: string;
        desc: string;
      };
      reward_miner_chainable: {
        title: string;
        desc: string;
      };
      reward_underground_belt_tier_2: {
        title: string;
        desc: string;
      };
      reward_merger: {
        title: string;
        desc: string;
      };
      reward_splitter: {
        title: string;
        desc: string;
      };
      reward_belt_reader: {
        title: string;
        desc: string;
      };
      reward_cutter_quad: {
        title: string;
        desc: string;
      };
      reward_painter_double: {
        title: string;
        desc: string;
      };
      reward_storage: {
        title: string;
        desc: string;
      };
      reward_blueprints: {
        title: string;
        desc: string;
      };
      reward_rotator_180: {
        title: string;
        desc: string;
      };
      reward_wires_painter_and_levers: {
        title: string;
        desc: string;
      };
      reward_filter: {
        title: string;
        desc: string;
      };
      reward_display: {
        title: string;
        desc: string;
      };
      reward_constant_signal: {
        title: string;
        desc: string;
      };
      reward_logic_gates: {
        title: string;
        desc: string;
      };
      reward_virtual_processing: {
        title: string;
        desc: string;
      };
      no_reward: {
        title: string;
        desc: string;
      };
      no_reward_freeplay: {
        title: string;
        desc: string;
      };
      reward_freeplay: {
        title: string;
        desc: string;
      };
      reward_demo_end: {
        title: string;
        desc: string;
      };
    };
    mods: {
      title: string;
      author: string;
      version: string;
      modWebsite: string;
      openFolder: string;
      browseMods: string;
      modsInfo: string;
    };
    settings: {
      title: string;
      categories: {
        general: string;
        userInterface: string;
        advanced: string;
        performance: string;
      };
      versionBadges: {
        dev: string;
        staging: string;
        prod: string;
      };
      buildDate: string;
      tickrateHz: string;
      rangeSliderPercentage: string;
      newBadge: string;
      labels: {
        uiScale: {
          title: string;
          description: string;
          scales: {
            super_small: string;
            small: string;
            regular: string;
            large: string;
            huge: string;
          };
        };
        autosaveInterval: {
          title: string;
          description: string;
          intervals: {
            one_minute: string;
            two_minutes: string;
            five_minutes: string;
            ten_minutes: string;
            twenty_minutes: string;
            disabled: string;
          };
        };
        scrollWheelSensitivity: {
          title: string;
          description: string;
          sensitivity: {
            super_slow: string;
            slow: string;
            regular: string;
            fast: string;
            super_fast: string;
          };
        };
        movementSpeed: {
          title: string;
          description: string;
          speeds: {
            super_slow: string;
            slow: string;
            regular: string;
            fast: string;
            super_fast: string;
            extremely_fast: string;
          };
        };
        language: {
          title: string;
          description: string;
        };
        enableColorBlindHelper: {
          title: string;
          description: string;
        };
        fullscreen: {
          title: string;
          description: string;
        };
        soundsMuted: {
          title: string;
          description: string;
        };
        musicMuted: {
          title: string;
          description: string;
        };
        soundVolume: {
          title: string;
          description: string;
        };
        musicVolume: {
          title: string;
          description: string;
        };
        theme: {
          title: string;
          description: string;
          themes: {
            dark: string;
            light: string;
          };
        };
        refreshRate: {
          title: string;
          description: string;
        };
        alwaysMultiplace: {
          title: string;
          description: string;
        };
        offerHints: {
          title: string;
          description: string;
        };
        enableTunnelSmartplace: {
          title: string;
          description: string;
        };
        vignette: {
          title: string;
          description: string;
        };
        rotationByBuilding: {
          title: string;
          description: string;
        };
        compactBuildingInfo: {
          title: string;
          description: string;
        };
        disableCutDeleteWarnings: {
          title: string;
          description: string;
        };
        lowQualityMapResources: {
          title: string;
          description: string;
        };
        disableTileGrid: {
          title: string;
          description: string;
        };
        clearCursorOnDeleteWhilePlacing: {
          title: string;
          description: string;
        };
        lowQualityTextures: {
          title: string;
          description: string;
        };
        displayChunkBorders: {
          title: string;
          description: string;
        };
        pickMinerOnPatch: {
          title: string;
          description: string;
        };
        simplifiedBelts: {
          title: string;
          description: string;
        };
        enableMousePan: {
          title: string;
          description: string;
        };
        zoomToCursor: {
          title: string;
          description: string;
        };
        mapResourcesScale: {
          title: string;
          description: string;
        };
        shapeTooltipAlwaysOn: {
          title: string;
          description: string;
        };
      };
    };
    keybindings: {
      title: string;
      hint: string;
      resetKeybindings: string;
      categoryLabels: {
        general: string;
        ingame: string;
        navigation: string;
        placement: string;
        massSelect: string;
        buildings: string;
        placementModifiers: string;
        mods: string;
      };
      mappings: {
        confirm: string;
        back: string;
        mapMoveUp: string;
        mapMoveRight: string;
        mapMoveDown: string;
        mapMoveLeft: string;
        mapMoveFaster: string;
        centerMap: string;
        mapZoomIn: string;
        mapZoomOut: string;
        createMarker: string;
        menuOpenShop: string;
        menuOpenStats: string;
        menuClose: string;
        toggleHud: string;
        toggleFPSInfo: string;
        switchLayers: string;
        exportScreenshot: string;
        belt: string;
        balancer: string;
        underground_belt: string;
        miner: string;
        cutter: string;
        rotator: string;
        stacker: string;
        mixer: string;
        painter: string;
        trash: string;
        storage: string;
        wire: string;
        constant_signal: string;
        logic_gate: string;
        lever: string;
        filter: string;
        wire_tunnel: string;
        display: string;
        reader: string;
        virtual_processor: string;
        transistor: string;
        analyzer: string;
        comparator: string;
        item_producer: string;
        constant_producer: string;
        goal_acceptor: string;
        block: string;
        pipette: string;
        rotateWhilePlacing: string;
        rotateInverseModifier: string;
        rotateToUp: string;
        rotateToDown: string;
        rotateToRight: string;
        rotateToLeft: string;
        cycleBuildingVariants: string;
        confirmMassDelete: string;
        pasteLastBlueprint: string;
        cycleBuildings: string;
        lockBeltDirection: string;
        switchDirectionLockSide: string;
        copyWireValue: string;
        massSelectStart: string;
        massSelectSelectMultiple: string;
        massSelectCopy: string;
        massSelectCut: string;
        massSelectClear: string;
        placementDisableAutoOrientation: string;
        placeMultiple: string;
        placeInverse: string;
        showShapeTooltip: string;
      };
    };
    about: {
      title: string;
      body: string;
    };
    changelog: {
      title: string;
    };
    demo: {
      settingNotAvailable: string;
    };
    backendErrors: {
      ratelimit: string;
      "invalid-api-key": string;
      unauthorized: string;
      "bad-token": string;
      "bad-id": string;
      "not-found": string;
      "bad-category": string;
      "bad-short-key": string;
      "profane-title": string;
      "bad-title-too-many-spaces": string;
      "bad-shape-key-in-emitter": string;
      "bad-shape-key-in-goal": string;
      "no-emitters": string;
      "no-goals": string;
      "short-key-already-taken": string;
      "can-not-report-your-own-puzzle": string;
      "bad-payload": string;
      "bad-building-placement": string;
      timeout: string;
      "too-many-likes-already": string;
      "no-permission": string;
    };
    tips: string[];
    errorHandler: {
      title: string;
      labels: {
        buildInformation: string;
        loadedMods: string;
      };
      actions: {
        copy: string;
        copyDone: string;
        restart: string;
      };
    };
  };
}
declare module "shapez/core/utils" {
  /**
   * Returns a platform name
   * @returns {"standalone"}
   */
  export function getPlatformName(): "standalone";
  /**
   * Makes a new 2D array with undefined contents
   * @param {number} w
   * @param {number} h
   * @returns {Array<Array<any>>}
   */
  export function make2DUndefinedArray(w: number, h: number): Array<Array<any>>;
  /**
   * Creates a new map (an empty object without any props)
   */
  export function newEmptyMap(): any;
  /**
   * Returns a random integer in the range [start,end]
   * @param {number} start
   * @param {number} end
   */
  export function randomInt(start: number, end: number): number;
  /**
   * Chooses a random entry of an array
   * @template T
   * @param {T[]} arr
   * @returns {T}
   */
  export function randomChoice<T>(arr: T[]): T;
  /**
   * Deletes from an array by swapping with the last element
   * @param {Array<any>} array
   * @param {number} index
   */
  export function fastArrayDelete(array: Array<any>, index: number): void;
  /**
   * Deletes from an array by swapping with the last element. Searches
   * for the value in the array first
   * @param {Array<any>} array
   * @param {any} value
   */
  export function fastArrayDeleteValue(array: Array<any>, value: any): any;
  /**
   * @see fastArrayDeleteValue
   * @param {Array<any>} array
   * @param {any} value
   */
  export function fastArrayDeleteValueIfContained(
    array: Array<any>,
    value: any,
  ): any;
  /**
   * Deletes from an array at the given index
   * @param {Array<any>} array
   * @param {number} index
   */
  export function arrayDelete(array: Array<any>, index: number): void;
  /**
   * Deletes the given value from an array
   * @param {Array<any>} array
   * @param {any} value
   */
  export function arrayDeleteValue(array: Array<any>, value: any): any;
  /**
   * Compare two floats for epsilon equality
   * @param {number} a
   * @param {number} b
   * @returns {boolean}
   */
  export function epsilonCompare(
    a: number,
    b: number,
    epsilon?: number,
  ): boolean;
  /**
   * Interpolates two numbers
   * @param {number} a
   * @param {number} b
   * @param {number} x Mix factor, 0 means 100% a, 1 means 100%b, rest is interpolated
   */
  export function lerp(a: number, b: number, x: number): number;
  /**
   * Finds a value which is nice to display, e.g. 15669 -> 15000. Also handles fractional stuff
   * @param {number} num
   */
  export function findNiceValue(num: number): number;
  /**
   * Finds a nice integer value
   * @see findNiceValue
   * @param {number} num
   */
  export function findNiceIntegerValue(num: number): number;
  /**
   * Formats a big number
   * @param {number} num
   * @param {string=} separator The decimal separator for numbers like 50.1 (separator='.')
   * @returns {string}
   */
  export function formatBigNumber(
    num: number,
    separator?: string | undefined,
  ): string;
  /**
   * Formats a big number, but does not add any suffix and instead uses its full representation
   * @param {number} num
   * @param {string=} divider The divider for numbers like 50,000 (divider=',')
   * @returns {string}
   */
  export function formatBigNumberFull(
    num: number,
    divider?: string | undefined,
  ): string;
  /**
   * Waits two frames so the ui is updated
   * @returns {Promise<void>}
   */
  export function waitNextFrame(): Promise<void>;
  /**
   * Rounds 1 digit
   * @param {number} n
   * @returns {number}
   */
  export function round1Digit(n: number): number;
  /**
   * Rounds 2 digits
   * @param {number} n
   * @returns {number}
   */
  export function round2Digits(n: number): number;
  /**
   * Rounds 3 digits
   * @param {number} n
   * @returns {number}
   */
  export function round3Digits(n: number): number;
  /**
   * Rounds 4 digits
   * @param {number} n
   * @returns {number}
   */
  export function round4Digits(n: number): number;
  /**
   * Clamps a value between [min, max]
   * @param {number} v
   * @param {number=} minimum Default 0
   * @param {number=} maximum Default 1
   */
  export function clamp(
    v: number,
    minimum?: number | undefined,
    maximum?: number | undefined,
  ): number;
  /**
   * Helper method to create a new div element
   * @param {string=} id
   * @param {Array<string>=} classes
   * @param {string=} innerHTML
   */
  export function makeDivElement(
    id?: string | undefined,
    classes?: Array<string> | undefined,
    innerHTML?: string | undefined,
  ): HTMLDivElement;
  /**
   * Helper method to create a new div
   * @param {Element} parent
   * @param {string=} id
   * @param {Array<string>=} classes
   * @param {string=} innerHTML
   */
  export function makeDiv(
    parent: Element,
    id?: string | undefined,
    classes?: Array<string> | undefined,
    innerHTML?: string | undefined,
  ): HTMLDivElement;
  /**
   * Helper method to create a new button element
   * @param {Array<string>=} classes
   * @param {string=} innerHTML
   */
  export function makeButtonElement(
    classes?: Array<string> | undefined,
    innerHTML?: string | undefined,
  ): HTMLButtonElement;
  /**
   * Helper method to create a new button
   * @param {Element} parent
   * @param {Array<string>=} classes
   * @param {string=} innerHTML
   */
  export function makeButton(
    parent: Element,
    classes?: Array<string> | undefined,
    innerHTML?: string | undefined,
  ): HTMLButtonElement;
  /**
   * Removes all children of the given element
   * @param {Element} elem
   */
  export function removeAllChildren(elem: Element): void;
  /**
   * Formats an amount of seconds into something like "5s ago"
   * @param {number} secs Seconds
   * @returns {string}
   */
  export function formatSecondsToTimeAgo(secs: number): string;
  /**
   * Formats seconds into a readable string like "5h 23m"
   * @param {number} secs Seconds
   * @returns {string}
   */
  export function formatSeconds(secs: number): string;
  /**
   * Formats a number like 2.51 to "2.5"
   * @param {number} speed
   * @param {string=} separator The decimal separator for numbers like 50.1 (separator='.')
   */
  export function round1DigitLocalized(
    speed: number,
    separator?: string | undefined,
  ): string;
  /**
   * Formats a number like 2.51 to "2.51 items / s"
   * @param {number} speed
   * @param {boolean=} double
   * @param {string=} separator The decimal separator for numbers like 50.1 (separator='.')
   */
  export function formatItemsPerSecond(
    speed: number,
    double?: boolean | undefined,
    separator?: string | undefined,
  ): string;
  /**
   * Rotates a flat 3x3 matrix clockwise
   * Entries:
   * 0 lo
   * 1 mo
   * 2 ro
   * 3 lm
   * 4 mm
   * 5 rm
   * 6 lu
   * 7 mu
   * 8 ru
   * @param {Array<number>} flatMatrix
   */
  export function rotateFlatMatrix3x3(flatMatrix: Array<number>): number[];
  /**
   * Generates rotated variants of the matrix
   * @param {Array<number>} originalMatrix
   * @returns {Object<number, Array<number>>}
   */
  export function generateMatrixRotations(originalMatrix: Array<number>): {
    [x: number]: number[];
  };
  /**
   *
   * @typedef {{
   *   top: any,
   *   right: any,
   *   bottom: any,
   *   left: any
   * }} DirectionalObject
   */
  /**
   * Rotates a directional object
   * @param {DirectionalObject} obj
   * @returns {DirectionalObject}
   */
  export function rotateDirectionalObject(
    obj: DirectionalObject,
    rotation: any,
  ): DirectionalObject;
  /**
   * Modulo which works for negative numbers
   * @param {number} n
   * @param {number} m
   */
  export function safeModulo(n: number, m: number): number;
  /**
   * Returns a smooth pulse between 0 and 1
   * @param {number} time time in seconds
   * @returns {number}
   */
  export function smoothPulse(time: number): number;
  /**
   * Fills in a <link> tag
   * @param {string} translation
   * @param {string} link
   */
  export function fillInLinkIntoTranslation(
    translation: string,
    link: string,
  ): string;
  /**
   *
   * @param {number} number
   * @returns {string}
   */
  export function getRomanNumber(number: number): string;
  /**
   * Rejects a promise after X ms
   * @param {Promise} promise
   */
  export function timeoutPromise(
    promise: Promise<any>,
    timeout?: number,
  ): Promise<any>;
  export type DirectionalObject = {
    top: any;
    right: any;
    bottom: any;
    left: any;
  };
}
declare module "shapez/core/buffer_utils" {
  /**
   *
   * @param {HTMLCanvasElement} canvas
   */
  export function getBufferVramUsageBytes(canvas: HTMLCanvasElement): number;
  /**
   * Returns stats on the allocated buffers
   */
  export function getBufferStats(): {
    backlogKeys: number;
    backlogSize: number;
    vramUsage: number;
    backlogVramUsage: number;
    bufferCount: number;
    numReused: number;
    numCreated: number;
  };
  /**
   * Clears the backlog buffers if they grew too much
   */
  export function clearBufferBacklog(): void;
  /**
   * Creates a new offscreen buffer
   * @param {Number} w
   * @param {Number} h
   * @returns {[HTMLCanvasElement, CanvasRenderingContext2D]}
   */
  export function makeOffscreenBuffer(
    w: number,
    h: number,
    {
      smooth,
      reusable,
      label,
    }: {
      smooth?: boolean;
      reusable?: boolean;
      label?: string;
    },
  ): [HTMLCanvasElement, CanvasRenderingContext2D];
  /**
   * Frees a canvas
   * @param {HTMLCanvasElement} canvas
   */
  export function registerCanvas(canvas: HTMLCanvasElement, context: any): void;
  /**
   * Frees a canvas
   * @param {HTMLCanvasElement} canvas
   */
  export function freeCanvas(canvas: HTMLCanvasElement): void;
  export type CanvasCacheEntry = {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
  };
}
declare module "shapez/core/buffer_maintainer" {
  export class BufferMaintainer {
    /**
     * @param {GameRoot} root
     */
    constructor(root: GameRoot);
    root: GameRoot;
    /** @type {Map<string, Map<string, CacheEntry>>} */
    cache: Map<string, Map<string, CacheEntry>>;
    iterationIndex: number;
    lastIteration: number;
    /**
     * Returns the buffer stats
     */
    getStats(): {
      rootKeys: number;
      subKeys: number;
      vramBytes: number;
    };
    /**
     * Goes to the next buffer iteration, clearing all buffers which were not used
     * for a few iterations
     */
    garbargeCollect(): void;
    update(): void;
    /**
     * @param {object} param0
     * @param {string} param0.key
     * @param {string} param0.subKey
     * @param {number} param0.w
     * @param {number} param0.h
     * @param {number} param0.dpi
     * @param {function(HTMLCanvasElement, CanvasRenderingContext2D, number, number, number, object?) : void} param0.redrawMethod
     * @param {object=} param0.additionalParams
     * @returns {HTMLCanvasElement}
     *
     */
    getForKey({
      key,
      subKey,
      w,
      h,
      dpi,
      redrawMethod,
      additionalParams,
    }: {
      key: string;
      subKey: string;
      w: number;
      h: number;
      dpi: number;
      redrawMethod: (
        arg0: HTMLCanvasElement,
        arg1: CanvasRenderingContext2D,
        arg2: number,
        arg3: number,
        arg4: number,
        arg5: object | null,
      ) => void;
      additionalParams?: object | undefined;
    }): HTMLCanvasElement;
    /**
     * @param {object} param0
     * @param {string} param0.key
     * @param {string} param0.subKey
     * @returns {HTMLCanvasElement?}
     *
     */
    getForKeyOrNullNoUpdate({
      key,
      subKey,
    }: {
      key: string;
      subKey: string;
    }): HTMLCanvasElement | null;
  }
  export type CacheEntry = {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    lastUse: number;
  };
  import { GameRoot } from "shapez/game/root";
}
declare module "shapez/core/vector" {
  /**
   * Interpolates two vectors, for a = 0, returns v1 and for a = 1 return v2, otherwise interpolate
   * @param {Vector} v1
   * @param {Vector} v2
   * @param {number} a
   */
  export function mixVector(v1: Vector, v2: Vector, a: number): Vector;
  export type enumDirection = string;
  export namespace enumDirection {
    let top: string;
    let right: string;
    let bottom: string;
    let left: string;
  }
  export type enumInvertedDirections = string;
  /**
   * @enum {string}
   */
  export const enumInvertedDirections: {
    [enumDirection.top]: string;
    [enumDirection.right]: string;
    [enumDirection.bottom]: string;
    [enumDirection.left]: string;
  };
  export type enumDirectionToAngle = number;
  /**
   * @enum {number}
   */
  export const enumDirectionToAngle: {
    [enumDirection.top]: number;
    [enumDirection.right]: number;
    [enumDirection.bottom]: number;
    [enumDirection.left]: number;
  };
  export type enumAngleToDirection = enumDirection;
  /**
   * @enum {enumDirection}
   */
  export const enumAngleToDirection: {
    0: string;
    90: string;
    180: string;
    270: string;
  };
  /** @type {Array<enumDirection>} */
  export const arrayAllDirections: Array<enumDirection>;
  export class Vector {
    /**
     * Helper method to rotate a direction
     * @param {enumDirection} direction
     * @param {number} angle
     * @returns {enumDirection}
     */
    static transformDirectionFromMultipleOf90(
      direction: enumDirection,
      angle: number,
    ): enumDirection;
    /**
     *
     * @param {number} i
     * @returns {Vector}
     */
    static deserializeTileFromInt(i: number): Vector;
    /**
     * Deserializes a vector from a string
     * @param {string} s
     * @returns {Vector}
     */
    static deserializeTile(s: string): Vector;
    /**
     * Deserializes a vector from a serialized json object
     * @param {object} obj
     * @returns {Vector}
     */
    static fromSerializedObject(obj: object): Vector;
    /**
     *
     * @param {number=} x
     * @param {number=} y
     */
    constructor(x?: number | undefined, y?: number | undefined);
    x: number;
    y: number;
    /**
     * return a copy of the vector
     * @returns {Vector}
     */
    copy(): Vector;
    /**
     * Adds a vector and return a new vector
     * @param {Vector} other
     * @returns {Vector}
     */
    add(other: Vector): Vector;
    /**
     * Adds a vector
     * @param {Vector} other
     * @returns {Vector}
     */
    addInplace(other: Vector): Vector;
    /**
     * Substracts a vector and return a new vector
     * @param {Vector} other
     * @returns {Vector}
     */
    sub(other: Vector): Vector;
    /**
     * Subs a vector
     * @param {Vector} other
     * @returns {Vector}
     */
    subInplace(other: Vector): Vector;
    /**
     * Multiplies with a vector and return a new vector
     * @param {Vector} other
     * @returns {Vector}
     */
    mul(other: Vector): Vector;
    /**
     * Adds two scalars and return a new vector
     * @param {number} x
     * @param {number} y
     * @returns {Vector}
     */
    addScalars(x: number, y: number): Vector;
    /**
     * Substracts a scalar and return a new vector
     * @param {number} f
     * @returns {Vector}
     */
    subScalar(f: number): Vector;
    /**
     * Substracts two scalars and return a new vector
     * @param {number} x
     * @param {number} y
     * @returns {Vector}
     */
    subScalars(x: number, y: number): Vector;
    /**
     * Returns the euclidian length
     * @returns {number}
     */
    length(): number;
    /**
     * Returns the square length
     * @returns {number}
     */
    lengthSquare(): number;
    /**
     * Divides both components by a scalar and return a new vector
     * @param {number} f
     * @returns {Vector}
     */
    divideScalar(f: number): Vector;
    /**
     * Divides both components by the given scalars and return a new vector
     * @param {number} a
     * @param {number} b
     * @returns {Vector}
     */
    divideScalars(a: number, b: number): Vector;
    /**
     * Divides both components by a scalar
     * @param {number} f
     * @returns {Vector}
     */
    divideScalarInplace(f: number): Vector;
    /**
     * Multiplies both components with a scalar and return a new vector
     * @param {number} f
     * @returns {Vector}
     */
    multiplyScalar(f: number): Vector;
    /**
     * Multiplies both components with two scalars and returns a new vector
     * @param {number} a
     * @param {number} b
     * @returns {Vector}
     */
    multiplyScalars(a: number, b: number): Vector;
    /**
     * For both components, compute the maximum of each component and the given scalar, and return a new vector.
     * For example:
     *   - new Vector(-1, 5).maxScalar(0) -> Vector(0, 5)
     * @param {number} f
     * @returns {Vector}
     */
    maxScalar(f: number): Vector;
    /**
     * Adds a scalar to both components and return a new vector
     * @param {number} f
     * @returns {Vector}
     */
    addScalar(f: number): Vector;
    /**
     * Computes the component wise minimum and return a new vector
     * @param {Vector} v
     * @returns {Vector}
     */
    min(v: Vector): Vector;
    /**
     * Computes the component wise maximum and return a new vector
     * @param {Vector} v
     * @returns {Vector}
     */
    max(v: Vector): Vector;
    /**
     * Computes the component wise absolute
     * @returns {Vector}
     */
    abs(): Vector;
    /**
     * Computes the scalar product
     * @param {Vector} v
     * @returns {number}
     */
    dot(v: Vector): number;
    /**
     * Computes the distance to a given vector
     * @param {Vector} v
     * @returns {number}
     */
    distance(v: Vector): number;
    /**
     * Computes the square distance to a given vectort
     * @param {Vector} v
     * @returns {number}
     */
    distanceSquare(v: Vector): number;
    /**
     * Returns x % f, y % f
     * @param {number} f
     * @returns {Vector} new vector
     */
    modScalar(f: number): Vector;
    /**
     * Computes and returns the center between both points
     * @param {Vector} v
     * @returns {Vector}
     */
    centerPoint(v: Vector): Vector;
    /**
     * Computes componentwise floor and returns a new vector
     * @returns {Vector}
     */
    floor(): Vector;
    /**
     * Computes componentwise ceil and returns a new vector
     * @returns {Vector}
     */
    ceil(): Vector;
    /**
     * Computes componentwise round and return a new vector
     * @returns {Vector}
     */
    round(): Vector;
    /**
     * Converts this vector from world to tile space and return a new vector
     * @returns {Vector}
     */
    toTileSpace(): Vector;
    /**
     * Converts this vector from world to street space and return a new vector
     * @returns {Vector}
     */
    toStreetSpace(): Vector;
    /**
     * Converts this vector to world space and return a new vector
     * @returns {Vector}
     */
    toWorldSpace(): Vector;
    /**
     * Converts this vector to world space and return a new vector
     * @returns {Vector}
     */
    toWorldSpaceCenterOfTile(): Vector;
    /**
     * Converts the top left tile position of this vector
     * @returns {Vector}
     */
    snapWorldToTile(): Vector;
    /**
     * Normalizes the vector, dividing by the length(), and return a new vector
     * @returns {Vector}
     */
    normalize(): Vector;
    /**
     * Normalizes the vector, dividing by the length(), and return a new vector
     * @returns {Vector}
     */
    normalizeIfGreaterOne(): Vector;
    /**
     * Returns the normalized vector to the other point
     * @param {Vector} v
     * @returns {Vector}
     */
    normalizedDirection(v: Vector): Vector;
    /**
     * Returns a perpendicular vector
     * @returns {Vector}
     */
    findPerpendicular(): Vector;
    /**
     * Returns the unnormalized direction to the other point
     * @param {Vector} v
     * @returns {Vector}
     */
    direction(v: Vector): Vector;
    /**
     * Returns a string representation of the vector
     * @returns {string}
     */
    toString(): string;
    /**
     * Compares both vectors for exact equality. Does not do an epsilon compare
     * @param {Vector} v
     * @returns {Boolean}
     */
    equals(v: Vector): boolean;
    /**
     * Rotates this vector
     * @param {number} angle
     * @returns {Vector} new vector
     */
    rotated(angle: number): Vector;
    /**
     * Rotates this vector
     * @param {number} angle
     * @returns {Vector} this vector
     */
    rotateInplaceFastMultipleOf90(angle: number): Vector;
    /**
     * Rotates this vector
     * @param {number} angle
     * @returns {Vector} new vector
     */
    rotateFastMultipleOf90(angle: number): Vector;
    /**
     * Compares both vectors for epsilon equality
     * @param {Vector} v
     * @returns {Boolean}
     */
    equalsEpsilon(v: Vector, epsilon?: number): boolean;
    /**
     * Returns the angle
     * @returns {number} 0 .. 2 PI
     */
    angle(): number;
    /**
     * Serializes the vector to a string
     * @returns {string}
     */
    serializeTile(): string;
    /**
     * Creates a simple representation of the vector
     */
    serializeSimple(): {
      x: number;
      y: number;
    };
    /**
     * @returns {number}
     */
    serializeTileToInt(): number;
  }
  /**
   * Mapping from string direction to actual vector
   */
  export type enumDirectionToVector = Vector;
  export namespace enumDirectionToVector {
    let top_1: Vector;
    export { top_1 as top };
    let right_1: Vector;
    export { right_1 as right };
    let bottom_1: Vector;
    export { bottom_1 as bottom };
    let left_1: Vector;
    export { left_1 as left };
  }
}
declare module "shapez/core/explained_result" {
  export class ExplainedResult {
    static good(): ExplainedResult;
    static bad(reason: any, additionalProps: any): ExplainedResult;
    static requireAll(...args: any[]): any;
    constructor(result?: boolean, reason?: any, additionalProps?: {});
    /** @type {boolean} */
    result: boolean;
    /** @type {string} */
    reason: string;
    isGood(): boolean;
    isBad(): boolean;
  }
}
declare module "shapez/core/compression" {
  export interface Compression {
    compress(data: unknown): Promise<Uint8Array>;
    decompress(data: Uint8Array): Promise<unknown>;
  }
  export class DefaultCompression implements Compression {
    compress(data: unknown): Promise<Uint8Array>;
    decompress(data: Uint8Array): Promise<unknown>;
    private scheduleWorkerTermination;
  }
}
declare module "shapez/platform/fs_error" {
  /**
   * Represents a filesystem error as reported by the main process.
   */
  export class FsError extends Error {
    code?: string;
    constructor(message?: string, options?: ErrorOptions);
    isFileNotFound(): boolean;
  }
}
declare module "shapez/platform/storage" {
  import { Application } from "shapez/application";
  import { Compression } from "shapez/core/compression";
  export const STORAGE_SAVES = "saves";
  export const STORAGE_MOD_PREFIX = "mod/";
  export class Storage {
    readonly app: Application;
    readonly id: string;
    readonly compression: Compression;
    constructor(app: Application, id: string, compression?: Compression);
    /**
     * Initializes the storage
     */
    initialize(): Promise<void>;
    /**
     * Reads a string asynchronously
     */
    readFileAsync(filename: string): Promise<unknown>;
    /**
     * Writes a string to a file asynchronously
     */
    writeFileAsync(filename: string, contents: unknown): Promise<void>;
    /**
     * Tries to delete a file
     */
    deleteFileAsync(filename: string): Promise<void>;
    /**
     * Displays the "Open File" dialog to let user pick a file. Returns the
     * decompressed file contents, or undefined if the operation was canceled
     */
    requestOpenFile(extension: string): Promise<unknown>;
    /**
     * Displays the "Save File" dialog to let user pick a file. If the user
     * picks a file, the passed contents will be compressed and written to
     * that file.
     */
    requestSaveFile(filename: string, contents: unknown): Promise<unknown>;
    private invokeFsJob;
    private wrapError;
  }
}
declare module "shapez/core/read_write_proxy" {
  export class ReadWriteProxy {
    /**
     *
     * @param {object} obj
     */
    static serializeObject(obj: object): any;
    /**
     *
     * @param {object} text
     */
    static deserializeObject(text: object): any;
    constructor(storage: any, filename: any);
    /** @type {Storage} */
    storage: Storage;
    filename: any;
    /** @type {object} */
    currentData: object;
    /**
     * Store a debounced handler to prevent double writes
     */
    debouncedWrite: any;
    /** @returns {ExplainedResult} */
    verify(data: any): ExplainedResult;
    getDefaultData(): {};
    getCurrentVersion(): number;
    /** @returns {ExplainedResult} */
    migrate(data: any): ExplainedResult;
    resetEverythingAsync(): Promise<void>;
    /**
     * Writes the data asychronously, fails if verify() fails.
     * Debounces the operation by up to 50ms
     * @returns {Promise<void>}
     */
    writeAsync(): Promise<void>;
    /**
     * Actually writes the data asychronously
     * @returns {Promise<void>}
     */
    doWriteAsync(): Promise<void>;
    readAsync(): Promise<unknown>;
    /**
     * Deletes the file
     * @returns {Promise<void>}
     */
    deleteAsync(): Promise<void>;
    /** @returns {ExplainedResult} */
    internalVerifyBasicStructure(data: any): ExplainedResult;
    /** @returns {ExplainedResult} */
    internalVerifyEntry(data: any): ExplainedResult;
  }
  import { Storage } from "shapez/platform/storage";
  import { ExplainedResult } from "shapez/core/explained_result";
}
declare module "shapez/core/globals" {
  /**
   * @param {Application} app
   */
  export function setGlobalApp(app: Application): void;
  /**
   * Used for the bug reporter, and the click detector which both have no handles to this.
   * It would be nicer to have no globals, but this is the only one. I promise!
   * @type {Application} */
  export let GLOBAL_APP: Application;
  export namespace BUILD_OPTIONS {
    let APP_ENVIRONMENT: string;
    let IS_DEV: boolean;
    let IS_RELEASE: boolean;
    let BUILD_TIME: number;
    let BUILD_COMMIT_HASH: string;
    let BUILD_VERSION: string;
    let ALL_UI_IMAGES: string[];
  }
  import { Application } from "shapez/application";
}
declare module "shapez/core/rectangle" {
  export class Rectangle {
    /**
     * Creates a rectangle from top right bottom and left offsets
     * @param {number} top
     * @param {number} right
     * @param {number} bottom
     * @param {number} left
     */
    static fromTRBL(
      top: number,
      right: number,
      bottom: number,
      left: number,
    ): Rectangle;
    /**
     * Constructs a new square rectangle
     * @param {number} x
     * @param {number} y
     * @param {number} size
     */
    static fromSquare(x: number, y: number, size: number): Rectangle;
    /**
     *
     * @param {Vector} p1
     * @param {Vector} p2
     */
    static fromTwoPoints(p1: Vector, p2: Vector): Rectangle;
    /**
     *
     * @param {number} width
     * @param {number} height
     */
    static centered(width: number, height: number): Rectangle;
    /**
     * Returns if a intersects b
     * @param {Rectangle} a
     * @param {Rectangle} b
     */
    static intersects(a: Rectangle, b: Rectangle): boolean;
    constructor(x?: number, y?: number, w?: number, h?: number);
    x: number;
    y: number;
    w: number;
    h: number;
    /**
     * Copies this instance
     * @returns {Rectangle}
     */
    clone(): Rectangle;
    /**
     * Returns if this rectangle is empty
     * @returns {boolean}
     */
    isEmpty(): boolean;
    /**
     * Returns if this rectangle is equal to the other while taking an epsilon into account
     * @param {Rectangle} other
     * @param {number} [epsilon]
     */
    equalsEpsilon(other: Rectangle, epsilon?: number): boolean;
    /**
     * @returns {number}
     */
    left(): number;
    /**
     * @returns {number}
     */
    right(): number;
    /**
     * @returns {number}
     */
    top(): number;
    /**
     * @returns {number}
     */
    bottom(): number;
    /**
     * Returns Top, Right, Bottom, Left
     * @returns {[number, number, number, number]}
     */
    trbl(): [number, number, number, number];
    /**
     * Returns the center of the rect
     * @returns {Vector}
     */
    getCenter(): Vector;
    /**
     * Sets the right side of the rect without moving it
     * @param {number} right
     */
    setRight(right: number): void;
    /**
     * Sets the bottom side of the rect without moving it
     * @param {number} bottom
     */
    setBottom(bottom: number): void;
    /**
     * Sets the top side of the rect without scaling it
     * @param {number} top
     */
    setTop(top: number): void;
    /**
     * Sets the left side of the rect without scaling it
     * @param {number} left
     */
    setLeft(left: number): void;
    /**
     * Returns the top left point
     * @returns {Vector}
     */
    topLeft(): Vector;
    /**
     * Returns the bottom left point
     * @returns {Vector}
     */
    bottomRight(): Vector;
    /**
     * Moves the rectangle by the given parameters
     * @param {number} x
     * @param {number} y
     */
    moveBy(x: number, y: number): void;
    /**
     * Moves the rectangle by the given vector
     * @param {Vector} vec
     */
    moveByVector(vec: Vector): void;
    /**
     * Scales every parameter (w, h, x, y) by the given factor. Useful to transform from world to
     * tile space and vice versa
     * @param {number} factor
     */
    allScaled(factor: number): Rectangle;
    /**
     * Expands the rectangle in all directions
     * @param {number} amount
     * @returns {Rectangle} new rectangle
     */
    expandedInAllDirections(amount: number): Rectangle;
    /**
     * Returns if the given rectangle is contained
     * @param {Rectangle} rect
     * @returns {boolean}
     */
    containsRect(rect: Rectangle): boolean;
    /**
     * Returns if this rectangle contains the other rectangle specified by the parameters
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     * @returns {boolean}
     */
    containsRect4Params(x: number, y: number, w: number, h: number): boolean;
    /**
     * Returns if the rectangle contains the given circle at (x, y) with the radius (radius)
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @returns {boolean}
     */
    containsCircle(x: number, y: number, radius: number): boolean;
    /**
     * Returns if the rectangle contains the given point
     * @param {number} x
     * @param {number} y
     * @returns {boolean}
     */
    containsPoint(x: number, y: number): boolean;
    /**
     * Returns the shared area with another rectangle, or null if there is no intersection
     * @param {Rectangle} rect
     * @returns {Rectangle|null}
     */
    getIntersection(rect: Rectangle): Rectangle | null;
    /**
     * Returns whether the rectangle fully intersects the given rectangle
     * @param {Rectangle} rect
     */
    intersectsFully(rect: Rectangle): boolean;
    /**
     * Returns the union of this rectangle with another
     * @param {Rectangle} rect
     */
    getUnion(rect: Rectangle): Rectangle;
    /**
     * Good for caching stuff
     */
    toCompareableString(): string;
    /**
     * Good for printing stuff
     */
    toString(): string;
    /**
     * Returns a new rectangle in tile space which includes all tiles which are visible in this rect
     * @returns {Rectangle}
     */
    toTileCullRectangle(): Rectangle;
  }
  import { Vector } from "shapez/core/vector";
}
declare module "shapez/core/draw_parameters" {
  /**
   * @typedef {import("shapez/../game/root").GameRoot} GameRoot
   * @typedef {import("shapez/./rectangle").Rectangle} Rectangle
   */
  export class DrawParameters {
    constructor({
      context,
      visibleRect,
      desiredAtlasScale,
      zoomLevel,
      root,
    }: {
      context: any;
      visibleRect: any;
      desiredAtlasScale: any;
      zoomLevel: any;
      root: any;
    });
    /** @type {CanvasRenderingContext2D} */
    context: CanvasRenderingContext2D;
    /** @type {Rectangle} */
    visibleRect: Rectangle;
    /** @type {string} */
    desiredAtlasScale: string;
    /** @type {number} */
    zoomLevel: number;
    /** @type {GameRoot} */
    root: GameRoot;
  }
  export type GameRoot = import("shapez/game/root").GameRoot;
  export type Rectangle = import("shapez/core/rectangle").Rectangle;
}
declare module "shapez/core/factory" {
  export class Factory<T> {
    id: string;
    entries: Class<T>[];
    entryIds: string[];
    idToEntry: Record<string, Class<T>>;
    constructor(id: string);
    getId(): string;
    register(
      entry: Class<T> & {
        getId(): string;
      },
    ): void;
    /**
     * Checks if a given id is registered
     */
    hasId(id: string): boolean;
    /**
     * Finds an instance by a given id
     */
    findById(id: string): Class<T>;
    /**
     * Returns all entries
     */
    getEntries(): Class<T>[];
    /**
     * Returns all registered ids
     */
    getAllIds(): string[];
    /**
     * Returns amount of stored entries
     */
    getNumEntries(): number;
  }
}
declare module "shapez/core/singleton_factory" {
  export class SingletonFactory<
    T extends {
      getId(): string;
    },
  > {
    id: string;
    entries: T[];
    idToEntry: Record<string, T>;
    constructor(id: string);
    getId(): string;
    register(classHandle: Class<T>): void;
    /**
     * Checks if a given id is registered
     */
    hasId(id: string): boolean;
    /**
     * Finds an instance by a given id
     */
    findById(id: string): T;
    /**
     * Finds an instance by its constructor (The class handle)
     */
    findByClass(classHandle: Class<T>): T;
    /**
     * Returns all entries
     */
    getEntries(): T[];
    /**
     * Returns all registered ids
     */
    getAllIds(): string[];
    /**
     * Returns amount of stored entries
     */
    getNumEntries(): number;
  }
}
declare module "shapez/savegame/serialization_data_types" {
  /**
   * @typedef {import("shapez/../core/factory").Factory<T>} FactoryTemplate<T>
   * @template T
   */
  /**
   * @typedef {import("shapez/../core/singleton_factory").SingletonFactory<T>} SingletonFactoryTemplate<T>
   * @template {{ getId(): string }} T
   */
  /**
   *
   * @param {import("shapez/./serialization").Schema} schema
   */
  export function schemaToJsonSchema(
    schema: import("shapez/savegame/serialization").Schema,
  ): {
    type: string;
    additionalProperties: boolean;
    required: any[];
    properties: {};
  };
  export const globalJsonSchemaDefs: {};
  /**
   * Base serialization data type
   */
  export class BaseDataType {
    /**
     * Serializes a given raw value
     * @param {any} value
     * @returns {unknown}
     * @abstract
     */
    serialize(value: any): unknown;
    /**
     * Verifies a given serialized value
     * @param {any} value
     * @returns {string|void} String error code or null on success
     */
    verifySerializedValue(value: any): string | void;
    /**
     * Deserializes a serialized value into the target object under the given key
     * @param {any} value
     * @param {GameRoot} root
     * @param {object} targetObject
     * @param {string|number} targetKey
     * @returns {string|void} String error code or null on success
     * @abstract
     */
    deserialize(
      value: any,
      targetObject: object,
      targetKey: string | number,
      root: GameRoot,
    ): string | void;
    /**
     * Returns the json schema
     */
    getAsJsonSchema(): {
      $ref: string;
    };
    /**
     * INTERNAL Should return the json schema representation
     * @abstract
     */
    getAsJsonSchemaUncached(): void;
    /**
     * Returns whether null values are okay
     * @returns {boolean}
     */
    allowNull(): boolean;
    /**
     * Deserializes a serialized value, but performs integrity checks before
     * @param {any} value
     * @param {GameRoot} root
     * @param {object} targetObject
     * @param {string|number} targetKey
     * @returns {string|void} String error code or null on success
     */
    deserializeWithVerify(
      value: any,
      targetObject: object,
      targetKey: string | number,
      root: GameRoot,
    ): string | void;
    /**
     * Should return a cacheable key
     * @abstract
     */
    getCacheKey(): string;
  }
  export class TypeInteger extends BaseDataType {
    serialize(value: any): any;
    getAsJsonSchemaUncached(): {
      type: string;
    };
    verifySerializedValue(value: any): string;
  }
  export class TypePositiveInteger extends BaseDataType {
    serialize(value: any): any;
    getAsJsonSchemaUncached(): {
      type: string;
      minimum: number;
    };
    verifySerializedValue(
      value: any,
    ): "Not a valid number" | "Negative value for positive integer";
  }
  export class TypePositiveIntegerOrString extends BaseDataType {
    serialize(value: any): any;
    getAsJsonSchemaUncached(): {
      oneOf: (
        | {
            type: string;
            minimum: number;
          }
        | {
            type: string;
            minimum?: undefined;
          }
      )[];
    };
    verifySerializedValue(value: any): string;
  }
  export class TypeBoolean extends BaseDataType {
    serialize(value: any): any;
    getAsJsonSchemaUncached(): {
      type: string;
    };
    verifySerializedValue(value: any): string;
  }
  export class TypeString extends BaseDataType {
    serialize(value: any): string;
    getAsJsonSchemaUncached(): {
      type: string;
    };
    verifySerializedValue(value: any): string;
  }
  export class TypeVector extends BaseDataType {
    serialize(value: any): {
      x: number;
      y: number;
    };
    getAsJsonSchemaUncached(): {
      type: string;
      required: string[];
      additionalProperties: boolean;
      properties: any;
    };
    verifySerializedValue(value: any): string;
  }
  export class TypeTileVector extends BaseDataType {
    serialize(value: any): {
      x: number;
      y: number;
    };
    getAsJsonSchemaUncached(): {
      type: string;
      required: string[];
      additionalProperties: boolean;
      properties: any;
    };
    verifySerializedValue(
      value: any,
    ):
      | "Not a valid tile vector, missing x/y or bad data type"
      | "Invalid tile vector, x or y < 0";
  }
  export class TypeNumber extends BaseDataType {
    serialize(value: any): number;
    getAsJsonSchemaUncached(): {
      type: string;
    };
    verifySerializedValue(value: any): string;
  }
  export class TypePositiveNumber extends BaseDataType {
    serialize(value: any): number;
    getAsJsonSchemaUncached(): {
      type: string;
      minimum: number;
    };
    verifySerializedValue(value: any): string;
  }
  export class TypeEnum extends BaseDataType {
    /**
     * @param {Object.<string, any>} enumeration
     */
    constructor(enumeration?: { [x: string]: any });
    availableValues: any[];
    serialize(value: any): any;
    getAsJsonSchemaUncached(): {
      type: string;
      enum: any[];
    };
    verifySerializedValue(value: any): string;
  }
  export class TypeEntity extends BaseDataType {
    serialize(value: any): any;
    getAsJsonSchemaUncached(): {
      type: string;
      minimum: number;
    };
    verifySerializedValue(value: any): string;
  }
  export class TypeEntityWeakref extends BaseDataType {
    serialize(value: any): any;
    getAsJsonSchemaUncached(): {
      type: string[];
      minimum: number;
    };
    verifySerializedValue(value: any): string;
  }
  export class TypeClass extends BaseDataType {
    /**
     *
     * @param {FactoryTemplate<*>} registry
     * @param {(GameRoot, object) => object} customResolver
     */
    constructor(
      registry: FactoryTemplate<any>,
      customResolver?: (GameRoot: any, object: any) => object,
    );
    registry: import("shapez/core/factory").Factory<any>;
    customResolver: (GameRoot: any, object: any) => object;
    serialize(value: any): {
      $: any;
      data: any;
    };
    getAsJsonSchemaUncached(): {
      oneOf: {
        type: string;
        required: string[];
        additionalProperties: boolean;
        properties: any;
      }[];
    };
    verifySerializedValue(value: any): string;
  }
  export class TypeClassData extends BaseDataType {
    /**
     *
     * @param {FactoryTemplate<*>} registry
     */
    constructor(registry: FactoryTemplate<any>);
    registry: import("shapez/core/factory").Factory<any>;
    serialize(value: any): any;
    getAsJsonSchemaUncached(): {
      oneOf: {
        type: string;
        additionalProperties: boolean;
        required: any[];
        properties: {};
      }[];
    };
    verifySerializedValue(value: any): string;
  }
  export class TypeClassFromMetaclass extends BaseDataType {
    /**
     *
     * @param {typeof BasicSerializableObject} classHandle
     * @param {SingletonFactoryTemplate<*>} registry
     */
    constructor(
      classHandle: typeof BasicSerializableObject,
      registry: SingletonFactoryTemplate<any>,
    );
    registry: import("shapez/core/singleton_factory").SingletonFactory<any>;
    classHandle: typeof BasicSerializableObject;
    serialize(value: any): {
      $: any;
      data: any;
    };
    getAsJsonSchemaUncached(): {
      $: {
        type: string;
        enum: string[];
      };
      data: {
        type: string;
        additionalProperties: boolean;
        required: any[];
        properties: {};
      };
    };
    verifySerializedValue(value: any): string;
  }
  export class TypeMetaClass extends BaseDataType {
    /**
     *
     * @param {SingletonFactoryTemplate<*>} registry
     */
    constructor(registry: SingletonFactoryTemplate<any>);
    registry: import("shapez/core/singleton_factory").SingletonFactory<any>;
    serialize(value: any): any;
    getAsJsonSchemaUncached(): {
      type: string;
      enum: string[];
    };
    verifySerializedValue(value: any): string;
  }
  export class TypeArray extends BaseDataType {
    /**
     * @param {BaseDataType} innerType
     */
    constructor(innerType: BaseDataType, fixedSize?: boolean);
    fixedSize: boolean;
    innerType: BaseDataType;
    serialize(value: any): any[];
    getAsJsonSchemaUncached(): {
      type: string;
      items: {
        $ref: string;
      };
    };
    verifySerializedValue(value: any): string;
  }
  export class TypeFixedClass extends BaseDataType {
    /**
     *
     * @param {typeof BasicSerializableObject} baseclass
     */
    constructor(baseclass: typeof BasicSerializableObject);
    baseclass: typeof BasicSerializableObject;
    serialize(value: any): any;
    getAsJsonSchemaUncached(): {
      type: string;
      additionalProperties: boolean;
      required: any[];
      properties: {};
    };
    verifySerializedValue(value: any): string;
  }
  export class TypeKeyValueMap extends BaseDataType {
    /**
     * @param {BaseDataType} valueType
     * @param {boolean=} includeEmptyValues
     */
    constructor(
      valueType: BaseDataType,
      includeEmptyValues?: boolean | undefined,
    );
    valueType: BaseDataType;
    includeEmptyValues: boolean;
    serialize(value: any): {};
    getAsJsonSchemaUncached(): {
      type: string;
      additionalProperties: {
        $ref: string;
      };
    };
    verifySerializedValue(value: any): string;
  }
  export class TypeClassId extends BaseDataType {
    /**
     * @param {FactoryTemplate<*>|SingletonFactoryTemplate<*>} registry
     */
    constructor(registry: FactoryTemplate<any> | SingletonFactoryTemplate<any>);
    registry:
      | import("shapez/core/factory").Factory<any>
      | import("shapez/core/singleton_factory").SingletonFactory<any>;
    serialize(value: any): string;
    getAsJsonSchemaUncached(): {
      type: string;
      enum: string[];
    };
    verifySerializedValue(value: any): string;
  }
  export class TypePair extends BaseDataType {
    /**
     * @param {BaseDataType} type1
     * @param {BaseDataType} type2
     */
    constructor(type1: BaseDataType, type2: BaseDataType);
    type1: BaseDataType;
    type2: BaseDataType;
    serialize(value: any): unknown[];
    getAsJsonSchemaUncached(): {
      type: string;
      minLength: number;
      maxLength: number;
      items: {
        $ref: string;
      }[];
    };
    verifySerializedValue(value: any): string;
  }
  export class TypeNullable extends BaseDataType {
    /**
     * @param {BaseDataType} wrapped
     */
    constructor(wrapped: BaseDataType);
    wrapped: BaseDataType;
    serialize(value: any): unknown;
    verifySerializedValue(value: any): string | void;
    getAsJsonSchemaUncached(): {
      oneOf: (
        | {
            $ref: string;
          }
        | {
            type: string;
          }
      )[];
    };
  }
  export class TypeStructuredObject extends BaseDataType {
    /**
     * @param {Object.<string, BaseDataType>} descriptor
     */
    constructor(descriptor: { [x: string]: BaseDataType });
    descriptor: {
      [x: string]: BaseDataType;
    };
    serialize(value: any): {};
    getAsJsonSchemaUncached(): {
      type: string;
      required: string[];
      properties: {};
    };
    verifySerializedValue(value: any): string;
  }
  /**
   * <T>
   */
  export type FactoryTemplate<T> = import("shapez/core/factory").Factory<T>;
  /**
   * <T>
   */
  export type SingletonFactoryTemplate<
    T extends {
      getId(): string;
    },
  > = import("shapez/core/singleton_factory").SingletonFactory<T>;
  import { GameRoot } from "shapez/game/root";
  import { BasicSerializableObject } from "shapez/savegame/serialization";
}
declare module "shapez/platform/sound" {
  export namespace SOUNDS {
    let uiClick: string;
    let uiError: string;
    let dialogError: string;
    let dialogOk: string;
    let swishHide: string;
    let swishShow: string;
    let badgeNotification: string;
    let levelComplete: string;
    let destroyBuilding: string;
    let placeBuilding: string;
    let placeBelt: string;
    let copy: string;
    let unlockUpgrade: string;
    let tutorialStep: string;
  }
  export namespace MUSIC {
    let menu: string;
    let puzzle: string;
  }
  export class SoundInstanceInterface {
    constructor(key: any, url: any);
    key: any;
    url: any;
    /** @returns {Promise<void>} */
    load(): Promise<void>;
    play(volume: any): void;
    deinitialize(): void;
  }
  export class MusicInstanceInterface {
    constructor(key: any, url: any);
    key: any;
    url: any;
    stop(): void;
    play(volume: any): void;
    setVolume(volume: any): void;
    /** @returns {Promise<void>} */
    load(): Promise<void>;
    /** @returns {boolean} */
    isPlaying(): boolean;
    deinitialize(): void;
  }
  export class SoundInterface {
    constructor(app: any, soundClass: any, musicClass: any);
    /** @type {Application} */
    app: Application;
    soundClass: any;
    musicClass: any;
    /** @type {Object<string, SoundInstanceInterface>} */
    sounds: {
      [x: string]: SoundInstanceInterface;
    };
    /** @type {Object<string, MusicInstanceInterface>} */
    music: {
      [x: string]: MusicInstanceInterface;
    };
    /** @type {MusicInstanceInterface} */
    currentMusic: MusicInstanceInterface;
    pageIsVisible: boolean;
    musicVolume: number;
    soundVolume: number;
    /**
     * Initializes the sound
     * @returns {Promise<any>}
     */
    initialize(): Promise<any>;
    /**
     * Pre-Loads the given sounds
     * @param {string} key
     * @returns {Promise<void>}
     */
    loadSound(key: string): Promise<void>;
    /** Deinits the sound
     * @returns {Promise<void>}
     */
    deinitialize(): Promise<void>;
    /**
     * Returns the music volume
     * @returns {number}
     */
    getMusicVolume(): number;
    /**
     * Returns the sound volume
     * @returns {number}
     */
    getSoundVolume(): number;
    /**
     * Sets the music volume
     * @param {number} volume
     */
    setMusicVolume(volume: number): void;
    /**
     * Sets the sound volume
     * @param {number} volume
     */
    setSoundVolume(volume: number): void;
    /**
     * Focus change handler, called by the pap
     * @param {boolean} pageIsVisible
     */
    onPageRenderableStateChanged(pageIsVisible: boolean): void;
    /**
     * @param {string} key
     */
    playUiSound(key: string): void;
    /**
     *
     * @param {string} key
     * @param {Vector} worldPosition
     * @param {GameRoot} root
     */
    play3DSound(key: string, worldPosition: Vector, root: GameRoot): void;
    /**
     * @param {string} key
     */
    playThemeMusic(key: string): void;
  }
  export class Sound extends SoundInterface {
    constructor(app: any);
    initialize(): Promise<void>;
    sfxHandle: SoundSpritesContainer;
    deinitialize(): Promise<any>;
  }
  import { Application } from "shapez/application";
  import { Vector } from "shapez/core/vector";
  import { GameRoot } from "shapez/game/root";
  class SoundSpritesContainer {
    howl: any;
    loadingPromise: Promise<any>;
    load(): Promise<any>;
    play(volume: any, key: any): void;
    deinitialize(): void;
  }
  export {};
}
declare module "shapez/core/click_detector" {
  export const MAX_MOVE_DISTANCE_PX: 20 | 80;
  export namespace clickDetectorGlobals {
    let lastTouchTime: number;
  }
  /**
   * Click detector creation payload typehints
   * @typedef {{
   *  consumeEvents?: boolean,
   *  preventDefault?: boolean,
   *  applyCssClass?: string,
   *  captureTouchmove?: boolean,
   *  targetOnly?: boolean,
   *  maxDistance?: number,
   *  clickSound?: string,
   *  preventClick?: boolean,
   * }} ClickDetectorConstructorArgs
   */
  export class ClickDetector {
    /**
     * Extracts the mous position from an event
     * @param {TouchEvent|MouseEvent} event
     * @returns {Vector} The client space position
     */
    static extractPointerPosition(event: TouchEvent | MouseEvent): Vector;
    /**
     *
     * @param {Element} element
     * @param {object} param1
     * @param {boolean=} param1.consumeEvents Whether to call stopPropagation
     *                                       (Useful for nested elements where the parent has a click handler as wel)
     * @param {boolean=} param1.preventDefault  Whether to call preventDefault (Usually makes the handler faster)
     * @param {string=} param1.applyCssClass The css class to add while the element is pressed
     * @param {boolean=} param1.captureTouchmove Whether to capture touchmove events as well
     * @param {boolean=} param1.targetOnly Whether to also accept clicks on child elements (e.target !== element)
     * @param {number=} param1.maxDistance The maximum distance in pixels to accept clicks
     * @param {string=} param1.clickSound Sound key to play on touchdown
     * @param {boolean=} param1.preventClick Whether to prevent click events
     */
    constructor(
      element: Element,
      {
        consumeEvents,
        preventDefault,
        applyCssClass,
        captureTouchmove,
        targetOnly,
        maxDistance,
        clickSound,
        preventClick,
      }: {
        consumeEvents?: boolean | undefined;
        preventDefault?: boolean | undefined;
        applyCssClass?: string | undefined;
        captureTouchmove?: boolean | undefined;
        targetOnly?: boolean | undefined;
        maxDistance?: number | undefined;
        clickSound?: string | undefined;
        preventClick?: boolean | undefined;
      },
    );
    clickDownPosition: Vector;
    consumeEvents: boolean;
    preventDefault: boolean;
    applyCssClass: string;
    captureTouchmove: boolean;
    targetOnly: boolean;
    clickSound: string;
    maxDistance: number;
    preventClick: boolean;
    /** @type {Signal<[Vector, TouchEvent | MouseEvent]>} */
    click: Signal<[Vector, TouchEvent | MouseEvent]>;
    /** @type {Signal<[Vector, MouseEvent]>} */
    rightClick: Signal<[Vector, MouseEvent]>;
    /** @type {Signal<[TouchEvent | MouseEvent]>} */
    touchstart: Signal<[TouchEvent | MouseEvent]>;
    /** @type {Signal<[TouchEvent | MouseEvent]>} */
    touchmove: Signal<[TouchEvent | MouseEvent]>;
    /** @type {Signal<[TouchEvent | MouseEvent]>} */
    touchend: Signal<[TouchEvent | MouseEvent]>;
    /** @type {Signal<[TouchEvent | MouseEvent]>} */
    touchcancel: Signal<[TouchEvent | MouseEvent]>;
    /** @type {Signal<[number, number]>} */
    touchstartSimple: Signal<[number, number]>;
    /** @type {Signal<[number, number]>} */
    touchmoveSimple: Signal<[number, number]>;
    /** @type {Signal<[(TouchEvent | MouseEvent)?]>} */
    touchendSimple: Signal<[(TouchEvent | MouseEvent)?]>;
    clickStartTime: number;
    cancelled: boolean;
    /**
     * Cleans up all event listeners of this detector
     */
    cleanup(): void;
    element: HTMLElement;
    /**
     *
     * @param {Event} event
     */
    internalPreventClick(event: Event): void;
    /**
     * Internal method to get the options to pass to an event listener
     */
    internalGetEventListenerOptions(): {
      capture: boolean;
      passive: boolean;
    };
    /**
     * Binds the click detector to an element
     * @param {HTMLElement} element
     */
    internalBindTo(element: HTMLElement): void;
    handlerTouchStart: (event: TouchEvent | MouseEvent) => boolean;
    handlerTouchEnd: (event: TouchEvent | MouseEvent) => boolean;
    handlerTouchMove: (event: TouchEvent | MouseEvent) => boolean;
    handlerTouchCancel: (event: TouchEvent | MouseEvent) => boolean;
    handlerPreventClick: (event: Event) => void;
    /**
     * Returns if the bound element is currently in the DOM.
     */
    internalIsDomElementAttached(): boolean;
    /**
     * Checks if the given event is relevant for this detector
     * @param {TouchEvent|MouseEvent} event
     */
    internalEventPreHandler(
      event: TouchEvent | MouseEvent,
      expectedRemainingTouches?: number,
    ): boolean;
    /**
     * Cacnels all ongoing events on this detector
     */
    cancelOngoingEvents(): void;
    /**
     * Internal pointer down handler
     * @param {TouchEvent|MouseEvent} event
     */
    internalOnPointerDown(event: TouchEvent | MouseEvent): boolean;
    /**
     * Internal pointer move handler
     * @param {TouchEvent|MouseEvent} event
     */
    internalOnPointerMove(event: TouchEvent | MouseEvent): boolean;
    /**
     * Internal pointer end handler
     * @param {TouchEvent|MouseEvent} event
     */
    internalOnPointerEnd(event: TouchEvent | MouseEvent): boolean;
    /**
     * Internal touch cancel handler
     * @param {TouchEvent|MouseEvent} event
     */
    internalOnTouchCancel(event: TouchEvent | MouseEvent): boolean;
  }
  /**
   * Click detector creation payload typehints
   */
  export type ClickDetectorConstructorArgs = {
    consumeEvents?: boolean;
    preventDefault?: boolean;
    applyCssClass?: string;
    captureTouchmove?: boolean;
    targetOnly?: boolean;
    maxDistance?: number;
    clickSound?: string;
    preventClick?: boolean;
  };
  import { Vector } from "shapez/core/vector";
  import { Signal } from "shapez/core/signal";
}
declare module "shapez/core/input_receiver" {
  import { Signal } from "shapez/core/signal";
  export type KeydownEvent = {
    keyCode: number;
    shift: boolean;
    alt: boolean;
    ctrl: boolean;
    initial: boolean;
    event: KeyboardEvent | MouseEvent;
  };
  export type KeyupEvent = {
    keyCode: number;
    shift: boolean;
    alt: boolean;
  };
  export class InputReceiver {
    context: string;
    backButton: Signal<[]>;
    keydown: Signal<[KeydownEvent]>;
    keyup: Signal<[KeyupEvent]>;
    pageBlur: Signal<[]>;
    destroyed: Signal<[]>;
    paste: Signal<[ClipboardEvent]>;
    constructor(context?: string);
    cleanup(): void;
  }
  export type ReceiverId = keyof {
    [K in keyof InputReceiver as InputReceiver[K] extends Signal<any[]>
      ? K extends "destroyed"
        ? never
        : K
      : never]: unknown;
  };
}
declare module "shapez/core/keycodes" {
  export function keyToKeyCode(key: string): number;
  export const KEYCODES: {
    Tab: number;
    Enter: number;
    Shift: number;
    Ctrl: number;
    Alt: number;
    Escape: number;
    Space: number;
    ArrowLeft: number;
    ArrowUp: number;
    ArrowRight: number;
    ArrowDown: number;
    Delete: number;
    F1: number;
    F2: number;
    F3: number;
    F4: number;
    F5: number;
    F6: number;
    F7: number;
    F8: number;
    F9: number;
    F10: number;
    F11: number;
    F12: number;
    Plus: number;
    Minus: number;
  };
  export const KEYCODE_LMB = 1;
  export const KEYCODE_MMB = 2;
  export const KEYCODE_RMB = 3;
  export function getStringForKeyCode(code: number): string;
}
declare module "shapez/game/key_action_mapper" {
  export namespace KEYMAPPINGS {
    let mods: {};
    namespace general {
      namespace confirm {
        let keyCode: number;
      }
      namespace back {
        let keyCode_1: number;
        export { keyCode_1 as keyCode };
        export let builtin: boolean;
      }
    }
    namespace ingame {
      namespace menuOpenShop {
        let keyCode_2: number;
        export { keyCode_2 as keyCode };
      }
      namespace menuOpenStats {
        let keyCode_3: number;
        export { keyCode_3 as keyCode };
      }
      namespace menuClose {
        let keyCode_4: number;
        export { keyCode_4 as keyCode };
      }
      namespace toggleHud {
        let keyCode_5: number;
        export { keyCode_5 as keyCode };
      }
      namespace exportScreenshot {
        let keyCode_6: number;
        export { keyCode_6 as keyCode };
      }
      namespace toggleFPSInfo {
        let keyCode_7: number;
        export { keyCode_7 as keyCode };
      }
      namespace switchLayers {
        let keyCode_8: number;
        export { keyCode_8 as keyCode };
      }
      namespace showShapeTooltip {
        let keyCode_9: number;
        export { keyCode_9 as keyCode };
      }
    }
    namespace navigation {
      namespace mapMoveUp {
        let keyCode_10: number;
        export { keyCode_10 as keyCode };
      }
      namespace mapMoveRight {
        let keyCode_11: number;
        export { keyCode_11 as keyCode };
      }
      namespace mapMoveDown {
        let keyCode_12: number;
        export { keyCode_12 as keyCode };
      }
      namespace mapMoveLeft {
        let keyCode_13: number;
        export { keyCode_13 as keyCode };
      }
      namespace mapMoveFaster {
        let keyCode_14: number;
        export { keyCode_14 as keyCode };
      }
      namespace centerMap {
        let keyCode_15: number;
        export { keyCode_15 as keyCode };
      }
      namespace mapZoomIn {
        let keyCode_16: number;
        export { keyCode_16 as keyCode };
        export let repeated: boolean;
      }
      namespace mapZoomOut {
        let keyCode_17: number;
        export { keyCode_17 as keyCode };
        let repeated_1: boolean;
        export { repeated_1 as repeated };
      }
      namespace createMarker {
        let keyCode_18: number;
        export { keyCode_18 as keyCode };
      }
    }
    namespace buildings {
      namespace constant_producer {
        let keyCode_19: number;
        export { keyCode_19 as keyCode };
      }
      namespace goal_acceptor {
        let keyCode_20: number;
        export { keyCode_20 as keyCode };
      }
      namespace block {
        let keyCode_21: number;
        export { keyCode_21 as keyCode };
      }
      namespace belt {
        let keyCode_22: number;
        export { keyCode_22 as keyCode };
      }
      namespace balancer {
        let keyCode_23: number;
        export { keyCode_23 as keyCode };
      }
      namespace underground_belt {
        let keyCode_24: number;
        export { keyCode_24 as keyCode };
      }
      namespace miner {
        let keyCode_25: number;
        export { keyCode_25 as keyCode };
      }
      namespace cutter {
        let keyCode_26: number;
        export { keyCode_26 as keyCode };
      }
      namespace rotator {
        let keyCode_27: number;
        export { keyCode_27 as keyCode };
      }
      namespace stacker {
        let keyCode_28: number;
        export { keyCode_28 as keyCode };
      }
      namespace mixer {
        let keyCode_29: number;
        export { keyCode_29 as keyCode };
      }
      namespace painter {
        let keyCode_30: number;
        export { keyCode_30 as keyCode };
      }
      namespace trash {
        let keyCode_31: number;
        export { keyCode_31 as keyCode };
      }
      namespace item_producer {
        let keyCode_32: number;
        export { keyCode_32 as keyCode };
      }
      namespace storage {
        let keyCode_33: number;
        export { keyCode_33 as keyCode };
      }
      namespace reader {
        let keyCode_34: number;
        export { keyCode_34 as keyCode };
      }
      namespace lever {
        let keyCode_35: number;
        export { keyCode_35 as keyCode };
      }
      namespace filter {
        let keyCode_36: number;
        export { keyCode_36 as keyCode };
      }
      namespace display {
        let keyCode_37: number;
        export { keyCode_37 as keyCode };
      }
      namespace wire {
        let keyCode_38: number;
        export { keyCode_38 as keyCode };
      }
      namespace wire_tunnel {
        let keyCode_39: number;
        export { keyCode_39 as keyCode };
      }
      namespace constant_signal {
        let keyCode_40: number;
        export { keyCode_40 as keyCode };
      }
      namespace logic_gate {
        let keyCode_41: number;
        export { keyCode_41 as keyCode };
      }
      namespace virtual_processor {
        let keyCode_42: number;
        export { keyCode_42 as keyCode };
      }
      namespace analyzer {
        let keyCode_43: number;
        export { keyCode_43 as keyCode };
      }
      namespace comparator {
        let keyCode_44: number;
        export { keyCode_44 as keyCode };
      }
      namespace transistor {
        let keyCode_45: number;
        export { keyCode_45 as keyCode };
      }
    }
    namespace placement {
      namespace pipette {
        let keyCode_46: number;
        export { keyCode_46 as keyCode };
      }
      namespace rotateWhilePlacing {
        let keyCode_47: number;
        export { keyCode_47 as keyCode };
      }
      namespace rotateInverseModifier {
        let keyCode_48: number;
        export { keyCode_48 as keyCode };
      }
      namespace rotateToUp {
        let keyCode_49: number;
        export { keyCode_49 as keyCode };
      }
      namespace rotateToDown {
        let keyCode_50: number;
        export { keyCode_50 as keyCode };
      }
      namespace rotateToRight {
        let keyCode_51: number;
        export { keyCode_51 as keyCode };
      }
      namespace rotateToLeft {
        let keyCode_52: number;
        export { keyCode_52 as keyCode };
      }
      namespace cycleBuildingVariants {
        let keyCode_53: number;
        export { keyCode_53 as keyCode };
      }
      namespace cycleBuildings {
        let keyCode_54: number;
        export { keyCode_54 as keyCode };
      }
      namespace switchDirectionLockSide {
        let keyCode_55: number;
        export { keyCode_55 as keyCode };
      }
      namespace copyWireValue {
        let keyCode_56: number;
        export { keyCode_56 as keyCode };
      }
    }
    namespace massSelect {
      namespace massSelectStart {
        let keyCode_57: number;
        export { keyCode_57 as keyCode };
      }
      namespace massSelectSelectMultiple {
        let keyCode_58: number;
        export { keyCode_58 as keyCode };
      }
      namespace massSelectCopy {
        let keyCode_59: number;
        export { keyCode_59 as keyCode };
      }
      namespace massSelectCut {
        let keyCode_60: number;
        export { keyCode_60 as keyCode };
      }
      namespace massSelectClear {
        let keyCode_61: number;
        export { keyCode_61 as keyCode };
      }
      namespace confirmMassDelete {
        let keyCode_62: number;
        export { keyCode_62 as keyCode };
      }
      namespace pasteLastBlueprint {
        let keyCode_63: number;
        export { keyCode_63 as keyCode };
      }
    }
    namespace placementModifiers {
      namespace lockBeltDirection {
        let keyCode_64: number;
        export { keyCode_64 as keyCode };
      }
      namespace placementDisableAutoOrientation {
        let keyCode_65: number;
        export { keyCode_65 as keyCode };
      }
      namespace placeMultiple {
        let keyCode_66: number;
        export { keyCode_66 as keyCode };
      }
      namespace placeInverse {
        let keyCode_67: number;
        export { keyCode_67 as keyCode };
      }
    }
  }
  export class Keybinding {
    /**
     *
     * @param {KeyActionMapper} keyMapper
     * @param {Application} app
     * @param {object} param0
     * @param {number} param0.keyCode
     * @param {boolean=} param0.builtin
     * @param {boolean=} param0.repeated
     * @param {{ shift?: boolean; alt?: boolean; ctrl?: boolean; }=} param0.modifiers
     */
    constructor(
      keyMapper: KeyActionMapper,
      app: Application,
      {
        keyCode,
        builtin,
        repeated,
        modifiers,
      }: {
        keyCode: number;
        builtin?: boolean | undefined;
        repeated?: boolean | undefined;
        modifiers?:
          | {
              shift?: boolean;
              alt?: boolean;
              ctrl?: boolean;
            }
          | undefined;
      },
    );
    keyMapper: KeyActionMapper;
    app: Application;
    keyCode: number;
    builtin: boolean;
    repeated: boolean;
    modifiers: {
      shift?: boolean;
      alt?: boolean;
      ctrl?: boolean;
    };
    signal: Signal<[]>;
    toggled: Signal<[]>;
    /**
     * Returns whether this binding is currently pressed
     * @returns {boolean}
     */
    get pressed(): boolean;
    /**
     * Adds an event listener
     * @param {function() : void} receiver
     * @param {object=} scope
     */
    add(receiver: () => void, scope?: object | undefined): void;
    /**
     * Adds an event listener
     * @param {function() : void} receiver
     * @param {object=} scope
     */
    addToTop(receiver: () => void, scope?: object | undefined): void;
    /**
     * @param {Element} elem
     * @returns {HTMLElement} the created element, or null if the keybindings are not shown
     *  */
    appendLabelToElement(elem: Element): HTMLElement;
    /**
     * Returns the key code as a nice string
     */
    getKeyCodeString(): string;
    /**
     * Remvoes all signal receivers
     */
    clearSignalReceivers(): void;
  }
  export class KeyActionMapper {
    /**
     *
     * @param {GameRoot} root
     * @param {InputReceiver} inputReceiver
     */
    constructor(root: GameRoot, inputReceiver: InputReceiver);
    root: GameRoot;
    inputReceiver: InputReceiver;
    /** @type {Object.<string, Keybinding>} */
    keybindings: {
      [x: string]: Keybinding;
    };
    /**
     * Returns all keybindings starting with the given id
     * @param {string} pattern
     * @returns {Array<Keybinding>}
     */
    getKeybindingsStartingWith(pattern: string): Array<Keybinding>;
    /**
     * Forwards the given events to the other mapper (used in tooltips)
     * @param {KeyActionMapper} receiver
     * @param {Array<string>} bindings
     */
    forward(receiver: KeyActionMapper, bindings: Array<string>): void;
    cleanup(): void;
    onPageBlur(): void;
    /**
     * Internal keydown handler
     * @param {object} param0
     * @param {number} param0.keyCode
     * @param {boolean} param0.shift
     * @param {boolean} param0.alt
     * @param {boolean} param0.ctrl
     * @param {boolean=} param0.initial
     */
    handleKeydown({
      keyCode,
      shift,
      alt,
      ctrl,
      initial,
    }: {
      keyCode: number;
      shift: boolean;
      alt: boolean;
      ctrl: boolean;
      initial?: boolean | undefined;
    }): "stop_propagation";
    /**
     * Internal keyup handler
     * @param {object} param0
     * @param {number} param0.keyCode
     * @param {boolean} param0.shift
     * @param {boolean} param0.alt
     */
    handleKeyup({
      keyCode,
      shift,
      alt,
    }: {
      keyCode: number;
      shift: boolean;
      alt: boolean;
    }): void;
    /**
     * Returns a given keybinding
     * @param {{ keyCode: number }} binding
     * @returns {Keybinding}
     */
    getBinding(binding: { keyCode: number }): Keybinding;
    /**
     * Returns a given keybinding
     * @param {string} id
     * @returns {Keybinding}
     */
    getBindingById(id: string): Keybinding;
  }
  import { Application } from "shapez/application";
  import { Signal } from "shapez/core/signal";
  import { GameRoot } from "shapez/game/root";
  import { InputReceiver } from "shapez/core/input_receiver";
}
declare module "shapez/game/hud/base_hud_part" {
  export class BaseHUDPart {
    /**
     * @param {GameRoot} root
     */
    constructor(root: GameRoot);
    root: GameRoot;
    /** @type {Array<ClickDetector>} */
    clickDetectors: Array<ClickDetector>;
    /**
     * Should create all require elements
     * @param {HTMLElement} parent
     */
    createElements(parent: HTMLElement): void;
    /**
     * Should initialize the element, called *after* the elements have been created
     * @abstract
     */
    initialize(): void;
    /**
     * Should update any required logic
     */
    update(): void;
    /**
     * Should draw the hud
     * @param {DrawParameters} parameters
     */
    draw(parameters: DrawParameters): void;
    /**
     * Should draw any overlays (screen space)
     * @param {DrawParameters} parameters
     */
    drawOverlays(parameters: DrawParameters): void;
    /**
     * Should return true if the widget has a modal dialog opened and thus
     * the game does not need to update / redraw
     * @returns {boolean}
     */
    shouldPauseRendering(): boolean;
    /**
     * Should return false if the game should be paused
     * @returns {boolean}
     */
    shouldPauseGame(): boolean;
    /**
     * Should return true if this overlay is open and currently blocking any user interaction
     */
    isBlockingOverlay(): boolean;
    /**
     * Cleans up the hud element, if overridden make sure to call super.cleanup
     */
    cleanup(): void;
    /**
     * Cleans up all click detectors
     */
    cleanupClickDetectors(): void;
    /**
     * Should close the element, in case its supported
     */
    close(): void;
    /**
     * Helper method to construct a new click detector
     * @param {Element} element The element to listen on
     * @param {import("shapez/../../core/signal").SignalReceiver<[]>} handler The handler to call on this object
     * @param {import("shapez/../../core/click_detector").ClickDetectorConstructorArgs=} args Click detector arguments
     *
     */
    trackClicks(
      element: Element,
      handler: import("shapez/core/signal").SignalReceiver<[]>,
      args?:
        | import("shapez/core/click_detector").ClickDetectorConstructorArgs
        | undefined,
    ): void;
    /**
     * Registers a new click detector
     * @param {ClickDetector} detector
     */
    registerClickDetector(detector: ClickDetector): void;
    /**
     * Closes this element when its background is clicked
     * @param {HTMLElement} element
     * @param {function} closeMethod
     */
    closeOnBackgroundClick(element: HTMLElement, closeMethod?: Function): void;
    /**
     * Forwards the game speed keybindings so you can toggle pause / Fastforward
     * in the building tooltip and such
     * @param {KeyActionMapper} sourceMapper
     */
    forwardGameSpeedKeybindings(sourceMapper: KeyActionMapper): void;
    /**
     * Forwards the map movement keybindings so you can move the map with the
     * arrow keys
     * @param {KeyActionMapper} sourceMapper
     */
    forwardMapMovementKeybindings(sourceMapper: KeyActionMapper): void;
  }
  import { GameRoot } from "shapez/game/root";
  import { ClickDetector } from "shapez/core/click_detector";
  import { DrawParameters } from "shapez/core/draw_parameters";
  import { KeyActionMapper } from "shapez/game/key_action_mapper";
}
declare module "shapez/core/request_channel" {
  export const PROMISE_ABORTED: "promise-aborted";
  export class RequestChannel {
    /** @type {Array<Promise>} */
    pendingPromises: Array<Promise<any>>;
    /**
     *
     * @param {Promise<any>} promise
     * @returns {Promise<any>}
     */
    watch(promise: Promise<any>): Promise<any>;
    cancelAll(): void;
  }
}
declare module "shapez/core/state_manager" {
  /**
   * This is the main state machine which drives the game states.
   */
  export class StateManager {
    /**
     * @param {Application} app
     */
    constructor(app: Application);
    app: Application;
    /** @type {GameState} */
    currentState: GameState;
    /** @type {Object.<string, new() => GameState>} */
    stateClasses: {
      [x: string]: new () => GameState;
    };
    /**
     * Registers a new state class, should be a GameState derived class
     * @param {object} stateClass
     */
    register(stateClass: object): void;
    /**
     * Constructs a new state or returns the instance from the cache
     * @param {string} key
     */
    constructState(key: string): GameState;
    /**
     * Moves to a given state
     * @param {string} key State Key
     */
    moveToState(key: string, payload?: {}): boolean;
    /**
     * Returns the current state
     * @returns {GameState}
     */
    getCurrentState(): GameState;
  }
  import { Application } from "shapez/application";
  import { GameState } from "shapez/core/game_state";
}
declare module "shapez/core/game_state" {
  import type { Application } from "shapez/application";
  import { ClickDetector } from "shapez/core/click_detector";
  import { InputReceiver } from "shapez/core/input_receiver";
  import { RequestChannel } from "shapez/core/request_channel";
  import type { StateManager } from "shapez/core/state_manager";
  /**
   * Basic state of the game state machine. This is the base of the whole game
   */
  export class GameState {
    app: Application;
    readonly key: string;
    inputReceiver: InputReceiver;
    /** A channel we can use to perform async ops */
    protected asyncChannel: RequestChannel;
    protected clickDetectors: ClickDetector[];
    /** @todo review this */
    protected htmlElement: HTMLElement | undefined;
    private stateManager;
    /** Store if we are currently fading out */
    private fadingOut;
    /**
     * Constructs a new state with the given id
     * @param key The id of the state. We use ids to refer to states because otherwise we get
     *            circular references
     */
    constructor(key: string);
    /**
     * Returns the html element of the state
     */
    getDivElement(): HTMLElement;
    /**
     * Transfers to a new state
     * @param {string} stateKey The id of the new state
     */
    moveToState(stateKey: any, payload?: {}, skipFadeOut?: boolean): void;
    /**
     * Tracks clicks on a given element and calls the given callback *on this state*.
     * If you want to call another function wrap it inside a lambda.
     * @param {Element} element The element to track clicks on
     * @param {function():void} handler The handler to call
     * @param {import("shapez/./click_detector").ClickDetectorConstructorArgs=} args Click detector arguments
     */
    trackClicks(element: any, handler: any, args?: {}): void;
    /**
     * Cancels all promises on the api as well as our async channel
     */
    cancelAllAsyncOperations(): void;
    /**
     * Callback when entering the state, to be overriddemn
     * @param payload Arbitrary data passed from the state which we are transferring from
     */
    onEnter(payload: {}): void;
    /**
     * Callback when leaving the state
     */
    onLeave(): void;
    /**
     * Callback when the app got paused (on android, this means in background)
     */
    onAppPause(): void;
    /**
     * Callback when the app got resumed (on android, this means in foreground again)
     */
    onAppResume(): void;
    /**
     * Render callback
     * @param dt Delta time in ms since last render
     */
    onRender(dt: number): void;
    /**
     * Background tick callback, called while the game is inactiev
     * @param dt Delta time in ms since last tick
     */
    onBackgroundTick(dt: number): void;
    /**
     * Called when the screen resized
     * @param w window/screen width
     * @param h window/screen height
     */
    onResized(w: number, h: number): void;
    /**
     * Internal backbutton handler, called when the hardware back button is pressed or
     * the escape key is pressed
     */
    onBackButton(): void;
    /**
     * Should return how many mulliseconds to fade in / out the state. Not recommended to override!
     * @returns Time in milliseconds to fade out
     */
    getInOutFadeTime(): number;
    /**
     * Should return whether to fade in the game state. This will then apply the right css classes
     * for the fadein.
     */
    getHasFadeIn(): boolean;
    /**
     * Should return whether to fade out the game state. This will then apply the right css classes
     * for the fadeout and wait the delay before moving states
     */
    getHasFadeOut(): boolean;
    /**
     * Returns if this state should get paused if it does not have focus
     * @returns true to pause the updating of the game
     */
    getPauseOnFocusLost(): boolean;
    /**
     * Should return the html code of the state.
     * @deprecated use {@link getContentLayout} instead
     */
    getInnerHTML(): string;
    /**
     * Should return the element(s) to be displayed in the state.
     * If not overridden, {@link getInnerHTML} will be used to provide the layout.
     */
    protected getContentLayout(): Node;
    /**
     * Returns if the state has an unload confirmation, this is the
     * "Are you sure you want to leave the page" message.
     */
    getHasUnloadConfirmation(): boolean;
    /**
     * Should return the theme music for this state
     */
    getThemeMusic(): string | null;
    /**
     * Should return true if the player is currently ingame
     */
    getIsIngame(): boolean;
    /**
     * Should return whether to clear the whole body content before entering the state.
     */
    getRemovePreviousContent(): boolean;
    /**
     * Internal callback from the manager. Do not override!
     */
    internalRegisterCallback(
      stateManager: StateManager,
      app: Application,
    ): void;
    /**
     * Internal callback when entering the state. Do not override!
     * @param payload Arbitrary data passed from the state which we are transferring from
     * @param callCallback Whether to call the onEnter callback
     */
    internalEnterCallback(payload: any, callCallback?: boolean): void;
    /**
     * Internal callback when the state is left. Do not override!
     */
    internalLeaveCallback(): void;
    /**
     * Internal app pause callback
     */
    internalOnAppPauseCallback(): void;
    /**
     * Internal app resume callback
     */
    internalOnAppResumeCallback(): void;
    /**
     * Cleans up all click detectors
     */
    internalCleanUpClickDetectors(): void;
    /**
     * Internal method to get all elements of the game state. Can be
     * called from subclasses to provide support for both HTMLElements
     * and HTML strings.
     */
    internalGetWrappedContent(): Node;
    /**
     * Internal method to compute the time to fade in / out
     * @returns time to fade in / out in ms
     */
    internalGetFadeInOutTime(): number;
  }
}
declare module "shapez/core/dpi_manager" {
  /**
   * Returns the current dpi
   * @returns {number}
   */
  export function getDeviceDPI(): number;
  /**
   *
   * @param {number} dpi
   * @returns {number} Smoothed dpi
   */
  export function smoothenDpi(dpi: number): number;
  /**
   * Prepares a context for hihg dpi rendering
   * @param {CanvasRenderingContext2D} context
   */
  export function prepareHighDPIContext(
    context: CanvasRenderingContext2D,
    smooth?: boolean,
  ): void;
  /**
   * Resizes a high dpi canvas
   * @param {HTMLCanvasElement} canvas
   * @param {number} w
   * @param {number} h
   */
  export function resizeHighDPICanvas(
    canvas: HTMLCanvasElement,
    w: number,
    h: number,
    smooth?: boolean,
  ): void;
  /**
   * Resizes a canvas
   * @param {HTMLCanvasElement} canvas
   * @param {number} w
   * @param {number} h
   */
  export function resizeCanvas(
    canvas: HTMLCanvasElement,
    w: number,
    h: number,
    setStyle?: boolean,
  ): void;
  /**
   * Resizes a canvas and makes sure its cleared
   * @param {HTMLCanvasElement} canvas
   * @param {CanvasRenderingContext2D} context
   * @param {number} w
   * @param {number} h
   */
  export function resizeCanvasAndClear(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    w: number,
    h: number,
  ): void;
}
declare module "shapez/core/sprites" {
  export const ORIGINAL_SPRITE_SCALE: "0.75";
  export const FULL_CLIP_RECT: Rectangle;
  export class BaseSprite {
    /**
     * Returns the raw handle
     * @returns {HTMLImageElement|HTMLCanvasElement}
     * @abstract
     */
    getRawTexture(): HTMLImageElement | HTMLCanvasElement;
    /**
     * Draws the sprite
     * @param {CanvasRenderingContext2D} context
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     */
    draw(
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
    ): void;
  }
  /**
   * Position of a sprite within an atlas
   */
  export class SpriteAtlasLink {
    /**
     *
     * @param {object} param0
     * @param {number} param0.packedX
     * @param {number} param0.packedY
     * @param {number} param0.packOffsetX
     * @param {number} param0.packOffsetY
     * @param {number} param0.packedW
     * @param {number} param0.packedH
     * @param {number} param0.w
     * @param {number} param0.h
     * @param {HTMLImageElement|HTMLCanvasElement} param0.atlas
     */
    constructor({
      w,
      h,
      packedX,
      packedY,
      packOffsetX,
      packOffsetY,
      packedW,
      packedH,
      atlas,
    }: {
      packedX: number;
      packedY: number;
      packOffsetX: number;
      packOffsetY: number;
      packedW: number;
      packedH: number;
      w: number;
      h: number;
      atlas: HTMLImageElement | HTMLCanvasElement;
    });
    packedX: number;
    packedY: number;
    packedW: number;
    packedH: number;
    packOffsetX: number;
    packOffsetY: number;
    atlas: HTMLCanvasElement | HTMLImageElement;
    w: number;
    h: number;
  }
  export class AtlasSprite extends BaseSprite {
    /**
     *
     * @param {string} spriteName
     */
    constructor(spriteName?: string);
    /** @type {Object.<string, SpriteAtlasLink>} */
    linksByResolution: {
      [x: string]: SpriteAtlasLink;
    };
    spriteName: string;
    frozen: boolean;
    /**
     * Draws the sprite onto a regular context using no contexts
     * @see {BaseSprite.draw}
     */
    draw(context: any, x: any, y: any, w: any, h: any): void;
    /**
     *
     * @param {DrawParameters} parameters
     * @param {number} x
     * @param {number} y
     * @param {number} size
     * @param {boolean=} clipping
     */
    drawCachedCentered(
      parameters: DrawParameters,
      x: number,
      y: number,
      size: number,
      clipping?: boolean | undefined,
    ): void;
    /**
     *
     * @param {CanvasRenderingContext2D} context
     * @param {number} x
     * @param {number} y
     * @param {number} size
     */
    drawCentered(
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
    ): void;
    /**
     * Draws the sprite
     * @param {DrawParameters} parameters
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     * @param {boolean=} clipping Whether to perform culling
     */
    drawCached(
      parameters: DrawParameters,
      x: number,
      y: number,
      w?: number,
      h?: number,
      clipping?: boolean | undefined,
    ): void;
    /**
     * Draws a subset of the sprite. Does NO culling
     * @param {DrawParameters} parameters
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     * @param {Rectangle=} clipRect The rectangle in local space (0 ... 1) to draw of the image
     */
    drawCachedWithClipRect(
      parameters: DrawParameters,
      x: number,
      y: number,
      w?: number,
      h?: number,
      clipRect?: Rectangle | undefined,
    ): void;
    /**
     * Renders into an html element
     * @param {HTMLElement} element
     * @param {number} w
     * @param {number} h
     */
    renderToHTMLElement(element: HTMLElement, w?: number, h?: number): void;
    /**
     * Returns the html to render as icon
     * @param {number} w
     * @param {number} h
     */
    getAsHTML(w: number, h: number): string;
  }
  export class RegularSprite extends BaseSprite {
    constructor(sprite: any, w: any, h: any);
    w: any;
    h: any;
    sprite: any;
    getRawTexture(): any;
    /**
     * Draws the sprite, do *not* use this for sprites which are rendered! Only for drawing
     * images into buffers
     * @param {CanvasRenderingContext2D} context
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     */
    drawCentered(
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
    ): void;
  }
  import { Rectangle } from "shapez/core/rectangle";
  import { DrawParameters } from "shapez/core/draw_parameters";
}
declare module "shapez/game/automatic_save" {
  export type enumSavePriority = number;
  export namespace enumSavePriority {
    let regular: number;
    let asap: number;
  }
  export class AutomaticSave {
    constructor(root: any);
    /** @type {GameRoot} */
    root: GameRoot;
    saveImportance: number;
    lastSaveAttempt: number;
    setSaveImportance(importance: any): void;
    doSave(): void;
    update(): void;
  }
  import { GameRoot } from "shapez/game/root";
}
declare module "shapez/game/components/hub" {
  export class HubComponent extends Component {}
  import { Component } from "shapez/game/component";
}
declare module "shapez/game/base_item" {
  /**
   * Class for items on belts etc. Not an entity for performance reasons
   */
  export class BaseItem extends BasicSerializableObject {
    static getId(): string;
    constructor();
    _type: ItemType;
    /** @returns {ItemType} **/
    getItemType(): ItemType;
    /**
     * Returns a string id of the item
     * @returns {string}
     * @abstract
     */
    getAsCopyableKey(): string;
    /**
     * Returns if the item equals the other itme
     * @param {BaseItem} other
     * @returns {boolean}
     */
    equals(other: BaseItem): boolean;
    /**
     * Override for custom comparison
     * @param {BaseItem} other
     * @returns {boolean}
     * @abstract
     */
    equalsImpl(other: BaseItem): boolean;
    /**
     * Draws the item to a canvas
     * @param {CanvasRenderingContext2D} context
     * @param {number} size
     * @abstract
     */
    drawFullSizeOnCanvas(context: CanvasRenderingContext2D, size: number): void;
    /**
     * Draws the item at the given position
     * @param {number} x
     * @param {number} y
     * @param {DrawParameters} parameters
     * @param {number=} diameter
     */
    drawItemCenteredClipped(
      x: number,
      y: number,
      parameters: DrawParameters,
      diameter?: number | undefined,
    ): void;
    /**
     * INTERNAL
     * @param {number} x
     * @param {number} y
     * @param {DrawParameters} parameters
     * @param {number=} diameter
     * @abstract
     */
    drawItemCenteredImpl(
      x: number,
      y: number,
      parameters: DrawParameters,
      diameter?: number | undefined,
    ): void;
    getBackgroundColorAsResource(): string;
  }
  import { BasicSerializableObject } from "shapez/savegame/serialization";
  import { DrawParameters } from "shapez/core/draw_parameters";
}
declare module "shapez/game/components/item_acceptor" {
  /**
   * @typedef {{
   * pos: Vector,
   * direction: enumDirection,
   * filter?: ItemType
   * }} ItemAcceptorSlot */
  /**
   * Contains information about a slot plus its location
   * @typedef {{
   *  slot: ItemAcceptorSlot,
   *  index: number,
   * }} ItemAcceptorLocatedSlot */
  /**
   * @typedef {{
   * pos: Vector,
   * direction: enumDirection,
   * filter?: ItemType
   * }} ItemAcceptorSlotConfig */
  export class ItemAcceptorComponent extends Component {
    /**
     *
     * @param {object} param0
     * @param {Array<ItemAcceptorSlotConfig>} param0.slots The slots from which we accept items
     */
    constructor({ slots }: { slots: Array<ItemAcceptorSlotConfig> });
    /**
     * Fixes belt animations
     * @type {Array<{
     *  item: BaseItem,
     * slotIndex: number,
     * animProgress: number,
     * direction: enumDirection
     * }>}
     */
    itemConsumptionAnimations: Array<{
      item: BaseItem;
      slotIndex: number;
      animProgress: number;
      direction: enumDirection;
    }>;
    /**
     *
     * @param {Array<ItemAcceptorSlotConfig>} slots
     */
    setSlots(slots: Array<ItemAcceptorSlotConfig>): void;
    /** @type {Array<ItemAcceptorSlot>} */
    slots: Array<ItemAcceptorSlot>;
    /**
     * Returns if this acceptor can accept a new item at slot N
     *
     * NOTICE: The belt path ignores this for performance reasons and does his own check
     * @param {number} slotIndex
     * @param {BaseItem=} item
     */
    canAcceptItem(slotIndex: number, item?: BaseItem | undefined): boolean;
    /**
     * Called when an item has been accepted so that
     * @param {number} slotIndex
     * @param {enumDirection} direction
     * @param {BaseItem} item
     * @param {number} remainingProgress World space remaining progress, can be set to set the start position of the item
     */
    onItemAccepted(
      slotIndex: number,
      direction: enumDirection,
      item: BaseItem,
      remainingProgress?: number,
    ): void;
    /**
     * Tries to find a slot which accepts the current item
     * @param {Vector} targetLocalTile
     * @param {enumDirection} fromLocalDirection
     * @returns {ItemAcceptorLocatedSlot|null}
     */
    findMatchingSlot(
      targetLocalTile: Vector,
      fromLocalDirection: enumDirection,
    ): ItemAcceptorLocatedSlot | null;
  }
  export type ItemAcceptorSlot = {
    pos: Vector;
    direction: enumDirection;
    filter?: ItemType;
  };
  /**
   * Contains information about a slot plus its location
   */
  export type ItemAcceptorLocatedSlot = {
    slot: ItemAcceptorSlot;
    index: number;
  };
  export type ItemAcceptorSlotConfig = {
    pos: Vector;
    direction: enumDirection;
    filter?: ItemType;
  };
  import { Component } from "shapez/game/component";
  import { BaseItem } from "shapez/game/base_item";
  import { enumDirection } from "shapez/core/vector";
  import { Vector } from "shapez/core/vector";
}
declare module "shapez/game/components/item_processor" {
  export type enumItemProcessorTypes = string;
  export namespace enumItemProcessorTypes {
    let balancer: string;
    let cutter: string;
    let cutterQuad: string;
    let rotator: string;
    let rotatorCCW: string;
    let rotator180: string;
    let stacker: string;
    let trash: string;
    let mixer: string;
    let painter: string;
    let painterDouble: string;
    let painterQuad: string;
    let hub: string;
    let filter: string;
    let reader: string;
    let goal: string;
  }
  export type enumItemProcessorRequirements = string;
  export namespace enumItemProcessorRequirements {
    let painterQuad_1: string;
    export { painterQuad_1 as painterQuad };
  }
  /** @typedef {{
   *  item: BaseItem,
   *  requiredSlot?: number,
   *  preferredSlot?: number
   * }} EjectorItemToEject */
  /** @typedef {{
   *  remainingTime: number,
   *  items: Array<EjectorItemToEject>,
   * }} EjectorCharge */
  export class ItemProcessorComponent extends Component {
    static getSchema(): {
      nextOutputSlot: import("shapez/savegame/serialization_data_types").TypePositiveInteger;
    };
    /**
     *
     * @param {object} param0
     * @param {enumItemProcessorTypes=} param0.processorType Which type of processor this is
     * @param {enumItemProcessorRequirements=} param0.processingRequirement Applied processing requirement
     * @param {number=} param0.inputsPerCharge How many items this machine needs until it can start working
     *
     */
    constructor({
      processorType,
      processingRequirement,
      inputsPerCharge,
    }: {
      processorType?: enumItemProcessorTypes | undefined;
      processingRequirement?: enumItemProcessorRequirements | undefined;
      inputsPerCharge?: number | undefined;
    });
    inputsPerCharge: number;
    type: string;
    processingRequirement: string;
    /**
     * Our current inputs
     * @type {Map<number, BaseItem>}
     */
    inputSlots: Map<number, BaseItem>;
    nextOutputSlot: number;
    /**
     * Current input count
     * @type {number}
     */
    inputCount: number;
    /**
     * What we are currently processing, empty if we don't produce anything rn
     * requiredSlot: Item *must* be ejected on this slot
     * preferredSlot: Item *can* be ejected on this slot, but others are fine too if the one is not usable
     * @type {Array<EjectorCharge>}
     */
    ongoingCharges: Array<EjectorCharge>;
    /**
     * How much processing time we have left from the last tick
     * @type {number}
     */
    bonusTime: number;
    /**
     * @type {Array<EjectorItemToEject>}
     */
    queuedEjects: Array<EjectorItemToEject>;
    /**
     * Tries to take the item
     * @param {BaseItem} item
     * @param {number} sourceSlot
     */
    tryTakeItem(item: BaseItem, sourceSlot: number): boolean;
  }
  export type EjectorItemToEject = {
    item: BaseItem;
    requiredSlot?: number;
    preferredSlot?: number;
  };
  export type EjectorCharge = {
    remainingTime: number;
    items: Array<EjectorItemToEject>;
  };
  import { Component } from "shapez/game/component";
  import { BaseItem } from "shapez/game/base_item";
}
declare module "shapez/core/atlas_definitions" {
  /**
   * @typedef {{ w: number, h: number }} Size
   * @typedef {{ x: number, y: number }} Position
   * @typedef {{
   *   frame: Position & Size,
   *   rotated: boolean,
   *   spriteSourceSize: Position & Size,
   *   sourceSize: Size,
   *   trimmed: boolean
   * }} SpriteDefinition
   *
   * @typedef {{
   *   app: string,
   *   version: string,
   *   image: string,
   *   format: string,
   *   size: Size,
   *   scale: string,
   *   smartupdate: string
   * }} AtlasMeta
   *
   * @typedef {{
   *   frames: Object.<string, SpriteDefinition>,
   *   meta: AtlasMeta
   * }} SourceData
   */
  export class AtlasDefinition {
    /**
     * @param {SourceData} sourceData
     */
    constructor({ frames, meta }: SourceData);
    meta: AtlasMeta;
    sourceData: {
      [x: string]: SpriteDefinition;
    };
    sourceFileName: string;
    getFullSourcePath(): string;
  }
  /** @type {AtlasDefinition[]} **/
  export const atlasFiles: AtlasDefinition[];
  export type Size = {
    w: number;
    h: number;
  };
  export type Position = {
    x: number;
    y: number;
  };
  export type SpriteDefinition = {
    frame: Position & Size;
    rotated: boolean;
    spriteSourceSize: Position & Size;
    sourceSize: Size;
    trimmed: boolean;
  };
  export type AtlasMeta = {
    app: string;
    version: string;
    image: string;
    format: string;
    size: Size;
    scale: string;
    smartupdate: string;
  };
  export type SourceData = {
    frames: {
      [x: string]: SpriteDefinition;
    };
    meta: AtlasMeta;
  };
}
declare module "shapez/core/loader" {
  export const Loader: LoaderImpl;
  export type Application = import("shapez/application").Application;
  /**
   * ;
   */
  export type AtlasDefinition =
    import("shapez/core/atlas_definitions").AtlasDefinition;
  class LoaderImpl {
    app: import("shapez/application").Application;
    /** @type {Map<string, BaseSprite>} */
    sprites: Map<string, BaseSprite>;
    rawImages: any[];
    /**
     * @param {Application} app
     */
    linkAppAfterBoot(app: Application): void;
    /**
     * Fetches a given sprite from the cache
     * @param {string} key
     * @returns {BaseSprite}
     */
    getSpriteInternal(key: string): BaseSprite;
    /**
     * Returns an atlas sprite from the cache
     * @param {string} key
     * @returns {AtlasSprite}
     */
    getSprite(key: string): AtlasSprite;
    /**
     * Returns a regular sprite from the cache
     * @param {string} key
     * @returns {RegularSprite}
     */
    getRegularSprite(key: string): RegularSprite;
    /**
     *
     * @param {string} key
     * @param {(progress: number) => void} progressHandler
     * @returns {Promise<HTMLImageElement|null>}
     */
    internalPreloadImage(
      key: string,
      progressHandler: (progress: number) => void,
    ): Promise<HTMLImageElement | null>;
    /**
     * Preloads a sprite
     * @param {string} key
     * @param {(progress: number) => void} progressHandler
     * @returns {Promise<void>}
     */
    preloadCSSSprite(
      key: string,
      progressHandler: (progress: number) => void,
    ): Promise<void>;
    /**
     * Preloads an atlas
     * @param {AtlasDefinition} atlas
     * @param {(progress: number) => void} progressHandler
     * @returns {Promise<void>}
     */
    preloadAtlas(
      atlas: AtlasDefinition,
      progressHandler: (progress: number) => void,
    ): Promise<void>;
    /**
     *
     * @param {AtlasDefinition} atlas
     * @param {HTMLImageElement} loadedImage
     */
    internalParseAtlas(
      {
        meta: { scale },
        sourceData,
      }: AtlasDefinition,
      loadedImage: HTMLImageElement,
    ): void;
    /**
     * Makes the canvas which shows the question mark, shown when a sprite was not found
     */
    makeSpriteNotFoundCanvas(): void;
    spriteNotFoundSprite: AtlasSprite;
  }
  import { BaseSprite } from "shapez/core/sprites";
  import { AtlasSprite } from "shapez/core/sprites";
  import { RegularSprite } from "shapez/core/sprites";
  export {};
}
declare module "shapez/game/building_codes" {
  /**
   * Registers a new variant
   * @param {number|string} code
   * @param {typeof MetaBuilding} meta
   * @param {string} variant
   * @param {number} rotationVariant
   */
  export function registerBuildingVariant(
    code: number | string,
    meta: typeof MetaBuilding,
    variant?: string,
    rotationVariant?: number,
  ): void;
  /**
   *
   * @param {string|number} code
   * @returns {BuildingVariantIdentifier}
   */
  export function getBuildingDataFromCode(
    code: string | number,
  ): BuildingVariantIdentifier;
  /**
   * Builds the cache for the codes
   */
  export function buildBuildingCodeCache(): void;
  /**
   * Finds the code for a given variant
   * @param {MetaBuilding} metaBuilding
   * @param {string} variant
   * @param {number} rotationVariant
   * @returns {number|string}
   */
  export function getCodeFromBuildingData(
    metaBuilding: MetaBuilding,
    variant: string,
    rotationVariant: number,
  ): number | string;
  /**
   * @typedef {{
   *   metaClass: typeof MetaBuilding,
   *   metaInstance?: MetaBuilding,
   *   variant?: string,
   *   rotationVariant?: number,
   *   tileSize?: Vector,
   *   sprite?: AtlasSprite,
   *   blueprintSprite?: AtlasSprite,
   *   silhouetteColor?: string
   * }} BuildingVariantIdentifier
   */
  /**
   * Stores a lookup table for all building variants (for better performance)
   * @type {Object<number|string, BuildingVariantIdentifier>}
   */
  export const gBuildingVariants: any;
  export type BuildingVariantIdentifier = {
    metaClass: typeof MetaBuilding;
    metaInstance?: MetaBuilding;
    variant?: string;
    rotationVariant?: number;
    tileSize?: Vector;
    sprite?: AtlasSprite;
    blueprintSprite?: AtlasSprite;
    silhouetteColor?: string;
  };
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Vector } from "shapez/core/vector";
  import { AtlasSprite } from "shapez/core/sprites";
}
declare module "shapez/game/components/static_map_entity" {
  export class StaticMapEntityComponent extends Component {
    static getSchema(): {
      origin: import("shapez/savegame/serialization_data_types").TypeVector;
      rotation: import("shapez/savegame/serialization_data_types").TypeNumber;
      originalRotation: import("shapez/savegame/serialization_data_types").TypeNumber;
      code: import("shapez/savegame/serialization_data_types").TypePositiveIntegerOrString;
    };
    /**
     *
     * @param {object} param0
     * @param {Vector=} param0.origin Origin (Top Left corner) of the entity
     * @param {Vector=} param0.tileSize Size of the entity in tiles
     * @param {number=} param0.rotation Rotation in degrees. Must be multiple of 90
     * @param {number=} param0.originalRotation Original Rotation in degrees. Must be multiple of 90
     * @param {number|string=} param0.code Building code
     */
    constructor({
      origin,
      tileSize,
      rotation,
      originalRotation,
      code,
    }: {
      origin?: Vector | undefined;
      tileSize?: Vector | undefined;
      rotation?: number | undefined;
      originalRotation?: number | undefined;
      code?: (number | string) | undefined;
    });
    /**
     * Returns the effective tile size
     * @returns {Vector}
     */
    getTileSize(): Vector;
    /**
     * Returns the sprite
     * @returns {AtlasSprite}
     */
    getSprite(): AtlasSprite;
    /**
     * Returns the blueprint sprite
     * @returns {AtlasSprite}
     */
    getBlueprintSprite(): AtlasSprite;
    /**
     * Returns the silhouette color
     * @returns {string}
     */
    getSilhouetteColor(): string;
    /**
     * Returns the meta building
     * @returns {import("shapez/../meta_building").MetaBuilding}
     */
    getMetaBuilding(): import("shapez/game/meta_building").MetaBuilding;
    /**
     * Returns the buildings variant
     * @returns {string}
     */
    getVariant(): string;
    /**
     * Returns the buildings rotation variant
     * @returns {number}
     */
    getRotationVariant(): number;
    /**
     * Copy the current state to another component
     * @param {Component} otherComponent
     */
    copyAdditionalStateTo(otherComponent: Component): StaticMapEntityComponent;
    origin: Vector;
    rotation: number;
    code: string | number;
    originalRotation: number;
    /**
     * Returns the effective rectangle of this entity in tile space
     * @returns {Rectangle}
     */
    getTileSpaceBounds(): Rectangle;
    /**
     * Transforms the given vector/rotation from local space to world space
     * @param {Vector} vector
     * @returns {Vector}
     */
    applyRotationToVector(vector: Vector): Vector;
    /**
     * Transforms the given vector/rotation from world space to local space
     * @param {Vector} vector
     * @returns {Vector}
     */
    unapplyRotationToVector(vector: Vector): Vector;
    /**
     * Transforms the given direction from local space
     * @param {enumDirection} direction
     * @returns {enumDirection}
     */
    localDirectionToWorld(direction: enumDirection): enumDirection;
    /**
     * Transforms the given direction from world to local space
     * @param {enumDirection} direction
     * @returns {enumDirection}
     */
    worldDirectionToLocal(direction: enumDirection): enumDirection;
    /**
     * Transforms from local tile space to global tile space
     * @param {Vector} localTile
     * @returns {Vector}
     */
    localTileToWorld(localTile: Vector): Vector;
    /**
     * Transforms from world space to local space
     * @param {Vector} worldTile
     */
    worldToLocalTile(worldTile: Vector): Vector;
    /**
     * Returns whether the entity should be drawn for the given parameters
     * @param {DrawParameters} parameters
     */
    shouldBeDrawn(parameters: DrawParameters): boolean;
    /**
     * Draws a sprite over the whole space of the entity
     * @param {DrawParameters} parameters
     * @param {AtlasSprite} sprite
     * @param {number=} extrudePixels How many pixels to extrude the sprite
     * @param {Vector=} overridePosition Whether to drwa the entity at a different location
     * @param {boolean=} pixelAligned
     * Whether to round the canvas coordinates, to avoid issues with transparency between tiling images
     */
    drawSpriteOnBoundsClipped(
      parameters: DrawParameters,
      sprite: AtlasSprite,
      extrudePixels?: number | undefined,
      overridePosition?: Vector | undefined,
      pixelAligned?: boolean | undefined,
    ): void;
  }
  import { Component } from "shapez/game/component";
  import { Vector } from "shapez/core/vector";
  import { AtlasSprite } from "shapez/core/sprites";
  import { Rectangle } from "shapez/core/rectangle";
  import { enumDirection } from "shapez/core/vector";
  import { DrawParameters } from "shapez/core/draw_parameters";
}
declare module "shapez/game/meta_building" {
  export const defaultBuildingVariant: "default";
  export class MetaBuilding {
    /**
     * Should return all possible variants of this building, no matter
     * if they are already available or will be unlocked later on
     *
     * @returns {Array<{ variant: string, rotationVariant?: number, internalId?: number|string }>}
     */
    static getAllVariantCombinations(): Array<{
      variant: string;
      rotationVariant?: number;
      internalId?: number | string;
    }>;
    /**
     *
     * @param {string} id Building id
     */
    constructor(id: string);
    id: string;
    /**
     * Returns the id of this building
     */
    getId(): string;
    /**
     * Returns the edit layer of the building
     * @returns {Layer}
     */
    getLayer(): Layer;
    /**
     * Should return the dimensions of the building
     */
    getDimensions(variant?: string): Vector;
    /**
     * Returns whether the building has the direction lock switch available
     * @param {string} variant
     */
    getHasDirectionLockAvailable(variant: string): boolean;
    /**
     * Whether to stay in placement mode after having placed a building
     */
    getStayInPlacementMode(): boolean;
    /**
     * Can return a special interlaved 9 elements overlay matrix for rendering
     * @param {number} rotation
     * @param {number} rotationVariant
     * @param {string} variant
     * @param {Entity} entity
     * @returns {Array<number>|null}
     */
    getSpecialOverlayRenderMatrix(
      rotation: number,
      rotationVariant: number,
      variant: string,
      entity: Entity,
    ): Array<number> | null;
    /**
     * Should return additional statistics about this building
     * @param {GameRoot} root
     * @param {string} variant
     * @returns {Array<[string, string]>}
     */
    getAdditionalStatistics(
      root: GameRoot,
      variant: string,
    ): Array<[string, string]>;
    /**
     * Returns whether this building can get replaced
     * @param {string} variant
     * @param {number} rotationVariant
     */
    getIsReplaceable(variant: string, rotationVariant: number): boolean;
    /**
     * Whether to flip the orientation after a building has been placed - useful
     * for tunnels.
     */
    getFlipOrientationAfterPlacement(): boolean;
    /**
     * Whether to show a preview of the wires layer when placing the building
     */
    getShowWiresLayerPreview(): boolean;
    /**
     * Whether to rotate automatically in the dragging direction while placing
     * @param {string} variant
     */
    getRotateAutomaticallyWhilePlacing(variant: string): boolean;
    /**
     * Returns whether this building is removable
     * @param {GameRoot} root
     * @returns {boolean}
     */
    getIsRemovable(root: GameRoot): boolean;
    /**
     * Returns the placement sound
     * @returns {string}
     */
    getPlacementSound(): string;
    /**
     * @param {GameRoot} root
     */
    getAvailableVariants(root: GameRoot): string[];
    /**
     * Returns a preview sprite
     * @returns {AtlasSprite}
     */
    getPreviewSprite(rotationVariant?: number, variant?: string): AtlasSprite;
    /**
     * Returns a sprite for blueprints
     * @returns {AtlasSprite}
     */
    getBlueprintSprite(rotationVariant?: number, variant?: string): AtlasSprite;
    /**
     * Returns whether this building is rotateable
     * @returns {boolean}
     */
    getIsRotateable(): boolean;
    /**
     * Returns whether this building is unlocked for the given game
     * @param {GameRoot} root
     */
    getIsUnlocked(root: GameRoot): boolean;
    /**
     * Should return a silhouette color for the map overview or null if not set
     * @param {string} variant
     * @param {number} rotationVariant
     */
    getSilhouetteColor(variant: string, rotationVariant: number): any;
    /**
     * Should return false if the pins are already included in the sprite of the building
     * @returns {boolean}
     */
    getRenderPins(): boolean;
    /**
     * Creates the entity without placing it
     * @param {object} param0
     * @param {GameRoot} param0.root
     * @param {Vector} param0.origin Origin tile
     * @param {number=} param0.rotation Rotation
     * @param {number} param0.originalRotation Original Rotation
     * @param {number} param0.rotationVariant Rotation variant
     * @param {string} param0.variant
     */
    createEntity({
      root,
      origin,
      rotation,
      originalRotation,
      rotationVariant,
      variant,
    }: {
      root: GameRoot;
      origin: Vector;
      rotation?: number | undefined;
      originalRotation: number;
      rotationVariant: number;
      variant: string;
    }): Entity;
    /**
     * Returns the sprite for a given variant
     * @param {number} rotationVariant
     * @param {string} variant
     * @returns {AtlasSprite}
     */
    getSprite(rotationVariant: number, variant: string): AtlasSprite;
    /**
     * Should compute the optimal rotation variant on the given tile
     * @param {object} param0
     * @param {GameRoot} param0.root
     * @param {Vector} param0.tile
     * @param {number} param0.rotation
     * @param {string} param0.variant
     * @param {Layer} param0.layer
     * @return {{ rotation: number, rotationVariant: number, connectedEntities?: Array<Entity> }}
     */
    computeOptimalDirectionAndRotationVariantAtTile({
      root,
      tile,
      rotation,
      variant,
      layer,
    }: {
      root: GameRoot;
      tile: Vector;
      rotation: number;
      variant: string;
      layer: Layer;
    }): {
      rotation: number;
      rotationVariant: number;
      connectedEntities?: Array<Entity>;
    };
    /**
     * Should update the entity to match the given variants
     * @param {Entity} entity
     * @param {number} rotationVariant
     * @param {string} variant
     */
    updateVariants(
      entity: Entity,
      rotationVariant: number,
      variant: string,
    ): void;
    /**
     * Should setup the entity components
     * @param {Entity} entity
     * @param {GameRoot} root
     * @abstract
     */
    setupEntityComponents(entity: Entity, root: GameRoot): void;
  }
  import { Vector } from "shapez/core/vector";
  import { Entity } from "shapez/game/entity";
  import { GameRoot } from "shapez/game/root";
  import { AtlasSprite } from "shapez/core/sprites";
}
declare module "shapez/game/items/boolean_item" {
  /**
   * Returns whether the item is Boolean and TRUE
   * @param {BaseItem} item
   * @returns {boolean}
   */
  export function isTrueItem(item: BaseItem): boolean;
  /**
   * Returns whether the item is truthy
   * @param {BaseItem} item
   * @returns {boolean}
   */
  export function isTruthyItem(item: BaseItem): boolean;
  export class BooleanItem extends BaseItem {
    static getSchema(): import("shapez/savegame/serialization_data_types").TypePositiveInteger;
    /**
     * @param {number} value
     */
    constructor(value: number);
    serialize(): number;
    deserialize(data: any): void;
    value: number;
    /** @returns {"boolean"} **/
    getItemType(): "boolean";
  }
  export const BOOL_FALSE_SINGLETON: BooleanItem;
  export const BOOL_TRUE_SINGLETON: BooleanItem;
  import { BaseItem } from "shapez/game/base_item";
}
declare module "shapez/game/colors" {
  export type enumColors = string;
  export namespace enumColors {
    let red: string;
    let green: string;
    let blue: string;
    let yellow: string;
    let purple: string;
    let cyan: string;
    let white: string;
    let uncolored: string;
  }
  export type enumColorToShortcode = string;
  /** @enum {string} */
  export const enumColorToShortcode: {
    [enumColors.red]: string;
    [enumColors.green]: string;
    [enumColors.blue]: string;
    [enumColors.yellow]: string;
    [enumColors.purple]: string;
    [enumColors.cyan]: string;
    [enumColors.white]: string;
    [enumColors.uncolored]: string;
  };
  export type enumShortcodeToColor = enumColors;
  /** @enum {enumColors} */
  export const enumShortcodeToColor: {};
  export type enumColorsToHexCode = string;
  /** @enum {string} */
  export const enumColorsToHexCode: {
    [enumColors.red]: string;
    [enumColors.green]: string;
    [enumColors.blue]: string;
    [enumColors.yellow]: string;
    [enumColors.purple]: string;
    [enumColors.cyan]: string;
    [enumColors.white]: string;
    [enumColors.uncolored]: string;
  };
  export type enumColorMixingResults = {
    [x: string]: string;
  };
  /** @enum {Object.<string, string>} */
  export const enumColorMixingResults: {};
  namespace c {}
  export {};
}
declare module "shapez/game/theme" {
  export function applyGameTheme(id: any): void;
  export const THEMES: {
    dark: typeof THEME;
    light: typeof THEME;
  };
  export let THEME: {
    map: {
      background: string;
      gridRegular: string;
      gridPlacing: string;
      gridLineWidth: number;
      selectionOverlay: string;
      selectionOutline: string;
      selectionBackground: string;
      chunkBorders: string;
      tutorialDragText: string;
      directionLock: {
        regular: {
          color: string;
          background: string;
        };
        wires: {
          color: string;
          background: string;
        };
        error: {
          color: string;
          background: string;
        };
      };
      colorBlindPickerTile: string;
      resources: {
        shape: string;
        red: string;
        green: string;
        blue: string;
      };
      chunkOverview: {
        empty: string;
        filled: string;
        beltColor: string;
      };
      wires: {
        overlayColor: string;
        previewColor: string;
        highlightColor: string;
      };
      connectedMiners: {
        overlay: string;
        textColor: string;
        textColorCapped: string;
        background: string;
      };
      zone: {
        borderSolid: string;
        outerColor: string;
      };
    };
    items: {
      outline: string;
      outlineWidth: number;
      circleBackground: string;
    };
    shapeTooltip: {
      background: string;
      outline: string;
    };
  };
}
declare module "shapez/game/shape_definition" {
  /**
   * Converts the given parameters to a valid shape definition
   * @param {*} layers
   * @returns {Array<ShapeLayer>}
   */
  export function createSimpleShape(layers: any): Array<ShapeLayer>;
  /**
   * @typedef {{
   *   context: CanvasRenderingContext2D,
   *   quadrantSize: number,
   *   layerScale: number,
   * }} SubShapeDrawOptions
   */
  /**
   * @type {Object<string, (options: SubShapeDrawOptions) => void>}
   */
  export const MODS_ADDITIONAL_SUB_SHAPE_DRAWERS: {
    [x: string]: (options: SubShapeDrawOptions) => void;
  };
  /**
   * @typedef {{
   *   subShape: enumSubShape,
   *   color: enumColors,
   * }} ShapeLayerItem
   */
  export const TOP_RIGHT: 0;
  export const BOTTOM_RIGHT: 1;
  export const BOTTOM_LEFT: 2;
  export const TOP_LEFT: 3;
  export type enumSubShape = string;
  export namespace enumSubShape {
    let rect: string;
    let circle: string;
    let star: string;
    let windmill: string;
  }
  export type enumSubShapeToShortcode = string;
  /** @enum {string} */
  export const enumSubShapeToShortcode: {
    [enumSubShape.rect]: string;
    [enumSubShape.circle]: string;
    [enumSubShape.star]: string;
    [enumSubShape.windmill]: string;
  };
  export type enumShortcodeToSubShape = enumSubShape;
  /** @enum {enumSubShape} */
  export const enumShortcodeToSubShape: {};
  export class ShapeDefinition extends BasicSerializableObject {
    static getId(): string;
    static getSchema(): {};
    /**
     * Generates the definition from the given short key
     * @param {string} key
     * @returns {ShapeDefinition}
     */
    static fromShortKey(key: string): ShapeDefinition;
    /**
     * Checks if a given string is a valid short key
     * @param {string} key
     * @returns {boolean}
     */
    static isValidShortKey(key: string): boolean;
    /**
     * INTERNAL
     * Checks if a given string is a valid short key
     * @param {string} key
     * @returns {boolean}
     */
    static isValidShortKeyInternal(key: string): boolean;
    /**
     *
     * @param {object} param0
     * @param {Array<ShapeLayer>=} param0.layers
     */
    constructor({ layers }: { layers?: Array<ShapeLayer> | undefined });
    deserialize(data: any): string;
    layers: any;
    serialize(): string;
    /** @type {string} */
    cachedHash: string;
    bufferGenerator: (
      canvas: HTMLCanvasElement,
      context: CanvasRenderingContext2D,
      w: number,
      h: number,
      dpi: number,
    ) => void;
    /**
     * Internal method to clone the shape definition
     * @returns {Array<ShapeLayer>}
     */
    getClonedLayers(): Array<ShapeLayer>;
    /**
     * Returns if the definition is entirely empty^
     * @returns {boolean}
     */
    isEntirelyEmpty(): boolean;
    /**
     * Returns a unique id for this shape
     * @returns {string}
     */
    getHash(): string;
    /**
     * Draws the shape definition
     * @param {number} x
     * @param {number} y
     * @param {DrawParameters} parameters
     * @param {number=} diameter
     */
    drawCentered(
      x: number,
      y: number,
      parameters: DrawParameters,
      diameter?: number | undefined,
    ): void;
    /**
     * Draws the item to a canvas
     * @param {CanvasRenderingContext2D} context
     * @param {number} size
     */
    drawFullSizeOnCanvas(context: CanvasRenderingContext2D, size: number): void;
    /**
     * Generates this shape as a canvas
     * @param {number} size
     */
    generateAsCanvas(size?: number): HTMLCanvasElement;
    /**
     *
     * @param {HTMLCanvasElement} canvas
     * @param {CanvasRenderingContext2D} context
     * @param {number} w
     * @param {number} h
     * @param {number} dpi
     */
    internalGenerateShapeBuffer(
      canvas: HTMLCanvasElement,
      context: CanvasRenderingContext2D,
      w: number,
      h: number,
      dpi: number,
    ): void;
    /**
     * Returns a definition with only the given quadrants
     * @param {Array<number>} includeQuadrants
     * @returns {ShapeDefinition}
     */
    cloneFilteredByQuadrants(includeQuadrants: Array<number>): ShapeDefinition;
    /**
     * Returns a definition which was rotated clockwise
     * @returns {ShapeDefinition}
     */
    cloneRotateCW(): ShapeDefinition;
    /**
     * Returns a definition which was rotated counter clockwise
     * @returns {ShapeDefinition}
     */
    cloneRotateCCW(): ShapeDefinition;
    /**
     * Returns a definition which was rotated 180 degrees
     * @returns {ShapeDefinition}
     */
    cloneRotate180(): ShapeDefinition;
    /**
     * Stacks the given shape definition on top.
     * @param {ShapeDefinition} definition
     */
    cloneAndStackWith(definition: ShapeDefinition): ShapeDefinition;
    /**
     * Clones the shape and colors everything in the given color
     * @param {enumColors} color
     */
    cloneAndPaintWith(color: enumColors): ShapeDefinition;
    /**
     * Clones the shape and colors everything in the given colors
     * @param {[enumColors, enumColors, enumColors, enumColors]} colors
     */
    cloneAndPaintWith4Colors(
      colors: [enumColors, enumColors, enumColors, enumColors],
    ): ShapeDefinition;
  }
  export type SubShapeDrawOptions = {
    context: CanvasRenderingContext2D;
    quadrantSize: number;
    layerScale: number;
  };
  export type ShapeLayerItem = {
    subShape: enumSubShape;
    color: enumColors;
  };
  /**
   * Order is Q1 (tr), Q2(br), Q3(bl), Q4(tl)
   */
  export type ShapeLayer = [
    ShapeLayerItem?,
    ShapeLayerItem?,
    ShapeLayerItem?,
    ShapeLayerItem?,
  ];
  import { BasicSerializableObject } from "shapez/savegame/serialization";
  import { DrawParameters } from "shapez/core/draw_parameters";
  import { enumColors } from "shapez/game/colors";
}
declare module "shapez/game/items/shape_item" {
  export class ShapeItem extends BaseItem {
    static getSchema(): import("shapez/savegame/serialization_data_types").TypeString;
    /**
     * @param {ShapeDefinition} definition
     */
    constructor(definition: ShapeDefinition);
    serialize(): string;
    deserialize(data: any): void;
    definition: ShapeDefinition;
    /** @returns {"shape"} **/
    getItemType(): "shape";
  }
  import { BaseItem } from "shapez/game/base_item";
  import { ShapeDefinition } from "shapez/game/shape_definition";
}
declare module "shapez/game/items/color_item" {
  export class ColorItem extends BaseItem {
    static getSchema(): import("shapez/savegame/serialization_data_types").TypeEnum;
    /**
     * @param {enumColors} color
     */
    constructor(color: enumColors);
    serialize(): string;
    deserialize(data: any): void;
    color: string;
    /** @returns {"color"} **/
    getItemType(): "color";
    getBackgroundColorAsResource(): any;
    cachedSprite: import("shapez/core/sprites").AtlasSprite;
  }
  /**
   * Singleton instances
   * @type {Object<enumColors, ColorItem>}
   */
  export const COLOR_ITEM_SINGLETONS: any;
  import { BaseItem } from "shapez/game/base_item";
  import { enumColors } from "shapez/game/colors";
}
declare module "shapez/game/item_resolver" {
  /**
   * Resolves items so we share instances
   * @param {import("shapez/../savegame/savegame_serializer").GameRoot} root
   * @param {{$: string, data: any }} data
   */
  export function itemResolverSingleton(
    root: import("shapez/savegame/savegame_serializer").GameRoot,
    data: {
      $: string;
      data: any;
    },
  ): any;
  export const MODS_ADDITIONAL_ITEMS: {};
  export const typeItemSingleton: import("shapez/savegame/serialization_data_types").TypeClass;
}
declare module "shapez/core/stale_area_detector" {
  export class StaleAreaDetector {
    /**
     *
     * @param {object} param0
     * @param {import("shapez/../game/root").GameRoot} param0.root
     * @param {string} param0.name The name for reference
     * @param {(Rectangle) => void} param0.recomputeMethod Method which recomputes the given area
     */
    constructor({
      root,
      name,
      recomputeMethod,
    }: {
      root: import("shapez/game/root").GameRoot;
      name: string;
      recomputeMethod: (Rectangle: any) => void;
    });
    root: import("shapez/game/root").GameRoot;
    name: string;
    recomputeMethod: (Rectangle: any) => void;
    /** @type {Rectangle} */
    staleArea: Rectangle;
    /**
     * Invalidates the given area
     * @param {Rectangle} area
     */
    invalidate(area: Rectangle): void;
    /**
     * Makes this detector recompute the area of an entity whenever
     * it changes in any way
     * @param {Array<typeof Component>} components
     * @param {number} tilesAround How many tiles arround to expand the area
     */
    recomputeOnComponentsChanged(
      components: Array<typeof Component>,
      tilesAround: number,
    ): void;
    /**
     * Updates the stale area
     */
    update(): void;
  }
  import { Rectangle } from "shapez/core/rectangle";
  import { Component } from "shapez/game/component";
}
declare module "shapez/game/components/wire" {
  export type enumWireType = string;
  export namespace enumWireType {
    let forward: string;
    let turn: string;
    let split: string;
    let cross: string;
  }
  export type enumWireVariant = string;
  export namespace enumWireVariant {
    let first: string;
    let second: string;
  }
  export class WireComponent extends Component {
    /**
     * @param {object} param0
     * @param {enumWireType=} param0.type
     * @param {enumWireVariant=} param0.variant
     */
    constructor({
      type,
      variant,
    }: {
      type?: enumWireType | undefined;
      variant?: enumWireVariant | undefined;
    });
    type: string;
    /**
     * The variant of the wire, different variants do not connect
     * @type {enumWireVariant}
     */
    variant: enumWireVariant;
    /**
     * @type {import("shapez/../systems/wire").WireNetwork}
     */
    linkedNetwork: import("shapez/game/systems/wire").WireNetwork;
  }
  import { Component } from "shapez/game/component";
}
declare module "shapez/game/tutorial_goals" {
  /**
   * Don't forget to also update tutorial_goals_mappings.js as well as the translations!
   */
  export type enumHubGoalRewards = string;
  export namespace enumHubGoalRewards {
    let reward_cutter_and_trash: string;
    let reward_rotator: string;
    let reward_painter: string;
    let reward_mixer: string;
    let reward_stacker: string;
    let reward_balancer: string;
    let reward_tunnel: string;
    let reward_rotator_ccw: string;
    let reward_rotator_180: string;
    let reward_miner_chainable: string;
    let reward_underground_belt_tier_2: string;
    let reward_belt_reader: string;
    let reward_splitter: string;
    let reward_cutter_quad: string;
    let reward_painter_double: string;
    let reward_storage: string;
    let reward_merger: string;
    let reward_wires_painter_and_levers: string;
    let reward_display: string;
    let reward_constant_signal: string;
    let reward_logic_gates: string;
    let reward_virtual_processing: string;
    let reward_filter: string;
    let reward_demo_end: string;
    let reward_blueprints: string;
    let reward_freeplay: string;
    let no_reward: string;
    let no_reward_freeplay: string;
  }
}
declare module "shapez/core/draw_utils" {
  /**
   *
   * @param {object} param0
   * @param {DrawParameters} param0.parameters
   * @param {AtlasSprite} param0.sprite
   * @param {number} param0.x
   * @param {number} param0.y
   * @param {number} param0.angle
   * @param {number} param0.size
   * @param {number=} param0.offsetX
   * @param {number=} param0.offsetY
   */
  export function drawRotatedSprite({
    parameters,
    sprite,
    x,
    y,
    angle,
    size,
    offsetX,
    offsetY,
  }: {
    parameters: DrawParameters;
    sprite: AtlasSprite;
    x: number;
    y: number;
    angle: number;
    size: number;
    offsetX?: number | undefined;
    offsetY?: number | undefined;
  }): void;
  /**
   * Draws a sprite with clipping
   * @param {object} param0
   * @param {DrawParameters} param0.parameters
   * @param {HTMLCanvasElement} param0.sprite
   * @param {number} param0.x
   * @param {number} param0.y
   * @param {number} param0.w
   * @param {number} param0.h
   * @param {number} param0.originalW
   * @param {number} param0.originalH
   * @param {boolean=} param0.pixelAligned
   * Whether to round the canvas coordinates, to avoid issues with transparency between tiling images
   */
  export function drawSpriteClipped({
    parameters,
    sprite,
    x,
    y,
    w,
    h,
    originalW,
    originalH,
    pixelAligned,
  }: {
    parameters: DrawParameters;
    sprite: HTMLCanvasElement;
    x: number;
    y: number;
    w: number;
    h: number;
    originalW: number;
    originalH: number;
    pixelAligned?: boolean | undefined;
  }): void;
  export type AtlasSprite = import("shapez/core/sprites").AtlasSprite;
  export type DrawParameters =
    import("shapez/core/draw_parameters").DrawParameters;
}
declare module "shapez/game/buildings/wire" {
  export const arrayWireRotationVariantToType: string[];
  export const wireOverlayMatrices: {
    [enumWireType.forward]: {
      [x: number]: number[];
    };
    [enumWireType.split]: {
      [x: number]: number[];
    };
    [enumWireType.turn]: {
      [x: number]: number[];
    };
    [enumWireType.cross]: {
      [x: number]: number[];
    };
  };
  export type wireVariants = string;
  export namespace wireVariants {
    let second: string;
  }
  export class MetaWireBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
      rotationVariant: number;
    }[];
    constructor();
    getHasDirectionLockAvailable(): boolean;
    getSilhouetteColor(): string;
    getAvailableVariants(): string[];
    getDimensions(): Vector;
    getRotateAutomaticallyWhilePlacing(): boolean;
    /** @returns {"wires"} **/
    getLayer(): "wires";
    getSprite(): any;
    getIsReplaceable(): boolean;
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
    /**
     *
     * @param {number} rotationVariant
     * @param {string} variant
     * @returns {import("shapez/../../core/draw_utils").AtlasSprite}
     */
    getPreviewSprite(
      rotationVariant: number,
      variant: string,
    ): import("shapez/core/draw_utils").AtlasSprite;
    getBlueprintSprite(
      rotationVariant: any,
      variant: any,
    ): import("shapez/core/sprites").AtlasSprite;
    /**
     * Should compute the optimal rotation variant on the given tile
     * @param {object} param0
     * @param {GameRoot} param0.root
     * @param {Vector} param0.tile
     * @param {number} param0.rotation
     * @param {string} param0.variant
     * @param {string} param0.layer
     * @return {{ rotation: number, rotationVariant: number, connectedEntities?: Array<Entity> }}
     */
    computeOptimalDirectionAndRotationVariantAtTile({
      root,
      tile,
      rotation,
      variant,
      layer,
    }: {
      root: GameRoot;
      tile: Vector;
      rotation: number;
      variant: string;
      layer: string;
    }): {
      rotation: number;
      rotationVariant: number;
      connectedEntities?: Array<Entity>;
    };
  }
  import { enumWireType } from "shapez/game/components/wire";
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Vector } from "shapez/core/vector";
  import { Entity } from "shapez/game/entity";
  import { GameRoot } from "shapez/game/root";
}
declare module "shapez/game/components/wire_tunnel" {
  export class WireTunnelComponent extends Component {
    constructor();
    /**
     * Linked network, only if its not multiple directions
     * @type {Array<import("shapez/../systems/wire").WireNetwork>}
     */
    linkedNetworks: Array<import("shapez/game/systems/wire").WireNetwork>;
  }
  import { Component } from "shapez/game/component";
}
declare module "shapez/game/game_system" {
  /**
   * A game system processes all entities which match a given schema, usually a list of
   * required components. This is the core of the game logic.
   */
  export class GameSystem {
    /**
     * @param {GameRoot} root
     */
    constructor(root: GameRoot);
    root: GameRoot;
    /**
     * Updates the game system, override to perform logic
     */
    update(): void;
    /**
     * Override, do not call this directly, use startDraw()
     * @param {DrawParameters} parameters
     */
    draw(parameters: DrawParameters): void;
    /**
     * Should refresh all caches
     */
    refreshCaches(): void;
    /**
     * @see GameSystem.draw Wrapper arround the draw method
     * @param {DrawParameters} parameters
     */
    startDraw(parameters: DrawParameters): void;
  }
  import { GameRoot } from "shapez/game/root";
  import { DrawParameters } from "shapez/core/draw_parameters";
}
declare module "shapez/game/map_chunk" {
  /**
   * @type {Object<string, (distanceToOriginInChunks: number) => number>}
   */
  export const MODS_ADDITIONAL_SHAPE_MAP_WEIGHTS: {
    [x: string]: (distanceToOriginInChunks: number) => number;
  };
  export class MapChunk {
    /**
     *
     * @param {GameRoot} root
     * @param {number} x
     * @param {number} y
     */
    constructor(root: GameRoot, x: number, y: number);
    root: GameRoot;
    x: number;
    y: number;
    tileX: number;
    tileY: number;
    /**
     * Stores the contents of the lower (= map resources) layer
     *  @type {Array<Array<?BaseItem>>}
     */
    lowerLayer: Array<Array<BaseItem | null>>;
    /**
     * Stores the contents of the regular layer
     * @type {Array<Array<?Entity>>}
     */
    contents: Array<Array<Entity | null>>;
    /**
     * Stores the contents of the wires layer
     *  @type {Array<Array<?Entity>>}
     */
    wireContents: Array<Array<Entity | null>>;
    /** @type {Array<Entity>} */
    containedEntities: Array<Entity>;
    /**
     * World space rectangle, can be used for culling
     */
    worldSpaceRectangle: Rectangle;
    /**
     * Tile space rectangle, can be used for culling
     */
    tileSpaceRectangle: Rectangle;
    /**
     * Which entities this chunk contains, sorted by layer
     * @type {Record<Layer, Array<Entity>>}
     */
    containedEntitiesByLayer: Record<Layer, Array<Entity>>;
    /**
     * Store which patches we have so we can render them in the overview
     * @type {Array<{pos: Vector, item: BaseItem, size: number }>}
     */
    patches: Array<{
      pos: Vector;
      item: BaseItem;
      size: number;
    }>;
    /**
     * Generates a patch filled with the given item
     * @param {RandomNumberGenerator} rng
     * @param {number} patchSize
     * @param {BaseItem} item
     * @param {number=} overrideX Override the X position of the patch
     * @param {number=} overrideY Override the Y position of the patch
     */
    internalGeneratePatch(
      rng: RandomNumberGenerator,
      patchSize: number,
      item: BaseItem,
      overrideX?: number | undefined,
      overrideY?: number | undefined,
    ): void;
    /**
     * Generates a color patch
     * @param {RandomNumberGenerator} rng
     * @param {number} colorPatchSize
     * @param {number} distanceToOriginInChunks
     */
    internalGenerateColorPatch(
      rng: RandomNumberGenerator,
      colorPatchSize: number,
      distanceToOriginInChunks: number,
    ): void;
    /**
     * Generates a shape patch
     * @param {RandomNumberGenerator} rng
     * @param {number} shapePatchSize
     * @param {number} distanceToOriginInChunks
     */
    internalGenerateShapePatch(
      rng: RandomNumberGenerator,
      shapePatchSize: number,
      distanceToOriginInChunks: number,
    ): void;
    /**
     * Chooses a random shape with the given weights
     * @param {RandomNumberGenerator} rng
     * @param {Object.<enumSubShape, number>} weights
     * @returns {enumSubShape}
     */
    internalGenerateRandomSubShape(
      rng: RandomNumberGenerator,
      weights: any,
    ): enumSubShape;
    /**
     * Generates the lower layer "terrain"
     */
    generateLowerLayer(): void;
    /**
     *
     * @param {object} param0
     * @param {RandomNumberGenerator} param0.rng
     * @param {Vector} param0.chunkCenter
     * @param {number} param0.distanceToOriginInChunks
     */
    generatePatches({
      rng,
      chunkCenter,
      distanceToOriginInChunks,
    }: {
      rng: RandomNumberGenerator;
      chunkCenter: Vector;
      distanceToOriginInChunks: number;
    }): void;
    /**
     * Checks if this chunk has predefined contents, and if so returns true and generates the
     * predefined contents
     * @param {RandomNumberGenerator} rng
     * @returns {boolean}
     */
    generatePredefined(rng: RandomNumberGenerator): boolean;
    /**
     *
     * @param {number} worldX
     * @param {number} worldY
     * @returns {BaseItem=}
     */
    getLowerLayerFromWorldCoords(
      worldX: number,
      worldY: number,
    ): BaseItem | undefined;
    /**
     * Returns the contents of this chunk from the given world space coordinates
     * @param {number} worldX
     * @param {number} worldY
     * @returns {Entity=}
     */
    getTileContentFromWorldCoords(
      worldX: number,
      worldY: number,
    ): Entity | undefined;
    /**
     * Returns the contents of this chunk from the given world space coordinates
     * @param {number} worldX
     * @param {number} worldY
     * @param {Layer} layer
     * @returns {Entity=}
     */
    getLayerContentFromWorldCoords(
      worldX: number,
      worldY: number,
      layer: Layer,
    ): Entity | undefined;
    /**
     * Returns the contents of this chunk from the given world space coordinates
     * @param {number} worldX
     * @param {number} worldY
     * @returns {Array<Entity>}
     */
    getLayersContentsMultipleFromWorldCoords(
      worldX: number,
      worldY: number,
    ): Array<Entity>;
    /**
     * Returns the chunks contents from the given local coordinates
     * @param {number} localX
     * @param {number} localY
     * @returns {Entity=}
     */
    getTileContentFromLocalCoords(
      localX: number,
      localY: number,
    ): Entity | undefined;
    /**
     * Sets the chunks contents
     * @param {number} tileX
     * @param {number} tileY
     * @param {Entity} contents
     * @param {Layer} layer
     */
    setLayerContentFromWorldCords(
      tileX: number,
      tileY: number,
      contents: Entity,
      layer: Layer,
    ): void;
  }
  import { GameRoot } from "shapez/game/root";
  import { BaseItem } from "shapez/game/base_item";
  import { Entity } from "shapez/game/entity";
  import { Rectangle } from "shapez/core/rectangle";
  import { Vector } from "shapez/core/vector";
  import { RandomNumberGenerator } from "shapez/core/rng";
  import { enumSubShape } from "shapez/game/shape_definition";
}
declare module "shapez/game/map_chunk_view" {
  export const CHUNK_OVERLAY_RES: 3;
  export namespace MOD_CHUNK_DRAW_HOOKS {
    let backgroundLayerBefore: any[];
    let backgroundLayerAfter: any[];
    let foregroundDynamicBefore: any[];
    let foregroundDynamicAfter: any[];
    let staticBefore: any[];
    let staticAfter: any[];
  }
  export class MapChunkView extends MapChunk {
    /**
     * @param {object} param0
     * @param {CanvasRenderingContext2D} param0.context
     * @param {number} param0.x
     * @param {number} param0.y
     * @param {Entity} param0.entity
     * @param {number} param0.tileSizePixels
     * @param {string=} param0.overrideColor Optionally override the color to be rendered
     */
    static drawSingleWiresOverviewTile({
      context,
      x,
      y,
      entity,
      tileSizePixels,
      overrideColor,
    }: {
      context: CanvasRenderingContext2D;
      x: number;
      y: number;
      entity: Entity;
      tileSizePixels: number;
      overrideColor?: string | undefined;
    }): void;
    /**
     * Whenever something changes, we increase this number - so we know we need to redraw
     */
    renderIteration: number;
    /**
     * Marks this chunk as dirty, rerendering all caches
     */
    markDirty(): void;
    renderKey: string;
    /**
     * Draws the background layer
     * @param {DrawParameters} parameters
     */
    drawBackgroundLayer(parameters: DrawParameters): void;
    /**
     * Draws the dynamic foreground layer
     * @param {DrawParameters} parameters
     */
    drawForegroundDynamicLayer(parameters: DrawParameters): void;
    /**
     * Draws the static foreground layer
     * @param {DrawParameters} parameters
     */
    drawForegroundStaticLayer(parameters: DrawParameters): void;
    /**
     * @param {DrawParameters} parameters
     * @param {number} xoffs
     * @param {number} yoffs
     * @param {number} diameter
     */
    drawOverlayPatches(
      parameters: DrawParameters,
      xoffs: number,
      yoffs: number,
      diameter: number,
    ): void;
    /**
     *
     * @param {CanvasRenderingContext2D} context
     * @param {number} w
     * @param {number} h
     * @param {number=} xoffs
     * @param {number=} yoffs
     */
    generateOverlayBuffer(
      context: CanvasRenderingContext2D,
      w: number,
      h: number,
      xoffs?: number | undefined,
      yoffs?: number | undefined,
    ): void;
    /**
     * Draws the wires layer
     * @param {DrawParameters} parameters
     */
    drawWiresForegroundLayer(parameters: DrawParameters): void;
  }
  import { MapChunk } from "shapez/game/map_chunk";
  import { DrawParameters } from "shapez/core/draw_parameters";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/systems/wire" {
  export class WireNetwork {
    /**
     * Who contributes to this network
     * @type {Array<{ entity: Entity, slot: import("shapez/../components/wired_pins").WirePinSlot }>} */
    providers: Array<{
      entity: Entity;
      slot: import("shapez/game/components/wired_pins").WirePinSlot;
    }>;
    /**
     * Who takes values from this network
     * @type {Array<{ entity: Entity, slot: import("shapez/../components/wired_pins").WirePinSlot }>} */
    receivers: Array<{
      entity: Entity;
      slot: import("shapez/game/components/wired_pins").WirePinSlot;
    }>;
    /**
     * All connected slots
     * @type {Array<{ entity: Entity, slot: import("shapez/../components/wired_pins").WirePinSlot }>}
     */
    allSlots: Array<{
      entity: Entity;
      slot: import("shapez/game/components/wired_pins").WirePinSlot;
    }>;
    /**
     * All connected tunnels
     * @type {Array<Entity>}
     */
    tunnels: Array<Entity>;
    /**
     * Which wires are in this network
     * @type {Array<Entity>}
     */
    wires: Array<Entity>;
    /**
     * The current value of this network
     * @type {BaseItem}
     */
    currentValue: BaseItem;
    /**
     * Whether this network has a value conflict, that is, more than one
     * sender has sent a value
     * @type {boolean}
     */
    valueConflict: boolean;
    /**
     * Unique network identifier
     * @type {number}
     */
    uid: number;
    /**
     * Returns whether this network currently has a value
     * @returns {boolean}
     */
    hasValue(): boolean;
  }
  export class WireSystem extends GameSystem {
    constructor(root: any);
    /**
     * @type {Object<enumWireVariant, Object<enumWireType, AtlasSprite>>}
     */
    wireSprites: any;
    needsRecompute: boolean;
    isFirstRecompute: boolean;
    staleArea: StaleAreaDetector;
    /**
     * @type {Array<WireNetwork>}
     */
    networks: Array<WireNetwork>;
    /**
     * Invalidates the wires network if the given entity is relevant for it
     * @param {Entity} entity
     */
    queueRecomputeIfWire(entity: Entity): void;
    /**
     * Recomputes the whole wires network
     */
    recomputeWiresNetwork(): void;
    /**
     * Finds the network for the given slot
     * @param {Entity} initialEntity
     * @param {import("shapez/../components/wired_pins").WirePinSlot} slot
     */
    findNetworkForEjector(
      initialEntity: Entity,
      slot: import("shapez/game/components/wired_pins").WirePinSlot,
    ): void;
    /**
     * Finds surrounding entities which are not yet assigned to a network
     * @param {Vector} initialTile
     * @param {Array<enumDirection>} directions
     * @param {WireNetwork} network
     * @param {enumWireVariant=} variantMask Only accept connections to this mask
     * @returns {Array<any>}
     */
    findSurroundingWireTargets(
      initialTile: Vector,
      directions: Array<enumDirection>,
      network: WireNetwork,
      variantMask?: enumWireVariant | undefined,
    ): Array<any>;
    /**
     * Returns the given tileset and opacity
     * @param {WireComponent} wireComp
     * @returns {{ spriteSet: Object<enumWireType, import("shapez/../../core/draw_utils").AtlasSprite>, opacity: number}}
     */
    getSpriteSetAndOpacityForWire(wireComp: WireComponent): {
      spriteSet: any;
      opacity: number;
    };
    /**
     * Draws a given chunk
     * @param {import("shapez/../../core/draw_utils").DrawParameters} parameters
     * @param {MapChunkView} chunk
     */
    drawChunk(
      parameters: import("shapez/core/draw_utils").DrawParameters,
      chunk: MapChunkView,
    ): void;
    /**
     * Returns whether this entity is relevant for the wires network
     * @param {Entity} entity
     */
    isEntityRelevantForWires(
      entity: Entity,
    ): WireComponent | WireTunnelComponent | WiredPinsComponent;
    /**
     *
     * @param {Entity} entity
     */
    queuePlacementUpdate(entity: Entity): void;
    /**
     * Updates the wire placement after an entity has been added / deleted
     * @param {Rectangle} affectedArea
     */
    updateSurroundingWirePlacement(affectedArea: Rectangle): void;
  }
  import { Entity } from "shapez/game/entity";
  import { BaseItem } from "shapez/game/base_item";
  import { GameSystem } from "shapez/game/game_system";
  import { StaleAreaDetector } from "shapez/core/stale_area_detector";
  import { Vector } from "shapez/core/vector";
  import { enumDirection } from "shapez/core/vector";
  import { enumWireVariant } from "shapez/game/components/wire";
  import { WireComponent } from "shapez/game/components/wire";
  import { MapChunkView } from "shapez/game/map_chunk_view";
  import { WireTunnelComponent } from "shapez/game/components/wire_tunnel";
  import { WiredPinsComponent } from "shapez/game/components/wired_pins";
  import { Rectangle } from "shapez/core/rectangle";
}
declare module "shapez/game/components/wired_pins" {
  export type enumPinSlotType = string;
  export namespace enumPinSlotType {
    let logicalEjector: string;
    let logicalAcceptor: string;
  }
  /** @typedef {{
   *   pos: Vector,
   *   type: enumPinSlotType,
   *   direction: enumDirection
   * }} WirePinSlotDefinition */
  /** @typedef {{
   *   pos: Vector,
   *   type: enumPinSlotType,
   *   direction: enumDirection,
   *   value: BaseItem,
   *   linkedNetwork: import("shapez/../systems/wire").WireNetwork
   * }} WirePinSlot */
  export class WiredPinsComponent extends Component {
    static getSchema(): {
      slots: import("shapez/savegame/serialization_data_types").TypeArray;
    };
    /**
     *
     * @param {object} param0
     * @param {Array<WirePinSlotDefinition>} param0.slots
     */
    constructor({ slots }: { slots: Array<WirePinSlotDefinition> });
    /**
     * Sets the slots of this building
     * @param {Array<WirePinSlotDefinition>} slots
     */
    setSlots(slots: Array<WirePinSlotDefinition>): void;
    /** @type {Array<WirePinSlot>} */
    slots: Array<WirePinSlot>;
  }
  export type WirePinSlotDefinition = {
    pos: Vector;
    type: enumPinSlotType;
    direction: enumDirection;
  };
  export type WirePinSlot = {
    pos: Vector;
    type: enumPinSlotType;
    direction: enumDirection;
    value: BaseItem;
    linkedNetwork: import("shapez/game/systems/wire").WireNetwork;
  };
  import { Component } from "shapez/game/component";
  import { Vector } from "shapez/core/vector";
  import { enumDirection } from "shapez/core/vector";
  import { BaseItem } from "shapez/game/base_item";
}
declare module "shapez/game/buildings/hub" {
  export class MetaHubBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
    }[];
    constructor();
    getDimensions(): Vector;
    getSilhouetteColor(): string;
    getBlueprintSprite(): any;
    getIsRemovable(): boolean;
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
  }
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Vector } from "shapez/core/vector";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/camera" {
  export const USER_INTERACT_MOVE: "move";
  export const USER_INTERACT_ZOOM: "zoom";
  export const USER_INTERACT_TOUCHEND: "touchend";
  export type enumMouseButton = string;
  export namespace enumMouseButton {
    let left: string;
    let middle: string;
    let right: string;
  }
  export class Camera extends BasicSerializableObject {
    static getId(): string;
    static getSchema(): {
      zoomLevel: import("shapez/savegame/serialization_data_types").TypeNumber;
      center: import("shapez/savegame/serialization_data_types").TypeVector;
    };
    constructor(root: any);
    /** @type {GameRoot} */
    root: GameRoot;
    zoomLevel: number;
    /** @type {Vector} */
    center: Vector;
    currentlyMoving: boolean;
    lastMovingPosition: Vector;
    lastMovingPositionLastTick: any;
    numTicksStandingStill: number;
    cameraUpdateTimeBucket: number;
    didMoveSinceTouchStart: boolean;
    currentlyPinching: boolean;
    lastPinchPositions: Vector[];
    keyboardForce: Vector;
    /** @type {Signal<[string]>} */
    userInteraction: Signal<[string]>;
    /** @type {Vector} */
    currentShake: Vector;
    /** @type {Vector} */
    currentPan: Vector;
    /** @type {Vector} */
    desiredPan: Vector;
    /** @type {Vector} */
    desiredCenter: Vector;
    /** @type {number} */
    desiredZoom: number;
    /** @type {Vector} */
    touchPostMoveVelocity: Vector;
    downPreHandler: Signal<[Vector, string]>;
    movePreHandler: Signal<[Vector]>;
    upPostHandler: Signal<[Vector]>;
    deserialize(data: any): string;
    addScreenShake(amount: any): void;
    /**
     * Sets a point in world space to focus on
     * @param {Vector} center
     */
    setDesiredCenter(center: Vector): void;
    /**
     * Sets a desired zoom level
     * @param {number} zoom
     */
    setDesiredZoom(zoom: number): void;
    /**
     * Returns if this camera is currently moving by a non-user interaction
     */
    isCurrentlyMovingToDesiredCenter(): boolean;
    /**
     * Sets the camera pan, every frame the camera will move by this amount
     * @param {Vector} pan
     */
    setPan(pan: Vector): void;
    /**
     * Finds a good initial zoom level
     */
    findInitialZoom(): number;
    /**
     * Clears all animations
     */
    clearAnimations(): void;
    /**
     * Returns if the user is currently interacting with the camera
     * @returns {boolean} true if the user interacts
     */
    isCurrentlyInteracting(): boolean;
    /**
     * Returns if in the next frame the viewport will change
     * @returns {boolean} true if it willchange
     */
    viewportWillChange(): boolean;
    /**
     * Cancels all interactions, that is user interaction and non user interaction
     */
    cancelAllInteractions(): void;
    /**
     * Returns effective viewport width
     */
    getViewportWidth(): number;
    /**
     * Returns effective viewport height
     */
    getViewportHeight(): number;
    /**
     * Returns effective world space viewport left
     */
    getViewportLeft(): number;
    /**
     * Returns effective world space viewport right
     */
    getViewportRight(): number;
    /**
     * Returns effective world space viewport top
     */
    getViewportTop(): number;
    /**
     * Returns effective world space viewport bottom
     */
    getViewportBottom(): number;
    /**
     * Returns the visible world space rect
     * @returns {Rectangle}
     */
    getVisibleRect(): Rectangle;
    getIsMapOverlayActive(): boolean;
    /**
     * Attaches all event listeners
     */
    internalInitEvents(): void;
    eventListenerTouchStart: (event: TouchEvent) => boolean;
    eventListenerTouchEnd: (event?: TouchEvent | undefined) => boolean;
    eventListenerTouchMove: (event: TouchEvent) => boolean;
    eventListenerMousewheel: (event: WheelEvent) => boolean;
    eventListenerMouseDown: (event: MouseEvent) => boolean;
    eventListenerMouseMove: (event: MouseEvent) => boolean;
    eventListenerMouseUp: (event?: MouseEvent | undefined) => boolean;
    /**
     * Cleans up all event listeners
     */
    cleanup(): void;
    /**
     * Binds the arrow keys
     */
    bindKeys(): void;
    centerOnMap(): void;
    /**
     * Converts from screen to world space
     * @param {Vector} screen
     * @returns {Vector} world space
     */
    screenToWorld(screen: Vector): Vector;
    /**
     * Converts from world to screen space
     * @param {Vector} world
     * @returns {Vector} screen space
     */
    worldToScreen(world: Vector): Vector;
    /**
     * Returns if a point is on screen
     * @param {Vector} point
     * @returns {boolean} true if its on screen
     */
    isWorldPointOnScreen(point: Vector): boolean;
    getMaximumZoom(): number;
    getMinimumZoom(): number;
    /**
     * Returns if we can further zoom in
     * @returns {boolean}
     */
    canZoomIn(): boolean;
    /**
     * Returns if we can further zoom out
     * @returns {boolean}
     */
    canZoomOut(): boolean;
    /**
     * Checks if the mouse event is too close after a touch event and thus
     * should get ignored
     */
    checkPreventDoubleMouse(): boolean;
    /**
     * Mousedown handler
     * @param {MouseEvent} event
     */
    onMouseDown(event: MouseEvent): boolean;
    /**
     * Mousemove handler
     * @param {MouseEvent} event
     */
    onMouseMove(event: MouseEvent): boolean;
    /**
     * Mouseup handler
     * @param {MouseEvent=} event
     */
    onMouseUp(event?: MouseEvent | undefined): boolean;
    /**
     * Mousewheel event
     * @param {WheelEvent} event
     */
    onMouseWheel(event: WheelEvent): boolean;
    /**
     * Touch start handler
     * @param {TouchEvent} event
     */
    onTouchStart(event: TouchEvent): boolean;
    /**
     * Touch move handler
     * @param {TouchEvent} event
     */
    onTouchMove(event: TouchEvent): boolean;
    /**
     * Touch end and cancel handler
     * @param {TouchEvent=} event
     */
    onTouchEnd(event?: TouchEvent | undefined): boolean;
    /**
     * Internal touch start handler
     * @param {number} x
     * @param {number} y
     */
    combinedSingleTouchStartHandler(x: number, y: number): void;
    /**
     * Internal touch move handler
     * @param {number} x
     * @param {number} y
     */
    combinedSingleTouchMoveHandler(x: number, y: number): boolean;
    /**
     * Internal touch stop handler
     */
    combinedSingleTouchStopHandler(x: any, y: any): void;
    /**
     * Clamps the camera zoom level within the allowed range
     */
    clampZoomLevel(): void;
    /**
     * Clamps the center within set boundaries
     */
    clampToBounds(): void;
    /**
     * Updates the camera
     * @param {number} dt Delta time in milliseconds
     */
    update(dt: number): void;
    /**
     * Prepares a context to transform it
     * @param {CanvasRenderingContext2D} context
     */
    transform(context: CanvasRenderingContext2D): void;
    /**
     * Internal shake handler
     * @param {number} now Time now in seconds
     * @param {number} dt Delta time
     */
    internalUpdateShake(now: number, dt: number): void;
    /**
     * Internal pan handler
     * @param {number} now Time now in seconds
     * @param {number} dt Delta time
     */
    internalUpdatePanning(now: number, dt: number): void;
    /**
     * Internal screen panning handler
     * @param {number} now
     * @param {number} dt
     */
    internalUpdateMousePanning(now: number, dt: number): void;
    /**
     * Updates the non user interaction zooming
     * @param {number} now Time now in seconds
     * @param {number} dt Delta time
     */
    internalUpdateZooming(now: number, dt: number): void;
    /**
     * Updates the non user interaction centering
     * @param {number} now Time now in seconds
     * @param {number} dt Delta time
     */
    internalUpdateCentering(now: number, dt: number): void;
    /**
     * Updates the keyboard forces
     * @param {number} now
     * @param {number} dt Delta time
     */
    internalUpdateKeyboardForce(now: number, dt: number): void;
  }
  import { BasicSerializableObject } from "shapez/savegame/serialization";
  import { GameRoot } from "shapez/game/root";
  import { Vector } from "shapez/core/vector";
  import { Signal } from "shapez/core/signal";
  import { Rectangle } from "shapez/core/rectangle";
}
declare module "shapez/game/dynamic_tickrate" {
  export class DynamicTickrate {
    /**
     *
     * @param {GameRoot} root
     */
    constructor(root: GameRoot);
    root: GameRoot;
    currentTickStart: number;
    capturedTicks: any[];
    averageTickDuration: number;
    accumulatedFps: number;
    accumulatedFpsLastUpdate: number;
    averageFps: number;
    onFrameRendered(): void;
    /**
     * Sets the tick rate to N updates per second
     * @param {number} rate
     */
    setTickRate(rate: number): void;
    currentTickRate: number;
    deltaMs: number;
    deltaSeconds: number;
    /**
     * Increases the tick rate marginally
     */
    increaseTickRate(): void;
    /**
     * Decreases the tick rate marginally
     */
    decreaseTickRate(): void;
    /**
     * Call whenever a tick began
     */
    beginTick(): void;
    /**
     * Call whenever a tick ended
     */
    endTick(): void;
  }
  import { GameRoot } from "shapez/game/root";
}
declare module "shapez/game/entity_manager" {
  import { BasicSerializableObject } from "shapez/savegame/serialization";
  import { Component } from "shapez/game/component";
  import { Entity } from "shapez/game/entity";
  import { GameRoot } from "shapez/game/root";
  export class EntityManager extends BasicSerializableObject {
    readonly root: GameRoot;
    readonly entities: Map<number, Entity>;
    private destroyList;
    private readonly componentToEntity;
    private nextUid;
    constructor(root: GameRoot);
    static getId(): string;
    static getSchema(): {
      nextUid: import("shapez/savegame/serialization_data_types").TypePositiveInteger;
    };
    getStatsText(): string;
    update(): void;
    /**
     * Registers a new entity
     * @param uid Optional predefined uid
     */
    registerEntity(entity: Entity, uid?: number): void;
    /**
     * Generates a new uid
     */
    generateUid(): number;
    /**
     * Call to attach a new component after the creation of the entity
     */
    attachDynamicComponent(entity: Entity, component: Component): void;
    /**
     * Call to remove a component after the creation of the entity
     */
    removeDynamicComponent(entity: Entity, component: typeof Component): void;
    /**
     * Finds an entity by its uid
     */
    findByUid(uid: number, errorWhenNotFound?: boolean): Entity;
    /**
     * Returns a map which gives a mapping from UID to Entity.
     * This map is not updated.
     */
    getFrozenUidSearchMap(): Map<number, Entity>;
    /**
     * Returns all entities having the given component
     * @deprecated use {@link getEntitiesWithComponent} instead
     */
    getAllWithComponent(componentHandle: typeof Component): Entity[];
    /**
     * A version of {@link getAllWithComponent} that returns a Set
     */
    getEntitiesWithComponent(componentHandle: typeof Component): Set<Entity>;
    /**
     * Unregisters all components of an entity from the component to entity mapping
     */
    unregisterEntityComponents(entity: Entity): void;
    processDestroyList(): void;
    /**
     * Queues an entity for destruction
     */
    destroyEntity(entity: Entity): void;
  }
}
declare module "shapez/game/belt_path" {
  /**
   * Stores a path of belts, used for optimizing performance
   */
  export class BeltPath extends BasicSerializableObject {
    static getId(): string;
    static getSchema(): {
      entityPath: import("shapez/savegame/serialization_data_types").TypeArray;
      items: import("shapez/savegame/serialization_data_types").TypeArray;
      spacingToFirstItem: import("shapez/savegame/serialization_data_types").TypePositiveNumber;
    };
    /**
     * Creates a path from a serialized object
     * @param {GameRoot} root
     * @param {Object} data
     * @returns {BeltPath|string}
     */
    static fromSerialized(root: GameRoot, data: any): BeltPath | string;
    /**
     * @param {GameRoot} root
     * @param {Array<Entity>} entityPath
     */
    constructor(root: GameRoot, entityPath: Array<Entity>);
    root: GameRoot;
    entityPath: Entity[];
    /**
     * Stores the items sorted, and their distance to the previous item (or start)
     * Layout: [distanceToNext, item]
     * @type {Array<[number, BaseItem]>}
     */
    items: Array<[number, BaseItem]>;
    /**
     * Initializes the path by computing the properties which are not saved
     * @param {boolean} computeSpacing Whether to also compute the spacing
     */
    init(computeSpacing?: boolean): void;
    totalLength: number;
    spacingToFirstItem: any;
    /**
     * Current bounds of this path
     * @type {Rectangle}
     */
    worldBounds: Rectangle;
    /**
     * Clears all items
     */
    clearAllItems(): void;
    numCompressedItemsAfterFirstItem: any;
    /**
     * Returns whether this path can accept a new item
     * @returns {boolean}
     */
    canAcceptItem(): boolean;
    /**
     * Tries to accept the item
     * @param {BaseItem} item
     */
    tryAcceptItem(item: BaseItem): boolean;
    /**
     * SLOW / Tries to find the item closest to the given tile
     * @param {Vector} tile
     * @returns {BaseItem|null}
     */
    findItemAtTile(tile: Vector): BaseItem | null;
    /**
     * Computes the tile bounds of the path
     * @returns {Rectangle}
     */
    computeBounds(): Rectangle;
    /**
     * Recomputes cache variables once the path was changed
     */
    onPathChanged(): void;
    boundAcceptor: (BaseItem: any, number?: any) => boolean;
    /**
     * Called by the belt system when the surroundings changed
     */
    onSurroundingsChanged(): void;
    /**
     * Finds the entity which accepts our items
     * @param {boolean=} debug_Silent Whether debug output should be silent
     * @return { { acceptor?: (BaseItem, number?) => boolean, entity?: Entity } }
     */
    computeAcceptingEntityAndSlot(debug_Silent?: boolean | undefined): {
      acceptor?: (BaseItem: any, number?: any) => boolean;
      entity?: Entity;
    };
    /**
     * Computes a method to pass over the item to the entity
     * @param {Entity} entity
     * @param {number} matchingSlotIndex
     * @returns {(item: BaseItem, slotIndex: number) => boolean | void}
     */
    computePassOverFunctionWithoutBelts(
      entity: Entity,
      matchingSlotIndex: number,
    ): (item: BaseItem, slotIndex: number) => boolean | void;
    /**
     * Helper to throw an error on mismatch
     * @param {string} change
     * @param {Array<any>} reason
     */
    debug_failIntegrity(change: string, ...reason: Array<any>): void;
    /**
     * Checks if this path is valid
     */
    debug_checkIntegrity(currentChange?: string): void;
    /**
     * Extends the belt path by the given belt
     * @param {Entity} entity
     */
    extendOnEnd(entity: Entity): void;
    /**
     * Extends the path with the given entity on the beginning
     * @param {Entity} entity
     */
    extendOnBeginning(entity: Entity): void;
    /**
     * Returns if the given entity is the end entity of the path
     * @param {Entity} entity
     * @returns {boolean}
     */
    isEndEntity(entity: Entity): boolean;
    /**
     * Returns if the given entity is the start entity of the path
     * @param {Entity} entity
     * @returns {boolean}
     */
    isStartEntity(entity: Entity): boolean;
    /**
     * Splits this path at the given entity by removing it, and
     * returning the new secondary paht
     * @param {Entity} entity
     * @returns {BeltPath}
     */
    deleteEntityOnPathSplitIntoTwo(entity: Entity): BeltPath;
    /**
     * Deletes the last entity
     * @param {Entity} entity
     */
    deleteEntityOnEnd(entity: Entity): void;
    /**
     * Deletes the entity of the start of the path
     * @see deleteEntityOnEnd
     * @param {Entity} entity
     */
    deleteEntityOnStart(entity: Entity): void;
    /**
     * Extends the path by the given other path
     * @param {BeltPath} otherPath
     */
    extendByPath(otherPath: BeltPath): void;
    /**
     * Computes the total length of the path
     * @returns {number}
     */
    computeTotalLength(): number;
    /**
     * Performs one tick
     */
    update(): void;
    /**
     * Computes a world space position from the given progress
     * @param {number} progress
     * @returns {Vector}
     */
    computePositionFromProgress(progress: number): Vector;
    /**
     *
     * @param {DrawParameters} parameters
     */
    drawDebug(parameters: DrawParameters): void;
    /**
     * Checks if this belt path should render simplified
     */
    checkIsPotatoMode(): boolean;
    /**
     * Draws the path
     * @param {DrawParameters} parameters
     */
    draw(parameters: DrawParameters): void;
    /**
     *
     * @param {HTMLCanvasElement} canvas
     * @param {CanvasRenderingContext2D} context
     * @param {number} w
     * @param {number} h
     * @param {number} dpi
     * @param {object} param0
     * @param {string} param0.direction
     * @param {Array<[Vector, BaseItem]>} param0.stack
     * @param {GameRoot} param0.root
     * @param {number} param0.zoomLevel
     */
    drawShapesInARow(
      canvas: HTMLCanvasElement,
      context: CanvasRenderingContext2D,
      w: number,
      h: number,
      dpi: number,
      {
        direction,
        stack,
        root,
        zoomLevel,
      }: {
        direction: string;
        stack: Array<[Vector, BaseItem]>;
        root: GameRoot;
        zoomLevel: number;
      },
    ): void;
    /**
     * @param {Array<[Vector, BaseItem]>} stack
     * @param {DrawParameters} parameters
     */
    drawDrawStack(
      stack: Array<[Vector, BaseItem]>,
      parameters: DrawParameters,
      directionProp: any,
    ): void;
  }
  import { BasicSerializableObject } from "shapez/savegame/serialization";
  import { GameRoot } from "shapez/game/root";
  import { Entity } from "shapez/game/entity";
  import { BaseItem } from "shapez/game/base_item";
  import { Rectangle } from "shapez/core/rectangle";
  import { Vector } from "shapez/core/vector";
  import { DrawParameters } from "shapez/core/draw_parameters";
}
declare module "shapez/game/components/item_ejector" {
  /**
   * @typedef {{
   *    pos: Vector,
   *    direction: enumDirection,
   *    item: BaseItem,
   *    lastItem: BaseItem,
   *    progress: number?,
   *    cachedDestSlot?: import("shapez/./item_acceptor").ItemAcceptorLocatedSlot,
   *    cachedBeltPath?: BeltPath,
   *    cachedTargetEntity?: Entity
   * }} ItemEjectorSlot
   */
  export class ItemEjectorComponent extends Component {
    static getSchema(): {
      slots: import("shapez/savegame/serialization_data_types").TypeArray;
    };
    /**
     *
     * @param {object} param0
     * @param {Array<{pos: Vector, direction: enumDirection }>=} param0.slots The slots to eject on
     * @param {boolean=} param0.renderFloatingItems Whether to render items even if they are not connected
     */
    constructor({
      slots,
      renderFloatingItems,
    }: {
      slots?:
        | Array<{
            pos: Vector;
            direction: enumDirection;
          }>
        | undefined;
      renderFloatingItems?: boolean | undefined;
    });
    renderFloatingItems: boolean;
    /**
     * @param {Array<{pos: Vector, direction: enumDirection }>} slots The slots to eject on
     */
    setSlots(
      slots: Array<{
        pos: Vector;
        direction: enumDirection;
      }>,
    ): void;
    /** @type {Array<ItemEjectorSlot>} */
    slots: Array<ItemEjectorSlot>;
    /**
     * Returns where this slot ejects to
     * @param {ItemEjectorSlot} slot
     * @returns {Vector}
     */
    getSlotTargetLocalTile(slot: ItemEjectorSlot): Vector;
    /**
     * Returns whether any slot ejects to the given local tile
     * @param {Vector} tile
     */
    anySlotEjectsToLocalTile(tile: Vector): boolean;
    /**
     * Returns if we can eject on a given slot
     * @param {number} slotIndex
     * @returns {boolean}
     */
    canEjectOnSlot(slotIndex: number): boolean;
    /**
     * Returns the first free slot on this ejector or null if there is none
     * @returns {number?}
     */
    getFirstFreeSlot(): number | null;
    /**
     * Tries to eject a given item
     * @param {number} slotIndex
     * @param {BaseItem} item
     * @returns {boolean}
     */
    tryEject(slotIndex: number, item: BaseItem): boolean;
    /**
     * Clears the given slot and returns the item it had
     * @param {number} slotIndex
     * @returns {BaseItem|null}
     */
    takeSlotItem(slotIndex: number): BaseItem | null;
  }
  export type ItemEjectorSlot = {
    pos: Vector;
    direction: enumDirection;
    item: BaseItem;
    lastItem: BaseItem;
    progress: number | null;
    cachedDestSlot?: import("shapez/game/components/item_acceptor").ItemAcceptorLocatedSlot;
    cachedBeltPath?: BeltPath;
    cachedTargetEntity?: Entity;
  };
  import { Component } from "shapez/game/component";
  import { Vector } from "shapez/core/vector";
  import { enumDirection } from "shapez/core/vector";
  import { BaseItem } from "shapez/game/base_item";
  import { BeltPath } from "shapez/game/belt_path";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/components/item_producer" {
  export class ItemProducerComponent extends Component {}
  import { Component } from "shapez/game/component";
}
declare module "shapez/game/buildings/item_producer" {
  export class MetaItemProducerBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
    }[];
    constructor();
    getSilhouetteColor(): string;
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
  }
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/game_mode" {
  export type enumGameModeIds = string;
  export namespace enumGameModeIds {
    let puzzleEdit: string;
    let puzzlePlay: string;
    let regular: string;
  }
  export type enumGameModeTypes = string;
  export namespace enumGameModeTypes {
    let _default: string;
    export { _default as default };
    export let puzzle: string;
  }
  export class GameMode extends BasicSerializableObject {
    /** @returns {string} */
    static getId(): string;
    /** @returns {string} */
    static getType(): string;
    /**
     * @param {GameRoot} root
     * @param {string} [id=Regular]
     * @param {object|undefined} payload
     */
    static create(
      root: GameRoot,
      id?: string,
      payload?: object | undefined,
    ): GameMode;
    /**
     * @param {GameRoot} root
     */
    constructor(root: GameRoot);
    root: GameRoot;
    /**
     * @type {Record<string, typeof BaseHUDPart>}
     */
    additionalHudParts: Record<string, typeof BaseHUDPart>;
    /** @type {typeof MetaBuilding[]} */
    hiddenBuildings: (typeof MetaBuilding)[];
    /** @param {object} savedata */
    deserialize(savedata: object): void;
    /** @returns {string} */
    getId(): string;
    /** @returns {string} */
    getType(): string;
    /**
     * @param {typeof MetaBuilding} building - Class name of building
     * @returns {boolean}
     */
    isBuildingExcluded(building: typeof MetaBuilding): boolean;
    /** @returns {undefined|Rectangle[]} */
    getBuildableZones(): undefined | Rectangle[];
    /** @returns {Rectangle|undefined} */
    getCameraBounds(): Rectangle | undefined;
    /** @returns {boolean} */
    hasHub(): boolean;
    /** @returns {boolean} */
    hasResources(): boolean;
    /** @returns {number} */
    getMinimumZoom(): number;
    /** @returns {number} */
    getMaximumZoom(): number;
    /** @returns {Object<string, Array>} */
    getUpgrades(): {
      [x: string]: any[];
    };
    throughputDoesNotMatter(): boolean;
    /**
     * @param {number} w
     * @param {number} h
     * @abstract
     */
    adjustZone(w?: number, h?: number): void;
    /** @returns {array} */
    getLevelDefinitions(): any[];
    /** @returns {boolean} */
    getIsFreeplayAvailable(): boolean;
    /** @returns {boolean} */
    getIsSaveable(): boolean;
    /** @returns {boolean} */
    getHasFreeCopyPaste(): boolean;
    /** @returns {boolean} */
    getSupportsWires(): boolean;
    /** @returns {boolean} */
    getIsEditor(): boolean;
    /** @returns {boolean} */
    getIsDeterministic(): boolean;
    /** @returns {number | undefined} */
    getFixedTickrate(): number | undefined;
    /** @returns {string} */
    getBlueprintShapeKey(): string;
  }
  import { BasicSerializableObject } from "shapez/savegame/serialization";
  import { GameRoot } from "shapez/game/root";
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Rectangle } from "shapez/core/rectangle";
}
declare module "shapez/game/components/belt" {
  export const curvedBeltLength: 0.78;
  /** @type {import("shapez/./item_acceptor").ItemAcceptorSlot} */
  export const FAKE_BELT_ACCEPTOR_SLOT: import("shapez/game/components/item_acceptor").ItemAcceptorSlot;
  /** @type {Object<enumDirection, import("shapez/./item_ejector").ItemEjectorSlot>} */
  export const FAKE_BELT_EJECTOR_SLOT_BY_DIRECTION: any;
  export class BeltComponent extends Component {
    /**
     *
     * @param {object} param0
     * @param {enumDirection=} param0.direction The direction of the belt
     */
    constructor({ direction }: { direction?: enumDirection | undefined });
    direction: string;
    /**
     * The path this belt is contained in, not serialized
     * @type {BeltPath}
     */
    assignedPath: BeltPath;
    /**
     * Returns the effective length of this belt in tile space
     * @returns {number}
     */
    getEffectiveLengthTiles(): number;
    /**
     * Returns fake acceptor slot used for matching
     * @returns {import("shapez/./item_acceptor").ItemAcceptorSlot}
     */
    getFakeAcceptorSlot(): import("shapez/game/components/item_acceptor").ItemAcceptorSlot;
    /**
     * Returns fake acceptor slot used for matching
     * @returns {import("shapez/./item_ejector").ItemEjectorSlot}
     */
    getFakeEjectorSlot(): import("shapez/game/components/item_ejector").ItemEjectorSlot;
    /**
     * Converts from belt space (0 = start of belt ... 1 = end of belt) to the local
     * belt coordinates (-0.5|-0.5 to 0.5|0.5)
     * @param {number} progress
     * @returns {Vector}
     */
    transformBeltToLocalSpace(progress: number): Vector;
  }
  import { Component } from "shapez/game/component";
  import { BeltPath } from "shapez/game/belt_path";
  import { Vector } from "shapez/core/vector";
  import { enumDirection } from "shapez/core/vector";
}
declare module "shapez/game/buildings/belt" {
  export const arrayBeltVariantToRotation: string[];
  export const beltOverlayMatrices: {
    [enumDirection.top]: {
      [x: number]: number[];
    };
    [enumDirection.left]: {
      [x: number]: number[];
    };
    [enumDirection.right]: {
      [x: number]: number[];
    };
  };
  export class MetaBeltBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
      rotationVariant: number;
    }[];
    constructor();
    getSilhouetteColor(): string;
    getHasDirectionLockAvailable(): boolean;
    getRotateAutomaticallyWhilePlacing(): boolean;
    getSprite(): any;
    getIsReplaceable(): boolean;
    getPreviewSprite(
      rotationVariant: any,
    ): import("shapez/core/sprites").AtlasSprite;
    getBlueprintSprite(
      rotationVariant: any,
    ): import("shapez/core/sprites").AtlasSprite;
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
    /**
     *
     * @param {Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity: Entity, rotationVariant: number): void;
  }
  import { enumDirection } from "shapez/core/vector";
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/systems/belt" {
  export const BELT_ANIM_COUNT: 14;
  /**
   * Manages all belts
   */
  export class BeltSystem extends GameSystem {
    constructor(root: any);
    /**
     * @type {Object.<enumDirection, Array<AtlasSprite>>}
     */
    beltSprites: any;
    /**
     * @type {Object.<enumDirection, Array<AtlasSprite>>}
     */
    beltAnimations: any;
    /** @type {Array<BeltPath>} */
    beltPaths: Array<BeltPath>;
    /**
     * Serializes all belt paths
     * @returns {Array<object>}
     */
    serializePaths(): Array<object>;
    /**
     * Deserializes all belt paths
     * @param {Array<any>} data
     */
    deserializePaths(data: Array<any>): string;
    /**
     * Updates the belt placement after an entity has been added / deleted
     * @param {Entity} entity
     */
    updateSurroundingBeltPlacement(entity: Entity): void;
    /**
     * Called when an entity got destroyed
     * @param {Entity} entity
     */
    onEntityDestroyed(entity: Entity): void;
    /**
     * Attempts to delete the belt from its current path
     * @param {BeltPath} path
     * @param {Entity} entity
     */
    deleteEntityFromPath(path: BeltPath, entity: Entity): void;
    /**
     * Adds the given entity to the appropriate paths
     * @param {Entity} entity
     */
    addEntityToPaths(entity: Entity): void;
    /**
     * Called when an entity got added
     * @param {Entity} entity
     */
    onEntityAdded(entity: Entity): void;
    /**
     * Draws all belt paths
     * @param {DrawParameters} parameters
     */
    drawBeltItems(parameters: DrawParameters): void;
    /**
     * Verifies all belt paths
     */
    debug_verifyBeltPaths(): void;
    /**
     * Finds the follow up entity for a given belt. Used for building the dependencies
     * @param {Entity} entity
     * @returns {Entity|null}
     */
    findFollowUpEntity(entity: Entity): Entity | null;
    /**
     * Finds the supplying belt for a given belt. Used for building the dependencies
     * @param {Entity} entity
     * @returns {Entity|null}
     */
    findSupplyingEntity(entity: Entity): Entity | null;
    /**
     * Recomputes the belt path network. Only required for old savegames
     */
    recomputeAllBeltPaths(): void;
    /**
     * Draws a given chunk
     * @param {DrawParameters} parameters
     * @param {MapChunkView} chunk
     */
    drawChunk(parameters: DrawParameters, chunk: MapChunkView): void;
    /**
     * Draws the belt path debug overlays
     * @param {DrawParameters} parameters
     */
    drawBeltPathDebug(parameters: DrawParameters): void;
  }
  import { GameSystem } from "shapez/game/game_system";
  import { BeltPath } from "shapez/game/belt_path";
  import { Entity } from "shapez/game/entity";
  import { DrawParameters } from "shapez/core/draw_parameters";
  import { MapChunkView } from "shapez/game/map_chunk_view";
}
declare module "shapez/game/game_system_with_filter" {
  export class GameSystemWithFilter extends GameSystem {
    /**
     * Constructs a new game system with the given component filter. It will process
     * all entities which have *all* of the passed components
     * @param {GameRoot} root
     * @param {Array<typeof Component>} requiredComponents
     */
    constructor(root: GameRoot, requiredComponents: Array<typeof Component>);
    requiredComponents: (typeof Component)[];
    requiredComponentIds: string[];
    /**
     * All entities which match the current components
     * @type {Array<Entity>}
     */
    allEntities: Array<Entity>;
    /**
     * @param {Entity} entity
     */
    internalPushEntityIfMatching(entity: Entity): void;
    /**
     *
     * @param {Entity} entity
     */
    internalCheckEntityAfterComponentRemoval(entity: Entity): void;
    /**
     *
     * @param {Entity} entity
     */
    internalReconsiderEntityToAdd(entity: Entity): void;
    /**
     * Recomputes all target entities after the game has loaded
     */
    internalPostLoadHook(): void;
    /**
     *
     * @param {Entity} entity
     */
    internalRegisterEntity(entity: Entity): void;
    /**
     *
     * @param {Entity} entity
     */
    internalPopEntityIfMatching(entity: Entity): void;
  }
  import { GameSystem } from "shapez/game/game_system";
  import { Component } from "shapez/game/component";
  import { Entity } from "shapez/game/entity";
  import { GameRoot } from "shapez/game/root";
}
declare module "shapez/game/systems/item_ejector" {
  export class ItemEjectorSystem extends GameSystemWithFilter {
    constructor(root: any);
    staleAreaDetector: StaleAreaDetector;
    /**
     * Recomputes an area after it changed
     * @param {Rectangle} area
     */
    recomputeArea(area: Rectangle): void;
    /**
     * Recomputes the whole cache after the game has loaded
     */
    recomputeCacheFull(): void;
    /**
     * @param {Entity} entity
     */
    recomputeSingleEntityCache(entity: Entity): void;
    /**
     *
     * @param {BaseItem} item
     * @param {Entity} receiver
     * @param {number} slotIndex
     */
    tryPassOverItem(
      item: BaseItem,
      receiver: Entity,
      slotIndex: number,
    ): boolean;
    /**
     * @param {DrawParameters} parameters
     * @param {MapChunkView} chunk
     */
    drawChunk(parameters: DrawParameters, chunk: MapChunkView): void;
  }
  import { GameSystemWithFilter } from "shapez/game/game_system_with_filter";
  import { StaleAreaDetector } from "shapez/core/stale_area_detector";
  import { Rectangle } from "shapez/core/rectangle";
  import { Entity } from "shapez/game/entity";
  import { BaseItem } from "shapez/game/base_item";
  import { DrawParameters } from "shapez/core/draw_parameters";
  import { MapChunkView } from "shapez/game/map_chunk_view";
}
declare module "shapez/game/systems/map_resources" {
  export class MapResourcesSystem extends GameSystem {
    /**
     * Draws the map resources
     * @param {DrawParameters} parameters
     * @param {MapChunkView} chunk
     */
    drawChunk(parameters: DrawParameters, chunk: MapChunkView): void;
    /**
     *
     * @param {MapChunkView} chunk
     * @param {HTMLCanvasElement} canvas
     * @param {CanvasRenderingContext2D} context
     * @param {number} w
     * @param {number} h
     * @param {number} dpi
     */
    generateChunkBackground(
      chunk: MapChunkView,
      canvas: HTMLCanvasElement,
      context: CanvasRenderingContext2D,
      w: number,
      h: number,
      dpi: number,
    ): void;
  }
  import { GameSystem } from "shapez/game/game_system";
  import { DrawParameters } from "shapez/core/draw_parameters";
  import { MapChunkView } from "shapez/game/map_chunk_view";
}
declare module "shapez/game/components/miner" {
  export class MinerComponent extends Component {
    static getSchema(): {
      lastMiningTime: import("shapez/savegame/serialization_data_types").TypePositiveNumber;
      itemChainBuffer: import("shapez/savegame/serialization_data_types").TypeArray;
    };
    constructor({ chainable }: { chainable?: boolean });
    lastMiningTime: number;
    chainable: boolean;
    /**
     * @type {BaseItem}
     */
    cachedMinedItem: BaseItem;
    /**
     * Which miner this miner ejects to, in case its a chainable one.
     * If the value is false, it means there is no entity, and we don't have to re-check
     * @type {Entity|null|false}
     */
    cachedChainedMiner: Entity | null | false;
    /**
     * Stores items from other miners which were chained to this
     * miner.
     * @type {Array<BaseItem>}
     */
    itemChainBuffer: Array<BaseItem>;
    /**
     *
     * @param {BaseItem} item
     */
    tryAcceptChainedItem(item: BaseItem): boolean;
  }
  import { Component } from "shapez/game/component";
  import { BaseItem } from "shapez/game/base_item";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/systems/miner" {
  export class MinerSystem extends GameSystemWithFilter {
    constructor(root: any);
    needsRecompute: boolean;
    /**
     * Called whenever an entity got changed
     * @param {Entity} entity
     */
    onEntityChanged(entity: Entity): void;
    /**
     * Finds the target chained miner for a given entity
     * @param {Entity} entity
     * @returns {Entity|false} The chained entity or null if not found
     */
    findChainedMiner(entity: Entity): Entity | false;
    /**
     *
     * @param {Entity} entity
     * @param {BaseItem} item
     */
    tryPerformMinerEject(entity: Entity, item: BaseItem): boolean;
    /**
     *
     * @param {DrawParameters} parameters
     * @param {MapChunkView} chunk
     */
    drawChunk(parameters: DrawParameters, chunk: MapChunkView): void;
  }
  import { GameSystemWithFilter } from "shapez/game/game_system_with_filter";
  import { Entity } from "shapez/game/entity";
  import { BaseItem } from "shapez/game/base_item";
  import { DrawParameters } from "shapez/core/draw_parameters";
  import { MapChunkView } from "shapez/game/map_chunk_view";
}
declare module "shapez/game/systems/item_processor" {
  /**
   * Whole data for a produced item
   *
   * @typedef {{
   *   item: BaseItem,
   *   preferredSlot?: number,
   *   requiredSlot?: number,
   *   doNotTrack?: boolean
   * }} ProducedItem
   */
  /**
   * Type of a processor implementation
   * @typedef {{
   *   entity: Entity,
   *   items: Map<number, BaseItem>,
   *   inputCount: number,
   *   outItems: Array<ProducedItem>
   *   }} ProcessorImplementationPayload
   */
  /**
   * Type of a processor implementation
   * @typedef {{
   *   entity: Entity,
   *   item: BaseItem,
   *   slotIndex: number
   *   }} ProccessingRequirementsImplementationPayload
   */
  /**
   * @type {Object<string, (arg: ProcessorImplementationPayload) => void>}
   */
  export const MOD_ITEM_PROCESSOR_HANDLERS: {
    [x: string]: (arg: ProcessorImplementationPayload) => void;
  };
  /**
   * @type {Object<string, (arg: ProccessingRequirementsImplementationPayload) => boolean>}
   */
  export const MODS_PROCESSING_REQUIREMENTS: {
    [x: string]: (arg: ProccessingRequirementsImplementationPayload) => boolean;
  };
  /**
   * @type {Object<string, (arg: {entity: Entity}) => boolean>}
   */
  export const MODS_CAN_PROCESS: {
    [x: string]: (arg: { entity: Entity }) => boolean;
  };
  export class ItemProcessorSystem extends GameSystemWithFilter {
    constructor(root: any);
    /**
     * @type {Object<enumItemProcessorTypes, (arg: ProcessorImplementationPayload) => void>}
     */
    handlers: any;
    /**
     * Returns true if the entity should accept the given item on the given slot.
     * This should only be called with matching items! I.e. if a color item is expected
     * on the given slot, then only a color item must be passed.
     * @param {Entity} entity
     * @param {BaseItem} item The item to accept
     * @param {number} slotIndex The slot index
     * @returns {boolean}
     */
    checkRequirements(
      entity: Entity,
      item: BaseItem,
      slotIndex: number,
    ): boolean;
    /**
     * Checks whether it's possible to process something
     * @param {Entity} entity
     */
    canProcess(entity: Entity): boolean;
    /**
     * Starts a new charge for the entity
     * @param {Entity} entity
     */
    startNewCharge(entity: Entity): void;
    /**
     * @param {ProcessorImplementationPayload} payload
     */
    process_BALANCER(payload: ProcessorImplementationPayload): boolean;
    /**
     * @param {ProcessorImplementationPayload} payload
     */
    process_CUTTER(payload: ProcessorImplementationPayload): void;
    /**
     * @param {ProcessorImplementationPayload} payload
     */
    process_CUTTER_QUAD(payload: ProcessorImplementationPayload): void;
    /**
     * @param {ProcessorImplementationPayload} payload
     */
    process_ROTATOR(payload: ProcessorImplementationPayload): void;
    /**
     * @param {ProcessorImplementationPayload} payload
     */
    process_ROTATOR_CCW(payload: ProcessorImplementationPayload): void;
    /**
     * @param {ProcessorImplementationPayload} payload
     */
    process_ROTATOR_180(payload: ProcessorImplementationPayload): void;
    /**
     * @param {ProcessorImplementationPayload} payload
     */
    process_STACKER(payload: ProcessorImplementationPayload): void;
    /**
     * @param {ProcessorImplementationPayload} payload
     */
    process_TRASH(payload: ProcessorImplementationPayload): void;
    /**
     * @param {ProcessorImplementationPayload} payload
     */
    process_MIXER(payload: ProcessorImplementationPayload): void;
    /**
     * @param {ProcessorImplementationPayload} payload
     */
    process_PAINTER(payload: ProcessorImplementationPayload): void;
    /**
     * @param {ProcessorImplementationPayload} payload
     */
    process_PAINTER_DOUBLE(payload: ProcessorImplementationPayload): void;
    /**
     * @param {ProcessorImplementationPayload} payload
     */
    process_PAINTER_QUAD(payload: ProcessorImplementationPayload): void;
    /**
     * @param {ProcessorImplementationPayload} payload
     */
    process_READER(payload: ProcessorImplementationPayload): void;
    /**
     * @param {ProcessorImplementationPayload} payload
     */
    process_HUB(payload: ProcessorImplementationPayload): void;
    /**
     * @param {ProcessorImplementationPayload} payload
     */
    process_GOAL(payload: ProcessorImplementationPayload): void;
  }
  /**
   * Whole data for a produced item
   */
  export type ProducedItem = {
    item: BaseItem;
    preferredSlot?: number;
    requiredSlot?: number;
    doNotTrack?: boolean;
  };
  /**
   * Type of a processor implementation
   */
  export type ProcessorImplementationPayload = {
    entity: Entity;
    items: Map<number, BaseItem>;
    inputCount: number;
    outItems: Array<ProducedItem>;
  };
  /**
   * Type of a processor implementation
   */
  export type ProccessingRequirementsImplementationPayload = {
    entity: Entity;
    item: BaseItem;
    slotIndex: number;
  };
  import { Entity } from "shapez/game/entity";
  import { GameSystemWithFilter } from "shapez/game/game_system_with_filter";
  import { BaseItem } from "shapez/game/base_item";
}
declare module "shapez/game/components/underground_belt" {
  export type enumUndergroundBeltMode = string;
  export namespace enumUndergroundBeltMode {
    let sender: string;
    let receiver: string;
  }
  /**
   * @typedef {{
   *   entity: Entity,
   *   distance: number
   * }} LinkedUndergroundBelt
   */
  export class UndergroundBeltComponent extends Component {
    static getSchema(): {
      pendingItems: import("shapez/savegame/serialization_data_types").TypeArray;
    };
    /**
     *
     * @param {object} param0
     * @param {enumUndergroundBeltMode=} param0.mode As which type of belt the entity acts
     * @param {number=} param0.tier
     */
    constructor({
      mode,
      tier,
    }: {
      mode?: enumUndergroundBeltMode | undefined;
      tier?: number | undefined;
    });
    mode: string;
    tier: number;
    /**
     * The linked entity, used to speed up performance. This contains either
     * the entrance or exit depending on the tunnel type
     * @type {LinkedUndergroundBelt}
     */
    cachedLinkedEntity: LinkedUndergroundBelt;
    /** @type {Array<{ item: BaseItem, progress: number }>} */
    consumptionAnimations: Array<{
      item: BaseItem;
      progress: number;
    }>;
    /**
     * Used on both receiver and sender.
     * Receiver: Used to store the next item to transfer, and to block input while doing this
     * Sender: Used to store which items are currently "travelling"
     * @type {Array<[BaseItem, number]>} Format is [Item, ingame time to eject the item]
     */
    pendingItems: Array<[BaseItem, number]>;
    /**
     * Tries to accept an item from an external source like a regular belt or building
     * @param {BaseItem} item
     * @param {number} beltSpeed How fast this item travels
     */
    tryAcceptExternalItem(item: BaseItem, beltSpeed: number): boolean;
    /**
     * Tries to accept a tunneled item
     * @param {BaseItem} item
     * @param {number} travelDistance How many tiles this item has to travel
     * @param {number} beltSpeed How fast this item travels
     * @param {number} now Current ingame time
     */
    tryAcceptTunneledItem(
      item: BaseItem,
      travelDistance: number,
      beltSpeed: number,
      now: number,
    ): boolean;
  }
  export type LinkedUndergroundBelt = {
    entity: Entity;
    distance: number;
  };
  import { Component } from "shapez/game/component";
  import { BaseItem } from "shapez/game/base_item";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/systems/underground_belt" {
  export class UndergroundBeltSystem extends GameSystemWithFilter {
    constructor(root: any);
    beltSprites: {
      [enumUndergroundBeltMode.sender]: import("shapez/core/sprites").AtlasSprite;
      [enumUndergroundBeltMode.receiver]: import("shapez/core/sprites").AtlasSprite;
    };
    staleAreaWatcher: StaleAreaDetector;
    /**
     * Callback when an entity got placed, used to remove belts between underground belts
     * @param {Entity} entity
     */
    onEntityManuallyPlaced(entity: Entity): void;
    /**
     * Recomputes the cache in the given area, invalidating all entries there
     * @param {Rectangle} area
     */
    recomputeArea(area: Rectangle): void;
    /**
     * Finds the receiver for a given sender
     * @param {Entity} entity
     * @returns {import("shapez/../components/underground_belt").LinkedUndergroundBelt}
     */
    findReceiverForSender(
      entity: Entity,
    ): import("shapez/game/components/underground_belt").LinkedUndergroundBelt;
    /**
     *
     * @param {Entity} entity
     */
    handleSender(entity: Entity): void;
    /**
     *
     * @param {Entity} entity
     * @param {number} now
     */
    handleReceiver(entity: Entity, now: number): void;
  }
  import { GameSystemWithFilter } from "shapez/game/game_system_with_filter";
  import { enumUndergroundBeltMode } from "shapez/game/components/underground_belt";
  import { StaleAreaDetector } from "shapez/core/stale_area_detector";
  import { Entity } from "shapez/game/entity";
  import { Rectangle } from "shapez/core/rectangle";
}
declare module "shapez/game/systems/hub" {
  export class HubSystem extends GameSystemWithFilter {
    constructor(root: any);
    /**
     *
     * @param {HTMLCanvasElement} canvas
     * @param {CanvasRenderingContext2D} context
     * @param {number} w
     * @param {number} h
     * @param {number} dpi
     */
    redrawHubBaseTexture(
      canvas: HTMLCanvasElement,
      context: CanvasRenderingContext2D,
      w: number,
      h: number,
      dpi: number,
    ): void;
    /**
     * @param {DrawParameters} parameters
     * @param {Entity} entity
     */
    drawEntity(parameters: DrawParameters, entity: Entity): void;
  }
  import { GameSystemWithFilter } from "shapez/game/game_system_with_filter";
  import { DrawParameters } from "shapez/core/draw_parameters";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/systems/static_map_entity" {
  export class StaticMapEntitySystem extends GameSystem {
    constructor(root: any);
    /** @type {Set<number>} */
    drawnUids: Set<number>;
    /**
     * Clears the uid list when a new frame started
     */
    clearUidList(): void;
    /**
     * Draws the static entities
     * @param {DrawParameters} parameters
     * @param {MapChunkView} chunk
     */
    drawChunk(parameters: DrawParameters, chunk: MapChunkView): void;
    /**
     * Draws the static wire entities
     * @param {DrawParameters} parameters
     * @param {MapChunkView} chunk
     */
    drawWiresChunk(parameters: DrawParameters, chunk: MapChunkView): void;
  }
  import { GameSystem } from "shapez/game/game_system";
  import { DrawParameters } from "shapez/core/draw_parameters";
  import { MapChunkView } from "shapez/game/map_chunk_view";
}
declare module "shapez/game/systems/item_acceptor" {
  export class ItemAcceptorSystem extends GameSystemWithFilter {
    constructor(root: any);
    accumulatedTicksWhileInMapOverview: number;
    /**
     * @param {DrawParameters} parameters
     * @param {MapChunkView} chunk
     */
    drawChunk(parameters: DrawParameters, chunk: MapChunkView): void;
  }
  import { GameSystemWithFilter } from "shapez/game/game_system_with_filter";
  import { DrawParameters } from "shapez/core/draw_parameters";
  import { MapChunkView } from "shapez/game/map_chunk_view";
}
declare module "shapez/game/components/storage" {
  /** @type {{
   * [x: string]: (item: BaseItem) => Boolean
   * }} */
  export const MODS_ADDITIONAL_STORAGE_ITEM_RESOLVER: {
    [x: string]: (item: BaseItem) => boolean;
  };
  export class StorageComponent extends Component {
    static getSchema(): {
      storedCount: import("shapez/savegame/serialization_data_types").TypePositiveInteger;
      storedItem: import("shapez/savegame/serialization_data_types").TypeNullable;
    };
    /**
     * @param {object} param0
     * @param {number=} param0.maximumStorage How much this storage can hold
     */
    constructor({ maximumStorage }: { maximumStorage?: number | undefined });
    maximumStorage: number;
    /**
     * Currently stored item
     * @type {BaseItem}
     */
    storedItem: BaseItem;
    /**
     * How many of this item we have stored
     */
    storedCount: number;
    /**
     * We compute an opacity to make sure it doesn't flicker
     */
    overlayOpacity: number;
    /**
     * Returns whether this storage can accept the item
     * @param {BaseItem} item
     */
    canAcceptItem(item: BaseItem): boolean;
    /**
     * Returns whether the storage is full
     * @returns {boolean}
     */
    getIsFull(): boolean;
    /**
     * @param {BaseItem} item
     */
    takeItem(item: BaseItem): void;
  }
  import { BaseItem } from "shapez/game/base_item";
  import { Component } from "shapez/game/component";
}
declare module "shapez/game/systems/storage" {
  export class StorageSystem extends GameSystemWithFilter {
    constructor(root: any);
    storageOverlaySprite: import("shapez/core/sprites").AtlasSprite;
    /**
     * Stores which uids were already drawn to avoid drawing entities twice
     * @type {Set<number>}
     */
    drawnUids: Set<number>;
    clearDrawnUids(): void;
    /**
     * @param {DrawParameters} parameters
     * @param {MapChunkView} chunk
     */
    drawChunk(parameters: DrawParameters, chunk: MapChunkView): void;
  }
  import { GameSystemWithFilter } from "shapez/game/game_system_with_filter";
  import { DrawParameters } from "shapez/core/draw_parameters";
  import { MapChunkView } from "shapez/game/map_chunk_view";
}
declare module "shapez/game/systems/wired_pins" {
  export class WiredPinsSystem extends GameSystemWithFilter {
    constructor(root: any);
    pinSprites: {
      [enumPinSlotType.logicalEjector]: import("shapez/core/sprites").AtlasSprite;
      [enumPinSlotType.logicalAcceptor]: import("shapez/core/sprites").AtlasSprite;
    };
    /**
     * Performs pre-placement checks
     * @param {Entity} entity
     * @param {Vector} offset
     */
    prePlacementCheck(entity: Entity, offset: Vector): "stop_propagation";
    /**
     * Checks if the pins of the given entity collide on the wires layer
     * @param {Entity} entity
     * @param {Vector=} offset Optional, move the entity by the given offset first
     * @returns {boolean} True if the pins collide
     */
    checkEntityPinsCollide(
      entity: Entity,
      offset?: Vector | undefined,
    ): boolean;
    /**
     * Called to free space for the given entity
     * @param {Entity} entity
     */
    freeEntityAreaBeforeBuild(entity: Entity): void;
    /**
     * Draws a given entity
     * @param {DrawParameters} parameters
     * @param {MapChunkView} chunk
     */
    drawChunk(parameters: DrawParameters, chunk: MapChunkView): void;
  }
  import { GameSystemWithFilter } from "shapez/game/game_system_with_filter";
  import { enumPinSlotType } from "shapez/game/components/wired_pins";
  import { Entity } from "shapez/game/entity";
  import { Vector } from "shapez/core/vector";
  import { DrawParameters } from "shapez/core/draw_parameters";
  import { MapChunkView } from "shapez/game/map_chunk_view";
}
declare module "shapez/game/components/belt_underlays" {
  /**
   * Store which type an underlay is, this is cached so we can easily
   * render it.
   *
   * Full: Render underlay at top and bottom of tile
   * Bottom Only: Only render underlay at the bottom half
   * Top Only:
   */
  export type enumClippedBeltUnderlayType = string;
  export namespace enumClippedBeltUnderlayType {
    let full: string;
    let bottomOnly: string;
    let topOnly: string;
    let none: string;
  }
  /**
   * @typedef {{
   *   pos: Vector,
   *   direction: enumDirection,
   *   cachedType?: enumClippedBeltUnderlayType
   * }} BeltUnderlayTile
   */
  export class BeltUnderlaysComponent extends Component {
    /**
     * @param {object} param0
     * @param {Array<BeltUnderlayTile>=} param0.underlays Where to render belt underlays
     */
    constructor({
      underlays,
    }: {
      underlays?: Array<BeltUnderlayTile> | undefined;
    });
    underlays: BeltUnderlayTile[];
  }
  export type BeltUnderlayTile = {
    pos: Vector;
    direction: enumDirection;
    cachedType?: enumClippedBeltUnderlayType;
  };
  import { Component } from "shapez/game/component";
  import { Vector } from "shapez/core/vector";
  import { enumDirection } from "shapez/core/vector";
}
declare module "shapez/game/systems/belt_underlays" {
  export class BeltUnderlaysSystem extends GameSystem {
    constructor(root: any);
    underlayBeltSprites: import("shapez/core/sprites").AtlasSprite[];
    staleArea: StaleAreaDetector;
    /**
     * Called when an area changed - Resets all caches in the given area
     * @param {Rectangle} area
     */
    recomputeStaleArea(area: Rectangle): void;
    /**
     * Checks if a given tile is connected and has an acceptor
     * @param {Vector} tile
     * @param {enumDirection} fromDirection
     * @returns {boolean}
     */
    checkIsAcceptorConnected(
      tile: Vector,
      fromDirection: enumDirection,
    ): boolean;
    /**
     * Checks if a given tile is connected and has an ejector
     * @param {Vector} tile
     * @param {enumDirection} toDirection
     * @returns {boolean}
     */
    checkIsEjectorConnected(tile: Vector, toDirection: enumDirection): boolean;
    /**
     * Computes the flag for a given tile
     * @param {Entity} entity
     * @param {import("shapez/../components/belt_underlays").BeltUnderlayTile} underlayTile
     * @returns {enumClippedBeltUnderlayType} The type of the underlay
     */
    computeBeltUnderlayType(
      entity: Entity,
      underlayTile: import("shapez/game/components/belt_underlays").BeltUnderlayTile,
    ): enumClippedBeltUnderlayType;
    /**
     * Draws a given chunk
     * @param {DrawParameters} parameters
     * @param {MapChunkView} chunk
     */
    drawChunk(parameters: DrawParameters, chunk: MapChunkView): void;
  }
  import { GameSystem } from "shapez/game/game_system";
  import { StaleAreaDetector } from "shapez/core/stale_area_detector";
  import { Rectangle } from "shapez/core/rectangle";
  import { Vector } from "shapez/core/vector";
  import { enumDirection } from "shapez/core/vector";
  import { Entity } from "shapez/game/entity";
  import { enumClippedBeltUnderlayType } from "shapez/game/components/belt_underlays";
  import { DrawParameters } from "shapez/core/draw_parameters";
  import { MapChunkView } from "shapez/game/map_chunk_view";
}
declare module "shapez/game/components/constant_signal" {
  export class ConstantSignalComponent extends Component {
    static getSchema(): {
      signal: import("shapez/savegame/serialization_data_types").TypeNullable;
    };
    /**
     *
     * @param {object} param0
     * @param {BaseItem=} param0.signal The signal to store
     */
    constructor({ signal }: { signal?: BaseItem | undefined });
    /**
     * Copy the current state to another component
     * @param {ConstantSignalComponent} otherComponent
     */
    copyAdditionalStateTo(otherComponent: ConstantSignalComponent): void;
    signal: BaseItem;
  }
  import { Component } from "shapez/game/component";
  import { BaseItem } from "shapez/game/base_item";
}
declare module "shapez/game/systems/constant_signal" {
  export class ConstantSignalSystem extends GameSystemWithFilter {
    constructor(root: any);
  }
  import { GameSystemWithFilter } from "shapez/game/game_system_with_filter";
}
declare module "shapez/game/components/logic_gate" {
  export type enumLogicGateType = string;
  export namespace enumLogicGateType {
    let and: string;
    let not: string;
    let xor: string;
    let or: string;
    let transistor: string;
    let analyzer: string;
    let rotator: string;
    let unstacker: string;
    let cutter: string;
    let compare: string;
    let stacker: string;
    let painter: string;
  }
  export class LogicGateComponent extends Component {
    /**
     *
     * @param {object} param0
     * @param {enumLogicGateType=} param0.type
     */
    constructor({ type }: { type?: enumLogicGateType | undefined });
    type: string;
  }
  import { Component } from "shapez/game/component";
}
declare module "shapez/game/systems/logic_gate" {
  export class LogicGateSystem extends GameSystemWithFilter {
    constructor(root: any);
    boundOperations: {
      [enumLogicGateType.and]: (parameters: Array<BaseItem | null>) => BaseItem;
      [enumLogicGateType.not]: (parameters: Array<BaseItem | null>) => BaseItem;
      [enumLogicGateType.xor]: (parameters: Array<BaseItem | null>) => BaseItem;
      [enumLogicGateType.or]: (parameters: Array<BaseItem | null>) => BaseItem;
      [enumLogicGateType.transistor]: (
        parameters: Array<BaseItem | null>,
      ) => BaseItem;
      [enumLogicGateType.rotator]: (
        parameters: Array<BaseItem | null>,
      ) => BaseItem;
      [enumLogicGateType.analyzer]: (
        parameters: Array<BaseItem | null>,
      ) => [BaseItem, BaseItem];
      [enumLogicGateType.cutter]: (
        parameters: Array<BaseItem | null>,
      ) => [BaseItem, BaseItem];
      [enumLogicGateType.unstacker]: (
        parameters: Array<BaseItem | null>,
      ) => [BaseItem, BaseItem];
      [enumLogicGateType.compare]: (
        parameters: Array<BaseItem | null>,
      ) => BaseItem;
      [enumLogicGateType.stacker]: (
        parameters: Array<BaseItem | null>,
      ) => BaseItem;
      [enumLogicGateType.painter]: (
        parameters: Array<BaseItem | null>,
      ) => BaseItem;
    };
    /**
     * @param {Array<BaseItem|null>} parameters
     * @returns {BaseItem}
     */
    compute_AND(parameters: Array<BaseItem | null>): BaseItem;
    /**
     * @param {Array<BaseItem|null>} parameters
     * @returns {BaseItem}
     */
    compute_NOT(parameters: Array<BaseItem | null>): BaseItem;
    /**
     * @param {Array<BaseItem|null>} parameters
     * @returns {BaseItem}
     */
    compute_XOR(parameters: Array<BaseItem | null>): BaseItem;
    /**
     * @param {Array<BaseItem|null>} parameters
     * @returns {BaseItem}
     */
    compute_OR(parameters: Array<BaseItem | null>): BaseItem;
    /**
     * @param {Array<BaseItem|null>} parameters
     * @returns {BaseItem}
     */
    compute_IF(parameters: Array<BaseItem | null>): BaseItem;
    /**
     * @param {Array<BaseItem|null>} parameters
     * @returns {BaseItem}
     */
    compute_ROTATE(parameters: Array<BaseItem | null>): BaseItem;
    /**
     * @param {Array<BaseItem|null>} parameters
     * @returns {[BaseItem, BaseItem]}
     */
    compute_ANALYZE(parameters: Array<BaseItem | null>): [BaseItem, BaseItem];
    /**
     * @param {Array<BaseItem|null>} parameters
     * @returns {[BaseItem, BaseItem]}
     */
    compute_CUT(parameters: Array<BaseItem | null>): [BaseItem, BaseItem];
    /**
     * @param {Array<BaseItem|null>} parameters
     * @returns {[BaseItem, BaseItem]}
     */
    compute_UNSTACK(parameters: Array<BaseItem | null>): [BaseItem, BaseItem];
    /**
     * @param {Array<BaseItem|null>} parameters
     * @returns {BaseItem}
     */
    compute_STACKER(parameters: Array<BaseItem | null>): BaseItem;
    /**
     * @param {Array<BaseItem|null>} parameters
     * @returns {BaseItem}
     */
    compute_PAINTER(parameters: Array<BaseItem | null>): BaseItem;
    /**
     * @param {Array<BaseItem|null>} parameters
     * @returns {BaseItem}
     */
    compute_COMPARE(parameters: Array<BaseItem | null>): BaseItem;
  }
  import { GameSystemWithFilter } from "shapez/game/game_system_with_filter";
  import { enumLogicGateType } from "shapez/game/components/logic_gate";
  import { BaseItem } from "shapez/game/base_item";
}
declare module "shapez/game/components/lever" {
  export class LeverComponent extends Component {
    static getSchema(): {
      toggled: import("shapez/savegame/serialization_data_types").TypeBoolean;
    };
    /**
     * @param {object} param0
     * @param {boolean=} param0.toggled
     */
    constructor({ toggled }: { toggled?: boolean | undefined });
    /**
     * Copy the current state to another component
     * @param {LeverComponent} otherComponent
     */
    copyAdditionalStateTo(otherComponent: LeverComponent): void;
    toggled: boolean;
  }
  import { Component } from "shapez/game/component";
}
declare module "shapez/game/systems/lever" {
  export class LeverSystem extends GameSystemWithFilter {
    constructor(root: any);
    spriteOn: import("shapez/core/sprites").AtlasSprite;
    spriteOff: import("shapez/core/sprites").AtlasSprite;
    /**
     * Draws a given chunk
     * @param {import("shapez/../../core/draw_utils").DrawParameters} parameters
     * @param {MapChunkView} chunk
     */
    drawChunk(
      parameters: import("shapez/core/draw_utils").DrawParameters,
      chunk: MapChunkView,
    ): void;
  }
  import { GameSystemWithFilter } from "shapez/game/game_system_with_filter";
  import { MapChunkView } from "shapez/game/map_chunk_view";
}
declare module "shapez/game/systems/display" {
  /** @type {{
   * [x: string]: (item: BaseItem) => BaseItem
   * }} */
  export const MODS_ADDITIONAL_DISPLAY_ITEM_RESOLVER: {
    [x: string]: (item: BaseItem) => BaseItem;
  };
  /** @type {{
   * [x: string]: (parameters: import("shapez/../../core/draw_parameters").DrawParameters, entity: import("shapez/../entity").Entity, item: BaseItem) => BaseItem
   * }} */
  export const MODS_ADDITIONAL_DISPLAY_ITEM_DRAW: {
    [x: string]: (
      parameters: import("shapez/core/draw_parameters").DrawParameters,
      entity: import("shapez/game/entity").Entity,
      item: BaseItem,
    ) => BaseItem;
  };
  export class DisplaySystem extends GameSystem {
    constructor(root: any);
    /** @type {Object<string, import("shapez/../../core/draw_utils").AtlasSprite>} */
    displaySprites: {
      [x: string]: import("shapez/core/sprites").AtlasSprite;
    };
    /**
     * Returns the color / value a display should show
     * @param {BaseItem} value
     * @returns {BaseItem}
     */
    getDisplayItem(value: BaseItem): BaseItem;
    /**
     * Draws a given chunk
     * @param {import("shapez/../../core/draw_utils").DrawParameters} parameters
     * @param {MapChunkView} chunk
     */
    drawChunk(
      parameters: import("shapez/core/draw_utils").DrawParameters,
      chunk: MapChunkView,
    ): BaseItem;
  }
  import { BaseItem } from "shapez/game/base_item";
  import { GameSystem } from "shapez/game/game_system";
  import { MapChunkView } from "shapez/game/map_chunk_view";
}
declare module "shapez/game/systems/item_processor_overlays" {
  export class ItemProcessorOverlaysSystem extends GameSystem {
    constructor(root: any);
    spriteDisabled: import("shapez/core/sprites").AtlasSprite;
    spriteDisconnected: import("shapez/core/sprites").AtlasSprite;
    readerOverlaySprite: import("shapez/core/sprites").AtlasSprite;
    drawnUids: Set<any>;
    clearDrawnUids(): void;
    /**
     *
     * @param {import("shapez/../../core/draw_utils").DrawParameters} parameters
     * @param {MapChunkView} chunk
     */
    drawChunk(
      parameters: import("shapez/core/draw_utils").DrawParameters,
      chunk: MapChunkView,
    ): void;
    /**
     *
     * @param {import("shapez/../../core/draw_utils").DrawParameters} parameters
     * @param {Entity} entity
     */
    drawReaderOverlays(
      parameters: import("shapez/core/draw_utils").DrawParameters,
      entity: Entity,
    ): void;
    /**
     *
     * @param {import("shapez/../../core/draw_utils").DrawParameters} parameters
     * @param {Entity} entity
     * @param {object} param0
     * @param {boolean=} param0.drawIfFalse
     */
    drawConnectedSlotRequirement(
      parameters: import("shapez/core/draw_utils").DrawParameters,
      entity: Entity,
      {
        drawIfFalse,
      }: {
        drawIfFalse?: boolean | undefined;
      },
    ): void;
  }
  import { GameSystem } from "shapez/game/game_system";
  import { MapChunkView } from "shapez/game/map_chunk_view";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/components/belt_reader" {
  export type enumBeltReaderType = string;
  export namespace enumBeltReaderType {
    let wired: string;
    let wireless: string;
  }
  export class BeltReaderComponent extends Component {
    static getSchema(): {
      lastItem: import("shapez/savegame/serialization_data_types").TypeNullable;
    };
    constructor();
    /**
     * Which items went through the reader, we only store the time
     * @type {Array<number>}
     */
    lastItemTimes: Array<number>;
    /**
     * Which item passed the reader last
     * @type {BaseItem}
     */
    lastItem: BaseItem;
    /**
     * Stores the last throughput we computed
     * @type {number}
     */
    lastThroughput: number;
    /**
     * Stores when we last computed the throughput
     * @type {number}
     */
    lastThroughputComputation: number;
  }
  import { Component } from "shapez/game/component";
  import { BaseItem } from "shapez/game/base_item";
}
declare module "shapez/game/systems/belt_reader" {
  export class BeltReaderSystem extends GameSystemWithFilter {
    constructor(root: any);
  }
  import { GameSystemWithFilter } from "shapez/game/game_system_with_filter";
}
declare module "shapez/game/components/filter" {
  /**
   * @typedef {{
   *   item: BaseItem,
   *   progress: number
   * }} PendingFilterItem
   */
  export class FilterComponent extends Component {
    static getSchema(): {
      pendingItemsToLeaveThrough: import("shapez/savegame/serialization_data_types").TypeArray;
      pendingItemsToReject: import("shapez/savegame/serialization_data_types").TypeArray;
    };
    constructor();
    duplicateWithoutContents(): FilterComponent;
    /**
     * Items in queue to leave through
     * @type {Array<PendingFilterItem>}
     */
    pendingItemsToLeaveThrough: Array<PendingFilterItem>;
    /**
     * Items in queue to reject
     * @type {Array<PendingFilterItem>}
     */
    pendingItemsToReject: Array<PendingFilterItem>;
  }
  export type PendingFilterItem = {
    item: BaseItem;
    progress: number;
  };
  import { Component } from "shapez/game/component";
  import { BaseItem } from "shapez/game/base_item";
}
declare module "shapez/game/systems/filter" {
  export class FilterSystem extends GameSystemWithFilter {
    constructor(root: any);
    /**
     *
     * @param {Entity} entity
     * @param {number} slot
     * @param {BaseItem} item
     */
    tryAcceptItem(entity: Entity, slot: number, item: BaseItem): boolean;
  }
  import { GameSystemWithFilter } from "shapez/game/game_system_with_filter";
  import { Entity } from "shapez/game/entity";
  import { BaseItem } from "shapez/game/base_item";
}
declare module "shapez/game/systems/item_producer" {
  export class ItemProducerSystem extends GameSystemWithFilter {
    constructor(root: any);
    item: import("shapez/game/base_item").BaseItem;
  }
  import { GameSystemWithFilter } from "shapez/game/game_system_with_filter";
}
declare module "shapez/game/systems/constant_producer" {
  export class ConstantProducerSystem extends GameSystemWithFilter {
    constructor(root: any);
    /**
     *
     * @param {DrawParameters} parameters
     * @param {MapChunk} chunk
     * @returns
     */
    drawChunk(parameters: DrawParameters, chunk: MapChunk): void;
  }
  import { GameSystemWithFilter } from "shapez/game/game_system_with_filter";
  import { DrawParameters } from "shapez/core/draw_parameters";
  import { MapChunk } from "shapez/game/map_chunk";
}
declare module "shapez/game/components/goal_acceptor" {
  export class GoalAcceptorComponent extends Component {
    static getSchema(): {
      item: import("shapez/savegame/serialization_data_types").TypeClass;
    };
    /**
     * @param {object} param0
     * @param {BaseItem=} param0.item
     * @param {number=} param0.rate
     */
    constructor({
      item,
      rate,
    }: {
      item?: BaseItem | undefined;
      rate?: number | undefined;
    });
    /** @type {BaseItem | undefined} */
    item: BaseItem | undefined;
    /**
     * The last item we delivered
     * @type {{ item: BaseItem; time: number; } | null} */
    lastDelivery: {
      item: BaseItem;
      time: number;
    } | null;
    currentDeliveredItems: number;
    displayPercentage: number;
    /**
     * Clears items but doesn't instantly reset the progress bar
     */
    clearItems(): void;
    getRequiredSecondsPerItem(): number;
    /**
     * Copy the current state to another component
     * @param {GoalAcceptorComponent} otherComponent
     */
    copyAdditionalStateTo(otherComponent: GoalAcceptorComponent): void;
  }
  import { Component } from "shapez/game/component";
  import { BaseItem } from "shapez/game/base_item";
}
declare module "shapez/game/systems/goal_acceptor" {
  export class GoalAcceptorSystem extends GameSystemWithFilter {
    constructor(root: any);
    puzzleCompleted: boolean;
    /**
     *
     * @param {DrawParameters} parameters
     * @param {MapChunk} chunk
     * @returns
     */
    drawChunk(parameters: DrawParameters, chunk: MapChunk): void;
  }
  import { GameSystemWithFilter } from "shapez/game/game_system_with_filter";
  import { DrawParameters } from "shapez/core/draw_parameters";
  import { MapChunk } from "shapez/game/map_chunk";
}
declare module "shapez/game/systems/zone" {
  export class ZoneSystem extends GameSystem {
    drawn: boolean;
    /**
     *
     * @param {Entity} entity
     * @param {Vector | undefined} tile
     * @returns
     */
    prePlacementCheck(
      entity: Entity,
      tile?: Vector | undefined,
    ): "stop_propagation";
    /**
     * Draws the zone
     * @param {DrawParameters} parameters
     * @param {MapChunkView} chunk
     */
    drawChunk(parameters: DrawParameters, chunk: MapChunkView): void;
  }
  import { GameSystem } from "shapez/game/game_system";
  import { Entity } from "shapez/game/entity";
  import { Vector } from "shapez/core/vector";
  import { DrawParameters } from "shapez/core/draw_parameters";
  import { MapChunkView } from "shapez/game/map_chunk_view";
}
declare module "shapez/game/game_system_manager" {
  /**
   * @type {Object<string, Array<{ id: string; systemClass: new (any) => GameSystem}>>}
   */
  export const MODS_ADDITIONAL_SYSTEMS: {
    [x: string]: {
      id: string;
      systemClass: new (any: any) => GameSystem;
    }[];
  };
  export class GameSystemManager {
    /**
     *
     * @param {GameRoot} root
     */
    constructor(root: GameRoot);
    root: GameRoot;
    systems: {
      /** @type {BeltSystem} */
      belt: BeltSystem;
      /** @type {ItemEjectorSystem} */
      itemEjector: ItemEjectorSystem;
      /** @type {MapResourcesSystem} */
      mapResources: MapResourcesSystem;
      /** @type {MinerSystem} */
      miner: MinerSystem;
      /** @type {ItemProcessorSystem} */
      itemProcessor: ItemProcessorSystem;
      /** @type {UndergroundBeltSystem} */
      undergroundBelt: UndergroundBeltSystem;
      /** @type {HubSystem} */
      hub: HubSystem;
      /** @type {StaticMapEntitySystem} */
      staticMapEntities: StaticMapEntitySystem;
      /** @type {ItemAcceptorSystem} */
      itemAcceptor: ItemAcceptorSystem;
      /** @type {StorageSystem} */
      storage: StorageSystem;
      /** @type {WiredPinsSystem} */
      wiredPins: WiredPinsSystem;
      /** @type {BeltUnderlaysSystem} */
      beltUnderlays: BeltUnderlaysSystem;
      /** @type {WireSystem} */
      wire: WireSystem;
      /** @type {ConstantSignalSystem} */
      constantSignal: ConstantSignalSystem;
      /** @type {LogicGateSystem} */
      logicGate: LogicGateSystem;
      /** @type {LeverSystem} */
      lever: LeverSystem;
      /** @type {DisplaySystem} */
      display: DisplaySystem;
      /** @type {ItemProcessorOverlaysSystem} */
      itemProcessorOverlays: ItemProcessorOverlaysSystem;
      /** @type {BeltReaderSystem} */
      beltReader: BeltReaderSystem;
      /** @type {FilterSystem} */
      filter: FilterSystem;
      /** @type {ItemProducerSystem} */
      itemProducer: ItemProducerSystem;
      /** @type {ConstantProducerSystem} */
      ConstantProducer: ConstantProducerSystem;
      /** @type {GoalAcceptorSystem} */
      GoalAcceptor: GoalAcceptorSystem;
      /** @type {ZoneSystem} */
      zone: ZoneSystem;
    };
    systemUpdateOrder: any[];
    /**
     * Initializes all systems
     */
    internalInitSystems(): void;
    /**
     * Updates all systems
     */
    update(): void;
    refreshCaches(): void;
  }
  import { GameSystem } from "shapez/game/game_system";
  import { GameRoot } from "shapez/game/root";
  import { BeltSystem } from "shapez/game/systems/belt";
  import { ItemEjectorSystem } from "shapez/game/systems/item_ejector";
  import { MapResourcesSystem } from "shapez/game/systems/map_resources";
  import { MinerSystem } from "shapez/game/systems/miner";
  import { ItemProcessorSystem } from "shapez/game/systems/item_processor";
  import { UndergroundBeltSystem } from "shapez/game/systems/underground_belt";
  import { HubSystem } from "shapez/game/systems/hub";
  import { StaticMapEntitySystem } from "shapez/game/systems/static_map_entity";
  import { ItemAcceptorSystem } from "shapez/game/systems/item_acceptor";
  import { StorageSystem } from "shapez/game/systems/storage";
  import { WiredPinsSystem } from "shapez/game/systems/wired_pins";
  import { BeltUnderlaysSystem } from "shapez/game/systems/belt_underlays";
  import { WireSystem } from "shapez/game/systems/wire";
  import { ConstantSignalSystem } from "shapez/game/systems/constant_signal";
  import { LogicGateSystem } from "shapez/game/systems/logic_gate";
  import { LeverSystem } from "shapez/game/systems/lever";
  import { DisplaySystem } from "shapez/game/systems/display";
  import { ItemProcessorOverlaysSystem } from "shapez/game/systems/item_processor_overlays";
  import { BeltReaderSystem } from "shapez/game/systems/belt_reader";
  import { FilterSystem } from "shapez/game/systems/filter";
  import { ItemProducerSystem } from "shapez/game/systems/item_producer";
  import { ConstantProducerSystem } from "shapez/game/systems/constant_producer";
  import { GoalAcceptorSystem } from "shapez/game/systems/goal_acceptor";
  import { ZoneSystem } from "shapez/game/systems/zone";
}
declare module "shapez/game/production_analytics" {
  export type enumAnalyticsDataSource = string;
  export namespace enumAnalyticsDataSource {
    let produced: string;
    let stored: string;
    let delivered: string;
  }
  export class ProductionAnalytics extends BasicSerializableObject {
    static getId(): string;
    /**
     * @param {GameRoot} root
     */
    constructor(root: GameRoot);
    root: GameRoot;
    history: {
      [enumAnalyticsDataSource.produced]: undefined[];
      [enumAnalyticsDataSource.stored]: undefined[];
      [enumAnalyticsDataSource.delivered]: undefined[];
    };
    lastAnalyticsSlice: number;
    /**
     * @param {ShapeDefinition} definition
     */
    onShapeDelivered(definition: ShapeDefinition): void;
    /**
     * @param {BaseItem} item
     */
    onItemProduced(item: BaseItem): void;
    /**
     * Starts a new time slice
     */
    startNewSlice(): void;
    /**
     * Returns the current rate of a given shape
     * @param {enumAnalyticsDataSource} dataSource
     * @param {ShapeDefinition} definition
     */
    getCurrentShapeRateRaw(
      dataSource: enumAnalyticsDataSource,
      definition: ShapeDefinition,
    ): any;
    /**
     * Returns the rate of a given shape, <historyOffset> frames ago
     * @param {enumAnalyticsDataSource} dataSource
     * @param {ShapeDefinition} definition
     * @param {number} historyOffset
     */
    getPastShapeRate(
      dataSource: enumAnalyticsDataSource,
      definition: ShapeDefinition,
      historyOffset: number,
    ): any;
    /**
     * Returns the rates of all shapes
     * @param {enumAnalyticsDataSource} dataSource
     */
    getCurrentShapeRatesRaw(dataSource: enumAnalyticsDataSource): any;
    update(): void;
  }
  import { BasicSerializableObject } from "shapez/savegame/serialization";
  import { GameRoot } from "shapez/game/root";
  import { ShapeDefinition } from "shapez/game/shape_definition";
  import { BaseItem } from "shapez/game/base_item";
}
declare module "shapez/game/hub_goals" {
  export const MOD_ITEM_PROCESSOR_SPEEDS: {};
  export class HubGoals extends BasicSerializableObject {
    static getId(): string;
    static getSchema(): {
      level: import("shapez/savegame/serialization_data_types").TypePositiveInteger;
      storedShapes: import("shapez/savegame/serialization_data_types").TypeKeyValueMap;
      upgradeLevels: import("shapez/savegame/serialization_data_types").TypeKeyValueMap;
    };
    /**
     * @param {GameRoot} root
     */
    constructor(root: GameRoot);
    /**
     *
     * @param {*} data
     * @param {GameRoot} root
     */
    deserialize(data: any, root: GameRoot): string;
    level: number;
    root: GameRoot;
    /**
     * Which story rewards we already gained
     * @type {Object.<string, number>}
     */
    gainedRewards: {
      [x: string]: number;
    };
    /**
     * Mapping from shape hash -> amount
     * @type {Object<string, number>}
     */
    storedShapes: {
      [x: string]: number;
    };
    /**
     * Stores the levels for all upgrades
     * @type {Object<string, number>}
     */
    upgradeLevels: {
      [x: string]: number;
    };
    /**
     * Stores the improvements for all upgrades
     * @type {Object<string, number>}
     */
    upgradeImprovements: {
      [x: string]: number;
    };
    /**
     * Returns whether the end of the demo is reached
     * @returns {boolean}
     */
    isEndOfDemoReached(): boolean;
    /**
     * Returns how much of the current shape is stored
     * @param {ShapeDefinition} definition
     * @returns {number}
     */
    getShapesStored(definition: ShapeDefinition): number;
    /**
     * @param {string} key
     * @param {number} amount
     */
    takeShapeByKey(key: string, amount: number): void;
    /**
     * Returns how much of the current shape is stored
     * @param {string} key
     * @returns {number}
     */
    getShapesStoredByKey(key: string): number;
    /**
     * Returns how much of the current goal was already delivered
     */
    getCurrentGoalDelivered(): number;
    /**
     * Returns the current level of a given upgrade
     * @param {string} upgradeId
     */
    getUpgradeLevel(upgradeId: string): number;
    /**
     * Returns whether the given reward is already unlocked
     * @param {enumHubGoalRewards} reward
     */
    isRewardUnlocked(reward: enumHubGoalRewards): boolean;
    /**
     * Handles the given definition, by either accounting it towards the
     * goal or otherwise granting some points
     * @param {ShapeDefinition} definition
     */
    handleDefinitionDelivered(definition: ShapeDefinition): void;
    /**
     * Creates the next goal
     */
    computeNextGoal(): void;
    currentGoal:
      | {
          /** @type {ShapeDefinition} */
          definition: ShapeDefinition;
          required: any;
          reward: any;
          throughputOnly: any;
        }
      | {
          definition: ShapeDefinition;
          required: number;
          reward: string;
          throughputOnly: boolean;
        };
    /**
     * Called when the level was completed
     */
    onGoalCompleted(): void;
    /**
     * Returns whether we are playing in free-play
     */
    isFreePlay(): boolean;
    /**
     * Returns whether a given upgrade can be unlocked
     * @param {string} upgradeId
     */
    canUnlockUpgrade(upgradeId: string): boolean;
    /**
     * Returns the number of available upgrades
     * @returns {number}
     */
    getAvailableUpgradeCount(): number;
    /**
     * Tries to unlock the given upgrade
     * @param {string} upgradeId
     * @returns {boolean}
     */
    tryUnlockUpgrade(upgradeId: string): boolean;
    /**
     * Picks random colors which are close to each other
     * @param {RandomNumberGenerator} rng
     */
    generateRandomColorSet(
      rng: RandomNumberGenerator,
      allowUncolored?: boolean,
    ): string[];
    /**
     * Creates a (seeded) random shape
     * @param {number} level
     * @returns {ShapeDefinition}
     */
    computeFreeplayShape(level: number): ShapeDefinition;
    /**
     * Belt speed
     * @returns {number} items / sec
     */
    getBeltBaseSpeed(): number;
    /**
     * Underground belt speed
     * @returns {number} items / sec
     */
    getUndergroundBeltBaseSpeed(): number;
    /**
     * Miner speed
     * @returns {number} items / sec
     */
    getMinerBaseSpeed(): number;
    /**
     * Processor speed
     * @param {enumItemProcessorTypes} processorType
     * @returns {number} items / sec
     */
    getProcessorBaseSpeed(processorType: enumItemProcessorTypes): number;
  }
  import { BasicSerializableObject } from "shapez/savegame/serialization";
  import { GameRoot } from "shapez/game/root";
  import { ShapeDefinition } from "shapez/game/shape_definition";
  import { enumHubGoalRewards } from "shapez/game/tutorial_goals";
  import { RandomNumberGenerator } from "shapez/core/rng";
  import { enumItemProcessorTypes } from "shapez/game/components/item_processor";
}
declare module "shapez/game/hud/parts/beta_overlay" {
  export class HUDBetaOverlay extends BaseHUDPart {
    createElements(parent: any): void;
    element: HTMLDivElement;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
}
declare module "shapez/core/tracked_state" {
  export type TrackedStateCallback<T> = (value: T) => void;
  export class TrackedState<T> {
    lastSeenValue: T;
    callback: TrackedStateCallback<T>;
    constructor(
      callbackMethod?: TrackedStateCallback<T>,
      callbackScope?: unknown,
    );
    set(
      value: T,
      changeHandler?: TrackedStateCallback<T>,
      changeScope?: unknown,
    ): void;
    setSilent(value: T): void;
    get(): T;
  }
}
declare module "shapez/game/blueprint" {
  export class Blueprint {
    /**
     * Creates a new blueprint from the given entity uids
     * @param {GameRoot} root
     * @param {Array<number>} uids
     */
    static fromUids(root: GameRoot, uids: Array<number>): Blueprint;
    /**
     * @param {Array<Entity>} entities
     */
    constructor(entities: Array<Entity>);
    entities: Entity[];
    /**
     * Returns the layer of this blueprint
     * @returns {Layer}
     */
    get layer(): Layer;
    /**
     * Returns the cost of this blueprint in shapes
     */
    getCost(): number;
    /**
     * Draws the blueprint at the given origin
     * @param {DrawParameters} parameters
     */
    draw(parameters: DrawParameters, tile: any): void;
    /**
     * Rotates the blueprint clockwise
     */
    rotateCw(): void;
    /**
     * Rotates the blueprint counter clock wise
     */
    rotateCcw(): void;
    /**
     * Checks if the blueprint can be placed at the given tile
     * @param {GameRoot} root
     * @param {Vector} tile
     */
    canPlace(root: GameRoot, tile: Vector): boolean;
    /**
     * @param {GameRoot} root
     */
    canAfford(root: GameRoot): boolean;
    /**
     * Attempts to place the blueprint at the given tile
     * @param {GameRoot} root
     * @param {Vector} tile
     */
    tryPlace(root: GameRoot, tile: Vector): any;
  }
  import { Entity } from "shapez/game/entity";
  import { DrawParameters } from "shapez/core/draw_parameters";
  import { GameRoot } from "shapez/game/root";
  import { Vector } from "shapez/core/vector";
}
declare module "shapez/game/hud/dynamic_dom_attach" {
  export class DynamicDomAttach {
    /**
     *
     * @param {GameRoot} root
     * @param {HTMLElement} element
     * @param {object} param2
     * @param {number=} param2.timeToKeepSeconds How long to keep the element visible (in ms) after it should be hidden.
     *                                           Useful for fade-out effects
     * @param {string=} param2.attachClass If set, attaches a class while the element is visible
     * @param {boolean=} param2.trackHover If set, attaches the 'hovered' class if the cursor is above the element. Useful
     *                                     for fading out the element if its below the cursor for example.
     */
    constructor(
      root: GameRoot,
      element: HTMLElement,
      {
        timeToKeepSeconds,
        attachClass,
        trackHover,
      }?: {
        timeToKeepSeconds?: number | undefined;
        attachClass?: string | undefined;
        trackHover?: boolean | undefined;
      },
    );
    /** @type {GameRoot} */
    root: GameRoot;
    /** @type {HTMLElement} */
    element: HTMLElement;
    parent: HTMLElement;
    attachClass: string;
    trackHover: boolean;
    timeToKeepSeconds: number;
    lastVisibleTime: number;
    attached: boolean;
    internalIsClassAttached: boolean;
    classAttachTimeout: number;
    /** @type {DOMRect} */
    lastComputedBounds: DOMRect;
    lastComputedBoundsTime: number;
    trackedIsHovered: TrackedState<boolean>;
    /**
     * Internal method to attach the element
     */
    internalAttach(): void;
    /**
     * Internal method to detach the element
     */
    internalDetach(): void;
    /**
     * Returns whether the element is currently attached
     */
    isAttached(): boolean;
    /**
     * Actually sets the 'hovered' class
     * @param {boolean} isHovered
     */
    setIsHoveredClass(isHovered: boolean): void;
    /**
     * Call this every frame, and the dom attach class will take care of
     * everything else
     * @param {boolean} isVisible Whether the element should currently be visible or not
     */
    update(isVisible: boolean): void;
  }
  import { GameRoot } from "shapez/game/root";
  import { TrackedState } from "shapez/core/tracked_state";
}
declare module "shapez/game/hud/parts/blueprint_placer" {
  export class HUDBlueprintPlacer extends BaseHUDPart {
    createElements(parent: any): void;
    costDisplayParent: HTMLDivElement;
    costDisplayText: HTMLDivElement;
    /** @type {TypedTrackedState<Blueprint?>} */
    currentBlueprint: TypedTrackedState<Blueprint | null>;
    /** @type {Blueprint?} */
    lastBlueprintUsed: Blueprint | null;
    domAttach: DynamicDomAttach;
    trackedCanAfford: TrackedState<boolean>;
    getHasFreeCopyPaste(): boolean;
    abortPlacement(): "stop_propagation";
    /**
     * Called when the layer was changed
     * @param {Layer} layer
     */
    onEditModeChanged(layer: Layer): void;
    /**
     * Called when the blueprint is now affordable or not
     * @param {boolean} canAfford
     */
    onCanAffordChanged(canAfford: boolean): void;
    /**
     * Called when the blueprint was changed
     * @param {Blueprint} blueprint
     */
    onBlueprintChanged(blueprint: Blueprint): void;
    /**
     * mouse down pre handler
     * @param {Vector} pos
     * @param {enumMouseButton} button
     */
    onMouseDown(pos: Vector, button: enumMouseButton): "stop_propagation";
    /**
     * Mouse move handler
     */
    onMouseMove(): "stop_propagation";
    /**
     * Called when an array of bulidings was selected
     * @param {Array<number>} uids
     */
    createBlueprintFromBuildings(uids: Array<number>): void;
    /**
     * Attempts to rotate the current blueprint
     */
    rotateBlueprint(): void;
    /**
     * Attempts to paste the last blueprint
     */
    pasteBlueprint(): void;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { Blueprint } from "shapez/game/blueprint";
  import { DynamicDomAttach } from "shapez/game/hud/dynamic_dom_attach";
  import { TrackedState } from "shapez/core/tracked_state";
  import { Vector } from "shapez/core/vector";
  import { enumMouseButton } from "shapez/game/camera";
}
declare module "shapez/game/buildings/miner" {
  export type enumMinerVariants = string;
  export namespace enumMinerVariants {
    let chainable: string;
  }
  export class MetaMinerBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
    }[];
    constructor();
    getSilhouetteColor(): string;
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
  }
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/hud/parts/building_placer_logic" {
  /**
   * Contains all logic for the building placer - this doesn't include the rendering
   * of info boxes or drawing.
   */
  export class HUDBuildingPlacerLogic extends BaseHUDPart {
    /**
     * We use a fake entity to get information about how a building will look
     * once placed
     * @type {Entity}
     */
    fakeEntity: Entity;
    signals: {
      variantChanged: Signal<[]>;
      draggingStarted: Signal<[]>;
    };
    /**
     * The current building
     * @type {TypedTrackedState<MetaBuilding?>}
     */
    currentMetaBuilding: TypedTrackedState<MetaBuilding | null>;
    /**
     * The current rotation
     * @type {number}
     */
    currentBaseRotationGeneral: number;
    /**
     * The current rotation preference for each building.
     * @type{Object.<string,number>}
     */
    preferredBaseRotations: {
      [x: string]: number;
    };
    /**
     * Whether we are currently dragging
     * @type {boolean}
     */
    currentlyDragging: boolean;
    /**
     * Current building variant
     * @type {TypedTrackedState<string>}
     */
    currentVariant: TypedTrackedState<string>;
    /**
     * Whether we are currently drag-deleting
     * @type {boolean}
     */
    currentlyDeleting: boolean;
    /**
     * Stores which variants for each building we prefer, this is based on what
     * the user last selected
     * @type {Object.<string, string>}
     */
    preferredVariants: {
      [x: string]: string;
    };
    /**
     * The tile we last dragged from
     * @type {Vector}
     */
    lastDragTile: Vector;
    /**
     * The side for direction lock
     * @type {number} (0|1)
     */
    currentDirectionLockSide: number;
    /**
     * Whether the side for direction lock has not yet been determined.
     * @type {boolean}
     */
    currentDirectionLockSideIndeterminate: boolean;
    /**
     * Initializes all bindings
     */
    initializeBindings(): void;
    /**
     * Called when the edit mode got changed
     * @param {Layer} layer
     */
    onEditModeChanged(layer: Layer): void;
    /**
     * Sets the base rotation for the current meta-building.
     * @param {number} rotation The new rotation/angle.
     */
    set currentBaseRotation(rotation: number);
    /**
     * Returns the current base rotation for the current meta-building.
     * @returns {number}
     */
    get currentBaseRotation(): number;
    /**
     * Returns if the direction lock is currently active
     * @returns {boolean}
     */
    get isDirectionLockActive(): boolean;
    /**
     * Returns the current direction lock corner, that is, the corner between
     * mouse and original start point
     * @returns {Vector|null}
     */
    get currentDirectionLockCorner(): Vector | null;
    /**
     * Aborts the placement
     */
    abortPlacement(): "stop_propagation";
    /**
     * Aborts any dragging
     */
    abortDragging(): void;
    initialPlacementVector: any;
    /**
     * Tries to rotate the current building
     */
    tryRotate(): void;
    /**
     * Rotates the current building to the specified direction.
     */
    trySetRotate(): void;
    /**
     * Tries to delete the building under the mouse
     */
    deleteBelowCursor(): boolean;
    /**
     * Starts the pipette function
     */
    startPipette(): void;
    /**
     * Switches the side for the direction lock manually
     */
    switchDirectionLockSide(): void;
    /**
     * Checks if the direction lock key got released and if such, resets the placement
     * @param {any} args
     */
    checkForDirectionLockSwitch({ keyCode }: any): void;
    /**
     * Tries to place the current building at the given tile
     * @param {Vector} tile
     */
    tryPlaceCurrentBuildingAt(tile: Vector): boolean;
    /**
     * Cycles through the variants
     */
    cycleVariants(): void;
    /**
     * Sets the current variant to the given variant
     * @param {string} variant
     */
    setVariant(variant: string): void;
    /**
     * Performs the direction locked placement between two points after
     * releasing the mouse
     */
    executeDirectionLockedPlacement(): void;
    /**
     * Finds the path which the current direction lock will use
     * @returns {Array<{ tile: Vector, rotation: number }>}
     */
    computeDirectionLockPath(): Array<{
      tile: Vector;
      rotation: number;
    }>;
    /**
     * Selects a given building
     * @param {MetaBuilding} metaBuilding
     */
    startSelection(metaBuilding: MetaBuilding): void;
    /**
     * Called when the selected buildings changed
     * @param {MetaBuilding} metaBuilding
     */
    onSelectedMetaBuildingChanged(metaBuilding: MetaBuilding): void;
    /**
     * mouse down pre handler
     * @param {Vector} pos
     * @param {enumMouseButton} button
     */
    onMouseDown(pos: Vector, button: enumMouseButton): "stop_propagation";
    /**
     * mouse move pre handler
     * @param {Vector} pos
     */
    onMouseMove(pos: Vector): "stop_propagation";
    /**
     * Mouse up handler
     */
    onMouseUp(): void;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { Entity } from "shapez/game/entity";
  import { Signal } from "shapez/core/signal";
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Vector } from "shapez/core/vector";
  import { enumMouseButton } from "shapez/game/camera";
}
declare module "shapez/game/hud/parts/building_placer" {
  export class HUDBuildingPlacer extends HUDBuildingPlacerLogic {
    element: HTMLDivElement;
    buildingInfoElements: {};
    variantsElement: HTMLDivElement;
    domAttach: DynamicDomAttach;
    variantsAttach: DynamicDomAttach;
    currentInterpolatedCornerTile: Vector;
    lockIndicatorSprites: {};
    /**
     * Stores the click detectors for the variants so we can clean them up later
     * @type {Array<ClickDetector>}
     */
    variantClickDetectors: Array<ClickDetector>;
    /**
     * Makes the lock indicator sprite for the given layer
     * @param {string} layer
     */
    makeLockIndicatorSprite(layer: string): HTMLCanvasElement;
    /**
     * Rerenders the building info dialog
     */
    rerenderInfoDialog(): void;
    /**
     * Cleans up all variant click detectors
     */
    cleanupVariantClickDetectors(): void;
    /**
     * Rerenders the variants displayed
     */
    rerenderVariants(): void;
    /**
     *
     * @param {DrawParameters} parameters
     */
    drawLayerPeek(parameters: DrawParameters): void;
    /**
     * @param {DrawParameters} parameters
     */
    drawRegularPlacement(parameters: DrawParameters): void;
    /**
     * Checks if there are any entities in the way, returns true if there are
     * @param {Vector} from
     * @param {Vector} to
     * @param {Vector[]=} ignorePositions
     * @returns
     */
    checkForObstales(
      from: Vector,
      to: Vector,
      ignorePositions?: Vector[] | undefined,
    ): boolean;
    /**
     * @param {DrawParameters} parameters
     */
    drawDirectionLock(parameters: DrawParameters): void;
    /**
     * @param {DrawParameters} parameters
     */
    drawMatchingAcceptorsAndEjectors(parameters: DrawParameters): void;
  }
  import { HUDBuildingPlacerLogic } from "shapez/game/hud/parts/building_placer_logic";
  import { DynamicDomAttach } from "shapez/game/hud/dynamic_dom_attach";
  import { Vector } from "shapez/core/vector";
  import { ClickDetector } from "shapez/core/click_detector";
  import { DrawParameters } from "shapez/core/draw_parameters";
}
declare module "shapez/game/buildings/balancer" {
  export type enumBalancerVariants = string;
  export namespace enumBalancerVariants {
    let merger: string;
    let mergerInverse: string;
    let splitter: string;
    let splitterInverse: string;
  }
  export class MetaBalancerBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
    }[];
    constructor();
    getDimensions(variant: any): Vector;
    getSilhouetteColor(): string;
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
  }
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Vector } from "shapez/core/vector";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/buildings/block" {
  export class MetaBlockBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
    }[];
    constructor();
    getSilhouetteColor(): string;
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
  }
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/buildings/constant_producer" {
  export class MetaConstantProducerBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
    }[];
    constructor();
    getSilhouetteColor(): string;
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
  }
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/buildings/cutter" {
  export type enumCutterVariants = string;
  export namespace enumCutterVariants {
    let quad: string;
  }
  export class MetaCutterBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
    }[];
    constructor();
    getSilhouetteColor(): string;
    getDimensions(variant: any): Vector;
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
  }
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Vector } from "shapez/core/vector";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/components/display" {
  export class DisplayComponent extends Component {}
  import { Component } from "shapez/game/component";
}
declare module "shapez/game/buildings/display" {
  export class MetaDisplayBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
    }[];
    constructor();
    getSilhouetteColor(): string;
    getDimensions(): Vector;
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
  }
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Vector } from "shapez/core/vector";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/buildings/filter" {
  export class MetaFilterBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
    }[];
    constructor();
    getSilhouetteColor(): string;
    getDimensions(): Vector;
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
  }
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Vector } from "shapez/core/vector";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/buildings/goal_acceptor" {
  export class MetaGoalAcceptorBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
    }[];
    constructor();
    getSilhouetteColor(): string;
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
  }
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/buildings/lever" {
  export class MetaLeverBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
    }[];
    constructor();
    getSilhouetteColor(): string;
    getDimensions(): Vector;
    getSprite(): any;
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
  }
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Vector } from "shapez/core/vector";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/buildings/mixer" {
  export class MetaMixerBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
    }[];
    constructor();
    getDimensions(): Vector;
    getSilhouetteColor(): string;
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
  }
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Vector } from "shapez/core/vector";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/buildings/painter" {
  export type enumPainterVariants = string;
  export namespace enumPainterVariants {
    let mirrored: string;
    let double: string;
    let quad: string;
  }
  export class MetaPainterBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
    }[];
    constructor();
    getDimensions(variant: any): Vector;
    getSilhouetteColor(): string;
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
  }
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Vector } from "shapez/core/vector";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/buildings/reader" {
  export class MetaReaderBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
    }[];
    constructor();
    getSilhouetteColor(): string;
    getDimensions(): Vector;
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
  }
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Vector } from "shapez/core/vector";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/buildings/rotator" {
  export type enumRotatorVariants = string;
  export namespace enumRotatorVariants {
    let ccw: string;
    let rotate180: string;
  }
  export class MetaRotatorBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
    }[];
    constructor();
    getSilhouetteColor(): string;
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
  }
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/buildings/stacker" {
  export class MetaStackerBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
    }[];
    constructor();
    getSilhouetteColor(): string;
    getDimensions(): Vector;
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
  }
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Vector } from "shapez/core/vector";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/buildings/storage" {
  export class MetaStorageBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
    }[];
    constructor();
    getSilhouetteColor(): string;
    /**
     * @returns {Array<[string, string]>}
     */
    getAdditionalStatistics(root: any, variant: any): Array<[string, string]>;
    getDimensions(): Vector;
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
  }
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Vector } from "shapez/core/vector";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/buildings/trash" {
  export class MetaTrashBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
    }[];
    constructor();
    getSilhouetteColor(): string;
    getDimensions(): Vector;
    getSpecialOverlayRenderMatrix(rotation: any): number[];
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
  }
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Vector } from "shapez/core/vector";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/buildings/underground_belt" {
  export type arrayUndergroundRotationVariantToMode = string;
  /** @enum {string} */
  export const arrayUndergroundRotationVariantToMode: string[];
  export type enumUndergroundBeltVariants = string;
  export namespace enumUndergroundBeltVariants {
    let tier2: string;
  }
  export const enumUndergroundBeltVariantToTier: {
    [enumUndergroundBeltVariants.tier2]: number;
    default: number;
  };
  export class MetaUndergroundBeltBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
      rotationVariant: number;
    }[];
    constructor();
    getSilhouetteColor(variant: any, rotationVariant: any): string;
    /**
     * @param {number} rotationVariant
     * @param {string} variant
     */
    getPreviewSprite(
      rotationVariant: number,
      variant: string,
    ): import("shapez/core/sprites").AtlasSprite;
    /**
     * @param {number} rotationVariant
     * @param {string} variant
     */
    getBlueprintSprite(
      rotationVariant: number,
      variant: string,
    ): import("shapez/core/sprites").AtlasSprite;
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
  }
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/hud/parts/base_toolbar" {
  export class HUDBaseToolbar extends BaseHUDPart {
    /**
     * @param {GameRoot} root
     * @param {object} param0
     * @param {Array<typeof MetaBuilding>} param0.primaryBuildings
     * @param {Array<typeof MetaBuilding>=} param0.secondaryBuildings
     * @param {function} param0.visibilityCondition
     * @param {string} param0.htmlElementId
     * @param {Layer=} param0.layer
     */
    constructor(
      root: GameRoot,
      {
        primaryBuildings,
        secondaryBuildings,
        visibilityCondition,
        htmlElementId,
        layer,
      }: {
        primaryBuildings: Array<typeof MetaBuilding>;
        secondaryBuildings?: Array<typeof MetaBuilding> | undefined;
        visibilityCondition: Function;
        htmlElementId: string;
        layer?: Layer | undefined;
      },
    );
    primaryBuildings: (typeof MetaBuilding)[];
    secondaryBuildings: (typeof MetaBuilding)[];
    visibilityCondition: Function;
    htmlElementId: string;
    layer: Layer;
    /** @type {Object.<string, {
     * metaBuilding: MetaBuilding,
     * unlocked: boolean,
     * selected: boolean,
     * element: HTMLElement,
     * index: number
     * puzzleLocked: boolean;
     * }>} */
    buildingHandles: {
      [x: string]: {
        metaBuilding: MetaBuilding;
        unlocked: boolean;
        selected: boolean;
        element: HTMLElement;
        index: number;
        puzzleLocked: boolean;
      };
    };
    element: HTMLDivElement;
    /**
     * @param {Array<typeof MetaBuilding>} buildings
     * @returns {Array<typeof MetaBuilding>}
     */
    filterBuildings(
      buildings: Array<typeof MetaBuilding>,
    ): Array<typeof MetaBuilding>;
    /**
     * Returns all buildings
     * @returns {Array<typeof MetaBuilding>}
     */
    get allBuildings(): Array<typeof MetaBuilding>;
    secondaryDomAttach: DynamicDomAttach;
    domAttach: DynamicDomAttach;
    lastSelectedIndex: number;
    /**
     * Cycles through all buildings
     */
    cycleBuildings(): void;
    /**
     * Called when the selected building got changed
     * @param {MetaBuilding} metaBuilding
     */
    onSelectedPlacementBuildingChanged(metaBuilding: MetaBuilding): void;
    /**
     * @param {MetaBuilding} metaBuilding
     */
    selectBuildingForPlacement(metaBuilding: MetaBuilding): "stop_propagation";
    /**
     * @param {MetaBuilding} metaBuilding
     */
    toggleBuildingLock(metaBuilding: MetaBuilding): "stop_propagation";
    /**
     * @param {MetaBuilding} metaBuilding
     */
    inRequiredBuildings(metaBuilding: MetaBuilding): boolean;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { MetaBuilding } from "shapez/game/meta_building";
  import { DynamicDomAttach } from "shapez/game/hud/dynamic_dom_attach";
  import { GameRoot } from "shapez/game/root";
}
declare module "shapez/game/hud/parts/buildings_toolbar" {
  export class HUDBuildingsToolbar extends HUDBaseToolbar {
    constructor(root: any);
  }
  import { HUDBaseToolbar } from "shapez/game/hud/parts/base_toolbar";
}
declare module "shapez/game/hud/parts/color_blind_helper" {
  export class HUDColorBlindHelper extends BaseHUDPart {
    createElements(parent: any): void;
    belowTileIndicator: HTMLDivElement;
    trackedColorBelowTile: TrackedState<string>;
    /**
     * Called when the color below the current tile changed
     * @param {enumColors|null} color
     */
    onColorBelowTileChanged(color: enumColors | null): void;
    /**
     * Computes the color below the current tile
     * @returns {enumColors}
     */
    computeColorBelowTile(): enumColors;
    /**
     * Draws the currently selected tile
     * @param {DrawParameters} parameters
     */
    draw(parameters: DrawParameters): any;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { TrackedState } from "shapez/core/tracked_state";
  import { enumColors } from "shapez/game/colors";
  import { DrawParameters } from "shapez/core/draw_parameters";
}
declare module "shapez/game/hud/parts/debug_changes" {
  /**
   * @typedef {{
   *    label: string,
   *    area: Rectangle,
   *    hideAt: number,
   *    fillColor: string
   * }} DebugChange
   */
  export class HUDChangesDebugger extends BaseHUDPart {
    createElements(parent: any): void;
    /** @type {Array<DebugChange>} */
    changes: Array<DebugChange>;
    /**
     * Renders a new change
     * @param {string} label Text to display
     * @param {Rectangle} area Affected area world space
     * @param {string} fillColor Color to display (Hex)
     * @param {number=} timeToDisplay How long to display the change
     */
    renderChange(
      label: string,
      area: Rectangle,
      fillColor: string,
      timeToDisplay?: number | undefined,
    ): void;
  }
  export type DebugChange = {
    label: string;
    area: Rectangle;
    hideAt: number;
    fillColor: string;
  };
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { Rectangle } from "shapez/core/rectangle";
}
declare module "shapez/game/hud/parts/debug_info" {
  export class HUDDebugInfo extends BaseHUDPart {
    createElements(parent: any): void;
    element: HTMLDivElement;
    trackedTickRate: TrackedState<any>;
    trackedTickDuration: TrackedState<any>;
    trackedFPS: TrackedState<any>;
    trackedMousePosition: TrackedState<any>;
    trackedCameraPosition: TrackedState<any>;
    versionElement: HTMLDivElement;
    lastTick: number;
    trackedMode: TrackedState<string>;
    domAttach: DynamicDomAttach;
    /**
     * Called when the mode changed
     * @param {enumDebugOverlayMode} mode
     */
    onModeChanged(mode: enumDebugOverlayMode): void;
    /**
     * Updates the labels
     */
    updateLabels(): void;
    /**
     * Updates the detailed information
     */
    updateDetailedInformation(): void;
    /**
     * Cycles through the different modes
     */
    cycleModes(): void;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { TrackedState } from "shapez/core/tracked_state";
  import { DynamicDomAttach } from "shapez/game/hud/dynamic_dom_attach";
  type enumDebugOverlayMode = string;
  namespace enumDebugOverlayMode {
    let disabled: string;
    let regular: string;
    let detailed: string;
  }
  export {};
}
declare module "shapez/game/hud/parts/entity_debugger" {
  /**
   * Allows to inspect entities by pressing F8 while hovering them
   */
  export class HUDEntityDebugger extends BaseHUDPart {
    createElements(parent: any): void;
    element: HTMLDivElement;
    componentsElem: Element;
    /**
     * The currently selected entity
     * @type {Entity}
     */
    selectedEntity: Entity;
    lastUpdate: number;
    domAttach: DynamicDomAttach;
    pickEntity(): void;
    /**
     *
     * @param {string} name
     * @param {any} val
     * @param {number} indent
     * @param {Array} recursion
     */
    propertyToHTML(
      name: string,
      val: any,
      indent?: number,
      recursion?: any[],
    ): string;
    /**
     * Rerenders the whole container
     * @param {Entity} entity
     */
    rerenderFull(entity: Entity): void;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { Entity } from "shapez/game/entity";
  import { DynamicDomAttach } from "shapez/game/hud/dynamic_dom_attach";
}
declare module "shapez/core/modal_dialog_forms" {
  import { BaseItem } from "shapez/game/base_item";
  import { ClickDetector } from "shapez/core/click_detector";
  import { Signal } from "shapez/core/signal";
  export abstract class FormElement<T = string> {
    id: string;
    label: string;
    valueChosen: Signal<[T]>;
    constructor(id: string, label: string);
    abstract getHtml(): string;
    getFormElement(parent: HTMLElement): HTMLElement;
    abstract bindEvents(
      parent: HTMLDivElement,
      clickTrackers: ClickDetector[],
    ): void;
    focus(): void;
    isValid(): boolean;
    abstract getValue(): T;
  }
  export class FormElementInput extends FormElement {
    placeholder: string;
    defaultValue: string;
    inputType: "text" | "email" | "token";
    validator: (value: string) => boolean;
    element: HTMLInputElement;
    constructor({
      id,
      label,
      placeholder,
      defaultValue,
      inputType,
      validator,
    }: {
      id: string;
      label?: string;
      placeholder: string;
      defaultValue?: string;
      inputType?: "text" | "email" | "token";
      validator?: (value: string) => boolean;
    });
    getHtml(): string;
    bindEvents(parent: HTMLDivElement, clickTrackers: ClickDetector[]): void;
    updateErrorState(): void;
    isValid(): boolean;
    getValue(): string;
    setValue(value: string): void;
    focus(): void;
  }
  export class FormElementCheckbox extends FormElement<boolean> {
    defaultValue: boolean;
    value: boolean;
    element: HTMLDivElement;
    constructor({
      id,
      label,
      defaultValue,
    }: {
      id: any;
      label: any;
      defaultValue?: boolean;
    });
    getHtml(): string;
    bindEvents(parent: HTMLDivElement, clickTrackers: ClickDetector[]): void;
    getValue(): boolean;
    toggle(): void;
    focus(): void;
  }
  export class FormElementItemChooser extends FormElement<BaseItem> {
    items: BaseItem[];
    element: HTMLDivElement;
    chosenItem: BaseItem;
    constructor({
      id,
      label,
      items,
    }: {
      id: string;
      label: string;
      items: BaseItem[];
    });
    getHtml(): string;
    bindEvents(parent: HTMLElement, clickTrackers: ClickDetector[]): void;
    isValid(): boolean;
    getValue(): any;
    focus(): void;
  }
}
declare module "shapez/core/modal_dialog_elements" {
  import type { Application } from "shapez/application";
  import {
    ClickDetector,
    ClickDetectorConstructorArgs,
  } from "shapez/core/click_detector";
  import { InputReceiver, KeydownEvent } from "shapez/core/input_receiver";
  import { FormElement } from "shapez/core/modal_dialog_forms";
  import { Signal, STOP_PROPAGATION } from "shapez/core/signal";
  export type DialogButtonStr<T extends string> = `${T}:${string}` | T;
  export type DialogButtonType = "info" | "loading" | "warning";
  /**
   * Basic text based dialog
   */
  export class Dialog<T extends string = never, U extends unknown[] = []> {
    title: string;
    app: Application;
    contentHTML: string;
    type: string;
    buttonIds: string[];
    closeButton: boolean;
    dialogElem: HTMLDivElement;
    element: HTMLDivElement;
    closeRequested: Signal<[]>;
    buttonSignals: Record<T, Signal<U | []>>;
    valueChosen: Signal<[unknown]>;
    timeouts: number[];
    clickDetectors: ClickDetector[];
    inputReceiver: InputReceiver;
    enterHandler: T;
    escapeHandler: T;
    /**
     *
     * Constructs a new dialog with the given options
     * @param param0
     * @param param0.title Title of the dialog
     * @param param0.contentHTML Inner dialog html
     * @param param0.buttons
     *  Button list, each button contains of up to 3 parts separated by ':'.
     *  Part 0: The id, one of the one defined in dialog_buttons.yaml
     *  Part 1: The style, either good, bad or misc
     *  Part 2 (optional): Additional parameters separated by '/', available are:
     *    timeout: This button is only available after some waiting time
     *    kb_enter: This button is triggered by the enter key
     *    kb_escape This button is triggered by the escape key
     * @param param0.type The dialog type, either "info", "warning", or "loading"
     * @param param0.closeButton Whether this dialog has a close button
     */
    constructor({
      app,
      title,
      contentHTML,
      buttons,
      type,
      closeButton,
    }: {
      app: Application;
      title: string;
      contentHTML: string;
      buttons?: DialogButtonStr<T>[];
      type?: DialogButtonType;
      closeButton?: boolean;
    });
    /**
     * Internal keydown handler
     */
    handleKeydown({
      keyCode,
      shift,
      alt,
      ctrl,
    }: KeydownEvent): void | STOP_PROPAGATION;
    internalButtonHandler(id: T | "close-button", ...payload: U | []): void;
    createElement(): HTMLDivElement;
    setIndex(index: string): void;
    destroy(): void;
    hide(): void;
    show(): void;
    /**
     * Helper method to track clicks on an element
     */
    trackClicks(
      elem: Element,
      handler: () => void,
      args?: ClickDetectorConstructorArgs,
    ): ClickDetector;
  }
  /**
   * Dialog which simply shows a loading spinner
   */
  export class DialogLoading extends Dialog {
    text: string;
    constructor(app: Application, text?: string);
    createElement(): HTMLDivElement;
  }
  type DialogOptionChooserOption = {
    value: string;
    text: string;
    desc?: string;
    iconPrefix?: string;
  };
  export class DialogOptionChooser extends Dialog<"optionSelected", [string]> {
    options: {
      options: DialogOptionChooserOption[];
      active: string;
    };
    initialOption: string;
    constructor({
      app,
      title,
      options,
    }: {
      app: Application;
      title: string;
      options: {
        options: DialogOptionChooserOption[];
        active: string;
      };
    });
    createElement(): HTMLDivElement;
  }
  export class DialogWithForm<
    T extends string = "cancel" | "ok",
  > extends Dialog<T> {
    confirmButtonId: string;
    formElements: FormElement<any>[];
    constructor({
      app,
      title,
      desc,
      formElements,
      buttons,
      confirmButtonId,
      closeButton,
    }: {
      app: Application;
      title: string;
      desc: string;
      formElements: FormElement<any>[];
      buttons?: DialogButtonStr<T>[];
      confirmButtonId?: T;
      closeButton?: boolean;
    });
    internalButtonHandler(id: T | "close-button", ...payload: []): void;
    hasAnyInvalid(): boolean;
    createElement(): HTMLDivElement;
  }
}
declare module "shapez/game/hud/parts/modal_dialogs" {
  export class HUDModalDialogs extends BaseHUDPart {
    constructor(root: any, app: any);
    /** @type {Application} */
    app: Application;
    dialogParent: any;
    dialogStack: any[];
    domWatcher: DynamicDomAttach;
    createElements(parent: any): HTMLDivElement;
    initializeToElement(element: any): void;
    /**
     * @param {string} title
     * @param {string} text
     * @param {Array<`${string}:${string}`>} buttons
     */
    showInfo(
      title: string,
      text: string,
      buttons?: Array<`${string}:${string}`>,
    ): Record<string, import("shapez/core/signal").Signal<[]>>;
    /**
     * @param {string} title
     * @param {string} text
     * @param {Array<import("shapez/../../../core/modal_dialog_elements").DialogButtonStr<string>>} buttons
     */
    showWarning(
      title: string,
      text: string,
      buttons?: Array<
        import("shapez/core/modal_dialog_elements").DialogButtonStr<string>
      >,
    ): Record<string, import("shapez/core/signal").Signal<[]>>;
    showOptionChooser(
      title: any,
      options: any,
    ): Record<
      "optionSelected",
      import("shapez/core/signal").Signal<[] | [string]>
    >;
    showLoadingDialog(text?: string): () => void;
    internalShowDialog(dialog: any): void;
    closeDialog(dialog: any): void;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { Application } from "shapez/application";
  import { DynamicDomAttach } from "shapez/game/hud/dynamic_dom_attach";
}
declare module "shapez/game/hud/parts/notifications" {
  export type enumNotificationType = string;
  export namespace enumNotificationType {
    let saved: string;
    let upgrade: string;
    let success: string;
    let info: string;
    let warning: string;
    let error: string;
  }
  export class HUDNotifications extends BaseHUDPart {
    createElements(parent: any): void;
    element: HTMLDivElement;
    /** @type {Array<{ element: HTMLElement, expireAt: number}>} */
    notificationElements: Array<{
      element: HTMLElement;
      expireAt: number;
    }>;
    /**
     * @param {string} message
     * @param {enumNotificationType} type
     */
    internalShowNotification(message: string, type: enumNotificationType): void;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
}
declare module "shapez/game/hud/parts/settings_menu" {
  export class HUDSettingsMenu extends BaseHUDPart {
    createElements(parent: any): void;
    background: HTMLDivElement;
    menuElement: HTMLDivElement;
    statsElement: HTMLDivElement;
    buttonContainer: HTMLDivElement;
    returnToMenu(): void;
    goToSettings(): void;
    domAttach: DynamicDomAttach;
    inputReceiver: InputReceiver;
    keyActionMapper: KeyActionMapper;
    show(): void;
    visible: boolean;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { DynamicDomAttach } from "shapez/game/hud/dynamic_dom_attach";
  import { InputReceiver } from "shapez/core/input_receiver";
  import { KeyActionMapper } from "shapez/game/key_action_mapper";
}
declare module "shapez/game/hud/parts/shape_tooltip" {
  export class HUDShapeTooltip extends BaseHUDPart {
    createElements(parent: any): void;
    /** @type {Vector} */
    currentTile: Vector;
    /** @type {Entity} */
    currentEntity: Entity;
    isPlacingBuilding:
      | boolean
      | import("shapez/game/meta_building").MetaBuilding;
    isActive(): boolean;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { Vector } from "shapez/core/vector";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/hud/parts/vignette_overlay" {
  export class HUDVignetteOverlay extends BaseHUDPart {
    createElements(parent: any): void;
    element: HTMLDivElement;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
}
declare module "shapez/game/hud/parts/constant_signal_edit" {
  /** @type {{
   * [x: string]: (entity: Entity) => BaseItem
   * }} */
  export const MODS_ADDITIONAL_CONSTANT_SIGNAL_RESOLVER: {
    [x: string]: (entity: Entity) => BaseItem;
  };
  export class HUDConstantSignalEdit extends BaseHUDPart {
    /**
     * @param {Vector} pos
     * @param {enumMouseButton} button
     */
    downPreHandler(pos: Vector, button: enumMouseButton): "stop_propagation";
    /**
     * Asks the entity to enter a valid signal code
     * @param {Entity} entity
     * @param {object} param0
     * @param {boolean=} param0.deleteOnCancel
     */
    editConstantSignal(
      entity: Entity,
      {
        deleteOnCancel,
      }: {
        deleteOnCancel?: boolean | undefined;
      },
    ): void;
    /**
     * Tries to parse a signal code
     * @param {Entity} entity
     * @param {string} code
     * @returns {BaseItem}
     */
    parseSignalCode(entity: Entity, code: string): BaseItem;
  }
  import { Entity } from "shapez/game/entity";
  import { BaseItem } from "shapez/game/base_item";
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { Vector } from "shapez/core/vector";
  import { enumMouseButton } from "shapez/game/camera";
}
declare module "shapez/game/hud/parts/game_menu" {
  export class HUDGameMenu extends BaseHUDPart {
    createElements(parent: any): void;
    element: HTMLDivElement;
    /** @type {Array<{
     * badge: function,
     * button: HTMLElement,
     * badgeElement: HTMLElement,
     * lastRenderAmount: number,
     * condition?: function,
     * notification: [string, enumNotificationType]
     * }>} */
    badgesToUpdate: Array<{
      badge: Function;
      button: HTMLElement;
      badgeElement: HTMLElement;
      lastRenderAmount: number;
      condition?: Function;
      notification: [string, enumNotificationType];
    }>;
    /** @type {Array<{
     * button: HTMLElement,
     * condition: function,
     * domAttach: DynamicDomAttach
     * }>} */
    visibilityToUpdate: Array<{
      button: HTMLElement;
      condition: Function;
      domAttach: DynamicDomAttach;
    }>;
    saveButton: HTMLDivElement;
    settingsButton: HTMLDivElement;
    trackedIsSaving: TrackedState<any>;
    onIsSavingChanged(isSaving: any): void;
    onGameSaved(): void;
    startSave(): void;
    openSettings(): void;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { enumNotificationType } from "shapez/game/hud/parts/notifications";
  import { DynamicDomAttach } from "shapez/game/hud/dynamic_dom_attach";
  import { TrackedState } from "shapez/core/tracked_state";
}
declare module "shapez/game/hud/parts/interactive_tutorial" {
  export class HUDInteractiveTutorial extends BaseHUDPart {
    createElements(parent: any): void;
    element: HTMLDivElement;
    elementDescription: HTMLDivElement;
    elementGif: HTMLDivElement;
    domAttach: DynamicDomAttach;
    currentHintId: TrackedState<any>;
    onHintChanged(hintId: any): void;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { DynamicDomAttach } from "shapez/game/hud/dynamic_dom_attach";
  import { TrackedState } from "shapez/core/tracked_state";
}
declare module "shapez/game/hud/parts/keybinding_overlay" {
  /**
   * @typedef {{ keyCode: number }} KeyCode
   */
  /**
   * @typedef {{
   *   condition: () => boolean,
   *   keys: Array<KeyCode|number|string>,
   *   label: string,
   *   cachedElement?: HTMLElement,
   *   cachedVisibility?: boolean
   * }} KeyBinding
   */
  export class HUDKeybindingOverlay extends BaseHUDPart {
    /**
     * HELPER / Returns if there is a building selected for placement
     * @returns {boolean}
     */
    get buildingPlacementActive(): boolean;
    /**
     * HELPER / Returns if there is a building selected for placement and
     * it supports the belt planner
     * @returns {boolean}
     */
    get buildingPlacementSupportsBeltPlanner(): boolean;
    /**
     * HELPER / Returns if there is a building selected for placement and
     * it has multiplace enabled by default
     * @returns {boolean}
     */
    get buildingPlacementStaysInPlacement(): boolean;
    /**
     * HELPER / Returns if there is a blueprint selected for placement
     * @returns {boolean}
     */
    get blueprintPlacementActive(): boolean;
    /**
     * HELPER / Returns if the belt planner is currently active
     * @returns {boolean}
     */
    get beltPlannerActive(): boolean;
    /**
     * HELPER / Returns if there is a last blueprint available
     * @returns {boolean}
     */
    get lastBlueprintAvailable(): boolean;
    /**
     * HELPER / Returns if there is anything selected on the map
     * @returns {boolean}
     */
    get anythingSelectedOnMap(): boolean;
    /**
     * HELPER / Returns if there is a building or blueprint selected for placement
     * @returns {boolean}
     */
    get anyPlacementActive(): boolean;
    /**
     * HELPER / Returns if the map overview is active
     * @returns {boolean}
     */
    get mapOverviewActive(): boolean;
    /** @type {Array<KeyBinding>} */
    keybindings: Array<KeyBinding>;
    element: HTMLDivElement;
    domAttach: DynamicDomAttach;
  }
  export type KeyCode = {
    keyCode: number;
  };
  export type KeyBinding = {
    condition: () => boolean;
    keys: Array<KeyCode | number | string>;
    label: string;
    cachedElement?: HTMLElement;
    cachedVisibility?: boolean;
  };
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { DynamicDomAttach } from "shapez/game/hud/dynamic_dom_attach";
}
declare module "shapez/game/hud/parts/layer_preview" {
  /**
   * Helper class which allows peaking through to the wires layer
   */
  export class HUDLayerPreview extends BaseHUDPart {
    previewOverlay: import("shapez/core/sprites").AtlasSprite;
    /**
     * (re) initializes the canvas
     */
    initializeCanvas(): void;
    previewSize: number;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    /**
     * Prepares the canvas to render at the given worldPos and the given camera scale
     *
     * @param {Vector} worldPos
     * @param {number} scale 1 / zoomLevel
     */
    prepareCanvasForPreview(worldPos: Vector, scale: number): HTMLCanvasElement;
    /**
     * Renders the preview at the given position
     * @param {import("shapez/../../../core/draw_utils").DrawParameters} parameters
     * @param {Vector} worldPos
     * @param {number} scale 1 / zoomLevel
     */
    renderPreview(
      parameters: import("shapez/core/draw_utils").DrawParameters,
      worldPos: Vector,
      scale: number,
    ): void;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { Vector } from "shapez/core/vector";
}
declare module "shapez/game/hud/parts/lever_toggle" {
  export class HUDLeverToggle extends BaseHUDPart {
    /**
     * @param {Vector} pos
     * @param {enumMouseButton} button
     */
    downPreHandler(pos: Vector, button: enumMouseButton): "stop_propagation";
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { Vector } from "shapez/core/vector";
  import { enumMouseButton } from "shapez/game/camera";
}
declare module "shapez/game/hud/parts/mass_selector" {
  export class HUDMassSelector extends BaseHUDPart {
    createElements(parent: any): void;
    currentSelectionStartWorld: Vector;
    currentSelectionEnd: Vector;
    selectedUids: Set<any>;
    /**
     * Handles the destroy callback and makes sure we clean our list
     * @param {Entity} entity
     */
    onEntityDestroyed(entity: Entity): void;
    /**
     *
     */
    onBack(): "stop_propagation";
    /**
     * Clears the entire selection
     */
    clearSelection(): void;
    confirmDelete(): void;
    doDelete(): void;
    showBlueprintsNotUnlocked(): void;
    startCopy(): void;
    clearBelts(): void;
    confirmCut(): void;
    doCut(): void;
    /**
     * mouse down pre handler
     * @param {Vector} pos
     * @param {enumMouseButton} mouseButton
     */
    onMouseDown(pos: Vector, mouseButton: enumMouseButton): "stop_propagation";
    /**
     * mouse move pre handler
     * @param {Vector} pos
     */
    onMouseMove(pos: Vector): void;
    onMouseUp(): void;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { Vector } from "shapez/core/vector";
  import { Entity } from "shapez/game/entity";
  import { enumMouseButton } from "shapez/game/camera";
}
declare module "shapez/game/hud/parts/miner_highlight" {
  export class HUDMinerHighlight extends BaseHUDPart {
    /**
     * Finds all connected miners to the given entity
     * @param {Entity} entity
     * @param {Set<number>} seenUids Which entities have already been processed
     * @returns {Array<Entity>} The connected miners
     */
    findConnectedMiners(entity: Entity, seenUids?: Set<number>): Array<Entity>;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/hud/parts/puzzle_back_to_menu" {
  export class HUDPuzzleBackToMenu extends BaseHUDPart {
    createElements(parent: any): void;
    element: HTMLDivElement;
    button: HTMLButtonElement;
    back(): void;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
}
declare module "shapez/game/hud/parts/puzzle_dlc_logo" {
  export class HUDPuzzleDLCLogo extends BaseHUDPart {
    createElements(parent: any): void;
    element: HTMLDivElement;
    next(): void;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
}
declare module "shapez/game/modes/puzzle" {
  export class PuzzleGameMode extends GameMode {
    additionalHudParts: {
      puzzleBackToMenu: typeof HUDPuzzleBackToMenu;
      puzzleDlcLogo: typeof HUDPuzzleDLCLogo;
      massSelector: typeof HUDMassSelector;
    };
    zoneWidth: any;
    zoneHeight: any;
    getSaveData(): any;
  }
  import { GameMode } from "shapez/game/game_mode";
  import { HUDPuzzleBackToMenu } from "shapez/game/hud/parts/puzzle_back_to_menu";
  import { HUDPuzzleDLCLogo } from "shapez/game/hud/parts/puzzle_dlc_logo";
  import { HUDMassSelector } from "shapez/game/hud/parts/mass_selector";
}
declare module "shapez/game/buildings/wire_tunnel" {
  export class MetaWireTunnelBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
    }[];
    constructor();
    getSilhouetteColor(): string;
    getDimensions(): Vector;
    /** @returns {"wires"} **/
    getLayer(): "wires";
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
  }
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Vector } from "shapez/core/vector";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/buildings/constant_signal" {
  export class MetaConstantSignalBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
    }[];
    constructor();
    getSilhouetteColor(): string;
    /** @returns {"wires"} **/
    getLayer(): "wires";
    getDimensions(): Vector;
    getSpecialOverlayRenderMatrix(rotation: any): number[];
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
  }
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Vector } from "shapez/core/vector";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/buildings/logic_gate" {
  export type enumLogicGateVariants = string;
  export namespace enumLogicGateVariants {
    let not: string;
    let xor: string;
    let or: string;
  }
  export class MetaLogicGateBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
    }[];
    constructor();
    getSilhouetteColor(variant: any): string;
    /** @returns {"wires"} **/
    getLayer(): "wires";
    getDimensions(): Vector;
    getSpecialOverlayRenderMatrix(
      rotation: any,
      rotationVariant: any,
      variant: any,
    ): number[];
    getAvailableVariants(): string[];
    /**
     *
     * @param {Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity: Entity, rotationVariant: number, variant: any): void;
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
  }
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Vector } from "shapez/core/vector";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/buildings/virtual_processor" {
  export type enumVirtualProcessorVariants = string;
  export namespace enumVirtualProcessorVariants {
    let rotator: string;
    let unstacker: string;
    let stacker: string;
    let painter: string;
  }
  export class MetaVirtualProcessorBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
    }[];
    constructor();
    getSilhouetteColor(variant: any): string;
    /** @returns {"wires"} **/
    getLayer(): "wires";
    getDimensions(): Vector;
    getAvailableVariants(): string[];
    /**
     *
     * @param {Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity: Entity, rotationVariant: number, variant: any): void;
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
  }
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Vector } from "shapez/core/vector";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/buildings/analyzer" {
  export class MetaAnalyzerBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
    }[];
    constructor();
    getSilhouetteColor(): string;
    /** @returns {"wires"} **/
    getLayer(): "wires";
    getDimensions(): Vector;
    getSpecialOverlayRenderMatrix(
      rotation: any,
      rotationVariant: any,
      variant: any,
    ): number[];
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
  }
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Vector } from "shapez/core/vector";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/buildings/comparator" {
  export class MetaComparatorBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
    }[];
    constructor();
    getSilhouetteColor(): string;
    /** @returns {"wires"} **/
    getLayer(): "wires";
    getDimensions(): Vector;
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
  }
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Vector } from "shapez/core/vector";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/game/buildings/transistor" {
  export type enumTransistorVariants = string;
  export namespace enumTransistorVariants {
    let mirrored: string;
  }
  export class MetaTransistorBuilding extends MetaBuilding {
    static getAllVariantCombinations(): {
      internalId: number;
      variant: string;
    }[];
    constructor();
    getSilhouetteColor(): string;
    /** @returns {"wires"} **/
    getLayer(): "wires";
    getDimensions(): Vector;
    getAvailableVariants(): string[];
    getSpecialOverlayRenderMatrix(
      rotation: any,
      rotationVariant: any,
      variant: any,
    ): number[];
    /**
     *
     * @param {Entity} entity
     * @param {number} rotationVariant
     */
    updateVariants(entity: Entity, rotationVariant: number, variant: any): void;
    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity: Entity): void;
  }
  import { MetaBuilding } from "shapez/game/meta_building";
  import { Vector } from "shapez/core/vector";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/savegame/puzzle_serializer" {
  export class PuzzleSerializer {
    /**
     * Serializes the game root into a dump
     * @param {GameRoot} root
     * @returns {import("shapez/./savegame_typedefs").PuzzleGameData}
     */
    generateDumpFromGameRoot(
      root: GameRoot,
    ): import("shapez/savegame/savegame_typedefs").PuzzleGameData;
    /**
     * Tries to parse a signal code
     * @param {GameRoot} root
     * @param {string} code
     * @returns {BaseItem}
     */
    parseItemCode(root: GameRoot, code: string): BaseItem;
    /**
     * @param {GameRoot} root
     * @param {import("shapez/./savegame_typedefs").PuzzleGameData} puzzle
     */
    deserializePuzzle(
      root: GameRoot,
      puzzle: import("shapez/savegame/savegame_typedefs").PuzzleGameData,
    ): string;
  }
  import { GameRoot } from "shapez/game/root";
  import { BaseItem } from "shapez/game/base_item";
}
declare module "shapez/game/hud/parts/puzzle_play_metadata" {
  export class HUDPuzzlePlayMetadata extends BaseHUDPart {
    createElements(parent: any): void;
    titleElement: HTMLDivElement;
    puzzleNameElement: HTMLDivElement;
    element: HTMLDivElement;
    share(): void;
    report(): void;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
}
declare module "shapez/game/hud/parts/puzzle_complete_notification" {
  export class HUDPuzzleCompleteNotification extends BaseHUDPart {
    visible: boolean;
    domAttach: DynamicDomAttach;
    userDidLikePuzzle: any;
    timeOfCompletion: number;
    createElements(parent: any): void;
    inputReceiver: InputReceiver;
    element: HTMLDivElement;
    elemTitle: HTMLDivElement;
    elemContents: HTMLDivElement;
    elemActions: HTMLDivElement;
    buttonLikeYes: HTMLButtonElement;
    continueBtn: HTMLButtonElement;
    menuBtn: HTMLButtonElement;
    nextPuzzleBtn: HTMLButtonElement;
    updateState(): void;
    show(): void;
    nextPuzzle(): void;
    // @ts-ignore
    close(toMenu: any): void;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { DynamicDomAttach } from "shapez/game/hud/dynamic_dom_attach";
  import { InputReceiver } from "shapez/core/input_receiver";
}
declare module "shapez/game/hud/parts/puzzle_play_settings" {
  export class HUDPuzzlePlaySettings extends BaseHUDPart {
    createElements(parent: any): void;
    element: HTMLDivElement;
    clearItems(): void;
    resetPuzzle(): void;
    visible: boolean;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
}
declare module "shapez/game/modes/puzzle_play" {
  export class PuzzlePlayGameMode extends PuzzleGameMode {
    /**
     * @param {GameRoot} root
     * @param {object} payload
     * @param {import("shapez/../../savegame/savegame_typedefs").PuzzleFullData} payload.puzzle
     * @param {Array<number> | undefined} payload.nextPuzzles
     */
    constructor(
      root: GameRoot,
      {
        puzzle,
        nextPuzzles,
      }: {
        puzzle: import("shapez/savegame/savegame_typedefs").PuzzleFullData;
        nextPuzzles: Array<number> | undefined;
      },
    );
    puzzle: import("shapez/savegame/savegame_typedefs").PuzzleFullData;
    /**
     * @type {Array<number>}
     */
    nextPuzzles: Array<number>;
    loadPuzzle(): void;
    /**
     *
     * @param {boolean} liked
     * @param {number} time
     */
    trackCompleted(liked: boolean, time: number): Promise<void>;
    sharePuzzle(): void;
    reportPuzzle(): Promise<void>;
  }
  import { PuzzleGameMode } from "shapez/game/modes/puzzle";
  import { GameRoot } from "shapez/game/root";
}
declare module "shapez/game/hud/parts/next_puzzle" {
  export class HUDPuzzleNextPuzzle extends BaseHUDPart {
    createElements(parent: any): void;
    element: HTMLDivElement;
    button: HTMLButtonElement;
    nextPuzzle(): void;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
}
declare module "shapez/game/hud/parts/pinned_shapes" {
  /**
   * Manages the pinned shapes on the left side of the screen
   */
  export class HUDPinnedShapes extends BaseHUDPart {
    constructor(root: any);
    /**
     * Store a list of pinned shapes
     * @type {Array<string>}
     */
    pinnedShapes: Array<string>;
    /**
     * Store handles to the currently rendered elements, so we can update them more
     * convenient. Also allows for cleaning up handles.
     * @type {Array<{
     *  key: string,
     *  definition: ShapeDefinition,
     *  amountLabel: HTMLElement,
     *  lastRenderedValue: string,
     *  element: HTMLElement,
     *  detector?: ClickDetector,
     *  infoDetector?: ClickDetector,
     *  throughputOnly?: boolean
     * }>}
     */
    handles: Array<{
      key: string;
      definition: ShapeDefinition;
      amountLabel: HTMLElement;
      lastRenderedValue: string;
      element: HTMLElement;
      detector?: ClickDetector;
      infoDetector?: ClickDetector;
      throughputOnly?: boolean;
    }>;
    createElements(parent: any): void;
    element: HTMLDivElement;
    /**
     * Serializes the pinned shapes
     */
    serialize(): {
      shapes: string[];
    };
    /**
     * Deserializes the pinned shapes
     * @param {{ shapes: Array<string>}} data
     */
    deserialize(data: { shapes: Array<string> }): string;
    /**
     * Updates all shapes after an upgrade has been purchased and removes the unused ones
     */
    updateShapesAfterUpgrade(): void;
    /**
     * Finds the current goal for the given key. If the key is the story goal, returns
     * the story goal. If its the blueprint shape, no goal is returned. Otherwise
     * it's searched for upgrades.
     * @param {string} key
     */
    findGoalValueForShape(key: string): any;
    /**
     * Returns whether a given shape is currently pinned
     * @param {string} key
     */
    isShapePinned(key: string): boolean;
    /**
     * Rerenders the whole component
     */
    rerenderFull(): void;
    /**
     * Pins a new shape
     * @param {object} param0
     * @param {string} param0.key
     * @param {boolean=} param0.canUnpin
     * @param {string=} param0.className
     * @param {boolean=} param0.throughputOnly
     */
    internalPinShape({
      key,
      canUnpin,
      className,
      throughputOnly,
    }: {
      key: string;
      canUnpin?: boolean | undefined;
      className?: string | undefined;
      throughputOnly?: boolean | undefined;
    }): void;
    /**
     * Unpins a shape
     * @param {string} key
     */
    unpinShape(key: string): void;
    /**
     * Requests to pin a new shape
     * @param {ShapeDefinition} definition
     */
    pinNewShape(definition: ShapeDefinition): void;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { ShapeDefinition } from "shapez/game/shape_definition";
  import { ClickDetector } from "shapez/core/click_detector";
}
declare module "shapez/game/hud/parts/puzzle_editor_controls" {
  export class HUDPuzzleEditorControls extends BaseHUDPart {
    createElements(parent: any): void;
    element: HTMLDivElement;
    titleElement: HTMLDivElement;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
}
declare module "shapez/game/hud/parts/puzzle_editor_review" {
  export class HUDPuzzleEditorReview extends BaseHUDPart {
    constructor(root: any);
    createElements(parent: any): void;
    element: HTMLDivElement;
    button: HTMLButtonElement;
    startReview(): void;
    startSubmit(title?: string, shortKey?: string): void;
    doSubmitPuzzle(title: any, shortKey: any): void;
    validatePuzzle(): string;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
}
declare module "shapez/game/hud/parts/puzzle_editor_settings" {
  export class HUDPuzzleEditorSettings extends BaseHUDPart {
    createElements(parent: any): void;
    element: HTMLDivElement;
    zone: HTMLDivElement;
    clearItems(): void;
    resetPuzzle(): void;
    trim(): void;
    visible: boolean;
    anyBuildingOutsideZone(width: any, height: any): boolean;
    modifyZone(deltaW: any, deltaH: any): void;
    updateZoneValues(): void;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
}
declare module "shapez/game/hud/parts/screenshot_exporter" {
  export class HUDScreenshotExporter extends BaseHUDPart {
    createElements(): void;
    startExport(): void;
    doExport(): void;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
}
declare module "shapez/game/hud/parts/shape_viewer" {
  export class HUDShapeViewer extends BaseHUDPart {
    createElements(parent: any): void;
    background: HTMLDivElement;
    dialogInner: HTMLDivElement;
    title: HTMLDivElement;
    closeButton: HTMLDivElement;
    contentDiv: HTMLDivElement;
    renderArea: HTMLDivElement;
    infoArea: HTMLDivElement;
    copyButton: HTMLButtonElement;
    domAttach: DynamicDomAttach;
    currentShapeKey: string;
    inputReceiver: InputReceiver;
    keyActionMapper: KeyActionMapper;
    /**
     * Called when the copying of a key was requested
     */
    onCopyKeyRequested(): void;
    visible: boolean;
    /**
     * Shows the viewer for a given definition
     * @param {ShapeDefinition} definition
     */
    renderForShape(definition: ShapeDefinition): void;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { DynamicDomAttach } from "shapez/game/hud/dynamic_dom_attach";
  import { InputReceiver } from "shapez/core/input_receiver";
  import { KeyActionMapper } from "shapez/game/key_action_mapper";
  import { ShapeDefinition } from "shapez/game/shape_definition";
}
declare module "shapez/game/hud/parts/shop" {
  export class HUDShop extends BaseHUDPart {
    createElements(parent: any): void;
    background: HTMLDivElement;
    dialogInner: HTMLDivElement;
    title: HTMLDivElement;
    closeButton: HTMLDivElement;
    contentDiv: HTMLDivElement;
    upgradeToElements: {};
    rerenderFull(): void;
    renderCountsAndStatus(): void;
    domAttach: DynamicDomAttach;
    inputReceiver: InputReceiver;
    keyActionMapper: KeyActionMapper;
    show(): void;
    visible: boolean;
    tryUnlockNextTier(upgradeId: any): void;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { DynamicDomAttach } from "shapez/game/hud/dynamic_dom_attach";
  import { InputReceiver } from "shapez/core/input_receiver";
  import { KeyActionMapper } from "shapez/game/key_action_mapper";
}
declare module "shapez/game/hud/parts/statistics_handle" {
  export type enumDisplayMode = string;
  export namespace enumDisplayMode {
    let icons: string;
    let detailed: string;
  }
  /**
   * Stores how many seconds one unit is
   * @type {Object<string, number>}
   */
  export const statisticsUnitsSeconds: {
    [x: string]: number;
  };
  /**
   * Simple wrapper for a shape definition within the shape statistics
   */
  export class HUDShapeStatisticsHandle {
    /**
     * @param {GameRoot} root
     * @param {ShapeDefinition} definition
     * @param {IntersectionObserver} intersectionObserver
     */
    constructor(
      root: GameRoot,
      definition: ShapeDefinition,
      intersectionObserver: IntersectionObserver,
    );
    definition: ShapeDefinition;
    root: GameRoot;
    intersectionObserver: IntersectionObserver;
    visible: boolean;
    initElement(): void;
    element: HTMLDivElement;
    counter: HTMLSpanElement;
    /**
     * Sets whether the shape handle is visible currently
     * @param {boolean} visibility
     */
    setVisible(visibility: boolean): void;
    shapeCanvas: HTMLCanvasElement;
    /**
     *
     * @param {enumDisplayMode} displayMode
     * @param {enumAnalyticsDataSource} dataSource
     * @param {string} unit
     * @param {boolean=} forced
     */
    update(
      displayMode: enumDisplayMode,
      dataSource: enumAnalyticsDataSource,
      unit: string,
      forced?: boolean | undefined,
    ): void;
    graphCanvas: HTMLCanvasElement;
    graphContext: CanvasRenderingContext2D;
    /**
     * Attaches the handle
     * @param {HTMLElement} parent
     */
    attach(parent: HTMLElement): void;
    /**
     * Detaches the handle
     */
    detach(): void;
    /**
     * Cleans up all child elements
     */
    cleanupChildElements(): void;
    /**
     * Destroys the handle
     */
    destroy(): void;
  }
  import { ShapeDefinition } from "shapez/game/shape_definition";
  import { GameRoot } from "shapez/game/root";
  import { enumAnalyticsDataSource } from "shapez/game/production_analytics";
}
declare module "shapez/game/hud/parts/statistics" {
  export class HUDStatistics extends BaseHUDPart {
    createElements(parent: any): void;
    background: HTMLDivElement;
    dialogInner: HTMLDivElement;
    title: HTMLDivElement;
    closeButton: HTMLDivElement;
    filterHeader: HTMLDivElement;
    sourceExplanation: HTMLDivElement;
    filtersDataSource: HTMLDivElement;
    filtersDisplayMode: HTMLDivElement;
    contentDiv: HTMLDivElement;
    /**
     * @param {enumAnalyticsDataSource} source
     */
    setDataSource(source: enumAnalyticsDataSource): void;
    dataSource: string;
    /**
     * @param {enumDisplayMode} mode
     */
    setDisplayMode(mode: enumDisplayMode): void;
    displayMode: string;
    /**
     * @param {boolean} sorted
     */
    setSorted(sorted: boolean): void;
    sorted: boolean;
    toggleSorted(): void;
    /**
     * Chooses the next unit
     */
    iterateUnit(): void;
    currentUnit: any;
    domAttach: DynamicDomAttach;
    inputReceiver: InputReceiver;
    keyActionMapper: KeyActionMapper;
    /** @type {Object.<string, HUDShapeStatisticsHandle>} */
    activeHandles: {
      [x: string]: HUDShapeStatisticsHandle;
    };
    intersectionObserver: IntersectionObserver;
    lastFullRerender: number;
    intersectionCallback(entries: any): void;
    show(): void;
    visible: boolean;
    lastPartialRerender: number;
    /**
     * Performs a partial rerender, only updating graphs and counts
     */
    rerenderPartial(): void;
    /**
     * Performs a full rerender, regenerating everything
     */
    rerenderFull(): void;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { enumAnalyticsDataSource } from "shapez/game/production_analytics";
  import { enumDisplayMode } from "shapez/game/hud/parts/statistics_handle";
  import { DynamicDomAttach } from "shapez/game/hud/dynamic_dom_attach";
  import { InputReceiver } from "shapez/core/input_receiver";
  import { KeyActionMapper } from "shapez/game/key_action_mapper";
  import { HUDShapeStatisticsHandle } from "shapez/game/hud/parts/statistics_handle";
}
declare module "shapez/game/hud/parts/tutorial_hints" {
  export class HUDPartTutorialHints extends BaseHUDPart {
    createElements(parent: any): void;
    element: HTMLDivElement;
    videoElement: HTMLVideoElement;
    videoAttach: DynamicDomAttach;
    enlarged: boolean;
    inputReceiver: InputReceiver;
    keyActionMapper: KeyActionMapper;
    domAttach: DynamicDomAttach;
    currentShownLevel: TrackedState<any>;
    updateVideoUrl(level: any): void;
    show(): void;
    toggleHintEnlarged(): void;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { DynamicDomAttach } from "shapez/game/hud/dynamic_dom_attach";
  import { InputReceiver } from "shapez/core/input_receiver";
  import { KeyActionMapper } from "shapez/game/key_action_mapper";
  import { TrackedState } from "shapez/core/tracked_state";
}
declare module "shapez/game/hud/parts/tutorial_video_offer" {
  /**
   * Offers to open the tutorial video after completing a level
   */
  export class HUDTutorialVideoOffer extends BaseHUDPart {
    createElements(): void;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
}
declare module "shapez/game/tutorial_goals_mappings" {
  /**
   * Stores which reward unlocks what
   */
  export type enumHubGoalRewardsToContentUnlocked = TutorialGoalReward | null;
  /**
   * Stores which reward unlocks what
   * @enum {TutorialGoalReward?}
   */
  export const enumHubGoalRewardsToContentUnlocked: {
    [enumHubGoalRewards.reward_cutter_and_trash]: TutorialGoalReward;
    [enumHubGoalRewards.reward_rotator]: TutorialGoalReward;
    [enumHubGoalRewards.reward_painter]: TutorialGoalReward;
    [enumHubGoalRewards.reward_mixer]: TutorialGoalReward;
    [enumHubGoalRewards.reward_stacker]: TutorialGoalReward;
    [enumHubGoalRewards.reward_balancer]: TutorialGoalReward;
    [enumHubGoalRewards.reward_tunnel]: TutorialGoalReward;
    [enumHubGoalRewards.reward_rotator_ccw]: TutorialGoalReward;
    [enumHubGoalRewards.reward_rotator_180]: TutorialGoalReward;
    [enumHubGoalRewards.reward_miner_chainable]: TutorialGoalReward;
    [enumHubGoalRewards.reward_underground_belt_tier_2]: TutorialGoalReward;
    [enumHubGoalRewards.reward_splitter]: TutorialGoalReward;
    [enumHubGoalRewards.reward_merger]: TutorialGoalReward;
    [enumHubGoalRewards.reward_cutter_quad]: TutorialGoalReward;
    [enumHubGoalRewards.reward_painter_double]: TutorialGoalReward;
    [enumHubGoalRewards.reward_storage]: TutorialGoalReward;
    [enumHubGoalRewards.reward_belt_reader]: TutorialGoalReward;
    [enumHubGoalRewards.reward_display]: TutorialGoalReward;
    [enumHubGoalRewards.reward_constant_signal]: TutorialGoalReward;
    [enumHubGoalRewards.reward_logic_gates]: TutorialGoalReward;
    [enumHubGoalRewards.reward_filter]: TutorialGoalReward;
    [enumHubGoalRewards.reward_virtual_processing]: null;
    [enumHubGoalRewards.reward_wires_painter_and_levers]: TutorialGoalReward;
    [enumHubGoalRewards.reward_freeplay]: null;
    [enumHubGoalRewards.reward_blueprints]: null;
    [enumHubGoalRewards.no_reward]: null;
    [enumHubGoalRewards.no_reward_freeplay]: null;
    [enumHubGoalRewards.reward_demo_end]: null;
  };
  export type TutorialGoalReward = Array<[typeof MetaBuilding, string]>;
  import { enumHubGoalRewards } from "shapez/game/tutorial_goals";
  import { MetaBuilding } from "shapez/game/meta_building";
}
declare module "shapez/game/hud/parts/unlock_notification" {
  export class HUDUnlockNotification extends BaseHUDPart {
    visible: boolean;
    domAttach: DynamicDomAttach;
    buttonShowTimeout: number;
    createElements(parent: any): void;
    inputReceiver: InputReceiver;
    element: HTMLDivElement;
    elemTitle: HTMLDivElement;
    elemSubTitle: HTMLDivElement;
    elemContents: HTMLDivElement;
    btnClose: HTMLButtonElement;
    /**
     * @param {number} level
     * @param {enumHubGoalRewards} reward
     */
    showForLevel(level: number, reward: enumHubGoalRewards): void;
    requestClose(): void;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { DynamicDomAttach } from "shapez/game/hud/dynamic_dom_attach";
  import { InputReceiver } from "shapez/core/input_receiver";
  import { enumHubGoalRewards } from "shapez/game/tutorial_goals";
}
declare module "shapez/game/hud/parts/waypoints" {
  export class HUDWaypoints extends BaseHUDPart {
    hintElement: HTMLDivElement;
    waypointsListElement: HTMLDivElement;
    /**
     * Serializes the waypoints
     */
    serialize(): {
      waypoints: Waypoint[];
    };
    /**
     * Deserializes the waypoints
     * @param {{waypoints: Array<Waypoint>}} data
     */
    deserialize(data: { waypoints: Array<Waypoint> }): string;
    waypoints: Waypoint[];
    waypointSprites: {
      regular: import("shapez/core/sprites").AtlasSprite;
      wires: import("shapez/core/sprites").AtlasSprite;
    };
    directionIndicatorSprite: import("shapez/core/sprites").AtlasSprite;
    dummyBuffer: CanvasRenderingContext2D;
    domAttach: DynamicDomAttach;
    /**
     * Stores at how much opacity the markers should be rendered on the map.
     * This is interpolated over multiple frames so we have some sort of fade effect
     */
    currentMarkerOpacity: any;
    currentCompassOpacity: any;
    compassBuffer: {
      canvas: HTMLCanvasElement;
      context: CanvasRenderingContext2D;
    };
    /**
     * Stores a cache from a shape short key to its canvas representation
     */
    cachedKeyToCanvas: {};
    /**
     * Store cached text widths
     * @type {Object<string, number>}
     */
    cachedTextWidths: {
      [x: string]: number;
    };
    /**
     * Returns how long a text will be rendered
     * @param {string} text
     * @returns {number}
     */
    getTextWidth(text: string): number;
    /**
     * Returns how big the text should be rendered
     */
    getTextScale(): number;
    /**
     * Returns the scale for rendering waypoints
     */
    getWaypointUiScale(): number;
    /**
     * Re-renders the waypoint list to account for changes
     */
    rerenderWaypointList(): void;
    /**
     * Moves the camera to a given waypoint
     * @param {Waypoint} waypoint
     */
    moveToWaypoint(waypoint: Waypoint): void;
    /**
     * Deletes a waypoint from the list
     * @param {Waypoint} waypoint
     */
    deleteWaypoint(waypoint: Waypoint): void;
    /**
     * Gets the canvas for a given waypoint
     * @param {Waypoint} waypoint
     * @returns {HTMLCanvasElement}
     */
    getWaypointCanvas(waypoint: Waypoint): HTMLCanvasElement;
    /**
     * Requests to save a marker at the current camera position. If worldPos is set,
     * uses that position instead.
     * @param {object} param0
     * @param {Vector=} param0.worldPos Override the world pos, otherwise it is the camera position
     * @param {Waypoint=} param0.waypoint Waypoint to be edited. If omitted, create new
     */
    requestSaveMarker({
      worldPos,
      waypoint,
    }: {
      worldPos?: Vector | undefined;
      waypoint?: Waypoint | undefined;
    }): void;
    /**
     * Adds a new waypoint at the given location with the given label
     * @param {string} label
     * @param {Vector} position
     */
    addWaypoint(label: string, position: Vector): void;
    /**
     * Renames a waypoint with the given label
     * @param {Waypoint} waypoint
     * @param {string} label
     */
    renameWaypoint(waypoint: Waypoint, label: string): void;
    /**
     * Sort waypoints by name
     */
    sortWaypoints(): void;
    /**
     * Returns the label for a given waypoint
     * @param {Waypoint} waypoint
     * @returns {string}
     */
    getWaypointLabel(waypoint: Waypoint): string;
    /**
     * Returns if a waypoint is deletable
     * @param {Waypoint} waypoint
     * @returns {boolean}
     */
    isWaypointDeletable(waypoint: Waypoint): boolean;
    /**
     * Returns the screen space bounds of the given waypoint or null
     * if it couldn't be determined. Also returns wheter its a shape or not
     * @param {Waypoint} waypoint
     * @return {{
     *   screenBounds: Rectangle
     *   item: BaseItem|null,
     *   text: string
     * }}
     */
    getWaypointScreenParams(waypoint: Waypoint): {
      screenBounds: Rectangle;
      item: BaseItem | null;
      text: string;
    };
    /**
     * Finds the currently intersected waypoint on the map overview under
     * the cursor.
     *
     * @returns {Waypoint | null}
     */
    findCurrentIntersectedWaypoint(): Waypoint | null;
    /**
     * Mouse-Down handler
     * @param {Vector} pos
     * @param {enumMouseButton} button
     */
    onMouseDown(pos: Vector, button: enumMouseButton): "stop_propagation";
    /**
     * Rerenders the compass
     */
    rerenderWaypointsCompass(): void;
  }
  export type Waypoint = {
    label: string | null;
    center: {
      x: number;
      y: number;
    };
    zoomLevel: number;
    layer: Layer;
  };
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { DynamicDomAttach } from "shapez/game/hud/dynamic_dom_attach";
  import { Vector } from "shapez/core/vector";
  import { Rectangle } from "shapez/core/rectangle";
  import { BaseItem } from "shapez/game/base_item";
  import { enumMouseButton } from "shapez/game/camera";
}
declare module "shapez/game/hud/parts/wires_overlay" {
  export class HUDWiresOverlay extends BaseHUDPart {
    createElements(parent: any): void;
    currentAlpha: any;
    /**
     * Switches between layers
     */
    switchLayers(): void;
    /**
     * Generates the background pattern for the wires overlay
     */
    generateTilePattern(): void;
    tilePatternCanvas: HTMLCanvasElement;
    /**
     * Copies the wires value below the cursor
     */
    copyWireValue(): void;
    cachedPatternBackground: CanvasPattern;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
}
declare module "shapez/game/hud/parts/wires_toolbar" {
  export class HUDWiresToolbar extends HUDBaseToolbar {
    constructor(root: any);
  }
  import { HUDBaseToolbar } from "shapez/game/hud/parts/base_toolbar";
}
declare module "shapez/game/hud/parts/wire_info" {
  export class HUDWireInfo extends BaseHUDPart {
    spriteEmpty: import("shapez/core/sprites").AtlasSprite;
    spriteConflict: import("shapez/core/sprites").AtlasSprite;
    /**
     *
     *
     * @param {import("shapez/../../../core/draw_utils").DrawParameters} parameters
     * @param {WireNetwork} network
     */
    drawHighlightedNetwork(
      parameters: import("shapez/core/draw_utils").DrawParameters,
      network: WireNetwork,
    ): void;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { WireNetwork } from "shapez/game/systems/wire";
}
declare module "shapez/game/hud/hud_parts" {
  import type { HUDBetaOverlay } from "shapez/game/hud/parts/beta_overlay";
  import type { HUDBlueprintPlacer } from "shapez/game/hud/parts/blueprint_placer";
  import type { HUDBuildingsToolbar } from "shapez/game/hud/parts/buildings_toolbar";
  import type { HUDBuildingPlacer } from "shapez/game/hud/parts/building_placer";
  import type { HUDColorBlindHelper } from "shapez/game/hud/parts/color_blind_helper";
  import type { HUDConstantSignalEdit } from "shapez/game/hud/parts/constant_signal_edit";
  import type { HUDChangesDebugger } from "shapez/game/hud/parts/debug_changes";
  import type { HUDDebugInfo } from "shapez/game/hud/parts/debug_info";
  import type { HUDEntityDebugger } from "shapez/game/hud/parts/entity_debugger";
  import type { HUDGameMenu } from "shapez/game/hud/parts/game_menu";
  import type { HUDInteractiveTutorial } from "shapez/game/hud/parts/interactive_tutorial";
  import type { HUDKeybindingOverlay } from "shapez/game/hud/parts/keybinding_overlay";
  import type { HUDLayerPreview } from "shapez/game/hud/parts/layer_preview";
  import type { HUDLeverToggle } from "shapez/game/hud/parts/lever_toggle";
  import type { HUDMassSelector } from "shapez/game/hud/parts/mass_selector";
  import type { HUDMinerHighlight } from "shapez/game/hud/parts/miner_highlight";
  import type { HUDModalDialogs } from "shapez/game/hud/parts/modal_dialogs";
  import type { HUDPuzzleNextPuzzle } from "shapez/game/hud/parts/next_puzzle";
  import type { HUDNotifications } from "shapez/game/hud/parts/notifications";
  import type { HUDPinnedShapes } from "shapez/game/hud/parts/pinned_shapes";
  import type { HUDPuzzleBackToMenu } from "shapez/game/hud/parts/puzzle_back_to_menu";
  import type { HUDPuzzleCompleteNotification } from "shapez/game/hud/parts/puzzle_complete_notification";
  import type { HUDPuzzleDLCLogo } from "shapez/game/hud/parts/puzzle_dlc_logo";
  import type { HUDPuzzleEditorControls } from "shapez/game/hud/parts/puzzle_editor_controls";
  import type { HUDPuzzleEditorReview } from "shapez/game/hud/parts/puzzle_editor_review";
  import type { HUDPuzzleEditorSettings } from "shapez/game/hud/parts/puzzle_editor_settings";
  import type { HUDPuzzlePlayMetadata } from "shapez/game/hud/parts/puzzle_play_metadata";
  import type { HUDPuzzlePlaySettings } from "shapez/game/hud/parts/puzzle_play_settings";
  import type { HUDScreenshotExporter } from "shapez/game/hud/parts/screenshot_exporter";
  import type { HUDSettingsMenu } from "shapez/game/hud/parts/settings_menu";
  import type { HUDShapeTooltip } from "shapez/game/hud/parts/shape_tooltip";
  import type { HUDShapeViewer } from "shapez/game/hud/parts/shape_viewer";
  import type { HUDShop } from "shapez/game/hud/parts/shop";
  import type { HUDStatistics } from "shapez/game/hud/parts/statistics";
  import type { HUDPartTutorialHints } from "shapez/game/hud/parts/tutorial_hints";
  import type { HUDTutorialVideoOffer } from "shapez/game/hud/parts/tutorial_video_offer";
  import type { HUDUnlockNotification } from "shapez/game/hud/parts/unlock_notification";
  import type { HUDVignetteOverlay } from "shapez/game/hud/parts/vignette_overlay";
  import type { HUDWaypoints } from "shapez/game/hud/parts/waypoints";
  import type { HUDWiresOverlay } from "shapez/game/hud/parts/wires_overlay";
  import type { HUDWiresToolbar } from "shapez/game/hud/parts/wires_toolbar";
  import type { HUDWireInfo } from "shapez/game/hud/parts/wire_info";
  export interface HudParts {
    buildingsToolbar: HUDBuildingsToolbar;
    blueprintPlacer: HUDBlueprintPlacer;
    buildingPlacer: HUDBuildingPlacer;
    shapeTooltip: HUDShapeTooltip;
    settingsMenu: HUDSettingsMenu;
    debugInfo: HUDDebugInfo;
    dialogs: HUDModalDialogs;
    entityDebugger?: HUDEntityDebugger;
    changesDebugger?: HUDChangesDebugger;
    vignetteOverlay?: HUDVignetteOverlay;
    colorBlindHelper?: HUDColorBlindHelper;
    betaOverlay?: HUDBetaOverlay;
    massSelector?: HUDMassSelector;
    constantSignalEdit?: HUDConstantSignalEdit;
    wiresToolbar?: HUDWiresToolbar;
    unlockNotification?: HUDUnlockNotification;
    shop?: HUDShop;
    statistics?: HUDStatistics;
    waypoints?: HUDWaypoints;
    wireInfo?: HUDWireInfo;
    leverToggle?: HUDLeverToggle;
    pinnedShapes?: HUDPinnedShapes;
    notifications?: HUDNotifications;
    screenshotExporter?: HUDScreenshotExporter;
    wiresOverlay?: HUDWiresOverlay;
    shapeViewer?: HUDShapeViewer;
    layerPreview?: HUDLayerPreview;
    minerHighlight?: HUDMinerHighlight;
    tutorialVideoOffer?: HUDTutorialVideoOffer;
    gameMenu?: HUDGameMenu;
    keybindingOverlay?: HUDKeybindingOverlay;
    tutorialHints?: HUDPartTutorialHints;
    interactiveTutorial?: HUDInteractiveTutorial;
    puzzleBackToMenu?: HUDPuzzleBackToMenu;
    puzzleDlcLogo?: HUDPuzzleDLCLogo;
    puzzleEditorControls?: HUDPuzzleEditorControls;
    puzzleEditorReview?: HUDPuzzleEditorReview;
    puzzleEditorSettings?: HUDPuzzleEditorSettings;
    puzzlePlayMetadata?: HUDPuzzlePlayMetadata;
    puzzlePlaySettings?: HUDPuzzlePlaySettings;
    puzzleCompleteNotification?: HUDPuzzleCompleteNotification;
    puzzleNext?: HUDPuzzleNextPuzzle;
  }
}
declare module "shapez/game/hud/hud" {
  export class GameHUD {
    /**
     * @param {GameRoot} root
     */
    constructor(root: GameRoot);
    root: GameRoot;
    /**
     * Initializes the hud parts
     */
    initialize(): void;
    signals: {
      buildingSelectedForPlacement: Signal<[MetaBuilding | null]>;
      selectedPlacementBuildingChanged: Signal<[MetaBuilding | null]>;
      shapePinRequested: Signal<[ShapeDefinition]>;
      shapeUnpinRequested: Signal<[string]>;
      notification: Signal<[string, enumNotificationType]>;
      buildingsSelectedForCopy: Signal<[Array<number>]>;
      pasteBlueprintRequested: Signal<[]>;
      viewShapeDetailsRequested: Signal<[ShapeDefinition]>;
      unlockNotificationFinished: Signal<[]>;
    };
    /** @type {import("shapez/./hud_parts").HudParts} */
    parts: import("shapez/game/hud/hud_parts").HudParts;
    /**
     * Attempts to close all overlays
     */
    closeAllOverlays(): void;
    /**
     * Returns true if the game logic should be paused
     */
    shouldPauseGame(): boolean;
    /**
     * Returns true if the rendering can be paused
     */
    shouldPauseRendering(): boolean;
    /**
     * Returns true if the rendering can be paused
     */
    hasBlockingOverlayOpen(): boolean;
    /**
     * Toggles the ui
     */
    toggleUi(): void;
    /**
     * Updates all parts
     */
    update(): void;
    /**
     * Draws all parts
     * @param {DrawParameters} parameters
     */
    draw(parameters: DrawParameters): void;
    /**
     * Draws all part overlays
     * @param {DrawParameters} parameters
     */
    drawOverlays(parameters: DrawParameters): void;
    /**
     * Cleans up everything
     */
    cleanup(): void;
  }
  import { GameRoot } from "shapez/game/root";
  import { Signal } from "shapez/core/signal";
  import { MetaBuilding } from "shapez/game/meta_building";
  import { ShapeDefinition } from "shapez/game/shape_definition";
  import { enumNotificationType } from "shapez/game/hud/parts/notifications";
  import { DrawParameters } from "shapez/core/draw_parameters";
}
declare module "shapez/game/logic" {
  /**
   * Typing helper
   * @typedef {Array<{
   *  entity: Entity,
   *  slot: import("shapez/./components/item_ejector").ItemEjectorSlot,
   *  fromTile: Vector,
   *  toDirection: enumDirection
   * }>} EjectorsAffectingTile
   */
  /**
   * Typing helper
   * @typedef {Array<{
   *  entity: Entity,
   *  slot: import("shapez/./components/item_acceptor").ItemAcceptorSlot,
   *  toTile: Vector,
   *  fromDirection: enumDirection
   * }>} AcceptorsAffectingTile
   */
  /**
   * @typedef {{
   *     acceptors: AcceptorsAffectingTile,
   *     ejectors: EjectorsAffectingTile
   * }} AcceptorsAndEjectorsAffectingTile
   */
  export class GameLogic {
    /**
     *
     * @param {GameRoot} root
     */
    constructor(root: GameRoot);
    root: GameRoot;
    /**
     * Checks if the given entity can be placed
     * @param {Entity} entity
     * @param {Object} param0
     * @param {boolean=} param0.allowReplaceBuildings
     * @param {Vector=} param0.offset Optional, move the entity by the given offset first
     * @returns {boolean} true if the entity could be placed there
     */
    checkCanPlaceEntity(
      entity: Entity,
      {
        allowReplaceBuildings,
        offset,
      }: {
        allowReplaceBuildings?: boolean | undefined;
        offset?: Vector | undefined;
      },
    ): boolean;
    /**
     * Attempts to place the given building
     * @param {object} param0
     * @param {Vector} param0.origin
     * @param {number} param0.rotation
     * @param {number} param0.originalRotation
     * @param {number} param0.rotationVariant
     * @param {string} param0.variant
     * @param {MetaBuilding} param0.building
     * @returns {Entity}
     */
    tryPlaceBuilding({
      origin,
      rotation,
      rotationVariant,
      originalRotation,
      variant,
      building,
    }: {
      origin: Vector;
      rotation: number;
      originalRotation: number;
      rotationVariant: number;
      variant: string;
      building: MetaBuilding;
    }): Entity;
    /**
     * Removes all entities with a RemovableMapEntityComponent which need to get
     * removed before placing this entity
     * @param {Entity} entity
     */
    freeEntityAreaBeforeBuild(entity: Entity): void;
    /**
     * Performs a bulk operation, not updating caches in the meantime
     * @param {function} operation
     */
    performBulkOperation(operation: Function): any;
    /**
     * Performs a immutable operation, causing no recalculations
     * @param {function} operation
     */
    performImmutableOperation(operation: Function): any;
    /**
     * Returns whether the given building can get removed
     * @param {Entity} building
     */
    canDeleteBuilding(building: Entity): boolean;
    /**
     * Tries to delete the given building
     * @param {Entity} building
     */
    tryDeleteBuilding(building: Entity): boolean;
    /**
     *
     * Computes the flag for a given tile
     * @param {object} param0
     * @param {enumWireVariant} param0.wireVariant
     * @param {Vector} param0.tile The tile to check at
     * @param {enumDirection} param0.edge The edge to check for
     */
    computeWireEdgeStatus({
      wireVariant,
      tile,
      edge,
    }: {
      wireVariant: enumWireVariant;
      tile: Vector;
      edge: enumDirection;
    }): boolean;
    /**
     * Returns all wire networks this entity participates in on the given tile
     * @param {Entity} entity
     * @param {Vector} tile
     * @returns {Array<WireNetwork>|null} Null if the entity is never able to be connected at the given tile
     */
    getEntityWireNetworks(
      entity: Entity,
      tile: Vector,
    ): Array<WireNetwork> | null;
    /**
     * Returns if the entities tile *and* his overlay matrix is intersected
     * @param {Entity} entity
     * @param {Vector} worldPos
     */
    getIsEntityIntersectedWithMatrix(entity: Entity, worldPos: Vector): boolean;
    /**
     * Returns the acceptors and ejectors which affect the current tile
     * @param {Vector} tile
     * @returns {AcceptorsAndEjectorsAffectingTile}
     */
    getEjectorsAndAcceptorsAtTile(
      tile: Vector,
    ): AcceptorsAndEjectorsAffectingTile;
    /**
     * Clears all belts and items
     */
    clearAllBeltsAndItems(): void;
  }
  /**
   * Typing helper
   */
  export type EjectorsAffectingTile = Array<{
    entity: Entity;
    slot: import("shapez/game/components/item_ejector").ItemEjectorSlot;
    fromTile: Vector;
    toDirection: enumDirection;
  }>;
  /**
   * Typing helper
   */
  export type AcceptorsAffectingTile = Array<{
    entity: Entity;
    slot: import("shapez/game/components/item_acceptor").ItemAcceptorSlot;
    toTile: Vector;
    fromDirection: enumDirection;
  }>;
  export type AcceptorsAndEjectorsAffectingTile = {
    acceptors: AcceptorsAffectingTile;
    ejectors: EjectorsAffectingTile;
  };
  import { GameRoot } from "shapez/game/root";
  import { Entity } from "shapez/game/entity";
  import { Vector } from "shapez/core/vector";
  import { MetaBuilding } from "shapez/game/meta_building";
  import { enumWireVariant } from "shapez/game/components/wire";
  import { enumDirection } from "shapez/core/vector";
  import { WireNetwork } from "shapez/game/systems/wire";
}
declare module "shapez/game/map_chunk_aggregate" {
  export class MapChunkAggregate {
    /**
     *
     * @param {GameRoot} root
     * @param {number} x
     * @param {number} y
     */
    constructor(root: GameRoot, x: number, y: number);
    root: GameRoot;
    x: number;
    y: number;
    /**
     * Whenever something changes, we increase this number - so we know we need to redraw
     */
    renderIteration: number;
    dirty: boolean;
    /** @type {Array<boolean>} */
    dirtyList: Array<boolean>;
    /**
     * Marks this chunk as dirty, rerendering all caches
     * @param {number} chunkX
     * @param {number} chunkY
     */
    markDirty(chunkX: number, chunkY: number): void;
    renderKey: string;
    /**
     *
     * @param {HTMLCanvasElement} canvas
     * @param {CanvasRenderingContext2D} context
     * @param {number} w
     * @param {number} h
     * @param {number} dpi
     */
    generateOverlayBuffer(
      canvas: HTMLCanvasElement,
      context: CanvasRenderingContext2D,
      w: number,
      h: number,
      dpi: number,
    ): void;
    /**
     * Overlay
     * @param {DrawParameters} parameters
     */
    drawOverlay(parameters: DrawParameters): void;
  }
  import { GameRoot } from "shapez/game/root";
  import { DrawParameters } from "shapez/core/draw_parameters";
}
declare module "shapez/game/map" {
  export class BaseMap extends BasicSerializableObject {
    static getId(): string;
    static getSchema(): {
      seed: import("shapez/savegame/serialization_data_types").TypePositiveInteger;
    };
    /**
     *
     * @param {GameRoot} root
     */
    constructor(root: GameRoot);
    root: GameRoot;
    seed: number;
    /**
     * Mapping of 'X|Y' to chunk
     * @type {Map<string, MapChunkView>} */
    chunksById: Map<string, MapChunkView>;
    /**
     * Mapping of 'X|Y' to chunk aggregate
     * @type {Map<string, MapChunkAggregate>} */
    aggregatesById: Map<string, MapChunkAggregate>;
    /**
     * Returns the given chunk by index
     * @param {number} chunkX
     * @param {number} chunkY
     */
    getChunk(
      chunkX: number,
      chunkY: number,
      createIfNotExistent?: boolean,
    ): MapChunkView;
    /**
     * Returns the chunk aggregate containing a given chunk
     * @param {number} chunkX
     * @param {number} chunkY
     */
    getAggregateForChunk(
      chunkX: number,
      chunkY: number,
      createIfNotExistent?: boolean,
    ): MapChunkAggregate;
    /**
     * Returns the given chunk aggregate by index
     * @param {number} aggX
     * @param {number} aggY
     */
    getAggregate(
      aggX: number,
      aggY: number,
      createIfNotExistent?: boolean,
    ): MapChunkAggregate;
    /**
     * Gets or creates a new chunk if not existent for the given tile
     * @param {number} tileX
     * @param {number} tileY
     * @returns {MapChunkView}
     */
    getOrCreateChunkAtTile(tileX: number, tileY: number): MapChunkView;
    /**
     * Gets a chunk if not existent for the given tile
     * @param {number} tileX
     * @param {number} tileY
     * @returns {MapChunkView?}
     */
    getChunkAtTileOrNull(tileX: number, tileY: number): MapChunkView | null;
    /**
     * Checks if a given tile is within the map bounds
     * @param {Vector} tile
     * @returns {boolean}
     */
    isValidTile(tile: Vector): boolean;
    /**
     * Returns the tile content of a given tile
     * @param {Vector} tile
     * @param {Layer} layer
     * @returns {Entity} Entity or null
     */
    getTileContent(tile: Vector, layer: Layer): Entity;
    /**
     * Returns the lower layers content of the given tile
     * @param {number} x
     * @param {number} y
     * @returns {BaseItem=}
     */
    getLowerLayerContentXY(x: number, y: number): BaseItem | undefined;
    /**
     * Returns the tile content of a given tile
     * @param {number} x
     * @param {number} y
     * @param {Layer} layer
     * @returns {Entity} Entity or null
     */
    getLayerContentXY(x: number, y: number, layer: Layer): Entity;
    /**
     * Returns the tile contents of a given tile
     * @param {number} x
     * @param {number} y
     * @returns {Array<Entity>} Entity or null
     */
    getLayersContentsMultipleXY(x: number, y: number): Array<Entity>;
    /**
     * Checks if the tile is used
     * @param {Vector} tile
     * @param {Layer} layer
     * @returns {boolean}
     */
    isTileUsed(tile: Vector, layer: Layer): boolean;
    /**
     * Checks if the tile is used
     * @param {number} x
     * @param {number} y
     * @param {Layer} layer
     * @returns {boolean}
     */
    isTileUsedXY(x: number, y: number, layer: Layer): boolean;
    /**
     * Sets the tiles content
     * @param {Vector} tile
     * @param {Entity} entity
     */
    setTileContent(tile: Vector, entity: Entity): void;
    /**
     * Places an entity with the StaticMapEntity component
     * @param {Entity} entity
     */
    placeStaticEntity(entity: Entity): void;
    /**
     * Removes an entity with the StaticMapEntity component
     * @param {Entity} entity
     */
    removeStaticEntity(entity: Entity): void;
    /**
     * Checks a given tile for validty
     * @param {Vector} tile
     */
    internalCheckTile(tile: Vector): void;
  }
  import { BasicSerializableObject } from "shapez/savegame/serialization";
  import { GameRoot } from "shapez/game/root";
  import { MapChunkView } from "shapez/game/map_chunk_view";
  import { MapChunkAggregate } from "shapez/game/map_chunk_aggregate";
  import { Vector } from "shapez/core/vector";
  import { Entity } from "shapez/game/entity";
  import { BaseItem } from "shapez/game/base_item";
}
declare module "shapez/game/map_view" {
  /**
   * This is the view of the map, it extends the map which is the raw model and allows
   * to draw it
   */
  export class MapView extends BaseMap {
    constructor(root: any);
    /**
     * DPI of the background cache images, required in some places
     */
    backgroundCacheDPI: number;
    /**
     * The cached background sprite, containing the flat background
     * @type {Object<string, HTMLCanvasElement | null>}
     */
    cachedBackgroundCanvases: {
      [x: string]: HTMLCanvasElement;
    };
    /** @type {CanvasRenderingContext2D} */
    cachedBackgroundContext: CanvasRenderingContext2D;
    cleanup(): void;
    /**
     * Called when an entity was added, removed or changed
     * @param {Entity} entity
     */
    onEntityChanged(entity: Entity): void;
    /**
     * Draws all static entities like buildings etc.
     * @param {DrawParameters} drawParameters
     */
    drawStaticEntityDebugOverlays(drawParameters: DrawParameters): void;
    /**
     * Initializes all canvases used for background rendering
     */
    internalInitializeCachedBackgroundCanvases(): void;
    /**
     * Draws the maps foreground
     * @param {DrawParameters} parameters
     */
    drawForeground(parameters: DrawParameters): void;
    /**
     * Calls a given method on all given chunks
     * @param {DrawParameters} parameters
     * @param {function} method
     */
    drawVisibleChunks(parameters: DrawParameters, method: Function): void;
    /**
     * Calls a given method on all given chunks
     * @param {DrawParameters} parameters
     * @param {function} method
     */
    drawVisibleAggregates(parameters: DrawParameters, method: Function): void;
    /**
     * Draws the wires foreground
     * @param {DrawParameters} parameters
     */
    drawWiresForegroundLayer(parameters: DrawParameters): void;
    /**
     * Draws the map overlay
     * @param {DrawParameters} parameters
     */
    drawOverlay(parameters: DrawParameters): void;
    /**
     * Draws the map background
     * @param {DrawParameters} parameters
     */
    drawBackground(parameters: DrawParameters): void;
  }
  import { BaseMap } from "shapez/game/map";
  import { Entity } from "shapez/game/entity";
  import { DrawParameters } from "shapez/core/draw_parameters";
}
declare module "shapez/game/shape_definition_manager" {
  export class ShapeDefinitionManager extends BasicSerializableObject {
    static getId(): string;
    /**
     *
     * @param {GameRoot} root
     */
    constructor(root: GameRoot);
    root: GameRoot;
    /**
     * Store a cache from key -> definition
     * @type {Object<string, ShapeDefinition>}
     */
    shapeKeyToDefinition: {
      [x: string]: ShapeDefinition;
    };
    /**
     * Store a cache from key -> item
     */
    shapeKeyToItem: {};
    /** @type {Object.<string, Array<ShapeDefinition>|ShapeDefinition>} */
    operationCache: {
      [x: string]: ShapeDefinition | ShapeDefinition[];
    };
    /**
     * Returns a shape instance from a given short key
     * @param {string} hash
     * @returns {ShapeDefinition}
     */
    getShapeFromShortKey(hash: string): ShapeDefinition;
    /**
     * Returns a item instance from a given short key
     * @param {string} hash
     * @returns {ShapeItem}
     */
    getShapeItemFromShortKey(hash: string): ShapeItem;
    /**
     * Returns a shape item for a given definition
     * @param {ShapeDefinition} definition
     * @returns {ShapeItem}
     */
    getShapeItemFromDefinition(definition: ShapeDefinition): ShapeItem;
    /**
     * Registers a new shape definition
     * @param {ShapeDefinition} definition
     */
    registerShapeDefinition(definition: ShapeDefinition): void;
    /**
     * Generates a definition for splitting a shape definition in two halfs
     * @param {ShapeDefinition} definition
     * @returns {[ShapeDefinition, ShapeDefinition]}
     */
    shapeActionCutHalf(
      definition: ShapeDefinition,
    ): [ShapeDefinition, ShapeDefinition];
    /**
     * Generates a definition for splitting a shape definition in four quads
     * @param {ShapeDefinition} definition
     * @returns {[ShapeDefinition, ShapeDefinition, ShapeDefinition, ShapeDefinition]}
     */
    shapeActionCutQuad(
      definition: ShapeDefinition,
    ): [ShapeDefinition, ShapeDefinition, ShapeDefinition, ShapeDefinition];
    /**
     * Generates a definition for rotating a shape clockwise
     * @param {ShapeDefinition} definition
     * @returns {ShapeDefinition}
     */
    shapeActionRotateCW(definition: ShapeDefinition): ShapeDefinition;
    /**
     * Generates a definition for rotating a shape counter clockwise
     * @param {ShapeDefinition} definition
     * @returns {ShapeDefinition}
     */
    shapeActionRotateCCW(definition: ShapeDefinition): ShapeDefinition;
    /**
     * Generates a definition for rotating a shape FL
     * @param {ShapeDefinition} definition
     * @returns {ShapeDefinition}
     */
    shapeActionRotate180(definition: ShapeDefinition): ShapeDefinition;
    /**
     * Generates a definition for stacking the upper definition onto the lower one
     * @param {ShapeDefinition} lowerDefinition
     * @param {ShapeDefinition} upperDefinition
     * @returns {ShapeDefinition}
     */
    shapeActionStack(
      lowerDefinition: ShapeDefinition,
      upperDefinition: ShapeDefinition,
    ): ShapeDefinition;
    /**
     * Generates a definition for painting it with the given color
     * @param {ShapeDefinition} definition
     * @param {enumColors} color
     * @returns {ShapeDefinition}
     */
    shapeActionPaintWith(
      definition: ShapeDefinition,
      color: enumColors,
    ): ShapeDefinition;
    /**
     * Generates a definition for painting it with the 4 colors
     * @param {ShapeDefinition} definition
     * @param {[enumColors, enumColors, enumColors, enumColors]} colors
     * @returns {ShapeDefinition}
     */
    shapeActionPaintWith4Colors(
      definition: ShapeDefinition,
      colors: [enumColors, enumColors, enumColors, enumColors],
    ): ShapeDefinition;
    /**
     * Checks if we already have cached this definition, and if so throws it away and returns the already
     * cached variant
     * @param {ShapeDefinition} definition
     */
    registerOrReturnHandle(definition: ShapeDefinition): ShapeDefinition;
    /**
     *
     * @param {[enumSubShape, enumSubShape, enumSubShape, enumSubShape]} subShapes
     * @returns {ShapeDefinition}
     */
    getDefinitionFromSimpleShapes(
      subShapes: [enumSubShape, enumSubShape, enumSubShape, enumSubShape],
      color?: string,
    ): ShapeDefinition;
  }
  import { BasicSerializableObject } from "shapez/savegame/serialization";
  import { GameRoot } from "shapez/game/root";
  import { ShapeDefinition } from "shapez/game/shape_definition";
  import { ShapeItem } from "shapez/game/items/shape_item";
  import { enumColors } from "shapez/game/colors";
  import { enumSubShape } from "shapez/game/shape_definition";
}
declare module "shapez/game/sound_proxy" {
  export class SoundProxy {
    /**
     * @param {GameRoot} root
     */
    constructor(root: GameRoot);
    root: GameRoot;
    playing3DSounds: any[];
    playingUiSounds: any[];
    /**
     * Plays a new ui sound
     * @param {string} id Sound ID
     */
    playUi(id: string): boolean;
    /**
     * Plays the ui click sound
     */
    playUiClick(): void;
    /**
     * Plays the ui error sound
     */
    playUiError(): void;
    /**
     * Plays a 3D sound whose volume is scaled based on where it was emitted
     * @param {string} id Sound ID
     * @param {Vector} pos World space position
     */
    play3D(id: string, pos: Vector): boolean;
    /**
     * Updates the list of ongoing sounds
     */
    internalUpdateOngoingSounds(): void;
  }
  import { GameRoot } from "shapez/game/root";
  import { Vector } from "shapez/core/vector";
}
declare module "shapez/game/time/regular_game_speed" {
  export class RegularGameSpeed extends BaseGameSpeed {}
  import { BaseGameSpeed } from "shapez/game/time/base_game_speed";
}
declare module "shapez/game/time/paused_game_speed" {
  export class PausedGameSpeed extends BaseGameSpeed {}
  import { BaseGameSpeed } from "shapez/game/time/base_game_speed";
}
declare module "shapez/game/time/game_time" {
  export class GameTime extends BasicSerializableObject {
    static getId(): string;
    static getSchema(): {
      timeSeconds: import("shapez/savegame/serialization_data_types").TypeNumber;
      speed: import("shapez/savegame/serialization_data_types").TypeClass;
      realtimeSeconds: import("shapez/savegame/serialization_data_types").TypeNumber;
    };
    /**
     * @param {GameRoot} root
     */
    constructor(root: GameRoot);
    root: GameRoot;
    timeSeconds: number;
    realtimeSeconds: number;
    realtimeAdjust: number;
    /** @type {BaseGameSpeed} */
    speed: BaseGameSpeed;
    logicTimeBudget: number;
    /**
     * Fetches the new "real" time, called from the core once per frame, since performance now() is kinda slow
     */
    updateRealtimeNow(): void;
    /**
     * Returns the ingame time in milliseconds
     */
    getTimeMs(): number;
    /**
     * Returns how many seconds we are in the grace period
     * @returns {number}
     */
    getRemainingGracePeriodSeconds(): number;
    /**
     * Returns if we are currently in the grace period
     * @returns {boolean}
     */
    getIsWithinGracePeriod(): boolean;
    /**
     * Internal method to generate new logic time budget
     * @param {number} deltaMs
     */
    internalAddDeltaToBudget(deltaMs: number): void;
    /**
     * Performs update ticks based on the queued logic budget
     * @param {number} deltaMs
     * @param {function():boolean} updateMethod
     */
    performTicks(deltaMs: number, updateMethod: () => boolean): void;
    /**
     * Returns ingame time in seconds
     * @returns {number} seconds
     */
    now(): number;
    /**
     * Returns "real" time in seconds
     * @returns {number} seconds
     */
    realtimeNow(): number;
    /**
     * Returns "real" time in seconds
     * @returns {number} seconds
     */
    systemNow(): number;
    getIsPaused(): boolean;
    getSpeed(): BaseGameSpeed;
    setSpeed(speed: any): void;
    deserialize(data: any): string;
  }
  import { BasicSerializableObject } from "shapez/savegame/serialization";
  import { GameRoot } from "shapez/game/root";
  import { BaseGameSpeed } from "shapez/game/time/base_game_speed";
}
declare module "shapez/game/core" {
  /**
   * The core manages the root and represents the whole game. It wraps the root, since
   * the root class is just a data holder.
   */
  export class GameCore {
    /** @param {Application} app */
    constructor(app: Application);
    app: Application;
    /** @type {GameRoot} */
    root: GameRoot;
    /**
     * Set to true at the beginning of a logic update and cleared when its finished.
     * This is to prevent doing a recursive logic update which can lead to unexpected
     * behaviour.
     */
    duringLogicUpdate: boolean;
    boundInternalTick: () => boolean;
    /**
     * Opacity of the overview alpha
     * @TODO Doesn't belong here
     */
    overlayAlpha: number;
    /**
     * Initializes the root object which stores all game related data. The state
     * is required as a back reference (used sometimes)
     * @param {import("shapez/../states/ingame").InGameState} parentState
     * @param {Savegame} savegame
     */
    initializeRoot(
      parentState: import("shapez/states/ingame").InGameState,
      savegame: Savegame,
      gameModeId: any,
    ): void;
    /**
     * Initializes a new game, this means creating a new map and centering on the
     * playerbase
     * */
    initNewGame(): void;
    /**
     * Inits an existing game by loading the raw savegame data and deserializing it.
     * Also runs basic validity checks.
     */
    initExistingGame(): boolean;
    /**
     * Initializes the render canvas
     */
    internalInitCanvas(): void;
    /**
     * Destructs the root, freeing all resources
     */
    destruct(): void;
    tick(deltaMs: any): boolean;
    shouldRender(): boolean;
    updateLogic(): boolean;
    resize(w: any, h: any): void;
    postLoadHook(): void;
    draw(): void;
  }
  import { Application } from "shapez/application";
  import { GameRoot } from "shapez/game/root";
  import { Savegame } from "shapez/savegame/savegame";
}
declare module "shapez/game/game_loading_overlay" {
  export class GameLoadingOverlay {
    /**
     *
     * @param {Application} app
     * @param {HTMLElement} parent
     */
    constructor(app: Application, parent: HTMLElement);
    app: Application;
    parent: HTMLElement;
    /** @type {HTMLElement} */
    element: HTMLElement;
    /**
     * Removes the overlay if its currently visible
     */
    removeIfAttached(): void;
    /**
     * Returns if the loading overlay is attached
     */
    isAttached(): HTMLElement;
    /**
     * Shows a super basic overlay
     */
    showBasic(): void;
    /**
     * Adds a text with 'loading' and a spinner
     * @param {HTMLElement} element
     */
    internalAddSpinnerAndText(element: HTMLElement): void;
    /**
     * Adds a random hint
     * @param {HTMLElement} element
     */
    internalAddHint(element: HTMLElement): void;
    internalAddProgressIndicator(element: any): void;
    loadingIndicator: HTMLSpanElement;
  }
  import { Application } from "shapez/application";
}
declare module "shapez/states/ingame" {
  export namespace GAME_LOADING_STATES {
    let s3_createCore: string;
    let s4_A_initEmptyGame: string;
    let s4_B_resumeGame: string;
    let s5_firstUpdate: string;
    let s6_postLoadHook: string;
    let s7_warmup: string;
    let s10_gameRunning: string;
    let leaving: string;
    let destroyed: string;
    let initFailed: string;
  }
  export namespace gameCreationAction {
    let _new: string;
    export { _new as new };
    export let resume: string;
  }
  export class GameCreationPayload {
    /** @type {boolean|undefined} */
    fastEnter: boolean | undefined;
    /** @type {string} */
    gameModeId: string;
    /** @type {Savegame} */
    savegame: Savegame;
    /** @type {object|undefined} */
    gameModeParameters: object | undefined;
  }
  export class InGameState extends GameState {
    constructor();
    /** @type {GameCreationPayload} */
    creationPayload: GameCreationPayload;
    stage: string;
    /** @type {GameCore} */
    core: GameCore;
    /** @type {KeyActionMapper} */
    keyActionMapper: KeyActionMapper;
    /** @type {GameLoadingOverlay} */
    loadingOverlay: GameLoadingOverlay;
    /** @type {Savegame} */
    savegame: Savegame;
    boundInputFilter: () => boolean;
    /**
     * Whether we are currently saving the game
     * @TODO: This doesn't realy fit here
     */
    currentSavePromise: any;
    get dialogs(): HUDModalDialogs;
    /**
     * Switches the game into another sub-state
     * @param {string} stage
     */
    switchStage(stage: string): boolean;
    onResized(w: any, h: any): void;
    /**
     * Goes back to the menu state
     */
    goBackToMenu(): void;
    /**
     * Goes back to the settings state
     */
    goToSettings(): void;
    /**
     * Goes back to the settings state
     */
    goToKeybindings(): void;
    /**
     * Moves to a state outside of the game
     * @param {string} stateId
     * @param {any=} payload
     */
    saveThenGoToState(stateId: string, payload?: any | undefined): void;
    /**
     * Called when the game somehow failed to initialize. Resets everything to basic state and
     * then goes to the main menu, showing the error
     * @param {string} err
     */
    onInitializationFailure(err: string): void;
    /**
     * Creates the game core instance, and thus the root
     */
    stage3CreateCore(): void;
    /**
     * Initializes a new empty game
     */
    stage4aInitEmptyGame(): void;
    /**
     * Resumes an existing game
     */
    stage4bResumeGame(): void;
    /**
     * Performs the first game update on the game which initializes most caches
     */
    stage5FirstUpdate(): void;
    /**
     * Call the post load hook, this means that we have loaded the game, and all systems
     * can operate and start to work now.
     */
    stage6PostLoadHook(): void;
    /**
     * This makes the game idle and draw for a while, because we run most code this way
     * the V8 engine can already start to optimize it. Also this makes sure the resources
     * are in the VRAM and we have a smooth experience once we start.
     */
    stage7Warmup(): void;
    warmupTimeSeconds: number;
    /**
     * The final stage where this game is running and updating regulary.
     */
    stage10GameRunning(): void;
    /**
     * This stage destroys the whole game, used to cleanup
     */
    stageDestroyed(): void;
    syncer: any;
    /**
     * When leaving the game
     */
    stageLeavingGame(): void;
    /**
     * Filters the input (keybindings)
     */
    filterInput(): boolean;
    /**
     * @param {GameCreationPayload} payload
     */
    onEnter(payload: GameCreationPayload): void;
    gameModeId: string;
    onBackgroundTick(dt: any): void;
    /**
     * Saves the game
     */
    doSave(): any;
  }
  import { Savegame } from "shapez/savegame/savegame";
  import { GameState } from "shapez/core/game_state";
  import { GameCore } from "shapez/game/core";
  import { KeyActionMapper } from "shapez/game/key_action_mapper";
  import { GameLoadingOverlay } from "shapez/game/game_loading_overlay";
  import { HUDModalDialogs } from "shapez/game/hud/parts/modal_dialogs";
}
declare module "shapez/mods/mod_signals" {
  export namespace MOD_SIGNALS {
    let appBooted: Signal<[]>;
    let modifyLevelDefinitions: Signal<[any]>;
    let modifyUpgrades: Signal<[any]>;
    let hudElementInitialized: Signal<[BaseHUDPart]>;
    let hudElementFinalized: Signal<[BaseHUDPart]>;
    let hudInitializer: Signal<[GameRoot]>;
    let gameInitialized: Signal<[GameRoot]>;
    let gameLoadingStageEntered: Signal<[InGameState, string]>;
    let gameStarted: Signal<[GameRoot]>;
    let stateEntered: Signal<[GameState]>;
    let gameSerialized: Signal<
      [GameRoot, import("shapez/savegame/savegame_typedefs").SerializedGame]
    >;
    let gameDeserialized: Signal<
      [GameRoot, import("shapez/savegame/savegame_typedefs").SerializedGame]
    >;
  }
  import { Signal } from "shapez/core/signal";
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { GameRoot } from "shapez/game/root";
  import { InGameState } from "shapez/states/ingame";
  import { GameState } from "shapez/core/game_state";
}
declare module "shapez/savegame/serializer_internal" {
  export class SerializerInternal {
    /**
     * Serializes an array of entities
     * @param {Map<number, Entity>} map
     */
    serializeEntityMap(map: Map<number, Entity>): any[];
    /**
     *
     * @param {GameRoot} root
     * @param {Array<Entity>} array
     * @returns {string|void}
     */
    deserializeEntityArray(root: GameRoot, array: Array<Entity>): string | void;
    /**
     *
     * @param {GameRoot} root
     * @param {Entity} payload
     */
    deserializeEntity(root: GameRoot, payload: Entity): void;
    /**
     * Deserializes components of an entity
     * @param {GameRoot} root
     * @param {Entity} entity
     * @param {Object.<string, any>} data
     * @returns {string|void}
     */
    deserializeComponents(
      root: GameRoot,
      entity: Entity,
      data: {
        [x: string]: any;
      },
    ): string | void;
  }
  import { Entity } from "shapez/game/entity";
  import { GameRoot } from "shapez/game/root";
}
declare module "shapez/savegame/savegame_serializer" {
  /**
   * Serializes a savegame
   */
  export class SavegameSerializer {
    internal: SerializerInternal;
    /**
     * Serializes the game root into a dump
     * @param {GameRoot} root
     * @param {boolean=} sanityChecks Whether to check for validity
     * @returns {object}
     */
    generateDumpFromGameRoot(
      root: GameRoot,
      sanityChecks?: boolean | undefined,
    ): object;
    /**
     * Verifies if there are logical errors in the savegame
     * @param {SerializedGame} savegame
     * @returns {ExplainedResult}
     */
    verifyLogicalErrors(savegame: SerializedGame): ExplainedResult;
    /**
     * Tries to load the savegame from a given dump
     * @param {SerializedGame} savegame
     * @param {GameRoot} root
     * @returns {ExplainedResult}
     */
    deserialize(savegame: SerializedGame, root: GameRoot): ExplainedResult;
  }
  export type Component = import("shapez/game/component").Component;
  export type StaticComponent = import("shapez/game/component").StaticComponent;
  export type Entity = import("shapez/game/entity").Entity;
  export type GameRoot = import("shapez/game/root").GameRoot;
  export type SerializedGame =
    import("shapez/savegame/savegame_typedefs").SerializedGame;
  import { SerializerInternal } from "shapez/savegame/serializer_internal";
  import { ExplainedResult } from "shapez/core/explained_result";
}
declare module "shapez/savegame/serialization" {
  /**
   * Serializes an object using the given schema, mergin with the given properties
   * @param {object} obj The object to serialize
   * @param {Schema} schema The schema to use
   * @param {object=} mergeWith Any additional properties to merge with the schema, useful for super calls
   * @returns {object} Serialized data object
   */
  export function serializeSchema(
    obj: object,
    schema: Schema,
    mergeWith?: object | undefined,
  ): object;
  /**
   * Deserializes data into an object
   * @param {object} obj The object to store the deserialized data into
   * @param {Schema} schema The schema to use
   * @param {object} data The serialized data
   * @param {string|void|null=} baseclassErrorResult Convenience, if this is a string error code, do nothing and return it
   * @param {import("shapez/../game/root").GameRoot=} root Optional game root reference
   * @returns {string|void} String error code or nothing on success
   */
  export function deserializeSchema(
    obj: object,
    schema: Schema,
    data: object,
    baseclassErrorResult?: (string | void | null) | undefined,
    root?: import("shapez/game/root").GameRoot | undefined,
  ): string | void;
  /**
   * Verifies stored data using the given schema
   * @param {Schema} schema The schema to use
   * @param {object} data The data to verify
   * @returns {string|void} String error code or nothing on success
   */
  export function verifySchema(schema: Schema, data: object): string | void;
  /**
   * Extends a schema by adding the properties from the new schema to the existing base schema
   * @param {Schema} base
   * @param {Schema} newOne
   * @returns {Schema}
   */
  export function extendSchema(base: Schema, newOne: Schema): Schema;
  export namespace types {
    export let int: TypeInteger;
    export let uint: TypePositiveInteger;
    export let float: TypeNumber;
    export let ufloat: TypePositiveNumber;
    export let string: TypeString;
    export let entity: TypeEntity;
    export let weakEntityRef: TypeEntityWeakref;
    export let vector: TypeVector;
    export let tileVector: TypeVector;
    export let bool: TypeBoolean;
    export let uintOrString: TypePositiveIntegerOrString;
    /**
     * @param {BaseDataType} wrapped
     */
    export function nullable(wrapped: BaseDataType): TypeNullable;
    /**
     * @param {FactoryTemplate<*>|SingletonFactoryTemplate<*>} registry
     */
    export function classId(
      registry: FactoryTemplate<any> | SingletonFactoryTemplate<any>,
    ): TypeClassId;
    /**
     * @param {BaseDataType} valueType
     * @param {boolean=} includeEmptyValues
     */
    export function keyValueMap(
      valueType: BaseDataType,
      includeEmptyValues?: boolean | undefined,
    ): TypeKeyValueMap;
    /**
     * @param {Object<string, any>} values
     */
    function _enum(values: { [x: string]: any }): TypeEnum;
    export { _enum as enum };
    /**
     * @param {FactoryTemplate<*>} registry
     * @param {(GameRoot, any) => object=} resolver
     */
    export function obj(
      registry: FactoryTemplate<any>,
      resolver?: ((GameRoot: any, any: any) => object) | undefined,
    ): TypeClass;
    /**
     * @param {FactoryTemplate<*>} registry
     */
    export function objData(registry: FactoryTemplate<any>): TypeClassData;
    /**
     * @param {typeof BasicSerializableObject} cls
     */
    export function knownType(
      cls: typeof BasicSerializableObject,
    ): TypeFixedClass;
    /**
     * @param {BaseDataType} innerType
     */
    export function array(innerType: BaseDataType): TypeArray;
    /**
     * @param {BaseDataType} innerType
     */
    export function fixedSizeArray(innerType: BaseDataType): TypeArray;
    /**
     * @param {SingletonFactoryTemplate<*>} registry
     */
    export function classRef(
      registry: SingletonFactoryTemplate<any>,
    ): TypeMetaClass;
    /**
     * @param {Object.<string, BaseDataType>} descriptor
     */
    export function structured(descriptor: {
      [x: string]: BaseDataType;
    }): TypeStructuredObject;
    /**
     * @param {BaseDataType} a
     * @param {BaseDataType} b
     */
    export function pair(a: BaseDataType, b: BaseDataType): TypePair;
    /**
     * @param {typeof BasicSerializableObject} classHandle
     * @param {SingletonFactoryTemplate<*>} registry
     */
    export function classWithMetaclass(
      classHandle: typeof BasicSerializableObject,
      registry: SingletonFactoryTemplate<any>,
    ): TypeClassFromMetaclass;
  }
  export class BasicSerializableObject {
    static getId(): void;
    /**
     * Should return the serialization schema
     * @returns {Schema}
     */
    static getSchema(): Schema;
    /** @returns {Schema} */
    static getCachedSchema(): Schema;
    /** @returns {string|void} */
    static verify(data: any): string | void;
    /**
     * Fixes typeof DerivedComponent is not assignable to typeof Component, compiled out
     * in non-dev builds
     */
    constructor(...args: any[]);
    /** @returns {object | string | number} */
    serialize(): object | string | number;
    /**
     * @param {any} data
     * @param {import("shapez/./savegame_serializer").GameRoot} root
     * @returns {string|void}
     */
    deserialize(
      data: any,
      root?: import("shapez/savegame/savegame_serializer").GameRoot,
    ): string | void;
  }
  /**
   * <T>
   */
  export type FactoryTemplate<T> = import("shapez/core/factory").Factory<T>;
  /**
   * <T>
   */
  export type SingletonFactoryTemplate<
    T extends {
      getId(): string;
    },
  > = import("shapez/core/singleton_factory").SingletonFactory<T>;
  /**
   * A full schema declaration
   */
  export type Schema =
    | {
        [x: string]: BaseDataType;
      }
    | object;
  import { TypeInteger } from "shapez/savegame/serialization_data_types";
  import { TypePositiveInteger } from "shapez/savegame/serialization_data_types";
  import { TypeNumber } from "shapez/savegame/serialization_data_types";
  import { TypePositiveNumber } from "shapez/savegame/serialization_data_types";
  import { TypeString } from "shapez/savegame/serialization_data_types";
  import { TypeEntity } from "shapez/savegame/serialization_data_types";
  import { TypeEntityWeakref } from "shapez/savegame/serialization_data_types";
  import { TypeVector } from "shapez/savegame/serialization_data_types";
  import { TypeBoolean } from "shapez/savegame/serialization_data_types";
  import { TypePositiveIntegerOrString } from "shapez/savegame/serialization_data_types";
  import { BaseDataType } from "shapez/savegame/serialization_data_types";
  import { TypeNullable } from "shapez/savegame/serialization_data_types";
  import { TypeClassId } from "shapez/savegame/serialization_data_types";
  import { TypeKeyValueMap } from "shapez/savegame/serialization_data_types";
  import { TypeEnum } from "shapez/savegame/serialization_data_types";
  import { TypeClass } from "shapez/savegame/serialization_data_types";
  import { TypeClassData } from "shapez/savegame/serialization_data_types";
  import { TypeFixedClass } from "shapez/savegame/serialization_data_types";
  import { TypeArray } from "shapez/savegame/serialization_data_types";
  import { TypeMetaClass } from "shapez/savegame/serialization_data_types";
  import { TypeStructuredObject } from "shapez/savegame/serialization_data_types";
  import { TypePair } from "shapez/savegame/serialization_data_types";
  import { TypeClassFromMetaclass } from "shapez/savegame/serialization_data_types";
}
declare module "shapez/game/component" {
  export class Component extends BasicSerializableObject {
    /**
     * Returns the components unique id
     * @returns {string}
     * @abstract
     */
    static getId(): string;
    /**
     * Should return the schema used for serialization
     */
    static getSchema(): {};
    /**
     * Copy the current state to another component
     * @param {Component} otherComponent
     */
    copyAdditionalStateTo(otherComponent: Component): void;
    /**
     * Clears all items and state
     */
    clear(): void;
    /**
     * Returns a string representing the components data, only in dev builds
     * @returns {string}
     */
    getDebugString(): string;
  }
  /**
   * TypeScript does not support Abstract Static methods (https://github.com/microsoft/TypeScript/issues/34516)
   * One workaround is to declare the type of the component and reference that for static methods
   */
  export type StaticComponent = typeof Component;
  import { BasicSerializableObject } from "shapez/savegame/serialization";
}
declare module "shapez/game/entity_components" {
  import type { BeltComponent } from "shapez/game/components/belt";
  import type { BeltUnderlaysComponent } from "shapez/game/components/belt_underlays";
  import type { HubComponent } from "shapez/game/components/hub";
  import type { ItemAcceptorComponent } from "shapez/game/components/item_acceptor";
  import type { ItemEjectorComponent } from "shapez/game/components/item_ejector";
  import type { ItemProcessorComponent } from "shapez/game/components/item_processor";
  import type { MinerComponent } from "shapez/game/components/miner";
  import type { StaticMapEntityComponent } from "shapez/game/components/static_map_entity";
  import type { StorageComponent } from "shapez/game/components/storage";
  import type { UndergroundBeltComponent } from "shapez/game/components/underground_belt";
  import type { WiredPinsComponent } from "shapez/game/components/wired_pins";
  import type { WireComponent } from "shapez/game/components/wire";
  import type { ConstantSignalComponent } from "shapez/game/components/constant_signal";
  import type { LogicGateComponent } from "shapez/game/components/logic_gate";
  import type { LeverComponent } from "shapez/game/components/lever";
  import type { WireTunnelComponent } from "shapez/game/components/wire_tunnel";
  import type { DisplayComponent } from "shapez/game/components/display";
  import type { BeltReaderComponent } from "shapez/game/components/belt_reader";
  import type { FilterComponent } from "shapez/game/components/filter";
  import type { ItemProducerComponent } from "shapez/game/components/item_producer";
  import type { GoalAcceptorComponent } from "shapez/game/components/goal_acceptor";
  import type { Component } from "shapez/game/component";
  /**
   * Typedefs for all entity components.
   */
  export interface EntityComponentStorage {
    StaticMapEntity?: StaticMapEntityComponent;
    Belt?: BeltComponent;
    ItemEjector?: ItemEjectorComponent;
    ItemAcceptor?: ItemAcceptorComponent;
    Miner?: MinerComponent;
    ItemProcessor?: ItemProcessorComponent;
    UndergroundBelt?: UndergroundBeltComponent;
    Hub?: HubComponent;
    Storage?: StorageComponent;
    WiredPins?: WiredPinsComponent;
    BeltUnderlays?: BeltUnderlaysComponent;
    Wire?: WireComponent;
    ConstantSignal?: ConstantSignalComponent;
    LogicGate?: LogicGateComponent;
    Lever?: LeverComponent;
    WireTunnel?: WireTunnelComponent;
    Display?: DisplayComponent;
    BeltReader?: BeltReaderComponent;
    Filter?: FilterComponent;
    ItemProducer?: ItemProducerComponent;
    GoalAcceptor?: GoalAcceptorComponent;
    [k: string]: Component;
  }
}
declare module "shapez/game/entity" {
  export class Entity extends BasicSerializableObject {
    static getId(): string;
    /**
     * @param {GameRoot} root
     */
    constructor(root: GameRoot);
    /**
     * Handle to the global game root
     */
    root: GameRoot;
    /**
     * The components of the entity
     * @type {import("shapez/./entity_components").EntityComponentStorage}
     */
    components: import("shapez/game/entity_components").EntityComponentStorage;
    /**
     * Whether this entity was registered on the @see EntityManager so far
     */
    registered: boolean;
    /**
     * On which layer this entity is
     * @type {Layer}
     */
    layer: Layer;
    /**
     * Internal entity unique id, set by the @see EntityManager
     */
    uid: number;
    /**
     * Stores if this entity is destroyed, set by the @see EntityManager
     * @type {boolean} */
    destroyed: boolean;
    /**
     * Stores if this entity is queued to get destroyed in the next tick
     * of the @see EntityManager
     * @type {boolean} */
    queuedForDestroy: boolean;
    /**
     * Stores the reason why this entity was destroyed
     * @type {string} */
    destroyReason: string;
    /**
     * Returns a clone of this entity
     */
    clone(): Entity;
    /**
     * Adds a new component, only possible until the entity is registered on the entity manager,
     * after that use @see EntityManager.addDynamicComponent
     * @param {Component} componentInstance
     * @param {boolean} force Used by the entity manager. Internal parameter, do not change
     */
    addComponent(componentInstance: Component, force?: boolean): void;
    /**
     * Removes a given component, only possible until the entity is registered on the entity manager,
     * after that use @see EntityManager.removeDynamicComponent
     * @param {typeof Component} componentClass
     * @param {boolean} force
     */
    removeComponent(componentClass: typeof Component, force?: boolean): void;
    /**
     * Draws the entity, to override use @see Entity.drawImpl
     * @param {DrawParameters} parameters
     */
    drawDebugOverlays(parameters: DrawParameters): void;
    /**
     * override, should draw the entity
     * @param {DrawParameters} parameters
     * @abstract
     */
    drawImpl(parameters: DrawParameters): void;
  }
  import { BasicSerializableObject } from "shapez/savegame/serialization";
  import { GameRoot } from "shapez/game/root";
  import { Component } from "shapez/game/component";
  import { DrawParameters } from "shapez/core/draw_parameters";
}
declare module "shapez/savegame/savegame_typedefs" {
  const _default: {};
  export default _default;
  export type Entity = import("shapez/game/entity").Entity;
  export type SavegameStoredMods = {
    id: string;
    version: string;
    website: string;
    name: string;
    author: string;
  }[];
  export type SerializedGame = {
    camera: any;
    time: any;
    entityMgr: any;
    map: any;
    gameMode: object;
    hubGoals: any;
    pinnedShapes: any;
    waypoints: any;
    entities: Array<Entity>;
    beltPaths: Array<any>;
    modExtraData: any;
  };
  export type SavegameData = {
    version: number;
    dump: SerializedGame;
    lastUpdate: number;
    mods: SavegameStoredMods;
  };
  export type SavegameMetadata = {
    lastUpdate: number;
    version: number;
    internalId: string;
    level: number;
    name: string | null;
  };
  export type SavegamesData = {
    version: number;
    savegames: Array<SavegameMetadata>;
  };
  export type PuzzleMetadata = {
    id: number;
    shortKey: string;
    likes: number;
    downloads: number;
    completions: number;
    difficulty: number | null;
    averageTime: number | null;
    title: string;
    author: string;
    completed: boolean;
  };
  export type PuzzleGameBuildingConstantProducer = {
    type: "emitter";
    item: string;
    pos: {
      x: number;
      y: number;
      r: number;
    };
  };
  export type PuzzleGameBuildingGoal = {
    type: "goal";
    item: string;
    pos: {
      x: number;
      y: number;
      r: number;
    };
  };
  export type PuzzleGameBuildingBlock = {
    type: "block";
    pos: {
      x: number;
      y: number;
      r: number;
    };
  };
  export type PuzzleGameData = {
    version: number;
    bounds: {
      w: number;
      h: number;
    };
    buildings: (
      | PuzzleGameBuildingGoal
      | PuzzleGameBuildingConstantProducer
      | PuzzleGameBuildingBlock
    )[];
    excludedBuildings: Array<string>;
  };
  export type PuzzleFullData = {
    meta: PuzzleMetadata;
    game: PuzzleGameData;
  };
}
declare module "shapez/mods/mod_meta_building" {
  export class ModMetaBuilding extends MetaBuilding {
    /**
     * @returns {({
     *  variant: string;
     *  rotationVariant?: number;
     *  name: string;
     *  description: string;
     *  blueprintImageBase64?: string;
     *  regularImageBase64?: string;
     *  tutorialImageBase64?: string;
     * }[])}
     */
    static getAllVariantCombinations(): {
      variant: string;
      rotationVariant?: number;
      name: string;
      description: string;
      blueprintImageBase64?: string;
      regularImageBase64?: string;
      tutorialImageBase64?: string;
    }[];
  }
  import { MetaBuilding } from "shapez/game/meta_building";
}
declare module "shapez/mods/mod_interface" {
  /**
   * @typedef {{new(...args: any[]): any, prototype: any}} constructable
   */
  /**
   * @template {(...args: any) => any} F The function
   * @template {object} T  The value of this
   * @typedef {(this: T, ...args: Parameters<F>) => ReturnType<F>} bindThis
   */
  /**
   * @template {(...args: any[]) => any} F
   * @template P
   * @typedef {(...args: [P, Parameters<F>]) => ReturnType<F>} beforePrams IMPORTANT: this puts the original parameters into an array
   */
  /**
   * @template {(...args: any[]) => any} F
   * @template P
   * @typedef {(...args: [...Parameters<F>, P]) => ReturnType<F>} afterPrams
   */
  /**
   * @template {(...args: any[]) => any} F
   * @typedef {(...args: [...Parameters<F>, ...any]) => ReturnType<F>} extendsPrams
   */
  export class ModInterface {
    /**
     *
     * @param {ModLoader} modLoader
     */
    constructor(modLoader: ModLoader);
    modLoader: ModLoader;
    /** @deprecated */
    registerCss(cssString: any): void;
    registerSprite(spriteId: any, base64string: any): void;
    /**
     *
     * @param {string} imageBase64
     * @param {string} jsonTextData
     */
    registerAtlas(imageBase64: string, jsonTextData: string): void;
    /**
     *
     * @param {object} param0
     * @param {string} param0.id
     * @param {string} param0.shortCode
     * @param {(distanceToOriginInChunks: number) => number} param0.weightComputation
     * @param {(options: import("shapez/../game/shape_definition").SubShapeDrawOptions) => void} param0.draw
     */
    registerSubShapeType({
      id,
      shortCode,
      weightComputation,
      draw,
    }: {
      id: string;
      shortCode: string;
      weightComputation: (distanceToOriginInChunks: number) => number;
      draw: (
        options: import("shapez/game/shape_definition").SubShapeDrawOptions,
      ) => void;
    }): void;
    registerTranslations(language: any, translations: any): void;
    /**
     * @param {typeof BaseItem} item
     * @param {(itemData: any) => BaseItem} resolver
     */
    registerItem(
      item: typeof BaseItem,
      resolver: (itemData: any) => BaseItem,
    ): void;
    /**
     *
     * @param {typeof Component} component
     */
    registerComponent(component: typeof Component): void;
    /**
     *
     * @param {Object} param0
     * @param {string} param0.id
     * @param {new (any) => GameSystem} param0.systemClass
     * @param {string=} param0.before
     * @param {string[]=} param0.drawHooks
     */
    registerGameSystem({
      id,
      systemClass,
      before,
      drawHooks,
    }: {
      id: string;
      systemClass: new (any: any) => GameSystem;
      before?: string | undefined;
      drawHooks?: string[] | undefined;
    }): void;
    /**
     *
     * @param {string} hookId
     * @param {string} systemId
     */
    registerGameSystemDrawHook(hookId: string, systemId: string): void;
    /**
     *
     * @param {object} param0
     * @param {typeof ModMetaBuilding} param0.metaClass
     * @param {string=} param0.buildingIconBase64
     */
    registerNewBuilding({
      metaClass,
      buildingIconBase64,
    }: {
      metaClass: typeof ModMetaBuilding;
      buildingIconBase64?: string | undefined;
    }): void;
    /**
     *
     * @param {Object} param0
     * @param {string} param0.id
     * @param {number} param0.keyCode
     * @param {string} param0.translation
     * @param {boolean=} param0.repeated
     * @param {((GameRoot) => void)=} param0.handler
     * @param {{shift?: boolean; alt?: boolean; ctrl?: boolean}=} param0.modifiers
     * @param {boolean=} param0.builtin
     */
    registerIngameKeybinding({
      id,
      keyCode,
      translation,
      modifiers,
      repeated,
      builtin,
      handler,
    }: {
      id: string;
      keyCode: number;
      translation: string;
      repeated?: boolean | undefined;
      handler?: ((GameRoot: any) => void) | undefined;
      modifiers?:
        | {
            shift?: boolean;
            alt?: boolean;
            ctrl?: boolean;
          }
        | undefined;
      builtin?: boolean | undefined;
    }): {
      keyCode: number;
      id: string;
      repeated: boolean;
      modifiers: {
        shift?: boolean;
        alt?: boolean;
        ctrl?: boolean;
      };
      builtin: boolean;
    };
    /**
     * @returns {HUDModalDialogs}
     */
    get dialogs(): HUDModalDialogs;
    setBuildingToolbarIcon(buildingId: any, iconBase64: any): void;
    /**
     *
     * @param {string | (new () => MetaBuilding)} buildingIdOrClass
     * @param {*} variant
     * @param {*} imageBase64
     */
    setBuildingTutorialImage(
      buildingIdOrClass: string | (new () => MetaBuilding),
      variant: any,
      imageBase64: any,
    ): void;
    /**
     * @param {Object} param0
     * @param {string} param0.id
     * @param {string} param0.name
     * @param {Object} param0.theme
     */
    registerGameTheme({
      id,
      name,
      theme,
    }: {
      id: string;
      name: string;
      theme: any;
    }): void;
    /**
     * Registers a new state class, should be a GameState derived class
     * @param {typeof import("shapez/../core/game_state").GameState} stateClass
     */
    registerGameState(
      stateClass: typeof import("shapez/core/game_state").GameState,
    ): void;
    /**
     * @param {object} param0
     * @param {"regular"|"wires"} param0.toolbar
     * @param {"primary"|"secondary"} param0.location
     * @param {typeof MetaBuilding} param0.metaClass
     */
    addNewBuildingToToolbar({
      toolbar,
      location,
      metaClass,
    }: {
      toolbar: "regular" | "wires";
      location: "primary" | "secondary";
      metaClass: typeof MetaBuilding;
    }): void;
    /**
     * Patches a method on a given class
     * @template {constructable} C  the class
     * @template {C["prototype"]} P  the prototype of said class
     * @template {keyof P} M  the name of the method we are overriding
     * @template {extendsPrams<P[M]>} O the method that will override the old one
     * @param {C} classHandle
     * @param {M} methodName
     * @param {bindThis<beforePrams<O, P[M]>, InstanceType<C>>} override
     */
    replaceMethod<
      C extends constructable,
      P extends C["prototype"],
      M extends keyof P,
      O extends extendsPrams<P[M]>,
    >(
      classHandle: C,
      methodName: M,
      override: bindThis<beforePrams<O, P[M]>, InstanceType<C>>,
    ): void;
    /**
     * Runs before a method on a given class
     * @template {constructable} C  the class
     * @template {C["prototype"]} P  the prototype of said class
     * @template {keyof P} M  the name of the method we are overriding
     * @template {extendsPrams<P[M]>} O the method that will run before the old one
     * @param {C} classHandle
     * @param {M} methodName
     * @param {bindThis<O, InstanceType<C>>} executeBefore
     */
    runBeforeMethod<
      C extends constructable,
      P extends C["prototype"],
      M extends keyof P,
      O extends extendsPrams<P[M]>,
    >(
      classHandle: C,
      methodName: M,
      executeBefore: bindThis<O, InstanceType<C>>,
    ): void;
    /**
     * Runs after a method on a given class
     * @template {constructable} C  the class
     * @template {C["prototype"]} P  the prototype of said class
     * @template {keyof P} M  the name of the method we are overriding
     * @template {extendsPrams<P[M]>} O the method that will run before the old one
     * @param {C} classHandle
     * @param {M} methodName
     * @param {bindThis<O, InstanceType<C>>} executeAfter
     */
    runAfterMethod<
      C extends constructable,
      P extends C["prototype"],
      M extends keyof P,
      O extends extendsPrams<P[M]>,
    >(
      classHandle: C,
      methodName: M,
      executeAfter: bindThis<O, InstanceType<C>>,
    ): void;
    /**
     *
     * @param {Object} prototype
     * @param {({ $super, $old }) => any} extender
     */
    extendObject(
      prototype: any,
      extender: ({ $super, $old }: any) => any,
    ): void;
    /**
     *
     * @param {Class} classHandle
     * @param {({ $super, $old }) => any} extender
     */
    extendClass(
      classHandle: Class,
      extender: ({ $super, $old }: any) => any,
    ): void;
    /**
     *
     * @param {string} id
     * @param {new (...args) => BaseHUDPart} element
     */
    registerHudElement(
      id: string,
      element: new (...args: any) => BaseHUDPart,
    ): void;
    /**
     *
     * @param {string | (new () => MetaBuilding)} buildingIdOrClass
     * @param {string} variant
     * @param {object} param0
     * @param {string} param0.name
     * @param {string} param0.description
     * @param {string=} param0.language
     */
    registerBuildingTranslation(
      buildingIdOrClass: string | (new () => MetaBuilding),
      variant: string,
      {
        name,
        description,
        language,
      }: {
        name: string;
        description: string;
        language?: string | undefined;
      },
    ): void;
    /**
     *
     * @param {string | (new () => MetaBuilding)} buildingIdOrClass
     * @param {string} variant
     * @param {object} param2
     * @param {string=} param2.regularBase64
     * @param {string=} param2.blueprintBase64
     */
    registerBuildingSprites(
      buildingIdOrClass: string | (new () => MetaBuilding),
      variant: string,
      {
        regularBase64,
        blueprintBase64,
      }: {
        regularBase64?: string | undefined;
        blueprintBase64?: string | undefined;
      },
    ): void;
    /**
     * @param {new () => MetaBuilding} metaClass
     * @param {string} variant
     * @param {object} payload
     * @param {number[]=} payload.rotationVariants
     * @param {string=} payload.tutorialImageBase64
     * @param {string=} payload.regularSpriteBase64
     * @param {string=} payload.blueprintSpriteBase64
     * @param {string=} payload.name
     * @param {string=} payload.description
     * @param {Vector=} payload.dimensions
     * @param {(root: GameRoot) => [string, string][]=} payload.additionalStatistics
     * @param {(root: GameRoot) => boolean[]=} payload.isUnlocked
     */
    addVariantToExistingBuilding(
      metaClass: new () => MetaBuilding,
      variant: string,
      payload: {
        rotationVariants?: number[] | undefined;
        tutorialImageBase64?: string | undefined;
        regularSpriteBase64?: string | undefined;
        blueprintSpriteBase64?: string | undefined;
        name?: string | undefined;
        description?: string | undefined;
        dimensions?: Vector | undefined;
        additionalStatistics?:
          | ((root: GameRoot) => [string, string][])
          | undefined;
        isUnlocked?: ((root: GameRoot) => boolean[]) | undefined;
      },
    ): void;
  }
  export type constructable = {
    new (...args: any[]): any;
    prototype: any;
  };
  export type bindThis<F extends (...args: any) => any, T extends unknown> = (
    this: T,
    ...args: Parameters<F>
  ) => ReturnType<F>;
  /**
   * IMPORTANT: this puts the original parameters into an array
   */
  export type beforePrams<F extends (...args: any[]) => any, P> = (
    ...args: [P, Parameters<F>]
  ) => ReturnType<F>;
  export type afterPrams<F extends (...args: any[]) => any, P> = (
    ...args: [...Parameters<F>, P]
  ) => ReturnType<F>;
  export type extendsPrams<F extends (...args: any[]) => any> = (
    ...args: [...Parameters<F>, ...any]
  ) => ReturnType<F>;
  import { ModLoader } from "shapez/mods/modloader";
  import { BaseItem } from "shapez/game/base_item";
  import { Component } from "shapez/game/component";
  import { GameSystem } from "shapez/game/game_system";
  import { ModMetaBuilding } from "shapez/mods/mod_meta_building";
  import { HUDModalDialogs } from "shapez/game/hud/parts/modal_dialogs";
  import { MetaBuilding } from "shapez/game/meta_building";
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { Vector } from "shapez/core/vector";
  import { GameRoot } from "shapez/game/root";
}
declare module "shapez/mods/mod_interface_v2" {
  import { Mod } from "shapez/mods/mod";
  import { ModInterface } from "shapez/mods/mod_interface";
  import { ModLoader } from "shapez/mods/modloader";
  export class ModInterfaceV2 extends ModInterface {
    private readonly mod;
    private readonly baseUrl;
    constructor(mod: Mod, modLoader: ModLoader);
    resolve(path: string): string;
    addStylesheet(path: string): void;
  }
}
declare module "shapez/mods/mod_metadata" {
  import { Mod } from "shapez/mods/mod";
  export interface ModAuthor {
    name: string;
    website?: string;
  }
  export interface ModMetadata {
    id: string;
    entry: string;
    name: string;
    description?: string;
    authors: ModAuthor[];
    version: string;
    savegameResident: boolean;
    website?: string;
    source?: string;
  }
  export type ModSource = "user" | "distro" | "dev";
  export interface ModQueueEntry {
    source: ModSource;
    file: string;
    disabled: boolean;
    metadata: ModMetadata;
  }
  export interface ModInfo {
    source: ModSource;
    file: string;
    mod: Mod;
  }
  export interface FrozenModMetadata
    extends Readonly<Omit<ModMetadata, "authors">> {
    authors: ReadonlyArray<Readonly<ModAuthor>>;
  }
}
declare module "shapez/mods/mod" {
  import { Application } from "shapez/application";
  import { ModInterfaceV2 } from "shapez/mods/mod_interface_v2";
  import { FrozenModMetadata, ModMetadata } from "shapez/mods/mod_metadata";
  import { ModLoader } from "shapez/mods/modloader";
  export type ModConstructor = new (
    metadata: ModMetadata,
    app: Application,
    modLoader: ModLoader,
  ) => Mod;
  export abstract class Mod {
    protected readonly app: Application;
    protected readonly modLoader: ModLoader;
    protected readonly modInterface: ModInterfaceV2;
    protected readonly signals: {
      appBooted: import("shapez/core/signal").Signal<[]>;
      modifyLevelDefinitions: import("shapez/core/signal").Signal<[any]>;
      modifyUpgrades: import("shapez/core/signal").Signal<[any]>;
      hudElementInitialized: import("shapez/core/signal").Signal<
        [import("shapez/game/hud/base_hud_part").BaseHUDPart]
      >;
      hudElementFinalized: import("shapez/core/signal").Signal<
        [import("shapez/game/hud/base_hud_part").BaseHUDPart]
      >;
      hudInitializer: import("shapez/core/signal").Signal<
        [import("shapez/game/root").GameRoot]
      >;
      gameInitialized: import("shapez/core/signal").Signal<
        [import("shapez/game/root").GameRoot]
      >;
      gameLoadingStageEntered: import("shapez/core/signal").Signal<
        [import("shapez/states/ingame").InGameState, string]
      >;
      gameStarted: import("shapez/core/signal").Signal<
        [import("shapez/game/root").GameRoot]
      >;
      stateEntered: import("shapez/core/signal").Signal<
        [import("shapez/core/game_state").GameState]
      >;
      gameSerialized: import("shapez/core/signal").Signal<
        [
          import("shapez/game/root").GameRoot,
          import("shapez/savegame/savegame_typedefs").SerializedGame,
        ]
      >;
      gameDeserialized: import("shapez/core/signal").Signal<
        [
          import("shapez/game/root").GameRoot,
          import("shapez/savegame/savegame_typedefs").SerializedGame,
        ]
      >;
    };
    readonly id: string;
    readonly metadata: FrozenModMetadata;
    readonly errors: Error[];
    constructor(metadata: ModMetadata, app: Application, modLoader: ModLoader);
    abstract init(): void | Promise<void>;
    get dialogs(): import("shapez/game/hud/parts/modal_dialogs").HUDModalDialogs;
  }
}
declare module "shapez/mods/disabled_mod" {
  import { Mod } from "shapez/mods/mod";
  export class DisabledMod extends Mod {
    init(): void | Promise<void>;
  }
}
declare module "shapez/mods/modloader" {
  import { SavegameStoredMods } from "shapez/savegame/savegame_typedefs";
  import { ModInfo } from "shapez/mods/mod_metadata";
  export class ModLoader {
    private readonly mods;
    readonly signals: {
      appBooted: import("shapez/core/signal").Signal<[]>;
      modifyLevelDefinitions: import("shapez/core/signal").Signal<[any]>;
      modifyUpgrades: import("shapez/core/signal").Signal<[any]>;
      hudElementInitialized: import("shapez/core/signal").Signal<
        [import("shapez/game/hud/base_hud_part").BaseHUDPart]
      >;
      hudElementFinalized: import("shapez/core/signal").Signal<
        [import("shapez/game/hud/base_hud_part").BaseHUDPart]
      >;
      hudInitializer: import("shapez/core/signal").Signal<
        [import("shapez/game/root").GameRoot]
      >;
      gameInitialized: import("shapez/core/signal").Signal<
        [import("shapez/game/root").GameRoot]
      >;
      gameLoadingStageEntered: import("shapez/core/signal").Signal<
        [import("shapez/states/ingame").InGameState, string]
      >;
      gameStarted: import("shapez/core/signal").Signal<
        [import("shapez/game/root").GameRoot]
      >;
      stateEntered: import("shapez/core/signal").Signal<
        [import("shapez/core/game_state").GameState]
      >;
      gameSerialized: import("shapez/core/signal").Signal<
        [
          import("shapez/game/root").GameRoot,
          import("shapez/savegame/savegame_typedefs").SerializedGame,
        ]
      >;
      gameDeserialized: import("shapez/core/signal").Signal<
        [
          import("shapez/game/root").GameRoot,
          import("shapez/savegame/savegame_typedefs").SerializedGame,
        ]
      >;
    };
    constructor();
    get app(): import("shapez/application").Application;
    get allMods(): ModInfo[];
    get activeMods(): ModInfo[];
    getModsListForSavegame(): SavegameStoredMods;
    computeModDifference(originalMods: SavegameStoredMods): {
      missing: SavegameStoredMods;
      extra: SavegameStoredMods;
    };
    initMods(): Promise<void>;
    private exposeExports;
    private loadMod;
    private createModInstance;
    private getModEntryUrl;
  }
  export const MODS: ModLoader;
}
declare module "shapez/savegame/savegame_interface" {
  export class BaseSavegameInterface {
    /**
     * Constructs an new interface for the given savegame
     * @param {any} data
     */
    constructor(data: any);
    /**
     * Returns the interfaces version
     */
    getVersion(): void;
    /**
     * Returns the uncached json schema
     * @returns {object}
     */
    getSchemaUncached(): object;
    getValidator(): any;
    data: any;
    /**
     * Validates the data
     * @returns {boolean}
     */
    validate(): boolean;
    /**
     * Returns the time of last update
     * @returns {number}
     */
    readLastUpdate(): number;
    /**
     * Returns the ingame time in seconds
     * @returns {number}
     */
    readIngameTimeSeconds(): number;
  }
}
declare module "shapez/savegame/schemas/1000" {
  export class SavegameInterface_V1000 extends BaseSavegameInterface {
    getVersion(): number;
    getSchemaUncached(): {
      type: string;
      required: any[];
      additionalProperties: boolean;
    };
  }
  import { BaseSavegameInterface } from "shapez/savegame/savegame_interface";
}
declare module "shapez/savegame/schemas/1001" {
  export class SavegameInterface_V1001 extends SavegameInterface_V1000 {
    /**
     * @param {import("shapez/../savegame_typedefs.js").SavegameData} data
     */
    static migrate1000to1001(
      data: import("shapez/savegame/savegame_typedefs").SavegameData,
    ): boolean;
  }
  import { SavegameInterface_V1000 } from "shapez/savegame/schemas/1000";
}
declare module "shapez/savegame/schemas/1002" {
  export class SavegameInterface_V1002 extends SavegameInterface_V1001 {
    /**
     * @param {import("shapez/../savegame_typedefs.js").SavegameData} data
     */
    static migrate1001to1002(
      data: import("shapez/savegame/savegame_typedefs").SavegameData,
    ): boolean;
  }
  import { SavegameInterface_V1001 } from "shapez/savegame/schemas/1001";
}
declare module "shapez/savegame/schemas/1003" {
  export class SavegameInterface_V1003 extends SavegameInterface_V1002 {
    /**
     * @param {import("shapez/../savegame_typedefs.js").SavegameData} data
     */
    static migrate1002to1003(
      data: import("shapez/savegame/savegame_typedefs").SavegameData,
    ): boolean;
  }
  import { SavegameInterface_V1002 } from "shapez/savegame/schemas/1002";
}
declare module "shapez/savegame/schemas/1004" {
  export class SavegameInterface_V1004 extends SavegameInterface_V1003 {
    /**
     * @param {import("shapez/../savegame_typedefs.js").SavegameData} data
     */
    static migrate1003to1004(
      data: import("shapez/savegame/savegame_typedefs").SavegameData,
    ): boolean;
  }
  import { SavegameInterface_V1003 } from "shapez/savegame/schemas/1003";
}
declare module "shapez/savegame/schemas/1005" {
  export class SavegameInterface_V1005 extends SavegameInterface_V1004 {
    /**
     * @param {import("shapez/../savegame_typedefs.js").SavegameData} data
     */
    static migrate1004to1005(
      data: import("shapez/savegame/savegame_typedefs").SavegameData,
    ): boolean;
  }
  import { SavegameInterface_V1004 } from "shapez/savegame/schemas/1004";
}
declare module "shapez/savegame/schemas/1006" {
  export class SavegameInterface_V1006 extends SavegameInterface_V1005 {
    static computeSpriteMapping(): {
      "sprites/blueprints/belt_top.png": string | number;
      "sprites/blueprints/belt_left.png": string | number;
      "sprites/blueprints/belt_right.png": string | number;
      "sprites/blueprints/splitter.png": string | number;
      "sprites/blueprints/splitter-compact.png": string | number;
      "sprites/blueprints/splitter-compact-inverse.png": string | number;
      "sprites/blueprints/underground_belt_entry.png": string | number;
      "sprites/blueprints/underground_belt_exit.png": string | number;
      "sprites/blueprints/underground_belt_entry-tier2.png": string | number;
      "sprites/blueprints/underground_belt_exit-tier2.png": string | number;
      "sprites/blueprints/miner.png": string | number;
      "sprites/blueprints/miner-chainable.png": string | number;
      "sprites/blueprints/cutter.png": string | number;
      "sprites/blueprints/cutter-quad.png": string | number;
      "sprites/blueprints/rotator.png": string | number;
      "sprites/blueprints/rotator-ccw.png": string | number;
      "sprites/blueprints/stacker.png": string | number;
      "sprites/blueprints/mixer.png": string | number;
      "sprites/blueprints/painter.png": string | number;
      "sprites/blueprints/painter-mirrored.png": string | number;
      "sprites/blueprints/painter-double.png": string | number;
      "sprites/blueprints/painter-quad.png": string | number;
      "sprites/blueprints/trash.png": string | number;
      "sprites/blueprints/trash-storage.png": string | number;
    };
    /**
     * @param {import("shapez/../savegame_typedefs.js").SavegameData} data
     */
    static migrate1005to1006(
      data: import("shapez/savegame/savegame_typedefs").SavegameData,
    ): boolean;
    /**
     *
     * @param {Entity} entity
     */
    static migrateStaticComp1005to1006(entity: Entity): void;
  }
  import { SavegameInterface_V1005 } from "shapez/savegame/schemas/1005";
  import { Entity } from "shapez/game/entity";
}
declare module "shapez/savegame/schemas/1007" {
  export class SavegameInterface_V1007 extends SavegameInterface_V1006 {
    /**
     * @param {import("shapez/../savegame_typedefs.js").SavegameData} data
     */
    static migrate1006to1007(
      data: import("shapez/savegame/savegame_typedefs").SavegameData,
    ): boolean;
  }
  import { SavegameInterface_V1006 } from "shapez/savegame/schemas/1006";
}
declare module "shapez/savegame/schemas/1008" {
  export class SavegameInterface_V1008 extends SavegameInterface_V1007 {
    /**
     * @param {import("shapez/../savegame_typedefs.js").SavegameData} data
     */
    static migrate1007to1008(
      data: import("shapez/savegame/savegame_typedefs").SavegameData,
    ): void;
  }
  import { SavegameInterface_V1007 } from "shapez/savegame/schemas/1007";
}
declare module "shapez/game/modes/levels" {
  export const finalGameShape: "RuCw--Cw:----Ru--";
  export const REGULAR_MODE_LEVELS: (
    | {
        shape: string;
        required: number;
        reward: string;
        throughputOnly?: undefined;
      }
    | {
        shape: string;
        required: number;
        reward: string;
        throughputOnly: boolean;
      }
  )[];
}
declare module "shapez/game/modes/regular" {
  /**
   * Generates the level definitions
   */
  export function generateLevelDefinitions(): any;
  /** @typedef {{
   *   shape: string,
   *   amount: number
   * }} UpgradeRequirement */
  /** @typedef {{
   *   required: Array<UpgradeRequirement>
   *   improvement?: number,
   *   excludePrevious?: boolean
   * }} TierRequirement */
  /** @typedef {Array<TierRequirement>} UpgradeTiers */
  /** @typedef {{
   *   shape: string,
   *   required: number,
   *   reward: enumHubGoalRewards,
   *   throughputOnly?: boolean
   * }} LevelDefinition */
  export const rocketShape: "CbCuCbCu:Sr------:--CrSrCr:CwCwCwCw";
  export class RegularGameMode extends GameMode {
    additionalHudParts: {
      wiresToolbar: typeof HUDWiresToolbar;
      unlockNotification: typeof HUDUnlockNotification;
      massSelector: typeof HUDMassSelector;
      shop: typeof HUDShop;
      statistics: typeof HUDStatistics;
      waypoints: typeof HUDWaypoints;
      wireInfo: typeof HUDWireInfo;
      leverToggle: typeof HUDLeverToggle;
      pinnedShapes: typeof HUDPinnedShapes;
      notifications: typeof HUDNotifications;
      screenshotExporter: typeof HUDScreenshotExporter;
      wiresOverlay: typeof HUDWiresOverlay;
      shapeViewer: typeof HUDShapeViewer;
      layerPreview: typeof HUDLayerPreview;
      minerHighlight: typeof HUDMinerHighlight;
      tutorialVideoOffer: typeof HUDTutorialVideoOffer;
      gameMenu: typeof HUDGameMenu;
      constantSignalEdit: typeof HUDConstantSignalEdit;
    };
    /**
     * Should return all available upgrades
     * @returns {Object<string, UpgradeTiers>}
     */
    getUpgrades(): {
      [x: string]: UpgradeTiers;
    };
    /**
     * Returns the goals for all levels including their reward
     * @returns {Array<LevelDefinition>}
     */
    getLevelDefinitions(): Array<LevelDefinition>;
  }
  export type UpgradeRequirement = {
    shape: string;
    amount: number;
  };
  export type TierRequirement = {
    required: Array<UpgradeRequirement>;
    improvement?: number;
    excludePrevious?: boolean;
  };
  export type UpgradeTiers = Array<TierRequirement>;
  export type LevelDefinition = {
    shape: string;
    required: number;
    reward: enumHubGoalRewards;
    throughputOnly?: boolean;
  };
  import { GameMode } from "shapez/game/game_mode";
  import { HUDWiresToolbar } from "shapez/game/hud/parts/wires_toolbar";
  import { HUDUnlockNotification } from "shapez/game/hud/parts/unlock_notification";
  import { HUDMassSelector } from "shapez/game/hud/parts/mass_selector";
  import { HUDShop } from "shapez/game/hud/parts/shop";
  import { HUDStatistics } from "shapez/game/hud/parts/statistics";
  import { HUDWaypoints } from "shapez/game/hud/parts/waypoints";
  import { HUDWireInfo } from "shapez/game/hud/parts/wire_info";
  import { HUDLeverToggle } from "shapez/game/hud/parts/lever_toggle";
  import { HUDPinnedShapes } from "shapez/game/hud/parts/pinned_shapes";
  import { HUDNotifications } from "shapez/game/hud/parts/notifications";
  import { HUDScreenshotExporter } from "shapez/game/hud/parts/screenshot_exporter";
  import { HUDWiresOverlay } from "shapez/game/hud/parts/wires_overlay";
  import { HUDShapeViewer } from "shapez/game/hud/parts/shape_viewer";
  import { HUDLayerPreview } from "shapez/game/hud/parts/layer_preview";
  import { HUDMinerHighlight } from "shapez/game/hud/parts/miner_highlight";
  import { HUDTutorialVideoOffer } from "shapez/game/hud/parts/tutorial_video_offer";
  import { HUDGameMenu } from "shapez/game/hud/parts/game_menu";
  import { HUDConstantSignalEdit } from "shapez/game/hud/parts/constant_signal_edit";
  import { enumHubGoalRewards } from "shapez/game/tutorial_goals";
}
declare module "shapez/savegame/schemas/1009" {
  export class SavegameInterface_V1009 extends SavegameInterface_V1008 {
    /**
     * @param {import("shapez/../savegame_typedefs.js").SavegameData} data
     */
    static migrate1008to1009(
      data: import("shapez/savegame/savegame_typedefs").SavegameData,
    ): boolean;
  }
  import { SavegameInterface_V1008 } from "shapez/savegame/schemas/1008";
}
declare module "shapez/savegame/schemas/1010" {
  export class SavegameInterface_V1010 extends SavegameInterface_V1009 {
    /**
     * @param {import("shapez/../savegame_typedefs.js").SavegameData} data
     */
    static migrate1009to1010(
      data: import("shapez/savegame/savegame_typedefs").SavegameData,
    ): void;
  }
  import { SavegameInterface_V1009 } from "shapez/savegame/schemas/1009";
}
declare module "shapez/savegame/savegame_interface_registry" {
  /**
   * Returns if the given savegame has any supported interface
   * @param {any} savegame
   * @returns {BaseSavegameInterface|null}
   */
  export function getSavegameInterface(
    savegame: any,
  ): BaseSavegameInterface | null;
  /** @type {Object.<number, typeof BaseSavegameInterface>} */
  export const savegameInterfaces: {
    [x: number]: typeof BaseSavegameInterface;
  };
  import { BaseSavegameInterface } from "shapez/savegame/savegame_interface";
}
declare module "shapez/savegame/savegame" {
  /**
   * @typedef {import("shapez/../application").Application} Application
   * @typedef {import("shapez/../game/root").GameRoot} GameRoot
   * @typedef {import("shapez/./savegame_typedefs").SavegameData} SavegameData
   * @typedef {import("shapez/./savegame_typedefs").SavegameMetadata} SavegameMetadata
   * @typedef {import("shapez/./savegame_typedefs").SerializedGame} SerializedGame
   */
  export class Savegame extends ReadWriteProxy {
    /**
     * @returns {number}
     */
    static getCurrentVersion(): number;
    /**
     * @returns {typeof BaseSavegameInterface}
     */
    static getReaderClass(): typeof BaseSavegameInterface;
    /**
     *
     * @param {Application} app
     * @returns
     */
    static createPuzzleSavegame(app: Application): Savegame;
    /**
     *
     * @param {Application} app
     * @param {object} param0
     * @param {string} param0.internalId
     * @param {SavegameMetadata} param0.metaDataRef Handle to the meta data
     */
    constructor(
      app: Application,
      {
        internalId,
        metaDataRef,
      }: {
        internalId: string;
        metaDataRef: SavegameMetadata;
      },
    );
    /** @type {Application} */
    app: Application;
    internalId: string;
    metaDataRef: import("shapez/savegame/savegame_typedefs").SavegameMetadata;
    /**
     * Returns the savegames default data
     * @returns {SavegameData}
     */
    getDefaultData(): SavegameData;
    /**
     * Migrates the savegames data
     * @param {SavegameData} data
     */
    migrate(data: SavegameData): ExplainedResult;
    /**
     * Verifies the savegames data
     * @param {SavegameData} data
     */
    verify(data: SavegameData): ExplainedResult;
    /**
     * Returns if this game can be saved on disc
     * @returns {boolean}
     */
    isSaveable(): boolean;
    /**
     * Returns the *real* last update of the savegame, not the one of the metadata
     * which could also be the servers one
     */
    getRealLastUpdate(): any;
    /**
     * Returns if this game has a serialized game dump
     */
    hasGameDump(): boolean;
    /**
     * Returns the current game dump
     * @returns {SerializedGame}
     */
    getCurrentDump(): SerializedGame;
    /**
     * Returns a reader to access the data
     * @returns {BaseSavegameInterface}
     */
    getDumpReader(): BaseSavegameInterface;
    /**
     * Returns a reader to access external data
     * @returns {BaseSavegameInterface}
     */
    getDumpReaderForExternalData(data: any): BaseSavegameInterface;
    /**
     * Updates the last update field so we can send the savegame to the server,
     * WITHOUT Saving!
     */
    setLastUpdate(time: any): void;
    /**
     *
     * @param {GameRoot} root
     */
    updateData(root: GameRoot): boolean;
    /**
     * Writes the savegame as well as its metadata
     */
    writeSavegameAndMetadata(): Promise<void>;
    /**
     * Updates the savegames metadata
     */
    saveMetadata(): Promise<void>;
    /**
     * @see ReadWriteProxy.writeAsync
     * @returns {Promise<any>}
     */
    writeAsync(): Promise<any>;
  }
  export type Application = import("shapez/application").Application;
  export type GameRoot = import("shapez/game/root").GameRoot;
  export type SavegameData =
    import("shapez/savegame/savegame_typedefs").SavegameData;
  export type SavegameMetadata =
    import("shapez/savegame/savegame_typedefs").SavegameMetadata;
  export type SerializedGame =
    import("shapez/savegame/savegame_typedefs").SerializedGame;
  import { ReadWriteProxy } from "shapez/core/read_write_proxy";
  import { ExplainedResult } from "shapez/core/explained_result";
  import { BaseSavegameInterface } from "shapez/savegame/savegame_interface";
}
declare module "shapez/game/root" {
  /** @type {Array<Layer>} */
  export const layers: Array<Layer>;
  /**
   * The game root is basically the whole game state at a given point,
   * combining all important classes. We don't have globals, but this
   * class is passed to almost all game classes.
   */
  export class GameRoot {
    /**
     * Constructs a new game root
     * @param {Application} app
     */
    constructor(app: Application);
    app: Application;
    /** @type {Savegame} */
    savegame: Savegame;
    /** @type {InGameState} */
    gameState: InGameState;
    /** @type {KeyActionMapper} */
    keyMapper: KeyActionMapper;
    gameWidth: number;
    gameHeight: number;
    /** @type {boolean} */
    gameIsFresh: boolean;
    /** @type {boolean} */
    logicInitialized: boolean;
    /** @type {boolean} */
    gameInitialized: boolean;
    /**
     * Whether a bulk operation is running
     */
    bulkOperationRunning: boolean;
    /**
     * Whether a immutable operation is running
     */
    immutableOperationRunning: boolean;
    /** @type {Camera} */
    camera: Camera;
    /** @type {HTMLCanvasElement} */
    canvas: HTMLCanvasElement;
    /** @type {CanvasRenderingContext2D} */
    context: CanvasRenderingContext2D;
    /** @type {MapView} */
    map: MapView;
    /** @type {GameLogic} */
    logic: GameLogic;
    /** @type {EntityManager} */
    entityMgr: EntityManager;
    /** @type {GameHUD} */
    hud: GameHUD;
    /** @type {GameSystemManager} */
    systemMgr: GameSystemManager;
    /** @type {GameTime} */
    time: GameTime;
    /** @type {HubGoals} */
    hubGoals: HubGoals;
    /** @type {BufferMaintainer} */
    buffers: BufferMaintainer;
    /** @type {AutomaticSave} */
    automaticSave: AutomaticSave;
    /** @type {SoundProxy} */
    soundProxy: SoundProxy;
    /** @type {ShapeDefinitionManager} */
    shapeDefinitionMgr: ShapeDefinitionManager;
    /** @type {ProductionAnalytics} */
    productionAnalytics: ProductionAnalytics;
    /** @type {DynamicTickrate} */
    dynamicTickrate: DynamicTickrate;
    /** @type {Layer} */
    currentLayer: Layer;
    /** @type {GameMode} */
    gameMode: GameMode;
    signals: {
      entityManuallyPlaced: Signal<[Entity]>;
      entityAdded: Signal<[Entity]>;
      entityChanged: Signal<[Entity]>;
      entityGotNewComponent: Signal<[Entity]>;
      entityComponentRemoved: Signal<[Entity]>;
      entityQueuedForDestroy: Signal<[Entity]>;
      entityDestroyed: Signal<[Entity]>;
      resized: Signal<[number, number]>;
      readyToRender: Signal<[]>;
      aboutToDestruct: Signal<[]>;
      gameSaved: Signal<[]>;
      gameRestored: Signal<[]>;
      gameFrameStarted: Signal<[]>;
      storyGoalCompleted: Signal<[number, string]>;
      upgradePurchased: Signal<[string]>;
      postLoadHook: Signal<[]>;
      shapeDelivered: Signal<[ShapeDefinition]>;
      itemProduced: Signal<[BaseItem]>;
      bulkOperationFinished: Signal<[]>;
      immutableOperationFinished: Signal<[]>;
      editModeChanged: Signal<[Layer]>;
      prePlacementCheck: Signal<[Entity, Vector]>;
      freeEntityAreaBeforeBuild: Signal<[Entity]>;
      puzzleComplete: Signal<[]>;
    };
    /** @type {Object.<string, Object.<string, RandomNumberGenerator>>} */
    rngs: {
      [x: string]: {
        [x: string]: RandomNumberGenerator;
      };
    };
    queue: {
      requireRedraw: boolean;
    };
    /**
     * Destructs the game root
     */
    destruct(): void;
    /**
     * Resets the whole root and removes all properties
     */
    reset(): void;
  }
  import { Application } from "shapez/application";
  import { Savegame } from "shapez/savegame/savegame";
  import { InGameState } from "shapez/states/ingame";
  import { KeyActionMapper } from "shapez/game/key_action_mapper";
  import { Camera } from "shapez/game/camera";
  import { MapView } from "shapez/game/map_view";
  import { GameLogic } from "shapez/game/logic";
  import { EntityManager } from "shapez/game/entity_manager";
  import { GameHUD } from "shapez/game/hud/hud";
  import { GameSystemManager } from "shapez/game/game_system_manager";
  import { GameTime } from "shapez/game/time/game_time";
  import { HubGoals } from "shapez/game/hub_goals";
  import { BufferMaintainer } from "shapez/core/buffer_maintainer";
  import { AutomaticSave } from "shapez/game/automatic_save";
  import { SoundProxy } from "shapez/game/sound_proxy";
  import { ShapeDefinitionManager } from "shapez/game/shape_definition_manager";
  import { ProductionAnalytics } from "shapez/game/production_analytics";
  import { DynamicTickrate } from "shapez/game/dynamic_tickrate";
  import { GameMode } from "shapez/game/game_mode";
  import { Signal } from "shapez/core/signal";
  import { Entity } from "shapez/game/entity";
  import { ShapeDefinition } from "shapez/game/shape_definition";
  import { BaseItem } from "shapez/game/base_item";
  import { Vector } from "shapez/core/vector";
  import { RandomNumberGenerator } from "shapez/core/rng";
}
declare module "shapez/game/time/base_game_speed" {
  export class BaseGameSpeed extends BasicSerializableObject {
    /** @returns {string} */
    static getId(): string;
    static getSchema(): {};
    /**
     * @param {GameRoot} root
     */
    constructor(root: GameRoot);
    root: GameRoot;
    getId(): string;
    initializeAfterDeserialize(root: any): void;
    /**
     * Returns the time multiplier
     */
    getTimeMultiplier(): number;
    /**
     * Returns how many logic steps there may be queued
     */
    getMaxLogicStepsInQueue(): number;
    /** @returns {BaseGameSpeed} */
    newSpeed(instance: any): BaseGameSpeed;
  }
  import { BasicSerializableObject } from "shapez/savegame/serialization";
  import { GameRoot } from "shapez/game/root";
}
declare module "shapez/core/global_registries" {
  import type { BaseGameSpeed } from "shapez/game/time/base_game_speed";
  import type { Component } from "shapez/game/component";
  import type { BaseItem } from "shapez/game/base_item";
  import type { GameMode } from "shapez/game/game_mode";
  import type { MetaBuilding } from "shapez/game/meta_building";
  import { SingletonFactory } from "shapez/core/singleton_factory";
  import { Factory } from "shapez/core/factory";
  export const gMetaBuildingRegistry: SingletonFactory<MetaBuilding>;
  export const gComponentRegistry: Factory<Component>;
  export const gGameModeRegistry: Factory<GameMode>;
  export const gGameSpeedRegistry: Factory<BaseGameSpeed>;
  export const gItemRegistry: Factory<BaseItem>;
}
declare module "shapez/game/meta_building_registry" {
  /**
   *
   * @param {typeof MetaBuilding} metaBuilding
   */
  export function registerBuildingVariants(
    metaBuilding: typeof MetaBuilding,
  ): void;
  export function initMetaBuildingRegistry(): void;
  /**
   * Once all sprites are loaded, propagates the cache
   */
  export function initSpriteCache(): void;
  import { MetaBuilding } from "shapez/game/meta_building";
}
declare module "shapez/core/background_resources_loader" {
  export class BackgroundResourcesLoader {
    /**
     *
     * @param {Application} app
     */
    constructor(app: Application);
    app: Application;
    mainMenuPromise: Promise<void>;
    ingamePromise: Promise<void>;
    /** @type {Signal<[{ progress: number }]>} */
    resourceStateChangedSignal: Signal<
      [
        {
          progress: number;
        },
      ]
    >;
    getMainMenuPromise(): Promise<void>;
    getIngamePromise(): Promise<void>;
    /**
     *
     * @param {object} param0
     * @param {string[]} param0.sprites
     * @param {string[]} param0.sounds
     * @param {AtlasDefinition[]} param0.atlas
     * @param {string[]} param0.css
     */
    loadAssets({
      sprites,
      sounds,
      atlas,
      css,
    }: {
      sprites: string[];
      sounds: string[];
      atlas: AtlasDefinition[];
      css: string[];
    }): Promise<void>;
    /**
     * Shows an error when a resource failed to load and allows to reload the game
     */
    showLoaderError(dialogs: any, err: any): void;
    preloadWithProgress(src: any, progressHandler: any): Promise<any>;
    internalPreloadCss(src: any, progressHandler: any): Promise<void>;
  }
  import { Application } from "shapez/application";
  import { Signal } from "shapez/core/signal";
  import { AtlasDefinition } from "shapez/core/atlas_definitions";
}
declare module "shapez/core/error_handler" {
  export class ErrorHandler {
    isActive: boolean;
    constructor();
    private onError;
    private onUnhandledRejection;
  }
  export class ErrorScreen {
    private error;
    private file?;
    private line?;
    private column?;
    constructor(error: Error, file?: string, line?: number, column?: number);
    show(): void;
    private createLayout;
    private copyErrorLog;
    private restart;
    private get source();
    private get recursiveStack();
    private get loadedMods();
    private get buildInformation();
  }
}
declare module "shapez/core/input_distributor" {
  import type { Application } from "shapez/application";
  import type { InputReceiver, ReceiverId } from "shapez/core/input_receiver";
  export class InputDistributor {
    app: Application;
    receiverStack: InputReceiver[];
    filters: ((arg: string) => boolean)[];
    /**
     * All keys which are currently down
     */
    keysDown: Set<number>;
    constructor(app: Application);
    /**
     * Attaches a new filter which can filter and reject events
     */
    installFilter(filter: (arg: string) => boolean): void;
    /**
     * Removes an attached filter
     */
    dismountFilter(filter: (arg: string) => boolean): void;
    pushReceiver(receiver: InputReceiver): void;
    popReceiver(receiver: InputReceiver): void;
    isReceiverAttached(receiver: InputReceiver): boolean;
    isReceiverOnTop(receiver: InputReceiver): boolean;
    makeSureAttachedAndOnTop(receiver: InputReceiver): void;
    makeSureDetached(receiver: InputReceiver): void;
    destroyReceiver(receiver: InputReceiver): void;
    getTopReceiver(): InputReceiver;
    bindToEvents(): void;
    forwardToReceiver<T extends ReceiverId>(
      eventId: T,
      payload?: Parameters<InputReceiver[T]["dispatch"]>[0],
    ): void | "stop_propagation";
    handleBackButton(event: Event): void;
    /**
     * Handles when the page got blurred
     */
    handleBlur(): void;
    handlePaste(ev: ClipboardEvent): void;
    handleKeyMouseDown(
      event: KeyboardEvent | MouseEvent,
    ): void | "stop_propagation";
    handleKeyMouseUp(event: KeyboardEvent | MouseEvent): void;
  }
}
declare module "shapez/platform/api" {
  export class ClientAPI {
    /**
     *
     * @param {Application} app
     */
    constructor(app: Application);
    app: Application;
    /**
     * The current users session token
     * @type {string|null}
     */
    token: string | null;
    getEndpoint(): string;
    isLoggedIn(): boolean;
    /**
     *
     * @param {string} endpoint
     * @param {object} options
     * @param {"GET"|"POST"=} options.method
     * @param {any=} options.body
     */
    _request(
      endpoint: string,
      options: {
        method?: ("GET" | "POST") | undefined;
        body?: any | undefined;
      },
    ): Promise<any>;
    tryLogin(): Promise<boolean>;
    /**
     * @returns {Promise<{token: string}>}
     */
    apiTryLogin(): Promise<{
      token: string;
    }>;
    /**
     * @param {"new"|"top-rated"|"mine"} category
     * @returns {Promise<import("shapez/../savegame/savegame_typedefs").PuzzleMetadata[]>}
     */
    apiListPuzzles(
      category: "new" | "top-rated" | "mine",
    ): Promise<import("shapez/savegame/savegame_typedefs").PuzzleMetadata[]>;
    /**
     * @param {{ searchTerm: string; difficulty: string; duration: string }} searchOptions
     * @returns {Promise<import("shapez/../savegame/savegame_typedefs").PuzzleMetadata[]>}
     */
    apiSearchPuzzles(searchOptions: {
      searchTerm: string;
      difficulty: string;
      duration: string;
    }): Promise<import("shapez/savegame/savegame_typedefs").PuzzleMetadata[]>;
    /**
     * @param {number} puzzleId
     * @returns {Promise<import("shapez/../savegame/savegame_typedefs").PuzzleFullData>}
     */
    apiDownloadPuzzle(
      puzzleId: number,
    ): Promise<import("shapez/savegame/savegame_typedefs").PuzzleFullData>;
    /**
     * @param {number} puzzleId
     * @returns {Promise<import("shapez/../savegame/savegame_typedefs").PuzzleFullData>}
     */
    apiDeletePuzzle(
      puzzleId: number,
    ): Promise<import("shapez/savegame/savegame_typedefs").PuzzleFullData>;
    /**
     * @param {string} shortKey
     * @returns {Promise<import("shapez/../savegame/savegame_typedefs").PuzzleFullData>}
     */
    apiDownloadPuzzleByKey(
      shortKey: string,
    ): Promise<import("shapez/savegame/savegame_typedefs").PuzzleFullData>;
    /**
     * @param {number} puzzleId
     * @returns {Promise<void>}
     */
    apiReportPuzzle(puzzleId: number, reason: any): Promise<void>;
    /**
     * @param {number} puzzleId
     * @param {object} payload
     * @param {number} payload.time
     * @param {boolean} payload.liked
     * @returns {Promise<{ success: true }>}
     */
    apiCompletePuzzle(
      puzzleId: number,
      payload: {
        time: number;
        liked: boolean;
      },
    ): Promise<{
      success: true;
    }>;
    /**
     * @param {object} payload
     * @param {string} payload.title
     * @param {string} payload.shortKey
     * @param {import("shapez/../savegame/savegame_typedefs").PuzzleGameData} payload.data
     * @returns {Promise<{ success: true }>}
     */
    apiSubmitPuzzle(payload: {
      title: string;
      shortKey: string;
      data: import("shapez/savegame/savegame_typedefs").PuzzleGameData;
    }): Promise<{
      success: true;
    }>;
  }
  import { Application } from "shapez/application";
}
declare module "shapez/platform/wrapper" {
  export class PlatformWrapperImplElectron {
    constructor(app: any);
    /** @type {Application} */
    app: Application;
    initialize(): Promise<void>;
    getId(): string;
    getSupportsRestart(): boolean;
    /**
     * Attempt to open an external url
     * @param {string} url
     */
    openExternalLink(url: string): void;
    /**
     * Returns the strength of touch pans with the mouse
     */
    getTouchPanStrength(): number;
    /**
     * Attempt to restart the app
     */
    performRestart(): void;
    /**
     * Returns the UI scale, called on every resize
     * @returns {number} */
    getUiScale(): number;
    /**
     * Returns whether this platform supports a toggleable fullscreen
     */
    getSupportsFullscreen(): boolean;
    /**
     * Should set the apps fullscreen state to the desired state
     * @param {boolean} flag
     */
    setFullscreen(flag: boolean): void;
    getSupportsAppExit(): boolean;
    /**
     * Attempts to quit the app
     */
    exitApp(): void;
    /**
     * Whether this platform supports a keyboard
     */
    getSupportsKeyboard(): boolean;
    /**
     * Should return the minimum supported zoom level
     * @returns {number}
     */
    getMinimumZoom(): number;
    /**
     * Should return the maximum supported zoom level
     * @returns {number}
     */
    getMaximumZoom(): number;
    getScreenScale(): number;
  }
  import { Application } from "shapez/application";
}
declare module "shapez/profile/setting_types" {
  export class BaseSetting {
    /**
     *
     * @param {string} id
     * @param {string} categoryId
     * @param {function(Application, any):void} changeCb
     * @param {function(Application) : boolean=} enabledCb
     */
    constructor(
      id: string,
      categoryId: string,
      changeCb: (arg0: Application, arg1: any) => void,
      enabledCb?: ((arg0: Application) => boolean) | undefined,
    );
    id: string;
    categoryId: string;
    changeCb: (arg0: Application, arg1: any) => void;
    enabledCb: (arg0: Application) => boolean;
    /** @type {Application} */
    app: Application;
    element: HTMLElement;
    dialogs: any;
    /**
     * @param {Application} app
     * @param {any} value
     */
    apply(app: Application, value: any): void;
    /**
     * Binds all parameters
     * @param {Application} app
     * @param {HTMLElement} element
     * @param {any} dialogs
     */
    bind(app: Application, element: HTMLElement, dialogs: any): void;
    /**
     * Returns the HTML for this setting
     * @param {Application} app
     * @abstract
     */
    getHtml(app: Application): string;
    /**
     * Returns whether this setting is enabled and available
     * @param {Application} app
     */
    getIsAvailable(app: Application): boolean;
    syncValueToElement(): void;
    /**
     * Attempts to modify the setting
     * @abstract
     */
    modify(): void;
    /**
     * Shows the dialog that a restart is required
     */
    showRestartRequiredDialog(): void;
    /**
     * Validates the set value
     * @param {any} value
     * @returns {boolean}
     * @abstract
     */
    validate(value: any): boolean;
  }
  export class EnumSetting extends BaseSetting {
    constructor(
      id: any,
      {
        options,
        valueGetter,
        textGetter,
        descGetter,
        category,
        restartRequired,
        iconPrefix,
        changeCb,
        magicValue,
        enabledCb,
      }: {
        options: any;
        valueGetter: any;
        textGetter: any;
        descGetter?: any;
        category: any;
        restartRequired?: boolean;
        iconPrefix?: any;
        changeCb?: any;
        magicValue?: any;
        enabledCb?: any;
      },
    );
    options: any;
    valueGetter: any;
    textGetter: any;
    descGetter: any;
    restartRequired: boolean;
    iconPrefix: any;
    magicValue: any;
    validate(value: any): boolean;
  }
  export class BoolSetting extends BaseSetting {
    constructor(id: any, category: any, changeCb?: any, enabledCb?: any);
    validate(value: any): value is boolean;
  }
  export class RangeSetting extends BaseSetting {
    constructor(
      id: any,
      category: any,
      changeCb?: any,
      defaultValue?: number,
      minValue?: number,
      maxValue?: number,
      stepSize?: number,
      enabledCb?: any,
    );
    defaultValue: number;
    minValue: number;
    maxValue: number;
    stepSize: number;
    bind(app: any, element: any, dialogs: any): void;
    /**
     * Sets the elements value to the given value
     * @param {number} value
     */
    setElementValue(value: number): void;
    updateLabels(): void;
    /**
     * @returns {HTMLInputElement}
     */
    getRangeInputElement(): HTMLInputElement;
    validate(value: any): boolean;
  }
  import { Application } from "shapez/application";
}
declare module "shapez/profile/application_settings" {
  export type enumCategories = string;
  export namespace enumCategories {
    let general: string;
    let userInterface: string;
    let performance: string;
    let advanced: string;
  }
  export const uiScales: {
    id: string;
    size: number;
  }[];
  export const scrollWheelSensitivities: {
    id: string;
    scale: number;
  }[];
  export const movementSpeeds: {
    id: string;
    multiplier: number;
  }[];
  export const autosaveIntervals: {
    id: string;
    seconds: number;
  }[];
  export const refreshRateOptions: string[];
  export class ApplicationSettings extends ReadWriteProxy {
    /** @type {Application} */
    app: Application;
    settingHandles: BaseSetting[];
    initialize(): Promise<void>;
    save(): Promise<void>;
    getSettingHandleById(id: any): BaseSetting;
    /**
     * @returns {SettingsStorage}
     */
    getAllSettings(): SettingsStorage;
    /**
     * @param {string} key
     */
    getSetting(key: string): any;
    getInterfaceScaleId(): string;
    getDesiredFps(): number;
    getInterfaceScaleValue(): number;
    getScrollWheelSensitivity(): number;
    getMovementSpeed(): number;
    getAutosaveIntervalSeconds(): number;
    getIsFullScreen(): boolean;
    getKeybindingOverrides(): {
      [x: string]: number;
    };
    getLanguage(): string;
    updateLanguage(id: any): Promise<void>;
    /**
     * @param {string} key
     * @param {string|boolean|number} value
     */
    updateSetting(key: string, value: string | boolean | number): Promise<void>;
    /**
     * Sets a new keybinding override
     * @param {string} keybindingId
     * @param {number} keyCode
     */
    updateKeybindingOverride(
      keybindingId: string,
      keyCode: number,
    ): Promise<void>;
    /**
     * Resets a given keybinding override
     * @param {string} id
     */
    resetKeybindingOverride(id: string): Promise<void>;
    /**
     * Resets all keybinding overrides
     */
    resetKeybindingOverrides(): Promise<void>;
    getDefaultData(): {
      version: number;
      settings: SettingsStorage;
    };
    /** @param {{settings: SettingsStorage, version: number}} data */
    migrate(data: {
      settings: SettingsStorage;
      version: number;
    }): ExplainedResult;
  }
  import { ReadWriteProxy } from "shapez/core/read_write_proxy";
  import { Application } from "shapez/application";
  import { BaseSetting } from "shapez/profile/setting_types";
  class SettingsStorage {
    uiScale: string;
    fullscreen: boolean;
    soundVolume: number;
    musicVolume: number;
    theme: string;
    refreshRate: string;
    scrollWheelSensitivity: string;
    movementSpeed: string;
    language: string;
    autosaveInterval: string;
    alwaysMultiplace: boolean;
    shapeTooltipAlwaysOn: boolean;
    offerHints: boolean;
    enableTunnelSmartplace: boolean;
    vignette: boolean;
    compactBuildingInfo: boolean;
    disableCutDeleteWarnings: boolean;
    rotationByBuilding: boolean;
    clearCursorOnDeleteWhilePlacing: boolean;
    displayChunkBorders: boolean;
    pickMinerOnPatch: boolean;
    enableMousePan: boolean;
    enableColorBlindHelper: boolean;
    lowQualityMapResources: boolean;
    disableTileGrid: boolean;
    lowQualityTextures: boolean;
    simplifiedBelts: boolean;
    zoomToCursor: boolean;
    mapResourcesScale: number;
    /**
     * @type {Object.<string, number>}
     */
    keybindingOverrides: {
      [x: string]: number;
    };
  }
  import { ExplainedResult } from "shapez/core/explained_result";
  export {};
}
declare module "shapez/savegame/savegame_manager" {
  export type enumLocalSavegameStatus = string;
  export namespace enumLocalSavegameStatus {
    let offline: string;
    let synced: string;
  }
  export class SavegameManager extends ReadWriteProxy {
    /** @type {Application} */
    app: Application;
    currentData: import("shapez/savegame/savegame_typedefs").SavegamesData;
    /**
     * @returns {SavegamesData}
     */
    getDefaultData(): SavegamesData;
    /**
     *
     * @param {SavegamesData} data
     */
    migrate(data: SavegamesData): ExplainedResult;
    /**
     * @returns {Array<SavegameMetadata>}
     */
    getSavegamesMetaData(): Array<SavegameMetadata>;
    /**
     *
     * @param {string} internalId
     * @returns {Savegame}
     */
    getSavegameById(internalId: string): Savegame;
    /**
     * Deletes a savegame
     * @param {SavegameMetadata} game
     */
    deleteSavegame(game: SavegameMetadata): Promise<void>;
    /**
     * Returns a given games metadata by id
     * @param {string} id
     * @returns {SavegameMetadata}
     */
    getGameMetaDataByInternalId(id: string): SavegameMetadata;
    /**
     * Creates a new savegame
     * @returns {Savegame}
     */
    createNewSavegame(): Savegame;
    /**
     * Attempts to import a savegame
     * @param {object} data
     */
    importSavegame(data: object): Promise<void>;
    /**
     * Hook after the savegames got changed
     */
    updateAfterSavegamesChanged(): Promise<void>;
    /**
     * Sorts all savegames by their creation time descending
     * @returns {Promise<any>}
     */
    sortSavegames(): Promise<any>;
    /**
     * Helper method to generate a new internal savegame id
     */
    generateInternalId(): `${string}-${string}-${string}-${string}-${string}`;
    initialize(): Promise<void>;
  }
  export type SavegamesData =
    import("shapez/savegame/savegame_typedefs").SavegamesData;
  export type SavegameMetadata =
    import("shapez/savegame/savegame_typedefs").SavegameMetadata;
  import { ReadWriteProxy } from "shapez/core/read_write_proxy";
  import { Application } from "shapez/application";
  import { ExplainedResult } from "shapez/core/explained_result";
  import { Savegame } from "shapez/savegame/savegame";
}
declare module "shapez/core/textual_game_state" {
  import { HUDModalDialogs } from "shapez/game/hud/parts/modal_dialogs";
  import { GameState } from "shapez/core/game_state";
  /**
   * Baseclass for all game states which are structured similary: A header with back button + some
   * scrollable content.
   */
  export abstract class TextualGameState extends GameState {
    private backToStateId;
    private backToStatePayload;
    protected headerElement: HTMLElement;
    protected containerElement: HTMLElement;
    protected dialogs: HUDModalDialogs;
    /**
     * Should return the states inner html. If not overriden, will create a scrollable container
     * with the content of getMainContentHTML()
     * @deprecated
     */
    getInnerHTML(): string;
    /**
     * Should return the states HTML content.
     * @deprecated
     */
    getMainContentHTML(): string;
    /**
     * Should return the element(s) to be displayed in the state.
     * If not overridden, a default layout consisting of a back button,
     * title, and content returned by {@link getInitialContent}.
     */
    protected getContentLayout(): Node;
    protected getInitialContent(): Node;
    /**
     * Should return the title of the game state. If null, no title and back button will
     * get created
     */
    protected getStateHeaderTitle(): string | null;
    /**
     * Back button handler, can be overridden. Per default it goes back to the main menu,
     * or if coming from the game it moves back to the game again.
     */
    onBackButton(): void;
    /**
     * Returns the default state to go back to
     */
    getDefaultPreviousState(): string;
    /**
     * Goes to a new state, telling him to go back to this state later
     * @param stateId
     */
    moveToStateAddGoBack(stateId: string): void;
    /**
     * Removes all click detectors, except the one on the back button. Useful when regenerating
     * content.
     */
    clearClickDetectorsExceptHeader(): void;
    /**
     * Overrides the GameState leave callback to cleanup stuff
     */
    internalLeaveCallback(): void;
    /**
     * Overrides the GameState enter callback to setup required stuff
     */
    internalEnterCallback(payload: any): void;
  }
}
declare module "shapez/states/about" {
  export class AboutState extends TextualGameState {
    constructor();
    onEnter(): void;
  }
  import { TextualGameState } from "shapez/core/textual_game_state";
}
declare module "shapez/changelog" {
  export const CHANGELOG: {
    version: string;
    date: string;
    entries: string[];
  }[];
}
declare module "shapez/states/changelog" {
  export class ChangelogState extends TextualGameState {
    constructor();
    onEnter(): void;
  }
  import { TextualGameState } from "shapez/core/textual_game_state";
}
declare module "shapez/states/keybindings" {
  export class KeybindingsState extends TextualGameState {
    constructor();
    onEnter(): void;
    editKeybinding(id: any): void;
    updateKeybindings(): void;
    resetKeybinding(id: any): void;
    resetBindings(): void;
  }
  import { TextualGameState } from "shapez/core/textual_game_state";
}
declare module "shapez/game/hints" {
  /**
   * Finds a new hint to show about the game which the user hasn't seen within this session
   */
  export function getRandomHint(): string;
}
declare module "shapez/states/login" {
  export class LoginState extends GameState {
    constructor();
    /**
     *
     * @param {object} payload
     * @param {string} payload.nextStateId
     */
    onEnter(payload: { nextStateId: string }): void;
    payload: {
      nextStateId: string;
    };
    dialogs: HUDModalDialogs;
    /** @type {HTMLElement} */
    hintsText: HTMLElement;
    lastHintShown: number;
    nextHintDuration: number;
    tryLogin(): void;
    finishLoading(): void;
    getDefaultPreviousState(): string;
    update(): void;
    onRender(): void;
    onBackgroundTick(): void;
  }
  import { GameState } from "shapez/core/game_state";
  import { HUDModalDialogs } from "shapez/game/hud/parts/modal_dialogs";
}
declare module "shapez/states/main_menu" {
  /**
   * @typedef {import("shapez/../savegame/savegame_typedefs").SavegameMetadata} SavegameMetadata
   * @typedef {import("shapez/../profile/setting_types").EnumSetting} EnumSetting
   */
  export class MainMenuState extends GameState {
    constructor();
    /**
     * Asks the user to import a savegame
     */
    requestImportSavegame(): Promise<void>;
    onEnter(payload: any): void;
    dialogs: HUDModalDialogs;
    videoElement: HTMLVideoElement;
    renderMainMenu(): void;
    onPuzzleModeButtonClicked(force?: boolean): void;
    onBackButtonClicked(): void;
    onExitAppButtonClicked(): void;
    onChangelogClicked(): void;
    onRedditClicked(): void;
    onPatreonLinkClicked(): void;
    onLanguageChooseClicked(): void;
    get savedGames(): import("shapez/savegame/savegame_typedefs").SavegameMetadata[];
    renderSavegames(): void;
    /**
     * @param {SavegameMetadata} game
     */
    requestRenameSavegame(game: SavegameMetadata): void;
    /**
     * @param {SavegameMetadata} game
     */
    resumeGame(game: SavegameMetadata): void;
    /**
     * @param {Savegame} savegame
     */
    checkForModDifferences(savegame: Savegame): Promise<void>;
    /**
     * @param {SavegameMetadata} game
     */
    deleteGame(game: SavegameMetadata): void;
    /**
     * @param {SavegameMetadata} game
     */
    downloadGame(game: SavegameMetadata): void;
    onSettingsButtonClicked(): void;
    onTranslationHelpLinkClicked(): void;
    onPlayButtonClicked(): void;
    onModsClicked(): void;
    onContinueButtonClicked(): void;
  }
  export type SavegameMetadata =
    import("shapez/savegame/savegame_typedefs").SavegameMetadata;
  export type EnumSetting = import("shapez/profile/setting_types").EnumSetting;
  import { GameState } from "shapez/core/game_state";
  import { HUDModalDialogs } from "shapez/game/hud/parts/modal_dialogs";
  import { Savegame } from "shapez/savegame/savegame";
}
declare module "shapez/states/mods" {
  import { TextualGameState } from "shapez/core/textual_game_state";
  export class ModsState extends TextualGameState {
    constructor();
    getStateHeaderTitle(): string;
    protected getInitialContent(): HTMLElement;
    private getModElement;
    private formatAuthors;
    private getNoModsMessage;
    getDefaultPreviousState(): string;
  }
}
declare module "shapez/states/preload" {
  export class PreloadState extends GameState {
    constructor();
    getThemeMusic(): any;
    onEnter(): void;
    dialogs: HUDModalDialogs;
    /** @type {HTMLElement} */
    hintsText: HTMLElement;
    lastHintShown: number;
    nextHintDuration: number;
    /** @type {HTMLElement} */
    statusText: HTMLElement;
    /** @type {HTMLElement} */
    progressElement: HTMLElement;
    startLoading(): void;
    update(): void;
    onRender(): void;
    onBackgroundTick(): void;
    /**
     *
     * @param {string} text
     */
    setStatus(text: string, progress: any): Promise<void>;
    currentStatus: string;
    showFailMessage(text: any): void;
    showResetConfirm(): void;
    resetApp(): void;
  }
  import { GameState } from "shapez/core/game_state";
  import { HUDModalDialogs } from "shapez/game/hud/parts/modal_dialogs";
}
declare module "shapez/states/puzzle_menu" {
  export class PuzzleMenuState extends TextualGameState {
    constructor();
    loading: boolean;
    activeCategory: string;
    /**
     * @type {Array<import("shapez/../savegame/savegame_typedefs").PuzzleMetadata>}
     */
    puzzles: Array<import("shapez/savegame/savegame_typedefs").PuzzleMetadata>;
    getThemeMusic(): any;
    /**
     * Overrides the GameState implementation to provide our own html
     */
    internalGetFullHtml(): string;
    selectCategory(category: any): void;
    /**
     * Selects a root category
     * @param {string} rootCategory
     * @param {string=} category
     */
    selectRootCategory(
      rootCategory: string,
      category?: string | undefined,
    ): void;
    renderSearchForm(parent: any): void;
    startSearch(): void;
    /**
     *
     * @param {import("shapez/../savegame/savegame_typedefs").PuzzleMetadata[]} puzzles
     */
    renderPuzzles(
      puzzles: import("shapez/savegame/savegame_typedefs").PuzzleMetadata[],
    ): void;
    /**
     * @param {import("shapez/../savegame/savegame_typedefs").PuzzleMetadata} puzzle
     */
    tryDeletePuzzle(
      puzzle: import("shapez/savegame/savegame_typedefs").PuzzleMetadata,
    ): void;
    /**
     *
     * @param {*} category
     * @returns {Promise<import("shapez/../savegame/savegame_typedefs").PuzzleMetadata[]>}
     */
    getPuzzlesForCategory(
      category: any,
    ): Promise<import("shapez/savegame/savegame_typedefs").PuzzleMetadata[]>;
    /**
     *
     * @param {number} puzzleId
     * @param {Array<number>=} nextPuzzles
     */
    playPuzzle(puzzleId: number, nextPuzzles?: Array<number> | undefined): void;
    /**
     *
     * @param {import("shapez/../savegame/savegame_typedefs").PuzzleFullData} puzzle
     * @param {Array<number>=} nextPuzzles
     */
    startLoadedPuzzle(
      puzzle: import("shapez/savegame/savegame_typedefs").PuzzleFullData,
      nextPuzzles?: Array<number> | undefined,
    ): void;
    onEnter(payload: any): void;
    loadPuzzle(): void;
    createNewPuzzle(force?: boolean): void;
  }
  import { TextualGameState } from "shapez/core/textual_game_state";
}
declare module "shapez/states/settings" {
  export class SettingsState extends TextualGameState {
    constructor();
    getCategoryButtonsHtml(): string;
    getSettingsHtml(): string;
    renderBuildText(): void;
    onEnter(payload: any): void;
    setActiveCategory(category: any): void;
    initSettings(): void;
    initCategoryButtons(): void;
    onAboutClicked(): void;
    onPrivacyClicked(): void;
    onKeybindingsClicked(): void;
    onModsClicked(): void;
  }
  import { TextualGameState } from "shapez/core/textual_game_state";
}
declare module "shapez/application" {
  export class Application {
    /**
     * Boots the application
     */
    boot(): Promise<void>;
    errorHandler: ErrorHandler;
    unloaded: boolean;
    storage: Storage;
    platformWrapper: PlatformWrapperImplElectron;
    settings: ApplicationSettings;
    ticker: AnimationFrame;
    stateMgr: StateManager;
    savegameMgr: SavegameManager;
    inputMgr: InputDistributor;
    backgroundResourceLoader: BackgroundResourcesLoader;
    clientApi: ClientAPI;
    sound: Sound;
    focused: boolean;
    pageVisible: any;
    /** @type {TypedTrackedState<boolean>} */
    trackedIsRenderable: TypedTrackedState<boolean>;
    /** @type {TypedTrackedState<boolean>} */
    trackedIsPlaying: TypedTrackedState<boolean>;
    screenWidth: any;
    screenHeight: number;
    lastResizeCheck: number;
    /** @type {Vector|null} */
    mousePosition: Vector | null;
    /**
     * Registers all game states
     */
    registerStates(): void;
    /**
     * Registers all event listeners
     */
    registerEventListeners(): void;
    /**
     * Checks the focus after a touch
     * @param {TouchEvent} event
     */
    updateFocusAfterUserInteraction(event: TouchEvent): void;
    /**
     * Handles a page visibility change event
     * @param {Event} event
     */
    handleVisibilityChange(event: Event): void;
    /**
     * Handles a mouse move event
     * @param {MouseEvent} event
     */
    handleMousemove(event: MouseEvent): void;
    /**
     * Internal on focus handler
     */
    onFocus(): void;
    /**
     * Internal blur handler
     */
    onBlur(): void;
    /**
     * Returns if the app is currently visible
     */
    isRenderable(): any;
    onAppRenderableStateChanged(renderable: any): void;
    onAppPlayingStateChanged(playing: any): void;
    /**
     * Internal before-unload handler
     */
    onBeforeUnload(event: any): void;
    /**
     * Deinitializes the application
     */
    deinitialize(): Promise<any>;
    /**
     * Background frame update callback
     * @param {number} dt
     */
    onBackgroundFrame(dt: number): void;
    /**
     * Frame update callback
     * @param {number} dt
     */
    onFrameEmitted(dt: number): void;
    /**
     * Checks if the app resized. Only does this once in a while
     * @param {boolean} forceUpdate Forced update of the dimensions
     */
    checkResize(forceUpdate?: boolean): void;
    /**
     * Returns the effective ui sclae
     */
    getEffectiveUiScale(): number;
    /**
     * Callback after ui scale has changed
     */
    updateAfterUiScaleChanged(): void;
  }
  export type SoundInterface = import("shapez/platform/sound").SoundInterface;
  import { ErrorHandler } from "shapez/core/error_handler";
  import { Storage } from "shapez/platform/storage";
  import { PlatformWrapperImplElectron } from "shapez/platform/wrapper";
  import { ApplicationSettings } from "shapez/profile/application_settings";
  import { AnimationFrame } from "shapez/core/animation_frame";
  import { StateManager } from "shapez/core/state_manager";
  import { SavegameManager } from "shapez/savegame/savegame_manager";
  import { InputDistributor } from "shapez/core/input_distributor";
  import { BackgroundResourcesLoader } from "shapez/core/background_resources_loader";
  import { ClientAPI } from "shapez/platform/api";
  import { Sound } from "shapez/platform/sound";
  import { Vector } from "shapez/core/vector";
}
declare module "shapez/core/assert" {
  export {};
}
declare module "shapez/game/component_registry" {
  export function initComponentRegistry(): void;
}
declare module "shapez/game/modes/puzzle_edit" {
  export class PuzzleEditGameMode extends PuzzleGameMode {
    static getSchema(): {};
    hiddenBuildings: (
      | typeof MetaItemProducerBuilding
      | typeof MetaLeverBuilding
      | typeof MetaVirtualProcessorBuilding
    )[];
  }
  import { PuzzleGameMode } from "shapez/game/modes/puzzle";
  import { MetaItemProducerBuilding } from "shapez/game/buildings/item_producer";
  import { MetaLeverBuilding } from "shapez/game/buildings/lever";
  import { MetaVirtualProcessorBuilding } from "shapez/game/buildings/virtual_processor";
}
declare module "shapez/game/game_mode_registry" {
  export function initGameModeRegistry(): void;
}
declare module "shapez/game/game_speed_registry" {
  export function initGameSpeedRegistry(): void;
}
declare module "shapez/game/item_registry" {
  export function initItemRegistry(): void;
}
declare module "shapez/main" {
  export {};
}
declare module "shapez/core/config.local.template" {
  const _default: {};
  export default _default;
}
declare module "shapez/game/hud/parts/sandbox_controller" {
  export class HUDSandboxController extends BaseHUDPart {
    createElements(parent: any): void;
    element: HTMLDivElement;
    giveBlueprints(): void;
    maxOutAll(): void;
    modifyUpgrade(id: any, amount: any): void;
    modifyLevel(amount: any): void;
    visible: any;
    domAttach: DynamicDomAttach;
    toggle(): void;
  }
  import { BaseHUDPart } from "shapez/game/hud/base_hud_part";
  import { DynamicDomAttach } from "shapez/game/hud/dynamic_dom_attach";
}
declare module "shapez/game/time/fast_forward_game_speed" {
  export class FastForwardGameSpeed extends BaseGameSpeed {
    getTimeMultiplier(): any;
  }
  import { BaseGameSpeed } from "shapez/game/time/base_game_speed";
}
declare module "shapez/mods/errored_mod" {
  import { Mod } from "shapez/mods/mod";
  /**
   * This {@link Mod} subclass is used to differentiate disabled mods and those
   * that couldn't be parsed or constructed due to an error.
   */
  export class ErroredMod extends Mod {
    init(): void | Promise<void>;
  }
}
declare function tick(): void;
declare const bgFps: 30;
declare const desiredMsDelay: number;
declare let lastTick: number;
declare module "shapez/webworkers/compression" {}
declare module "shapez/webworkers/decompression" {}
/// <reference types="webpack/module" />

// Globals defined by webpack

declare const G_IS_DEV: boolean;
declare function assert(
  condition: boolean | object | string,
  ...errorMessage: string[]
): asserts condition;
declare function assertAlways(
  condition: boolean | object | string,
  ...errorMessage: string[]
): asserts condition;

declare const abstract: void;

declare const G_APP_ENVIRONMENT: string;
declare const G_BUILD_TIME: number;

declare const G_BUILD_COMMIT_HASH: string;
declare const G_BUILD_VERSION: string;
declare const G_ALL_UI_IMAGES: Array<string>;
declare const G_IS_RELEASE: boolean;

declare const shapez: any;

declare const ipcRenderer: any;

declare interface CanvasRenderingContext2D {
  beginCircle(x: number, y: number, r: number): void;
}

// Just for compatibility with the shared code
declare interface Logger {
  log(...args);
  warn(...args);
  info(...args);
  error(...args);
}

declare interface Window {
  // Debugging
  activeClickDetectors: Array<any>;

  // Mods
  shapez: any;

  APP_ERROR_OCCURED?: boolean;

  assert(condition: boolean, failureMessage: string);
}

declare interface Math {
  radians(number): number;
  degrees(number): number;
}

declare type Class<T = unknown> = new (...args: any[]) => T;

declare class TypedTrackedState<T> {
  constructor(callbackMethod?: (value: T) => void, callbackScope?: any);

  set(value: T, changeHandler?: (value: T) => void, changeScope?: any): void;

  setSilent(value: any): void;
  get(): T;
}

declare type Layer = "regular" | "wires";
declare type ItemType = "shape" | "color" | "boolean";

declare module "shapez/worker-loader?inline=true&fallback=false!*" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}

// JSX type support - https://www.typescriptlang.org/docs/handbook/jsx.html
// modified from https://stackoverflow.com/a/68238924
declare namespace JSX {
  /**
   * The return type of a JSX expression.
   *
   * In reality, Fragments can return arbitrary values, but we ignore this for convenience.
   */
  type Element = HTMLElement;
  /**
   * Key-value list of intrinsic element names and their allowed properties.
   *
   * Because children are treated as a property, the Node type cannot be excluded from the index signature.
   */
  type IntrinsicElements = {
    [K in keyof HTMLElementTagNameMap]: {
      children?: JSXNode | JSXNode[];
      [k: string]: JSXNode | JSXNode[] | string | number | boolean;
    };
  };
  /**
   * The property of the attributes object storing the children.
   */
  type ElementChildrenAttribute = { children: unknown };

  // The following do not have special meaning to TypeScript.

  /**
   * An attributes object.
   */
  type Props = { [k: string]: unknown };

  /**
   * A functional component requiring attributes to match `T`.
   */
  type Component<T extends Props> = {
    (props: T): Element;
  };

  /**
   * A child of a JSX element.
   */
  type JSXNode = Node | string | boolean | null | undefined;
}
