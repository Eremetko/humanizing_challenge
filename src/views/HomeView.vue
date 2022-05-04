/* eslint-disable */
<template>
  <q-page>
    <div class="row">
      <div class="col-2">
        <div ref="itemsMenu" style="width: 20vw"></div>
      </div>
      <div class="col-10">
        <div ref="mainField" style="width: 80vw; height: 50vh"></div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { dia, ui, shapes, elementTools, g } from "@clientio/rappid";
dia.Element.define("container.Parent", {
  attrs: {
    root: {
      magnetSelector: "body",
    },
  },
});
@Options({})
export default class App extends Vue {
  public declare $refs: {
    itemsMenu: HTMLDivElement;
    mainField: HTMLDivElement;
  };
  private graph: dia.Graph;
  private paper: dia.Paper;
  private scroller: ui.PaperScroller;
  private stencil: ui.Stencil;
  private rectangle: shapes.standard.Rectangle;

  public created(): void {
    this.graph = new dia.Graph({}, {});
    this.paper = new dia.Paper({
      model: this.graph,
      width: 1400,
      height: 800,
      async: true,
      drawGrid: true,
      background: {
        color: "#dfdfdf",
      },
      gridSize: 10,
    });

    const port = {
      position: {
        name: "left",
      },
      attrs: {
        portBody: {
          magnet: true,
          r: 7,
          fill: "#ffffff",
          stroke: "#ff0000",
        },
      },
      markup: [
        {
          tagName: "circle",
          selector: "portBody",
        },
      ],
    };

    this.rectangle = new shapes.standard.Rectangle({
      position: { x: 10, y: 10 },
      size: { width: 180, height: 50 },
      attrs: {
        body: {
          rx: 5,
          ry: 5,
          fill: "white",
          stroke: "black",
          strokeWidth: 2,
        },
        label: {
          text: "Rectangle",
          fill: "black",
        },
      },
      ports: {
        items: [port],
      },
    });

    this.scroller = new ui.PaperScroller({
      paper: this.paper,
    });

    this.stencil = new ui.Stencil({
      paper: this.paper,
      height: 70,
      width: 200,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.stencil.on("element:drop", (elementView) => {
      const boundaryTool = new elementTools.Boundary();

      const removeButton = new elementTools.Remove({ x: "100%" });

      const toolsView = new dia.ToolsView({
        tools: [boundaryTool, removeButton],
      });

      elementView.addTools(toolsView);
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.graph.on("add", (cell): void => {
      const {
        attributes: {
          position: { x, y },
        },
      } = cell;
      const coordinates = new g.Point(x, y);
      //TODO: Created parent cell and added to them new cell
      const elementBelow = this.graph
        .findModelsFromPoint(coordinates)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .find(function (el) {
          return el.id !== cell.id;
        });
      if (!elementBelow) {
        //TODO: Complete created parent element
        const rect = new shapes.standard.Rectangle({
          position: { x: 300, y: 100 },
          size: { width: 300, height: 300 },
          attrs: {
            rect: { fill: "#F1C40F" },
            text: { text: "Child Rectangle" },
          },
        });
      }
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.paper.on("element:mouseenter", function (elementView): void {
      elementView.showTools();
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.paper.on("element:mouseleave", function (elementView): void {
      elementView.hideTools();
    });
  }

  public mounted(): void {
    this.$refs.mainField.appendChild(this.scroller.el);
    this.$refs.itemsMenu.appendChild(this.stencil.render().el);
    this.stencil.load([this.rectangle]);
  }
}
</script>
