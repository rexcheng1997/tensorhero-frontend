import * as PIXI from 'pixi.js';
import {
  ChartObjectInterface,
  NoteDescription,
  Tick,
} from 'utils/chart-parser';
import { linear } from './arithmetics';
import {
  COLORS,
  DEFAULT_PIXELS_PER_TICK,
  FRETBOARD,
  NOTE_COLORS,
  MIN_NOTE_RADIUS,
} from './constants';

interface ConfigurationInterface {
  linewidth: {
    light: number;
    normal: number;
    bold: number;
    extra: number;
  };
  sideGap: number;
  minNoteRadius: number;
  enableAnimation: boolean;
  showEntireChart: boolean;
  showMeasureBars: boolean;
};

export type CallbackOnUpdate = () => void;
export type CallbackOnEnd = () => void;

/**
 * Understands how to visualize the chart with animation
 */
export default class ChartVisualizationApp {
  private readonly app: PIXI.Application;
  private readonly sprites: { [key: string]: PIXI.Sprite };
  private readonly chart: ChartObjectInterface;
  private readonly duration: number;
  private readonly endOfChart: Tick;
  private readonly callbackOnUpdate: CallbackOnUpdate;
  private readonly callbackOnEnd: CallbackOnEnd;
  private readonly config: ConfigurationInterface;
  private fretboardGraphics: PIXI.Graphics;
  private notesGraphics: PIXI.Graphics;
  private notesContainer: PIXI.Container;
  private _pixelsPerTick: number;
  private width: number = 0;
  private height: number = 0;
  private elapsedMs: number = 0;
  private elapsedTicks: number = 0;
  private BPMIndex: number = 0;
  private animated: boolean = false;

  /**
   * Creates a chart visualization app
   * with size fitting to the parent container
   * @param {HTMLElement} parent the parent/wrapper container to
   *   place the canvas
   * @param {Object} loadedSprites an object containing the sprites needed
   * @param {ChartObjectInterface} chartObject parsed .chart file
   * @param {Function} onUpdate callback for every update
   * @param {Function} onEnd callback when the animation ends
   * @param {ConfigurationInterface} configuration the configuration of the app
   */
  private constructor(
    readonly parent: HTMLElement,
    readonly loadedSprites: { [key: string]: PIXI.Sprite },
    readonly chartObject: ChartObjectInterface,
    readonly audioDuration: number,
    readonly onUpdate: CallbackOnUpdate,
    readonly onEnd: CallbackOnEnd,
    readonly configuration: ConfigurationInterface,
  ) {
    this._resize(parent);

    this.app = new PIXI.Application({
      width: this.width,
      height: this.height,
      backgroundAlpha: 0,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
    });
    this.sprites = loadedSprites;
    this.fretboardGraphics = new PIXI.Graphics();
    this.notesGraphics = new PIXI.Graphics();
    this.notesContainer = new PIXI.Container();
    this.chart = chartObject;
    this.duration = audioDuration;
    this.callbackOnUpdate = onUpdate;
    this.callbackOnEnd = onEnd;
    this.config = configuration;

    const lastNoteObject = chartObject.ExpertSingle[
        chartObject.ExpertSingle.length - 1
    ];
    this.endOfChart = parseInt(chartObject.Song.Offset) + (
      lastNoteObject.tick + lastNoteObject.sustainLength);
    this._pixelsPerTick = this.config.showEntireChart ?
        this.width / this.endOfChart : DEFAULT_PIXELS_PER_TICK;

    parent.appendChild(this.app.view);
    this.drawFretboard();
    this.drawNotes();
    this.app.ticker.stop(); // stops the ticker so that it's not autoplayed
    this.app.render(); // has to call render() explicitly when ticker is stoped

    if (this.config.enableAnimation) this.addAnimationLoop();
  }

  /**
   * Creates a chart visualization app used for animation
   * by calling the private constructor internally
   * @param {HTMLElement} parent the parent/wrapper container to
   *   place the canvas
   * @param {Object} loadedSprites an object containing the sprites needed
   * @param {ChartObjectInterface} chartObject parsed .chart file
   * @param {number} audioDuration duration of the audio in milliseconds
   * @param {Function} onUpdate callback for every update
   * @param {Function} onEnd callback when the animation ends
   * @return {ChartVisualizationApp}
   */
  public static createAnimationFactory(
      parent: HTMLElement,
      loadedSprites: { [key: string]: PIXI.Sprite },
      chartObject: ChartObjectInterface,
      audioDuration: number,
      onUpdate: CallbackOnUpdate,
      onEnd: CallbackOnEnd,
  ): ChartVisualizationApp {
    const configuration: ConfigurationInterface = {
      linewidth: {
        light: FRETBOARD.LINEWIDTH_NORMAL,
        normal: FRETBOARD.LINEWIDTH_NORMAL,
        bold: FRETBOARD.LINEWIDTH_BOLD,
        extra: FRETBOARD.LINEWIDTH_EXTRA,
      },
      sideGap: FRETBOARD.SIDE_GAP,
      minNoteRadius: MIN_NOTE_RADIUS,
      enableAnimation: true,
      showEntireChart: false,
      showMeasureBars: true,
    };

    return new ChartVisualizationApp(
        parent,
        loadedSprites,
        chartObject,
        audioDuration,
        onUpdate,
        onEnd,
        configuration,
    );
  }

  /**
   * Creates a chart visualization app used for overview
   * by calling the private constructor internally
   * @param {HTMLElement} parent the parent/wrapper container to
   *   place the canvas
   * @param {Object} loadedSprites an object containing the sprites needed
   * @param {ChartObjectInterface} chartObject parsed .chart file
   * @param {number} audioDuration duration of the audio in milliseconds
   * @return {ChartVisualizationApp}
   */
  public static createOverviewFactory(
      parent: HTMLElement,
      loadedSprites: { [key: string]: PIXI.Sprite },
      chartObject: ChartObjectInterface,
      audioDuration: number,
  ): ChartVisualizationApp {
    const configuration: ConfigurationInterface = {
      linewidth: {
        light: FRETBOARD.LINEWIDTH_SLIM,
        normal: FRETBOARD.LINEWIDTH_LIGHT,
        bold: FRETBOARD.LINEWIDTH_LIGHT,
        extra: FRETBOARD.LINEWIDTH_NORMAL,
      },
      sideGap: FRETBOARD.SIDE_GAP / 2,
      minNoteRadius: MIN_NOTE_RADIUS / 5,
      enableAnimation: false,
      showEntireChart: true,
      showMeasureBars: true,
    };

    return new ChartVisualizationApp(
        parent,
        loadedSprites,
        chartObject,
        audioDuration,
        () => {},
        () => {},
        configuration,
    );
  }

  /**
   * Getter for pixelsPerTick
   * @return {number}
   */
  public get pixelsPerTick(): number {
    return this._pixelsPerTick;
  }

  /**
   * Sets pixelsPerTick
   * @param {number} value new value for pixelsPerTick
   */
  public set pixelsPerTick(value: number) {
    this._pixelsPerTick = value;
    this.clearCanvas();
    this.drawFretboard();
    this.drawMeasureBars();
    this.drawNotes();
    this.app.render();
  }

  /**
   * Gets the progress (between 0 and 1) using time as the unit
   * @return {number}
   */
  public get progressInTime(): number {
    return this.elapsedMs / this.duration;
  }

  /**
   * Gets the progress (between 0 and 1) using ticks as the unit
   * @return {number}
   */
  public get progressInTicks(): number {
    return this.elapsedTicks / this.endOfChart;
  }

  /**
   * Toggles the animation
   */
  public toggleAnimation(): void {
    this.animated ? this.app.ticker.stop() : this.app.ticker.start();
    this.animated = !this.animated;
  }

  /**
   * Seeks to the specified position of the animation based on time
   * Precision: 1 ms
   * @param {number} progress the position to seek (between 0 and 1)
   */
  public seekInTime(progress: number): void {
    const targetMs = progress * this.duration;

    if (this.elapsedMs === targetMs) return;

    if (this.elapsedMs < targetMs) { // fast forward
      while (this.elapsedMs < targetMs) {
        this.elapsedMs += 1;
        this.elapsedTicks += this.ticksPerMs;
        this.notesContainer.x -= this._pixelsPerTick * this.ticksPerMs;

        if (this.BPMIndex + 1 < this.chart.SyncTrack.BPMChanges.length &&
            this.elapsedTicks >= (
              this.chart.SyncTrack.BPMChanges[this.BPMIndex + 1][0])
        ) {
          this.BPMIndex++;
        }
      }
    } else { // rewind
      while (this.elapsedMs > targetMs) {
        this.elapsedMs -= 1;
        this.elapsedTicks -= this.ticksPerMs;
        this.notesContainer.x += this._pixelsPerTick * this.ticksPerMs;

        if (this.BPMIndex - 1 >= 0 && this.elapsedTicks < (
          this.chart.SyncTrack.BPMChanges[this.BPMIndex][0])
        ) {
          this.BPMIndex--;
        }
      }
    }

    this.app.render();
  }

  /**
   * Seeks to the specified position of the animation based on ticks
   * Precision: 1 tick
   * @param {number} progress the position to seek (between 0 and 1)
   */
  public seekInTicks(progress: number): void {
    const targetTick = progress * this.endOfChart;

    if (this.elapsedTicks === targetTick) return;

    if (this.elapsedTicks < targetTick) { // fast forward
      while (this.elapsedTicks < targetTick) {
        this.elapsedTicks += 1;
        this.elapsedMs += 1 / this.ticksPerMs;
        this.notesContainer.x -= this._pixelsPerTick;

        if (this.BPMIndex + 1 < this.chart.SyncTrack.BPMChanges.length &&
          this.elapsedTicks >= (
            this.chart.SyncTrack.BPMChanges[this.BPMIndex + 1][0])
        ) {
          this.BPMIndex++;
        }
      }
    } else { // rewind
      while (this.elapsedTicks > targetTick) {
        this.elapsedTicks -= 1;
        this.elapsedMs -= 1 / this.ticksPerMs;
        this.notesContainer.x += this._pixelsPerTick;

        if (this.BPMIndex - 1 >= 0 && this.elapsedTicks < (
          this.chart.SyncTrack.BPMChanges[this.BPMIndex][0])
        ) {
          this.BPMIndex--;
        }
      }
    }

    this.app.render();
  }

  /**
   * Resizes the visualization based on the size of the parent container
   * @param {HTMLElement} parent the parent/wrapper container to
   *  place the canvas
   */
  public resize(parent: HTMLElement): void {
    this._resize(parent);
    this.app.view.width = this.width * 2;
    this.app.view.height = this.height * 2;
    this.app.renderer.resize(this.width, this.height);

    if (this.config.showEntireChart) {
      this._pixelsPerTick = this.width / this.endOfChart;
    }

    this.clearCanvas();
    this.drawFretboard();
    this.drawMeasureBars();
    this.drawNotes();
    this.app.render();
  }

  /**
   * Destroys the app to clean up memory usage
   * The instance is no longer usable after this call
   */
  public destroy(): void {
    this.app.destroy();
  }

  /**
   * Resets the width and height field based on the size of the parent container
   * @param {HTMLElement} parent the parent/wrapper container to
   *  place the canvas
   */
  private _resize(parent: HTMLElement): void {
    // for some reason, PIXI will render everything at a doubled scale
    this.width = parent.clientWidth / 2;
    this.height = parent.clientHeight / 2;
  }

  /**
   * Gets the value for vertical gap between horizontal frets
   * Each horizontal fret (5 in total) has a top and bottom gap
   * plus top and bottom padding as 2 gaps
   */
  private get verticalGap(): number {
    return (this.height - 5 * this.config.linewidth.bold) / (5 * 2 + 2);
  }

  /**
   * Gets the current conversion from milliseconds to ticks
   * @return {number}
   */
  private get ticksPerMs(): number {
    return (
      this.chart.SyncTrack.BPMChanges[this.BPMIndex][1] / (60 * 1000)
    ) * parseInt(this.chart.Song.Resolution);
  }

  /**
   * Removes all display objects / containers from the app's stage
   */
  private clearCanvas(): void {
    this.app.stage.removeChild(this.fretboardGraphics, this.notesContainer);
    this.fretboardGraphics.destroy();
    this.fretboardGraphics = new PIXI.Graphics();
    this.notesContainer.removeChild(this.notesGraphics);
    this.notesGraphics.destroy();
    this.notesGraphics = new PIXI.Graphics();
    this.notesContainer.destroy();
    this.notesContainer = new PIXI.Container();
  }

  /**
   * Draws the freboard as the background
   */
  private drawFretboard(): void {
    // outmost two vertical lines
    this.fretboardGraphics.beginFill(COLORS.LIGHT_GRAY);
    this.fretboardGraphics.drawRoundedRect(
        0,
        0,
        this.config.linewidth.normal,
        this.height,
        this.config.linewidth.normal,
    );
    this.fretboardGraphics.drawRoundedRect(
        this.width - this.config.linewidth.normal,
        0,
        this.config.linewidth.normal,
        this.height,
        this.config.linewidth.normal,
    );
    this.fretboardGraphics.endFill();

    // inner two vertical lines
    this.fretboardGraphics.beginFill(COLORS.BLACK);
    this.fretboardGraphics.drawRoundedRect(
        this.config.linewidth.normal + this.config.sideGap,
        0,
        this.config.linewidth.normal,
        this.height,
        this.config.linewidth.normal,
    );
    this.fretboardGraphics.drawRoundedRect(
        this.width - 2 * this.config.linewidth.normal - this.config.sideGap,
        0,
        this.config.linewidth.normal,
        this.height,
        this.config.linewidth.normal,
    );
    this.fretboardGraphics.endFill();

    // five horizontal lines
    this.fretboardGraphics.beginFill(COLORS.BLACK);
    for (let i = 0; i < 5; i++) {
      this.fretboardGraphics.drawRect(
          this.config.linewidth.normal * 2 + this.config.sideGap,
          linear(
              2 * this.verticalGap + this.config.linewidth.bold,
              2 * this.verticalGap,
          )(i),
          this.width - 2 * (
            this.config.linewidth.normal * 2 + this.config.sideGap
          ),
          this.config.linewidth.bold,
      );
    }
    this.fretboardGraphics.endFill();

    this.app.stage.addChild(this.fretboardGraphics);
  }

  /**
   * Draws the measure bars based on the chartObject
   */
  private drawMeasureBars(): void {
    const ticksPerBeat = parseInt(this.chart.Song.Resolution);
    let index = 0;

    for (let tick = ( // skip the very beginning bar at tick 0
      ticksPerBeat * this.chart.SyncTrack.TimeSignatureChanges[index][1]);
      tick <= this.endOfChart; tick += (
        ticksPerBeat * this.chart.SyncTrack.TimeSignatureChanges[index][1])
    ) {
      this.notesGraphics.beginFill(COLORS.GRAY);
      this.notesGraphics.drawRoundedRect(
          this._pixelsPerTick * tick - this.config.linewidth.light / 2,
          this.verticalGap,
          this.config.linewidth.light,
          this.height - 2 * this.verticalGap,
          this.config.linewidth.light,
      );
      this.notesGraphics.endFill();

      if (index + 1 < this.chart.SyncTrack.TimeSignatureChanges.length &&
        this.chart.SyncTrack.TimeSignatureChanges[index + 1][0] >= tick) {
        index++;
      }
    }
  }

  /**
   * Draws the notes in the chartObject
   */
  private drawNotes(): void {
    this.notesContainer.addChild(this.notesGraphics);

    if (this.config.showMeasureBars) this.drawMeasureBars();

    const radius = Math.max(
        this.verticalGap - this.config.sideGap,
        this.config.minNoteRadius,
    );
    const computePositionY = linear(
        2 * this.verticalGap + this.config.linewidth.bold,
        2 * this.verticalGap + this.config.linewidth.bold / 2 - radius,
    );

    for (const noteObject of this.chart.ExpertSingle) {
      const note = new PIXI.Sprite(
          this.sprites[NoteDescription[noteObject.description]].texture,
      );

      note.width = radius * 2;
      note.height = radius * 2;
      note.x = this._pixelsPerTick * noteObject.tick - radius;
      note.y = computePositionY(noteObject.description);

      if (noteObject.sustainLength > 0) {
        this.notesGraphics.beginFill(NOTE_COLORS[noteObject.description]);
        this.notesGraphics.drawRoundedRect(
            note.x + radius,
            note.y + radius - this.config.linewidth.extra / 2,
            this._pixelsPerTick * noteObject.sustainLength,
            this.config.linewidth.extra,
            this.config.linewidth.extra,
        );
        this.notesGraphics.endFill();
      }

      this.notesContainer.addChild(note);
    }

    this.notesContainer.x = this._pixelsPerTick * (
      parseInt(this.chart.Song.Offset) - this.elapsedTicks
    );
    this.app.stage.addChild(this.notesContainer);
  }

  /**
   * Adds the animation loop to Ticker
   */
  private addAnimationLoop(): void {
    this.app.ticker.add((delta) => {
      const deltaMs = delta / PIXI.settings.TARGET_FPMS!;

      this.elapsedMs += deltaMs;
      this.elapsedTicks += this.ticksPerMs * deltaMs;
      this.notesContainer.x -= this._pixelsPerTick * this.ticksPerMs * deltaMs;

      if (this.BPMIndex + 1 < this.chart.SyncTrack.BPMChanges.length &&
          this.elapsedTicks >= (
            this.chart.SyncTrack.BPMChanges[this.BPMIndex + 1][0])
      ) {
        this.BPMIndex++;
      }

      // stops when reaching the end and wraps to the beginning
      if (this.elapsedMs >= this.duration) {
        this.elapsedMs = 0;
        this.elapsedTicks = 0;
        this.BPMIndex = 0;
        this.notesContainer.x = parseInt(
            this.chart.Song.Offset,
        ) * this._pixelsPerTick;
        this.toggleAnimation();
        this.callbackOnEnd();
      }

      this.callbackOnUpdate();
    });
  }
};
