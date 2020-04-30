declare module 'viz.js' {
  type VizOptions = Partial<{
    /**
     * The URL of the rendering script file to use as a Web Worker.
     */
    workerURL: string;
    /**
     * The Emscripten module function.
     */
    Module: Function;
    /**
     * The render function.
     */
    render: Function;
  }>;
  type RenderOptions = Partial<{
    /**
     * The layout engine.
     */
    engine: 'circo' | 'dot' | 'fdp' | 'neato' | 'osage' | 'twopi';
    /**
     * The desired output format.
     */
    format:
      | 'svg'
      | 'dot'
      | 'xdot'
      | 'plain'
      | 'plain-ext'
      | 'ps'
      | 'ps2'
      | 'json'
      | 'json0';
    /**
     * Invert the y coordinate in generic output formats (dot, xdot, plain, plain-ext).
     * This is equivalent to specifying -y when invoking Graphviz from the command-line.
     */
    yInvert: boolean;
    /**
     * Image dimensions to use when rendering nodes with image attributes.
     */
    images: Object[];
    /**
     * Files to make available to Graphviz using Emscripten's in-memory filesystem.
     */
    files: Object[];
    /**
     * "No layout" mode for the neato engine.
     * This is equivalent to specifying the -n option when invoking Graphviz from the command-line.
     */
    nop: number;
  }>;
  class Viz {
    constructor(options?: VizOptions);

    /**
     * Renders the graph as a string. For example:
     * ```
     * viz.renderString('digraph { a -> b }')
     * .then(function(string) {
     *   console.log(string);
     * });
     * ```
     * If the graph is invalid, or if Graphviz encounters an error,
     * an error will be thrown.
     * @param src The graph to render, as DOT.
     * @param options See Render Options.
     */
    renderString(src: string, options?: RenderOptions): Promise<string>;
  }

  export default Viz;
}

declare module 'viz.js/full.render.js' {
  const Module: Function;
  const render: Function;
  export { Module, render };
}
